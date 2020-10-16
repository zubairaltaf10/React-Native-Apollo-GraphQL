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

class Packages extends Component {
    constructor(props) {
      super(props);
    }
    render() {
   
        return (
            <View></View>
        );
}
}
export default withAuth(Packages);
