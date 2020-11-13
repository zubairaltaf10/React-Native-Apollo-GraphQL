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

componentDidMount(){
  
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

this.timeout = setTimeout(async () => {
  this.props.navigation.navigate("Login");
},1000);
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
            height:"28%",
            width: "83%",
            resizeMode:"cover"
          }}
        />
        </View>
      </View>
    );
  }
}

export default Splash;