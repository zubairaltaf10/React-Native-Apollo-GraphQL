import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert, StatusBar} from 'react-native';
import styles from '../../Styles/auth.styles';
import PrimaryButton from '../Button/PrimaryButton.js';
import {Content, Form, Input, Icon} from 'native-base';
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
      loading:false
    };
  }

  handleContinueBtn = async () => {
    this.setState({loading:true})
    const email = this.state.formData.email;
    this.props
    .mutate({
      variables: {
        email:email,
      },
    })
    .then((res) => {
      this.setState({loading:false})
      this.props.navigation.navigate('VerificationForgotpass', {
        type: 'ResetPassword',
        email: email,
      });
    })
    .catch((err) => {
      SNACKBAR.simple(JSON.stringify(err));
      this.setState({loading:false})
      console.log(JSON.stringify(err));
    });
  };

  render() {
    const isBtnDisabled = !checkEmail(this.state.formData.email);
    return (
        <Content style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.topheader}>
            <Text style={styles.backarrowforgot}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10, fontSize:18}}></Icon>
          </TouchableOpacity>
            </Text>
            <View style={{flex: 3, marginLeft:60, alignItems: 'flex-start', marginTop:'10%'}}>
        
            <Text style={styles.topheadingLabel}>
              Forgot Password
            </Text>
              </View>
        </View>
          <Form style={styles.form}>
          
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
              title="SEND VERIFICATION CODE"
              marginTop={6}
              disabled={isBtnDisabled}
              loading={this.state.loading}
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
