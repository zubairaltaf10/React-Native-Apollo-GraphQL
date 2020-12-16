import React from "react";
import { View, Text, Image } from "react-native";
import { width, height } from "react-native-dimension";
import { Toast } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
// const logout =  async ()  => {
//   await AsyncStorage.clear();
// };
class Splash extends React.Component {

state = {

}

async componentDidMount(){
  let user = await AsyncStorage.getItem('user');
    if (user) {
      user = JSON.parse(user).user;
      if(user != undefined){
      if(user.email_verified_at != null){
        if(user.user_subscription == null){
          this.props.navigation.navigate('Packages');
        }else{
        this.props.navigation.navigate('App');
        }
      }else{
        this.props.navigation.navigate('Verification', {
          type: 'UnverifiedLogin',
          email:user.email
        });
      }
    }else{
      this.props.navigation.navigate("Auth");
    }
    } 
    else {
     console.log('no user found');
     this.timeout = setTimeout(async () => {
      this.props.navigation.navigate("Auth");
    },1000);
    }
// AsyncStorage.getItem('user').then((user) => {
//     user = JSON.parse(user) ;
//     if(user)
//     {
//       this.timeout = setTimeout(async () => {
//         this.props.navigation.navigate("App");
//         },1000);
//        this.logout;
//     }else
//     {
//       this.timeout = setTimeout(async () => {
//         this.props.navigation.navigate("Intro");
//       },1000);
//     }
// }).catch((err) => {
//   this.timeout = setTimeout(async () => {
//   this.props.navigation.navigate("Intro");
// },1000);
// });


}
render() {
    return (
      <View style={{ flex: 1,backgroundColor:'#FFBD59' }}>
        <View style={{flex:1,justifyContent:'center'}}>
        {/* <Image
          source={require("../../assets/splash/logo_splash.png")}
          style={{height: '28%', width: undefined}}
          resizeMode="cover"
        /> */}
        <Image
          source={require("../../assets/splash/logo_splash.png")}
          style={{
            alignItems:'center',
            justifyContent: "center",
            alignSelf: "center",
            height:"38%",
            width: "83%",
            resizeMode:"contain"
          }}
        />
        </View>
      </View>
    );
  }
}

export default Splash;