import React, {Component,useState} from 'react';
import {
  Text,
  LayoutAnimation,
  View,
  TouchableOpacity,
  Image,
  Switch
} from 'react-native';
import {Content, Form, Input, Icon} from 'native-base';
import {ApplicationStyles} from '../../Theme';
import PrimaryButton from '../Button/PrimaryButton';
import styles from '../../Styles/auth.styles';
//import WideBanner from '../../Components/Ads/WideBanner';
import {GetSignupErrors} from '../../Helpers/GetErrors';
import ErrorLabel from '../ErrorLabel/ErrorLabel';
import COLORS from '../../Theme/Colors';
import {withAuth} from '../../store/hoc/withAuth';
import ToggleSwitch from 'toggle-switch-react-native';
import { NETWORK_INTERFACE } from '../../config';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import SNACKBAR from '../../Helpers/SNACKBAR';
import Header from '../Header/index.js';
const client = new ApolloClient({
  link: new HttpLink({ uri: NETWORK_INTERFACE }),
  cache: new InMemoryCache()
})


class Signup extends Component {
  
  constructor(props) {
    super(props);
   
    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: 1,
        loading:false
      },
      isPasswordFieldSecure: true,
      isConfirmPasswordFieldSecure: true,
      errors: ['errors'],
      isOnToggleSwitch: false,
    };
    
  }
  onTextInput = (key, val) => {
    this.setState({formData: {...this.state.formData, [key]: val}});
    // remove error
    const newErrors = this.state.errors;
    let errIndex = newErrors.indexOf(key);
    if (errIndex !== -1) {
      newErrors.splice(errIndex, 1);
      this.setState({errors: newErrors});
    }
  };
  
  onSubmit = () => {
    //this.props.navigation.navigate('ResetPassword');
   
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({errors: GetSignupErrors(this.state.formData)}, () => {
      console.log(this.state.errors.length)
      if(this.state.isOnToggleSwitch == false)
      {
        SNACKBAR.simple("Please check term and condition.");
        return;
      }
      
      if (this.state.errors.length === 0) {
        this.setState({loading:true})
        let firstName = this.state.formData.firstName;
        let lastName = this.state.formData.lastName; 
        let email = this.state.formData.email;
        let password = this.state.formData.password; 
        this.props
      .mutate({
        variables: {
          firstname: firstName,
          lastname:lastName,
          email:email,
          password: password,
        },
      })
      .then((res) => {
        this.setState({loading:false})
        this.props.navigation.navigate('Verification', {
          type: 'Signup',
          email:email});
      })
      .catch((err) => {

        this.setState({loading:false})
       // var error = JSON.stringify(err);
       // console.log(error)
        if(err.graphQLErrors.length > 0)
        {
          var mess = err.graphQLErrors[0].message
          if(mess.includes("Validation")){
            SNACKBAR.simple("Email address already exist");
          }
        }
        
      });
      }
    });
  };
  render() {
    
    return (
      <ApolloProvider>
        
        <Content style={styles.container}>
        <View style={styles.topheader}>
            <Text style={styles.backarrow}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10, fontSize:18}}></Icon>
          </TouchableOpacity>
            </Text>
            <View style={{flex: 3, marginLeft:'28%', alignItems: 'flex-start', marginTop:'10%'}}>
        
     <Image 
                source={require('../../assets/logo_signup.png')}
                style={styles.logo}
              />
              </View>
        </View>
        
              <View style={{ marginBottom:'8%', marginTop:'5%'}}>
          <Text style={styles.logintopLabel}>
          Welcome, 
            </Text>
            <Text style={styles.logintopLabel1}>
            Let's setup an account
            </Text>
            </View>
          <Form style={styles.form}>
            <Input
              placeholder="First Name" maxLength={12}
              style={ApplicationStyles.textbox}
              value={this.state.formData.firstName}
              onChangeText={val => this.onTextInput('firstName', val)}
            />
            {ErrorLabel('firstName', this.state.errors)}
            <Input
              placeholder="Last Name" maxLength={12}
              style={ApplicationStyles.textbox}
              value={this.state.formData.lastName}
              onChangeText={val => this.onTextInput('lastName', val)}
            />
            {ErrorLabel('lastName', this.state.errors)}
            <Input
              placeholder="Email"
              keyboardType="email-address"
              style={ApplicationStyles.textbox}
              value={this.state.formData.email}
              onChangeText={val => this.onTextInput('email', val)}
            />
            {ErrorLabel('email', this.state.errors)}
            <View style={styles.passwordFieldContainer}>
              <Input
                placeholder="Password"
                style={ApplicationStyles.textbox}
                value={this.state.formData.password}
                maxLength={16}
                secureTextEntry={this.state.isPasswordFieldSecure}
                onChangeText={val => this.onTextInput('password', val)}
              />

              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() =>
                  this.setState({
                    isPasswordFieldSecure: !this.state.isPasswordFieldSecure,
                  })
                }>
                {!this.state.isPasswordFieldSecure && (
                  <Icon name="eye" type="AntDesign" style={{fontSize: 16, color: COLORS.primary}}></Icon>
                
                )}
                {this.state.isPasswordFieldSecure && (
                  <Image
                    source={require('../../assets/icons/forms/eye-close-fill.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            {ErrorLabel('password', this.state.errors)}

            <View style={styles.alternativeLayoutButtonContainer}>
            <Text style={styles.termandconLabel}>
            I agree with all{' '}
              <Text style={styles.termandconlink}
                onPress={() => this.props.navigation.navigate('Login')}>
                Terms & Conditions
              </Text>
            </Text>
            <ToggleSwitch 
 
 isOn={this.state.isOnToggleSwitch}
 onColor="#FFBD59"
 offColor="#868CA9"
 labelStyle={{ color: "black", fontWeight: "900" }}
 size="small" 
 
 onToggle={isOnToggleSwitch => {
           this.setState({ isOnToggleSwitch });
          
         }}
 
/>
        </View>
            <PrimaryButton
              loading={this.state.loading}
              title="CREATE ACCOUNT"
              onPress={this.onSubmit}
              marginTop={8}
            />

            <Text style={styles.alreadyAccountLabel}>
            Already have an account?{' '}
              <Text
                style={styles.redText}
                onPress={() => this.props.navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
            {/* <WideBanner /> */}
          </Form>
        </Content>
        </ApolloProvider>
    );
  }
}

const mutation = gql`
mutation register($firstname: String!, $lastname: String! ,$email: String!, $password: String!){
  register(input: {
    first_name: $firstname,
    last_name: $lastname,
    email: $email,
    password: $password,
    password_confirmation: $password
  }){
    tokens{
      access_token,
      user{
        id,
        name,
        email
      }
    },
    status
  }
}
`;
const SignupTab = graphql(mutation)(Signup);
export default withAuth(SignupTab);
