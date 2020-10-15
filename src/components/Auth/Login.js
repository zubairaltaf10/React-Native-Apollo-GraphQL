import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
} from "react-native";

class Login extends Component {
    state = {
     
    };
    componentDidMount(){
      this.timeout = setTimeout(async () => {
          this.props.navigation.navigate("Intro");
      },10);
  }
    render() {
  
        return (
            <View>
                <Text style={{fontSize:20}}>Login</Text>
            </View>
            );
        }
      }
export default Login;
