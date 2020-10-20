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

class SignupOptions extends Component {
    constructor(props) {
      super(props);
    }
  
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
                style={styles.buttonGoogleStyle}
            activeOpacity={0.5}>
            <Image
                source={require('../../assets/icons/forms/google_icon.png')}
                style={styles.buttonImageIconStyle}
            />
            
            <Text style={styles.GooglebuttonTextStyle}>
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
