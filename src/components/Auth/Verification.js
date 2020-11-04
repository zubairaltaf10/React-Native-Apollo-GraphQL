import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
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
mutation verifyCode($email: String!, $code: String!){
    verifyCode(input:{
      verification_code: $code,
      email: $email
    }){
      status
    }
  }
`;

const mutations = gql`
mutation forgotPassword($email: String!){
  forgotPassword(input: {
    email: $email,
  }){
    status,
    message
  }
}
`;

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      resendTime: 0,
      loading:false
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
        this.setState({loading:false})
        if (res.data.verifyCode.status) {
          console.log(JSON.stringify(res.data.verifyCode.status))
          const type = this.props.navigation.getParam('type');
          console.log(type + "type")
      if (type === 'ResetPassword') {
        this.props.navigation.navigate('ResetPassword', {
          email: this.props.navigation.getParam('email'),
          code: this.state.userInput
        });
      } else if (type === 'Signup') {
        this.props.navigation.navigate('Packages');
      } else if (type === 'UnverifiedLogin') {
        this.props.navigation.navigate('Packages');
      }
    }
     else {
          return Alert.alert('Oops!', 'Invalid code!', [{text: 'OK'}], {
            cancelable: false,
          });
         }  
           
      })
      .catch((err) => {
        console.log(err)
        this.setState({loading:false})
        SNACKBAR.simple(JSON.stringify(err));
        console.log(err)
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
    const email = this.props.navigation.getParam('email');
    this.props.mutations({
      variables: {
        email:email,
      },
    })
    .then((res) => {
      SNACKBAR.simple("Verification code sent to your email");
      SNACKBAR.simple("Verification code sent to your email");
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    });
    this.setState({resendTime: 60});
  };
  containerProps = {style: styles.inputWrapStyle};

  colors = ['#ff595f', '#e42959'];

  render() {
    //console.log('verificationCode', this.state.verificationCode);
    return (
     
            <Content style={styles.container}>
            <View style={styles.alternativeLayoutButtonContainer}>
            <Text style={styles.backarrow}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="md-arrow-back" style={styles.icon} type="Ionicons" />
          </TouchableOpacity>
            </Text>
            <View style={{flex: 3, marginLeft:60, alignItems: 'flex-start', marginTop:'13%'}}>
        
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
            onCompleted={ () => { SNACKBAR.simple("Verification code sent to your email")} }
          >
            {mutation => (
              <TouchableOpacity
                style={styles.resendBtn}
                onPress={mutation}
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
              </TouchableOpacity>
            )}
            

          </Mutation>
              
              <PrimaryButton
                title="Verify"
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



const VerificationTab = graphql(mutation)(Verification);
export default withAuth(VerificationTab);

