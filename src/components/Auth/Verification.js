import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import CodeInput from 'react-native-confirmation-code-field';
import styles from '../../Styles/verification.styles.js';
import PrimaryButton from '../Button/PrimaryButton.js';
import {Content} from 'native-base';
//import WideBanner from '../../Components/Ads/WideBanner.js';

import Axios from 'axios';
import API from '../../Constants/API.js';
import AsyncStorage from '@react-native-community/async-storage';
import {withAuth} from '../../store/hoc/withAuth.js';
class Verification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      resendTime: 0,
      verificationCode: props.navigation.getParam('verificationCode'),
    };
  }

  onCodeInput = code => {
    this.setState({userInput: code});
  };

  verifyCode = () => {
    if (Number(this.state.userInput) === this.state.verificationCode) {
      const type = this.props.navigation.getParam('type');
      if (type === 'ResetPassword') {
        this.props.navigation.navigate('ResetPassword', {
          email: this.props.navigation.getParam('email'),
        });
      } else if (type === 'Signup') {
        this.props.verifyEmail(this.props.auth.user.user_id, type);
      } else if (type === 'UnverifiedLogin') {
        this.props.verifyEmail(this.props.auth.user.user_id, type);
      }
    } else {
      return Alert.alert('Oops!', 'Invalid code!', [{text: 'OK'}], {
        cancelable: false,
      });
    }
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
    Axios.post(API.sendVerificationCode, {
      email:
        this.props.navigation.getParam('email') || this.props.auth.user.email,
    })
      .then(res => {
        this.setState({verificationCode: res.data.data.code});
        Alert.alert('Success', res.data.message);
      })
      .catch(e =>
        Alert.alert(
          'Error',
          'Unable to send verification email, Please retry later.',
        ),
      );
    this.setState({resendTime: 60});
  };
  containerProps = {style: styles.inputWrapStyle};

  colors = ['#ff595f', '#e42959'];

  render() {
    console.log('verificationCode', this.state.verificationCode);
    return (
     
        <Content>
          return (
            <View>
                <Text style={{fontSize:20}}>Login</Text>
            </View>
            );
        </Content>
    );
  }
}
export default withAuth(Verification);
