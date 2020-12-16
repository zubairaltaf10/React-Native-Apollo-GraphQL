/* eslint-disable handle-callback-err */
import React from 'react';
import {Text, Alert, Image, TouchableOpacity, StatusBar} from 'react-native';
import styles from '../../Styles/auth.styles';
import PrimaryButton from '../Button/PrimaryButton.js';
import {Content, Input, Form, Icon, View} from 'native-base';
import {ApplicationStyles} from '../../Theme/index.js';
import {GetSignupErrors} from '../../Helpers/GetErrors';
import ErrorLabel from '../ErrorLabel/ErrorLabel';
import COLORS from '../../Theme/Colors';
import authStyles from '../../Styles/auth.styles';
import { NETWORK_INTERFACE } from '../../config';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import SNACKBAR from '../../Helpers/SNACKBAR';
const client = new ApolloClient({
  link: new HttpLink({ uri: NETWORK_INTERFACE }),
  cache: new InMemoryCache()
})
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        password: '',
        confirmPassword: '',
        loading:false
      },
      errors: ['email'],
      isPasswordFieldSecure: true,
      isConfirmPasswordFieldSecure: true,
    };
  }

  onSubmit = async () => {
   

    await this.setState(
      {errors: GetSignupErrors(this.state.formData)},
      async () => {
        if (this.state.errors.length === 0) {
          this.setState({loading:true})
          this.props.mutate({
            variables: {
              email:this.props.navigation.getParam('email'),
              password: this.state.formData.password,
              token:this.props.navigation.getParam('code')
            }
          })
          .then((res) => {
            this.setState({loading:false})
            this.props.navigation.navigate('Login');
          })
          .catch((err) => {            
            this.setState({loading:false})
            SNACKBAR.simple(JSON.stringify(err));
          });
        }
      },
    );
  };

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

  render() {
    return (
        <Content style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
          <View style={styles.alternativeLayoutButtonContainer}>
            <Text style={styles.backarrow}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10, fontSize:18}}></Icon>
          </TouchableOpacity>
            </Text>
            <View style={{flex: 1, marginLeft:'25%', alignItems: 'flex-start', marginTop:'10%'}}>
        
            <Text style={styles.inputLabel}>Reset password</Text>
              </View>
          </View>
          <Form style={styles.form}>

          
            <Text style={styles.topLabel}>
            Choose a strong new password. Make sure it's unique!
            </Text>

            <View style={authStyles.passwordFieldContainer}>
              <Input
                placeholder="New Password"
                secureTextEntry={this.state.isPasswordFieldSecure}
                maxLength={16}
                style={ApplicationStyles.textbox}
                onChangeText={password =>
                  this.onTextInput('password', password)
                }
              />

              <TouchableOpacity
                style={authStyles.eyeIcon}
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
            <View style={styles.passwordFieldContainer}>
              <Input
                placeholder="Confirm Password"
                secureTextEntry={this.state.isConfirmPasswordFieldSecure}
                maxLength={16}
                style={[ApplicationStyles.textbox]}
                onChangeText={confirmPassword =>
                  this.onTextInput('confirmPassword', confirmPassword)
                }
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() =>
                  this.setState({
                    isConfirmPasswordFieldSecure: !this.state
                      .isConfirmPasswordFieldSecure,
                  })
                }>
                {!this.state.isConfirmPasswordFieldSecure && (
                  <Icon name="eye" type="AntDesign" style={{fontSize: 16, color: COLORS.primary}}></Icon>
                )}
                {this.state.isConfirmPasswordFieldSecure && (
                  <Image
                    source={require('../../assets/icons/forms/eye-close-fill.png')}
                  />
                )}
              </TouchableOpacity>
            </View>

            {ErrorLabel('confirmPassword', this.state.errors)}
            <PrimaryButton
              title="RESET PASSWORD"
              marginTop={5}
              onPress={this.onSubmit}
              loading={this.state.loading}
            />
          </Form>
        </Content>
    );
  }
}

const mutation = gql`
mutation updateForgottenPassword($email: String!, $password: String! , $token: String!){
  updateForgottenPassword(input: {
    email: $email,
    token:$token,
    password:$password,
    password_confirmation:$password
  }){
    status,
    message
  }
}
`;

const ResetPasswordTab = graphql(mutation)(ResetPassword);
export default ResetPasswordTab;

