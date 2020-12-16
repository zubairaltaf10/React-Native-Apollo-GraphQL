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

import LinearGradient from "react-native-linear-gradient";
import {FONTFAMILY} from '../../Theme/Fonts';
import PrimaryButton from '../Button/PrimaryButton';
import AsyncStorage from '@react-native-community/async-storage';
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
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { NETWORK_INTERFACE } from '../../config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';
import SNACKBAR from '../../Helpers/SNACKBAR';
const FB_APP_ID = "688909198411382";
const  authLink =  setContext((_, { headers } )  =>  {
return {
  headers: {
    ...headers,
    authorization: "",
  }
}
})
const uploadLink = createUploadLink({ uri: NETWORK_INTERFACE });
const client = new ApolloClient({
  link: ApolloLink.from([ authLink, uploadLink ]),
  cache : new InMemoryCache(),
});

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
      LoginManager.logOut()
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
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const { accessToken } = data;
              if (accessToken){
               // this.props.navigation.navigate('Packages')
               this.socailLogin(accessToken, "facebook")
              }
            });
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        },
      );
    };  
    socailLogin(token, provider){

           client.mutate({
            mutation: mutation,
            variables: { provider: provider,
                token: token }
          })
            .then(async (data) => {
                //SNACKBAR.simple("Added") ; 
                  
             AsyncStorage.setItem('user', JSON.stringify(data.data.socialLogin)).then(
              () => {
                if(data.data.socialLogin.user.user_subscription == null)
                {
                  this.props.navigation.navigate('Packages');
                }else
                {
                this.props.navigation.navigate('App');
                }
              },
            );
            })
            .catch((err) => {
              console.log(err)
            })
            
    }
    _signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn({
          offlineAccess: true,
          webClientId:'385438711043-edeemv3ksoregibfrma5725veeveikqh.apps.googleusercontent.com',
        });
        var id_token = await GoogleSignin.getTokens();
        
        this.socailLogin(id_token.accessToken, "google")
  
      } catch (error) {
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
        <View style={{flex: 3, alignItems: 'center', marginTop:'15%'}}>
     <Image 
                source={require('../../assets/logo_gettingstarted.png')}
                style={styles.logo}
              />
              </View>
       
       <View style={styles.emailview}>
      <TouchableOpacity
      
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Signup')}
        > 
        <Text style={styles.GooglebuttonTextStyle1}>
         REGISTER WITH EMAIL
          </Text>
          
      </TouchableOpacity>
    </View>

    <View style={styles.orview}>
     
        <Text style={styles.buttonTextStyle}>
        OR
          </Text>
       
    </View>
    <LinearGradient 
                    colors={['#F4F4F8' , '#a9a8a9']}
                    style={styles.introContainer}
                    start={{ x: 0.2, y: 0.2 }}
                    >
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

                        </LinearGradient>
         

         <View>
         <Text style={styles.alreadyAccountLabel}>
         If you already have an account.{' '}
              <Text
                style={styles.termandconlink}
                onPress={() => this.props.navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
         </View>
         <View>
         <Text style={styles.skipAccountLabel}>
        
              <Text
                style={styles.redText}
                onPress={() => this.props.navigation.navigate('App')}>
              Skip account setup
              </Text>
            </Text>
         </View>
      </ImageBackground>
        );
}
}
const mutation = gql`
mutation socialLogin($provider: String!, $token: String!){
  socialLogin(input:{
    provider: $provider,
    token:$token
  })
  {
  access_token,
    
  user {
    email_verified_at
    id
    name,
    first_name,
    last_name,
    profile_image,
    email,
    bio,
    date_of_birth,
  user_subscription{
    subscription{
      name,
       person_limit,
  ingredient_limit,
  amount,
  amount_per_year,
  amount_per_month,
  name,
  trial_days,
  description
    
    }
  }
  }
}
}
`;
export default withApollo(SignupOptions);
