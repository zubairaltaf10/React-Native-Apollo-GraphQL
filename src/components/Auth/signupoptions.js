import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";

import { withAuth } from "../../store/hoc/withAuth";
import {BlurView} from '@react-native-community/blur';
import {FONTFAMILY} from '../../Theme/Fonts';
import PrimaryButton from '../Button/PrimaryButton';

import styles from '../../Styles/signupoptions.styles';
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
//WebBrowser.maybeCompleteAuthSession();

const FB_APP_ID = "688909198411382";
class SignupOptions extends Component {
  
    constructor(props) {
      super(props);
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
          console.log(result)
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

    render() {
     
        return (
       
      <ImageBackground style={styles.image} source={require('../../assets/signupoptions/background.png')} >
        <View style={{flex: 3, alignItems: 'center', marginTop:'10%'}}>
     <Image 
                source={require('../../assets/logo_gettingstarted.png')}
                style={styles.logo}
              />
              </View>
       
       <View style={styles.emailview}>
      <TouchableOpacity
        activeOpacity={0.8}
        
        > 
        <Text style={styles.GooglebuttonTextStyle}>
         REGISTER WITH EMAIL
          </Text>
       
      </TouchableOpacity>
    </View>

    <View style={styles.orview}>
     
        <Text style={styles.buttonTextStyle}>
        OR
          </Text>
       
    </View>
   
         <View  animationType="fade"  style={styles.introContainer}>
            <TouchableOpacity 
            onPress={() => this.handleFacebookLogin()}
          style={styles.buttonFacebookStyle}
          activeOpacity={0.5}>
          <Image
            source={require('../../assets/icons/forms/facebook_icon.png')}
            style={styles.buttonImageIconStyle}
          />
          
          <Text style={styles.buttonTextStyle}>
            CONTINUE WITH FACEBOOK 
          </Text>
          
            </TouchableOpacity>
                       
                <TouchableOpacity
                onPress={() => this._signIn()}
                style={styles.buttonGoogleStyle}
            activeOpacity={0.5}>
            <Image
                source={require('../../assets/icons/forms/google_icon.png')}
                style={styles.buttonImageIconStyle}
            />
            
            <Text style={styles.GooglebuttonTextStyle} >
            CONTINUE WITH GOOGLE
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.buttonAppleStyle}
            activeOpacity={0.5}>
            <Image
                source={require('../../assets/icons/forms/apple_fill.png')}
                style={styles.buttonImageIconStyle}
            />
            
            <Text style={styles.buttonTextStyle}>
            CONTINUE WITH APPLE
            </Text>
            </TouchableOpacity>

         </View>

         <View>
         <Text style={styles.alreadyAccountLabel}>
            Already have an account?{' '}
              <Text
                style={styles.redText}
                onPress={() => this.props.navigation.navigate('Signup')}>
                Sign Up
              </Text>
            </Text>
         </View>
         <View>
         <Text style={styles.skipAccountLabel}>
        
              <Text
                style={styles.redText}
                onPress={() => this.props.navigation.navigate('Login')}>
              Skip account setup
              </Text>
            </Text>
         </View>
      </ImageBackground>
        );
}
}
export default withAuth(SignupOptions);
