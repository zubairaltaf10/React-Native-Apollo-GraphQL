import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import { withAuth } from "../../store/hoc/withAuth";
import LinearGradient from "react-native-linear-gradient";
import Swiper from 'react-native-swiper'
import { height } from "react-native-dimension";

const data = [
    {
      title: 'Recipes',
      text: 'Search for recipes with  \ningredients you already have in \nyour panty!',
      image: require('../../assets/Intro/background.png'),
      bg: '#59b2ab',
    },
    {
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../../assets/Intro/background.png'),
      bg: '#febe29',
    },
    {
      title: 'Rocket guy',
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
      image: require('../../assets/Intro/background.png'),
      bg: '#22bcb5',
    },
  ];
  
  var Item = typeof data[0];
  
  const styles = StyleSheet.create({
    slide: {
      flex: 1.5,
      flexDirection: 'column',
      justifyContent: 'center'
    },
    image: {
        flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
    },
    text: {
      color: '#000',
      textAlign: 'center',
      marginTop:'5%',
      fontSize:16,
      lineHeight:height(4)
    },
    title: {
      fontSize: 22,
    //  flex:1,
      color: 'black',
      textAlign: 'center',
      fontWeight:'bold'

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
       marginHorizontal:'5%',
       height:height(50),
       marginTop:'50%',
  //     backgroundColor:'yellow',
       justifyContent:'flex-end',
    },
    linearGradient: {
        position: 'relative',
         left: 0,
        right: 0,
        top: 0,
        height: '50%',
        borderRadius:25,
        justifyContent:'center',
    }
  });

class Intro extends React.Component {
    state = {
       
    };
    
    _onDone = () => {
        console.log(this.currentSlide)
      //  this.props.navigation.navigate("Login")
      }
      goToSlide = (idx) => {
        console.log(idx)
      }
      renderPagination = () => {
         return (
      <View style={styles.buttonCircle}>
        <Icon
        onPress={this._onDone}
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      
      </View>
    );
      };
    _renderItem = ({item}) => {
        return (
          <View
            style={[
              styles.slide,
              
            ]}>
            <View style={styles.introContainer}>
            <LinearGradient
                    colors={['#a9a8ac', '#cdd4da']}
                    style={styles.linearGradient}>
            <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.text}>{item.text}</Text>
                        </LinearGradient>
            </View>
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
            <ImageBackground source={require('../../assets/Intro/background.png')} style={styles.image}>
            <AppIntroSlider
              keyExtractor={this._keyExtractor}
              renderDoneButton={this._renderDoneButton}
              renderNextButton={this._renderNextButton}
              renderItem={this._renderItem}
              data={data}
              dotStyle={{backgroundColor: 'grey'}}
//              activeDotStyle={{backgroundColor: 'white',}}
              onDone={this._onDone}
              renderPagination={this.renderPagination}
              onSlideChange={index => this.currentSlide = index}              />
              </ImageBackground>
          </View>
        );
      }
    }

export default withAuth(Intro);

