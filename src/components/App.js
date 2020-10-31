import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Routes from "../routes/Routes";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

export default class MainApp extends Component {
 
  render() {
    return (
        
          <Routes/>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
