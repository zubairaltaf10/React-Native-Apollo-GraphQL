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
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {email: ''},
    };
  }

  handleContinueBtn = async () => {
    const {email} = this.state.formData;
    const res = await this.props.sendVerificationCode(email);
    if (res) {
      const {verificationCode} = res;
      this.props.navigation.navigate('Verification', {
        verificationCode,
        type: 'ResetPassword',
        email: email,
      });
    }
  };

  render() {
    const isBtnDisabled = !checkEmail(this.state.formData.email);
    return (
        <Content>
          <Form style={styles.form}>
            <Text style={styles.topLabel}>
              Please enter your email address below to reset your password!
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
export default withAuth(ForgotPassword);
