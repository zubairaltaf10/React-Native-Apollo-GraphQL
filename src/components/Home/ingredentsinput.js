import React from "react";
import { View, Text, Image, StyleSheet, Platform, TouchableWithoutFeedback, Button, Keyboard, KeyboardAvoidingView } from "react-native";
import { width, height } from "react-native-dimension";
import { Input, Toast } from "native-base";
import { withAuth } from "../../store/hoc/withAuth";
import {
  Icon,
} from "native-base";
import PrimaryButton from '../Button/PrimaryButton';
import PrimaryButton2 from '../Button/PrimaryButton2';
import COLORS from '../../Theme/Colors';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import { useQuery } from "apollo-client";

class InGredentsInput extends React.Component {

  constructor(props) {
    super(props);
  }
  state = {
    clicked: false,
    bottomHeight: 0,
    ingredient: ""
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    this.setState({ bottomHeight: e.endCoordinates.height - 500 })
  }

  _keyboardDidHide() {
    this.setState({ bottomHeight: 0 })
  }

  onsearchIngredients = (ingredient) => {
    this.setState({ ingredient: ingredient })
    if (ingredient.length > 3) {

    }
  }
  onsearchIngredient = ( type ) =>{
    const { loading, error, data } = useQuery(getingedents, {
      variables: { type : type},
    }); 
   // if (loading) return null; 
   // if (error) return `Error! ${error}​​​​​`;
    console.log(error) 
    return data
  }



render() {
  console.log(this.props.data)
  return (
    // <View style={{ flex: 1 }} behavior="padding">
    //    <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>My ingredients</Text>
    // </View>
    <View style={{ flex: 1 }} behavior="padding">
      <View style={{ paddingBottom: 20, backgroundColor: COLORS.primary, flexDirection: 'row' }}>
        <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
          <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10 }}></Icon>
        </View>
        <View style={{ flex: 0.8 }}>
          <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>My ingredients</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: height(5), marginLeft: 17, height: height(9) }}>
          <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 14, color: '#868CA9' }}>Select at least 3 ingredients</Text>
          <View style={styles.search}>
            <Icon style={{ fontSize: 22, flex: 0.1, alignSelf: 'center', color: COLORS.primary }}
              name="search"
              type="EvilIcons"
            />
            <Input style={{ alignSelf: 'center', color: '#868CA9', marginTop: height(1), fontFamily: FONTFAMILY.regular, fontSize: 14, alignSelf: 'center' }}
              placeholder="Search Ingredients"
              onChangeText={val => this.onsearchIngredient(val)}
              // value={this.state.type}
              maxLength={16}>
            </Input>
          </View>
        </View>
        <View style={{ marginTop: height(5) }}>
          <View style={{ marginHorizontal: width(5), borderRadius: 12, borderColor: '#rgba(9, 56, 149, 0.1)', borderWidth: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', }}>
              <Image style={{ height: 24, marginTop: 13, width: 15, marginLeft: 23 }} source={require('../../assets/Ingredients/dairy.png')}></Image>
              <Text style={{ marginTop: 15, marginLeft: 12, fontSize: 14, fontFamily: FONTFAMILY.regular, color: '#868CA9' }}>Dairy</Text>
              <Text style={{ marginTop: 17, marginLeft: 12, fontSize: 12, fontFamily: FONTFAMILY.regular, color: '#868CA9' }}>1/20 Selected</Text>
            </View>
            <View style={{ borderWidth: 0.6, borderColor: '#rgba(9, 56, 149, 0.1)', marginTop: 13 }}>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', minHeight: 50, paddingBottom: 10 }}>
              <View style={this.state.clicked ? styles.tagsClicked : styles.tags}>
                <Text style={this.state.clicked ? styles.tagstextClicked : styles.tagstext}
                  onPress={() => {
                    this.setState({ clicked: true })
                  }}>Milk</Text>
              </View>
              <View style={[styles.tagsClicked]}>
                <Text style={styles.tagstextClicked}>Greek Yogurt</Text>
              </View>
              <View style={[styles.tags]}>
                <Text style={styles.tagstext}>Whey</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', position: 'absolute', left: 0, right: 0, bottom: this.state.bottomHeight, height: '13%', backgroundColor: 'white', borderRadius: 10 }}>
        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: '#28292F', height: 55, width: 55, borderRadius: 40 }}>
            <View style={{ height: 20, width: 20, backgroundColor: COLORS.primary, alignSelf: 'flex-end', borderRadius: 40, left: 2 }}>
              <Text style={{ color: 'white', alignSelf: 'center', fontSize: 12, fontFamily: FONTFAMILY.medium }}>2</Text>
            </View>
            <Image style={{ height: 25, width: 16, alignSelf: 'center', bottom: 3 }} source={require('../../assets/Ingredients/list.png')}></Image>
          </View>
        </View>
        <View style={{ flex: 0.7, justifyContent: 'center' }}>
          <PrimaryButton
            title="SEARCH RECIPES"
            onPress={() => this.props.navigation.navigate('SearchRecipes')}
            marginTop={height(40)}
          // loading={this.state.loading}
          />
        </View>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '85%',
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#rgba(9, 56, 149, 0.1)',
    borderRadius: 12,
    height: 50,
    color: '#868CA9',
    marginTop: 15,
    fontSize: 13,
    paddingBottom: 5,
    fontFamily: FONTFAMILY.regular,
    paddingLeft: 10,
    marginLeft: 14
  },
  tags: {
    marginTop: 14,
    color: "#ffffff",
    backgroundColor: "#F4F4F8",
    //  paddingHorizontal: 6,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 27,
    alignSelf: 'flex-start',
    // width: width(15),
    alignItems: "center",
    //  backgroundColor: 'black',
    marginLeft: 10
  },
  tagsClicked: {
    marginTop: 14,
    color: "#ffffff",
    backgroundColor: COLORS.primary,
    //  paddingHorizontal: 6,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 27,
    alignSelf: 'flex-start',
    // width: width(15),
    alignItems: "center",
    //  backgroundColor: 'black',
    marginLeft: 10,
  },
  tagstext: {
    fontSize: 14,
    fontFamily: FONTFAMILY.regular,
    color: '#9E9E9E',
    alignSelf: 'flex-start'
  },
  tagstextClicked: {
    fontSize: 14,
    fontFamily: FONTFAMILY.regular,
    color: '#fff',
    alignSelf: 'flex-start'
  }

})
const GetIngredients = gql`
query ingredients($type: String!){
  ingredients(type: $type)
  {
    results {
      name,
      id
    }
  }
}
`;
export default InGredentsInput;

//const InGredentsInputTab = graphql(mutation)(InGredentsInput);
//export default withAuth(InGredentsInputTab);
