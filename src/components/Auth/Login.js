import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Content, Form, Item, Input, Icon, Spinner, Button} from 'native-base';
import {ApplicationStyles} from '../../Theme';
import PrimaryButton from '../Button/PrimaryButton';
import styles from '../../Styles/auth.styles';
//import WideBanner from '../../Components/Ads/WideBanner';
import ErrorLabel from '../ErrorLabel/ErrorLabel';
import {GetSignupErrors} from '../../Helpers/GetErrors';
import COLORS from '../../Theme/Colors';
//import AsyncStorage from '@react-native-community/async-storage';
import {withAuth} from '../../store/hoc/withAuth';
import SNACKBAR from '../../Helpers/SNACKBAR';
import { NETWORK_INTERFACE } from '../../config';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import NavigationService from '../../routes/Routes';
const client = new ApolloClient({
  link: new HttpLink({ uri: NETWORK_INTERFACE }),
  cache: new InMemoryCache()
})
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {userNameOrEmail: '', loginPassword: ''},
      errors: ['errors'],
      hidePassword: true,
      showSecurityQuestionModel: false,
      inputSecurityAnswer: '',
      password: '',
      name: '',
      email: '',
      resultRegister: '',
      resultLogin: '',
      loading:false
    };
  }

  
  onTextInput = (key, val) => {
    this.setState({formData: {...this.state.formData, [key]: val}});
    this.setState({key : val}) 
    // remove error
    const newErrors = this.state.errors;
    let errIndex = newErrors.indexOf(key);
    if (errIndex !== -1) {
      newErrors.splice(errIndex, 1);
      this.setState({errors: newErrors});
    }
  };

  onSubmit = () => {
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
   // this.props.navigation.navigate('Packages');
    this.setState({errors: GetSignupErrors(this.state.formData)}, () => {
      if (this.state.errors.length === 0) {
        this.setState({loading:true})
        let email = this.state.formData.userNameOrEmail;
        let password = this.state.formData.loginPassword; 
        this.props.mutate({
        variables: {
          email: email,
          password: password,
        },
      })
      .then((res) => {
       // localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        console.log("userInfo ", JSON.stringify(res.data.login.user))
        if(res.data.login.user.email_verified_at != null)
        {
          this.setState({loading:false})
          this.props.navigation.navigate('App');
        }else
        {
          this.setState({loading:false})
          this.props.navigation.navigate('Verification', {
            type: 'UnverifiedLogin',
            email:res.data.login.user.email
          });
        }        
      })
      .catch((err) => {
        if(err.graphQLErrors != null)
        {
          this.setState({loading:false})
          if(err.graphQLErrors.length > 0)
          {
            SNACKBAR.simple(err.graphQLErrors[0].extensions.reason);
          }
        }
      });
      }
    });
  };
  render() {
   
    return (
  
      <Content>
      
       <View style={{flex: 3, alignItems: 'center', marginTop:'15%', marginBottom:'8%'}}>
     <Image 
                source={require('../../assets/logo_signup.png')}
                style={styles.logo}
              />
              </View>
          <Form style={styles.form}>
          <View style={{ marginBottom:'10%'}}>
          <Text style={styles.logintopLabel}>
          Welcome Back,
            </Text>
            <Text style={styles.logintopLabel}>
         
       Login to your account
            </Text>
            </View>
            <Input
              placeholder="Email" 
              keyboardType="default"
              style={ApplicationStyles.textbox}
              onChangeText={val => this.onTextInput('userNameOrEmail', val)}
              // onChangeText={val => this.onTextInput('email', val)}
                  //value={this.state.type}
            />
            {ErrorLabel('userNameOrEmail', this.state.errors)}
            <View style={styles.passwordFieldContainer}>
              <Input
                placeholder="Password"
                secureTextEntry={this.state.hidePassword}
                style={ApplicationStyles.textbox}
               // onChangeText={(text) => this.setState({ password: text })}
               onChangeText={val => this.onTextInput('loginPassword', val)}
                 // value={this.state.type}
                maxLength={16}
              />

              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() =>
                  this.setState({hidePassword: !this.state.hidePassword})
                }>
                {!this.state.hidePassword && (
                  <Icon
                    name="eye"
                    style={{fontSize: 18, color: COLORS.primary}}
                  />
                )}
                {this.state.hidePassword && (
                  <Image
                    source={require('../../assets/icons/forms/eye-close-fill.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            {ErrorLabel('loginPassword', this.state.errors)}
            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() => this.props.navigation.navigate('Forgot')}>
              <Text style={styles.forgotTxt}>Forgot Password?</Text>
            </TouchableOpacity>
           
            <PrimaryButton
              title="Login"
              onPress={this.onSubmit}
              marginTop={4.1}
              loading={this.state.loading}
            />

            <Text style={styles.alreadyAccountLabel}>
            Already have an account?{' '}
              <Text
                style={styles.redText}
                onPress={() => this.props.navigation.navigate('Signup')}>
                Sign Up
              </Text>
            </Text>
          </Form>
         
          </Content>
    );
  }
}

const mutation = gql`
mutation login($email: String!, $password: String!){
  login(input: {
    username: $email,
    password: $password
  }){
    access_token,
    user{
      name,
      email,
      email_verified_at
    }
  }
}
`;
const LoginTab = graphql(mutation)(Login);
export default LoginTab;
