import React from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import { width, height } from "react-native-dimension";
import { Toast } from "native-base";

class Splash extends React.Component {

state = {

}
componentDidMount(){
    this.timeout = setTimeout(async () => {
        this.props.navigation.navigate("Login");
    },1000);
}
render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require("../../assets/Login/2.png")}
          style={{
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            width: width(100),
          }}
        />
      </View>
    );
  }
}
export default Splash;