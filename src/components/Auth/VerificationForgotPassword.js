import React from 'react';
import {View, Text, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
//import { CodeInput } from 'react-native-confirmation-code-field';
import CodeInput from 'react-native-code-input';
import styles from '../../Styles/verification.styles.js';
import PrimaryButton from '../Button/PrimaryButton.js';
import {Content, Form, Input, Icon} from 'native-base';
//import WideBanner from '../../Components/Ads/WideBanner.js';
import CountdownCircle from 'react-native-countdown-circle';
import Axios from 'axios';
import API from '../../Constants/API.js';
import AsyncStorage from '@react-native-community/async-storage';
import {withAuth} from '../../store/hoc/withAuth.js';
import { NETWORK_INTERFACE } from '../../config';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Mutation  } from 'react-apollo'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import SNACKBAR from '../../Helpers/SNACKBAR';
const client = new ApolloClient({
  link: new HttpLink({ uri: NETWORK_INTERFACE }),
  cache: new InMemoryCache()
})

const mutation = gql`
mutation verifyPasswordResetCode($email: String!, $code: String!){
  verifyPasswordResetCode(input:{
      token: $code,
      email: $email
    }){
      status,
      token
    }
  }
`;

const mutations = gql`

mutation forgotPassword($email: String!){
  
  forgotPassword(input: {
    email: $email
    }
  ){
    status,
    message
  }
}
`;

class VerificationForGotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      resendTime: 0,
      loading:false,
      loadingresend:false
      //verificationCode: props.navigation.getParam('verificationCode'),
    };
  }

  onCodeInput = code => {
    this.setState({userInput: code});
  };
   
  verifyCode = async () => {
     console.log(this.state.userInput.length) 
     if (this.state.userInput.length < 4){
      SNACKBAR.simple('Please enter the provided code');
      return;
     }
     this.setState({loading:true})
     await this.props.mutate({
        variables: {
          email: this.props.navigation.getParam('email'),
          code: this.state.userInput,
        },
      })
      .then((res) => {
        console.log(res.data.verifyPasswordResetCode)
        this.setState({loading:false})
        if (res.data.verifyPasswordResetCode.status === "true") {
          
          const type = this.props.navigation.getParam('type');
          console.log(type + "type")
      if (type === 'ResetPassword') {
        this.props.navigation.navigate('ResetPassword', {
          email: this.props.navigation.getParam('email'),
          code: res.data.verifyPasswordResetCode.token
        });
      }
    }
     else {
      SNACKBAR.simple("Invalid code");
         }  
           
      })
      .catch((err) => {
        //console.log(err)
        this.setState({loading:false})
       // SNACKBAR.simple(JSON.stringify(err));
        //console.log(JSON.stringify(err))
        if(err.graphQLErrors != null)
        {
          SNACKBAR.simple(err);
        }
       });
      
      
    
  };

  cellProps = ({/*index, isFocused,*/ hasValue}) => {
    if (hasValue) {
      return {
        style: [styles.input, styles.inputNotEmpty],
      };
    }
    return {
      style: styles.input,
    };
  };

  resendCode = () => {
    this.setState({resendTime: 60});
    const email = this.props.navigation.getParam('email');
    this.props.mutations({
      variables: {
        email:email,
      },
    })
    .then((res) => {
      SNACKBAR.simple("Verification code sent to your email");
      this.setState({resendTime: 60});
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    });
   
  };
  containerProps = {style: styles.inputWrapStyle};

  colors = ['#ff595f', '#e42959'];

  render() {
    //console.log('verificationCode', this.state.verificationCode);
    return (
     
            <Content style={styles.container}>
            
            <View style={styles.topheader}>
            <Text style={styles.backarrowforgot}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10, fontSize:18}}></Icon>
          </TouchableOpacity>
            </Text>
            <View style={{flex: 3, marginLeft:60, alignItems: 'flex-start'}}>
        
            <Text style={styles.inputLabel}>Verify your email</Text>
              </View>
        </View>
          <View style={styles.container}>
          
            <View style={styles.inputWrapper}>
              <Text style={styles.inputSubLabel}>
              Enter the verification code we just sent to your email.
              </Text>

               <CodeInput 
               activeColor='rgba(49, 180, 4, 1)'
              inactiveColor='rgba(9, 56, 149, 0.1)'
              containerStyle={{ marginTop: 30 }} 
              codeInputStyle={{ borderWidth: 1.5 }}
                blurOnSubmit={false}
                variant="clear"
                codeLength={4}
                keyboardType="numeric"
                cellProps={this.cellProps}
                containerProps={this.containerProps}
                onFulfill={this.onCodeInput}
              />
            <Mutation
            mutation={mutations}
            variables={{ email: this.props.navigation.getParam('email') }}
            onCompleted={ () => { SNACKBAR.simple("Verification code sent to your email") ; this.setState({resendTime: 60}); this.setState({loadingresend:false});} }
          >
            {mutation => (
              <TouchableOpacity
                style={styles.resendBtn}
                onPress={mutation  }
                disabled={this.state.resendTime === 0 ? false : true}>
                <Text style={styles.resendText}>Resend Code</Text>
                {this.state.resendTime !== 0 && (
                  <CountdownCircle
                    seconds={this.state.resendTime}
                    radius={10}
                    borderWidth={2}
                    color="gray"
                    bgColor="#fff"
                    textStyle={{fontSize: 10}}
                    onTimeElapsed={() => this.setState({resendTime: 0})}
                  />
                )}
                <View style={styles.row}>
                {this.state.loadingresend && (
            <ActivityIndicator style={styles.spinner} color={"#FFBD59"}/>
                )}
          
        </View>
              </TouchableOpacity>
            )}
            

          </Mutation>
              
              <PrimaryButton
                title="VERIFY EMAIL"
               loading={this.state.loading}
                marginTop={10}
                onPress={()=>this.verifyCode()}
              />
            </View>
          </View>
        </Content>
       
    );
  }
}



const VerificationForGorPasswordTab = graphql(mutation)(VerificationForGotPassword);
export default withAuth(VerificationForGorPasswordTab);

