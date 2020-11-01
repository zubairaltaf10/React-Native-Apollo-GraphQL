import React from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import { width, height } from "react-native-dimension";
import { Toast } from "native-base";

class Splash extends React.Component {

state = {

}
componentDidMount(){
    this.timeout = setTimeout(async () => {
        this.props.navigation.navigate("Intro");
    },1000);
}
render() {
    return (
      <View style={{ flex: 1,backgroundColor:'#FFBD59' }}>
        <View style={{flex:1,justifyContent:'center'}}>
        <Image
          source={require("../../assets/splash/logo_splash.png")}
          style={{
            alignItems:'center',
            justifyContent: "center",
            alignSelf: "center",
            height:"25%",
            width: "75%",
          }}
        />
        </View>
      </View>
    );
  }
}

export default Splash;