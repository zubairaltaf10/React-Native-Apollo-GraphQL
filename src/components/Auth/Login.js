import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Content, Form, Item, Input, Spinner, Button} from 'native-base';
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
import Icon from "react-native-vector-icons/FontAwesome";
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";
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

  componentDidMount() {
    GoogleSignin.configure({
      //  scopes: ["profile", "email"],
      androidClientId:
        "310912297952-pfosgk7mrc4d2fj57rll2tr1m5kqhogb.apps.googleusercontent.com",
      offlineAccess: false,
      forceCodeForRefreshToken: true,
    });
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

  handleFacebookLogin = async () => {
    // try {
    //   LoginManager.setLoginBehavior(Platform.OS ==='ios' ? 'native': 'NATIVE_ONLY');
    // } catch (error) {
    //   LoginManager.setLoginBehavior('WEB_ONLY');
    // }
    // LoginManager.setLoginBehavior(Platform.OS ==='ios' ? 'native': 'NATIVE_ONLY');
    // LoginManager.setLoginBehavior('NATIVE_ONLY');
    let behavior = Platform.OS === "ios" ? "browser" : "WEB_ONLY";
    LoginManager.setLoginBehavior(behavior);
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      result => {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            console.log(accessToken);
          });
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      },
    );
  };  

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn({
        offlineAccess: true,
        webClientId:'385438711043-edeemv3ksoregibfrma5725veeveikqh.apps.googleusercontent.com',
      });
      const email = userInfo.user.email;
      console.log(email)
      const name = userInfo.user.name;

     // const password = userInfo.user.id + name;

    } catch (error) {
      console.log(error);
      console.log("error");
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        errorMessage = error.code;
      
      
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error);
      }
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
    this.props.navigation.navigate("SignupOptions");
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
            <View style={{flexDirection:'row', flex: 0,justifyContent: "space-evenly"}}>
                <View>
                  <Button
                    style={styles.fbbtn}
                    onPress={() => this.handleFacebookLogin()}>
                    <Icon
                      name="facebook"
                      type="AntDesign"
                      style={styles.google}
                    />
                  </Button>
                  {/* <LoginButton
                    onLoginFinished={(error, result) => {
                      if (error) {
                        console.log("login has error: " + result.error);
                      } else if (result.isCancelled) {
                        console.log("login is cancelled.");
                      } else {
                        AccessToken.getCurrentAccessToken().then(data => {
                          console.log(data.accessToken.toString());
                        });
                      }
                    }}
                    onLogoutFinished={() => console.log("logout.")}
                  /> */}
                </View>
                <View>
                  <Button
                    style={
                      styles.socialMediaButton
                    }
                    onPress={this._signIn}>
                    <Icon name="google" type="AntDesign" style={styles.google} />
                  </Button>
                </View>
              </View>
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
