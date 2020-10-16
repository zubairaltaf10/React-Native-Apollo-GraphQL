import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
} from 'react-native';
import {Content, Form, Item, Input, Icon, Spinner, Label} from 'native-base';
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
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {userNameOrEmail: '', loginPassword: ''},
      errors: ['errors'],
      hidePassword: true,
      showSecurityQuestionModel: false,
      inputSecurityAnswer: '',
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
    //this.props.navigation.navigate('App');
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // this.setState({errors: GetSignupErrors(this.state.formData)}, () => {
    //   if (this.state.errors.length === 0) {
    //     this.props.login(this.state.formData, this.showSecurityQuestionModel);
    //   }
    // });
    this.props.navigation.navigate("Intro");
  };


 

  render() {
   
    return (
      <Content>
       <View style={{flex: 3, alignItems: 'center', marginTop:'15%'}}>
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
            />
            {ErrorLabel('userNameOrEmail', this.state.errors)}
            <View style={styles.passwordFieldContainer}>
              <Input
                placeholder="Password"
                secureTextEntry={this.state.hidePassword}
                style={ApplicationStyles.textbox}
                onChangeText={val => this.onTextInput('loginPassword', val)}
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
             // loading={this.props.auth.loadingLogin}
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

export default withAuth(Login);
