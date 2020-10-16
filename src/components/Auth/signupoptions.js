import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import { withAuth } from "../../store/hoc/withAuth";

import PrimaryButton from '../Button/PrimaryButton';
const styles = StyleSheet.create({
    slide: {
      flex: 1,
      flexDirection: 'column',
  //    justifyContent: 'center',
    },
    image: {
        flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
    },
    text: {
      color: '#000',
      textAlign: 'center',
      marginTop:'5%'
    },
    title: {
      fontSize: 22,
    //  flex:1,
      color: 'black',
      textAlign: 'center',
    },
    buttonCircle: {
      width: 44,
      height: 44,
      backgroundColor: '#ffbd59',
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
    introContainer : {
       borderRadius:15, 
       margin:'10%',
      backgroundColor:'yellow',
       justifyContent:'flex-end',
       
       paddingBottom:30
    },
    
  });

class SignupOptions extends Component {
    constructor(props) {
      super(props);
    }
    render() {
   
        return (
            <ImageBackground source={require('../../assets/Intro/food.jpg')} style={styles.image}>
               <View style={styles.introContainer}>
            
               <PrimaryButton
              loading={this.props.auth.loadingSignup}
              title="Sign up"
              
              marginTop={10}
            />
             <PrimaryButton
              loading={this.props.auth.loadingSignup}
              title="Sign up"
              
              marginTop={10}
            />
                       
            </View>
            </ImageBackground>
        );
}
}
export default withAuth(SignupOptions);
