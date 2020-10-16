import React, {Component,useState} from 'react';
import {
  Text,
  LayoutAnimation,
  View,
  TouchableOpacity,
  Image,
  Switch
} from 'react-native';
// import TopHeader from '../../Components/TopHeader';
// import Header from '../../Components/Header';
import {Content, Form, Input, Icon} from 'native-base';
import {ApplicationStyles} from '../../Theme';
import PrimaryButton from '../Button/PrimaryButton';
import styles from '../../Styles/auth.styles';
//import WideBanner from '../../Components/Ads/WideBanner';
import {GetSignupErrors} from '../../Helpers/GetErrors';
import ErrorLabel from '../ErrorLabel/ErrorLabel';
import COLORS from '../../Theme/Colors';
import {withAuth} from '../../store/hoc/withAuth';
import ToggleSwitch from 'toggle-switch-react-native'
class Signup extends Component {
  
  constructor(props) {
    super(props);
   
    this.state = {
      formData: {
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleId: 1,
        security_question_id: 1,
        security_question_answer: 'answer',
      },
      isPasswordFieldSecure: true,
      isConfirmPasswordFieldSecure: true,
      errors: ['errors'],
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({errors: GetSignupErrors(this.state.formData)}, () => {
      if (this.state.errors.length === 0) {
        this.props.signup(this.state.formData);
      }
    });
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
              <View style={{ marginBottom:'10%', marginTop:'5%'}}>
          <Text style={styles.logintopLabel}>
          Welcome, 
            </Text>
            <Text style={styles.logintopLabel}>
            Let's setup an account
            </Text>
            </View>
          <Form style={styles.form}>
            <Input
              placeholder="Full Name"
              style={ApplicationStyles.textbox}
              value={this.state.formData.fullName}
              onChangeText={val => this.onTextInput('fullName', val)}
            />
            {ErrorLabel('fullName', this.state.errors)}
            <Input
              placeholder="Username"
              style={ApplicationStyles.textbox}
              value={this.state.formData.userName}
              onChangeText={val => this.onTextInput('userName', val)}
            />
            {ErrorLabel('userName', this.state.errors)}
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
                  <Icon
                    name="eye"
                    style={{fontSize: 18, color: COLORS.primary}}
                  />
                )}
                {this.state.isPasswordFieldSecure && (
                  <Image
                    source={require('../../assets/icons/forms/eye-close-fill.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            {ErrorLabel('password', this.state.errors)}
            <Text style={styles.termandconLabel}>
            I agree with all?{' '}
              <Text
                onPress={() => this.props.navigation.navigate('Login')}>
                Terms & Conditions
              </Text>
              <ToggleSwitch style={{   }}
  isOn={true}
  onColor="#FFBD59"
  offColor="green"
  labelStyle={{ color: "black", fontWeight: "900" }}
  size="small"
  onToggle={isOn => console.log("changed to : ", isOn)}
/>
            </Text>
  
            <PrimaryButton
              loading={this.props.auth.loadingSignup}
              title="Sign up"
              onPress={this.onSubmit}
              marginTop={8}
            />

            <Text style={styles.alreadyAccountLabel}>
              Already have an account ?{' '}
              <Text
                style={styles.redText}
                onPress={() => this.props.navigation.navigate('Login')}>
                Sign In
              </Text>
            </Text>
            {/* <WideBanner /> */}
          </Form>
        </Content>
    );
  }
}
export default withAuth(Signup);
