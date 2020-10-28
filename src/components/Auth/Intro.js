import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import {
  Icon,
} from "native-base";
import AppIntroSlider from 'react-native-app-intro-slider';
import { withAuth } from "../../store/hoc/withAuth";
import LinearGradient from "react-native-linear-gradient";
import { height, width } from "react-native-dimension";
import { FONTFAMILY } from '../../Theme/Fonts';

const data = [
  {
    title: 'Recipes',
    text: 'Search for recipes with \ningredients you already have in \nyour pantry!',

  },
  {
    title: 'Food for thought',
    text: 'Find all nutrition information for any \nrecipe you want to cook!',

  },
  {
    title: 'Learn and Cook!',
    text: "Learn Recipes that are easy even if \n you're a beginner!",

  },
];

var Item = typeof data[0];


class Intro extends React.Component {
  state = {
    currentSlide: 0,
    dotsArray: [
      {
        "isActive": true
      },
      {
        "isActive": false
      },
      {
        "isActive": false
      }
    ]
  };

  _onDone = () => {
    console.log(this.state.currentSlide)
    //  this.props.navigation.navigate("Login")
  }
  handleNext = () => {
    if (this.state.currentSlide == 0) {
      this.state.dotsArray[0].isActive = false
      this.state.dotsArray[1].isActive = true
      console.log(this.state.currentSlide)
      this._slider.goToSlide(1)
    }
    if (this.state.currentSlide == 1) {
      this.state.dotsArray[1].isActive = false
      this.state.dotsArray[2].isActive = true
      this._slider.goToSlide(2)
    }
  }
  renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>

          <View style={styles.dot}>
            {this.state.dotsArray.map((x) =>
              x.isActive ?
                <Icon style={styles.activedotStyle}
                  type="Entypo"
                  name="dot-single"

                />
                :
                <Icon style={styles.dotStyle}
                  onPress={this._onDone}
                  type="Entypo"
                  name="dot-single"
                  color="white"
                  size={100}
                />
            )}
          </View>
          <View style={{ flex: 1 }} >
            <View style={styles.buttonCircle}>
              {this.state.currentSlide < 2 ?
                <Icon style={{ fontSize: 20 }}
                  onPress={() => this.handleNext()}
                  name="arrowright"
                  color="black"
                  type="AntDesign"
                />
                :
                <Icon style={{ fontSize: 20 }}
                  onPress={() => this._onDone()}
                  name="check"
                  color="black"
                  type="AntDesign"
                />
              }

            </View>

          </View>
        </View>
      </View>

    );
  };
  _renderItem = ({ item }) => {
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

  // _renderNextButton = () => {
  //   return (
  //     <View style={styles.buttonCircle}>
  //       <Icon name="arrow-forward" type="" color="#000"
  //         size={24}></Icon>
  //     </View>
  //   );
  // };

  // _renderDoneButton = () => {
  //   return (
  //     <View style={styles.buttonCircle}>
  //       <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
  //     </View>
  //   );
  // };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <ImageBackground source={require('../../assets/Intro/background.png')} style={styles.image}>
          <AppIntroSlider
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            data={data}
            ref={(ref) => this._slider = ref}
            renderPagination={this.renderPagination}
            onSlideChange={(index) => {
              this.state.currentSlide = index
              if (index == 0) {
                this.state.dotsArray.find((element) => {
                  if (element.isActive == true) {
                    console.log(element)
                    element.isActive = false
                  }
                });
                this.state.dotsArray[0].isActive = true

              }
              if (index == 1) {
                this.state.dotsArray.find((element) => {
                  if (element.isActive == true) {
                    console.log(element)
                    element.isActive = false
                  }
                });
                this.state.dotsArray[index].isActive = true
              }
              if (index == 2) {
                this.state.dotsArray.find((element) => {
                  if (element.isActive == true) {
                    console.log(element)
                    element.isActive = false
                  }
                });
                this.state.dotsArray[index].isActive = true
              }
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default withAuth(Intro);

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
    //    color: '#000',
    fontFamily: FONTFAMILY.medium,
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 16,
    lineHeight: height(3.5)
  },
  title: {
    fontSize: 22,
    fontFamily: FONTFAMILY.extraBold,
    //  flex:1,
    // color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'

  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#ffbd59',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20
  },
  introContainer: {
    borderRadius: 15,
    marginHorizontal: '5%',
    height: height(50),
    marginTop: '50%',
    //     backgroundColor:'yellow',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: '50%',
    borderRadius: 25,
    justifyContent: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 10,
    right: 16,
    justifyContent: 'center',
    //   backgroundColor:'#000'
  },
  paginationDots: {
    height: 20,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //  backgroundColor:'#fff'
  },
  dot: {
    width: 21,
    height: 50,
    borderRadius: 5,
    // marginHorizontal: 4,
    flexDirection: 'row',
    //  backgroundColor:'pink'
  },
  dotStyle: {
    backgroundColor: '#FFFFFFA6',
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 15,
    marginBottom: 3
  },
  activedotStyle: {
    backgroundColor: '#fff',
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 15,
    marginBottom: 3
  }
});

