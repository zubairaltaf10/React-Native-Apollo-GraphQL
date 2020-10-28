import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from '../../Styles/auth.styles';
import PrimaryButton from '../Button/PrimaryButton.js';
import {Content, Input, Form} from 'native-base';
// import WideBanner from '../../Components/Ads/WideBanner.js';
// import TopHeader from '../../Components/TopHeader/index.js';
// import Header from '../../Components/Header/index.js';
import {ApplicationStyles} from '../../Theme/index.js';
import Axios from 'axios';
import API from '../../Constants/API';
import {checkEmail} from '../../Helpers/Validations';
import {withAuth} from '../../store/hoc/withAuth';
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
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {email: ''},
    };
  }

  handleContinueBtn = async () => {
    const email = this.state.formData.email;
    this.props
    .mutate({
      variables: {
        email:email,
      },
    })
    .then((res) => {
      //console.log("userInfo ", JSON.stringify(res.data.register.tokens.user))
      this.props.navigation.navigate('Verification', {
        type: 'ResetPassword',
        email: email,
      });
    })
    .catch((err) => {
     // SNACKBAR.simple(err.graphQLErrors);
      console.log(JSON.stringify(err));
    });
  };

  render() {
    const isBtnDisabled = !checkEmail(this.state.formData.email);
    return (
        <Content>
          <Form style={styles.form}>
          <Text style={styles.topheadingLabel}>
              Forgot Password
            </Text>
            <Text style={styles.topLabel}>
            Enter your email address to receive a verification code.
            </Text>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              value={this.state.formData.email}
              style={[ApplicationStyles.textbox, {marginTop: '15%'}]}
              onChangeText={email => this.setState({formData: {email}})}
            />

            <PrimaryButton
              title="Continue"
              marginTop={6}
              disabled={isBtnDisabled}
              loading={this.props.auth.loadingSendVerifCode}
              onPress={this.handleContinueBtn}
            />
          </Form>
        </Content>
    );
  }
}
const mutation = gql`
mutation forgotPassword($email: String!){
  forgotPassword(input: {
    email: $email,
  }){
    status,
    message
  }
}
`;
const ForgotPasswordTab = graphql(mutation)(ForgotPassword);
export default withAuth(ForgotPasswordTab);
