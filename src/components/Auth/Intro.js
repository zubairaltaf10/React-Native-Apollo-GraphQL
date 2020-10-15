import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';


const data = [
    {
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: require('../../assets/Login/2.png'),
      bg: '#59b2ab',
    },
    {
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../../assets/Login/2.png'),
      bg: '#febe29',
    },
    {
      title: 'Rocket guy',
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
      image: require('../../assets/Login/2.png'),
      bg: '#22bcb5',
    },
  ];
  
  var Item = typeof data[0];
  
  const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
  //    justifyContent: 'center',
    },
    image: {
        width:'100%',
        height:'100%',
        resizeMode: 'cover'
    },
    text: {
      color: '#000',
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      flex:1,
      color: 'white',
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
  });

class Intro extends React.Component {
    state = {
       
    };

    _renderItem = ({item}) => {
        return (
          <View
            style={[
              styles.slide,
              {
                backgroundColor: item.bg,
              },
            ]}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      };
    
      _keyExtractor = (item) => item.title;
    
      _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon name="arrow-forward" color="#000"
              size={24}></Icon>
          </View>
        );
      };
    
      _renderDoneButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
          </View>
        );
      };
    
      render() {
        return (
          <View style={{flex: 1}}>
            {/* <StatusBar translucent backgroundColor="transparent" /> */}
            <AppIntroSlider
              keyExtractor={this._keyExtractor}
              renderDoneButton={this._renderDoneButton}
              renderNextButton={this._renderNextButton}
              renderItem={this._renderItem}
              data={data}
            />
          </View>
        );
      }
    }

export default Intro;

