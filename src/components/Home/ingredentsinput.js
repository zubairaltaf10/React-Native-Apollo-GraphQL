import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, TouchableWithoutFeedback, ScrollView, Keyboard, KeyboardAvoidingView } from "react-native";
import { width, height } from "react-native-dimension";
import { Input, Toast } from "native-base";
import { withAuth } from "../../store/hoc/withAuth";
import {
  Icon,
  Spinner
} from "native-base";
import PrimaryButton from '../Button/PrimaryButton';
import PrimaryButton2 from '../Button/PrimaryButton2';
import COLORS from '../../Theme/Colors';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { NETWORK_INTERFACE } from '../../config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import MultiSelect from "react-native-multiple-select";
import ingredientlist from './ingredientslist.json'
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import {_} from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

const client = new ApolloClient({
  link: new HttpLink({ uri: NETWORK_INTERFACE }),
  cache: new InMemoryCache()
})
class InGredentsInput extends React.Component {

  constructor(props) {
    super(props);
  }
  state = {
    clicked: false,
    bottomHeight: 0,
    ingredient: "",
    searchResults: [],
    // searchResults:[], 
    selectedIngredients: [],
    ingredientlist: [],
    selectText: 'Search Ingredients',
    clickedItems: [],
    loading:false,
    limit : 0
  }
  componentDidMount() {
    this.setState({loading:true})
    client.query({
      query: getCacheIngredients,
      variables: {
        name: ""
      }
    })
      .then(async (data) => {
        this.setState({loading:false})
       // await this.setState({ searchResults: data.data.ingredientAutoCompleteSearch })
        console.log(data.data.cacheIngredients.data)
      //  this.setState({ selectedIngredients: data.data.cacheIngredients.data })
        const resultsCount = _(data.data.cacheIngredients.data).groupBy('aisle').map((ingredients, aisle) => ({
          aisle:aisle ? aisle : "Others",
          ingredients
      })).value()
      this.setState({ingredientlist:resultsCount})
      let user = await AsyncStorage.getItem('user');
        if (user) {
          user = JSON.parse(user).user;
          this.setState({limit:user.user_subscription.subscription.ingredient_limit})
          console.log(this.state.limit)
        }
      })
      .catch((err) => {
        this.setState({loading:false})
        console.log(err)
      })
  // this.setState({ ingredientlist: ingredientlist })
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

  onsearchIngredients = async (ingredient) => {
    console.log(ingredient + "here")
    client.query({
      query: GetIngredients,
      variables: {
        type: ingredient
      }
    })
      .then(async (data) => {
        await this.setState({ searchResults: data.data.ingredientAutoCompleteSearch })
        console.log(data.data.ingredientAutoCompleteSearch)
      })
      .catch((err) => {
        console.log(err)
      })
    //  let a = [{name:"Milk"},{name:"Butter"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"}]
    //  this.setState({searchResults:a})

    //  }
    return this.state.searchResults
  }

  searchRecipes = ()=>{
    let checkedItems =[]
    
    this.state.ingredientlist.filter(ingredient =>{
      console.log("from search",ingredient)
      ingredient.ingredients.some(item => {
        if (item.clicked == true){
          checkedItems.push(item)
        }
      })
    })
    this.props.navigation.navigate('SearchRecipes',{
      clickeditems:checkedItems
    })
  }

  handleSelectItem = (item, index) => {
    this.aisleAdd(item)
   // this.ingredientAdd(item)
    this.checkItem(item, true)
    //  console.log(JSON.stringify(item) + "ITEMMMM");
  }
  ingredientAdd = (itemm) => {
    let ingredientlist = [...this.state.ingredientlist]
    //  console.log("from search", name.name)
      ingredientlist.filter(ingredient =>{
        if(ingredient.aisle == itemm.aisle){
          let obj = {name:""}
         //   ingredient.ingredients.some(item => {
            if (ingredient.ingredients.indexOf(itemm.name) < 0)
            obj.name = itemm.name
            ingredient.ingredients.push(obj)
            console.log(itemm.name,"yahan")
        }
      }
      
      )
      this.setState({ingredientlist})
  }

  aisleAdd =(item)=>{
    console.log(item.aisle)
    let ingredientlist = [...this.state.ingredientlist]
    let obj = {aisle:"Gluten Free"}
  //  if(ingredientlist.filter(ingredient=>ingredient.aisle == item.aisle).length == 0){
  //    console.log("andar")
  //    obj.aisle = item.aisle
  //    console.log("obj",obj)
  //    ingredientlist.push(obj)
  //    this.setState(ingredientlist)
  //  }
  const a = _.filter(ingredientlist, ing => ing.aisle == item.aisle);
  if(a.length == 0){
    ingredientlist.unshift(obj)
  }
    ingredientlist.filter(ingredient =>{
    //  console.log(ingredient.aisle +"Sa   "+item.aisle)
      if(ingredient.aisle == item.aisle){
        console.log("tryyy",ingredient)
        let obj = {name:""}
        if (ingredient.ingredients != undefined){
       //   ingredient.ingredients.some(item => {
        if (ingredient.ingredients.indexOf(item.name) < 0)
          obj.name = item.name
          ingredient.ingredients.push(obj)
        }
        else {
          let arr = []
          let obj = {name:""}
          obj.name = item.name
          arr.push(obj)
         // Object.assign(ingredient, {ingredients});
         ingredient['ingredients'] = arr 
//         ingredient.ingredients = arr
          console.log(ingredientlist,"dsadadasdddddddddddddddd")
     //     this.setState({ingredientlist:Object.assign(obj,[0, ...this.state.statusData]})
        }
      // else {
      //   obj.name = item.name
      //   ingredient['ingredients'] = obj
      // }
    }
   
    } 
    )
    this.setState({ingredientlist})  
    console.log(ingredientlist,"yahan")
  

  // console.log(ingredientlist.filter(ingredient=>ingredient.aisle == item.aisle).length == 0 )
   // console.log(  ingredientlist)
  }
  onDropdownClose = () => {
    console.log('closed')
  }

  checkItem = (name, fromSearch) => {
    let ingredientlist = [...this.state.ingredientlist]
    if (fromSearch == true) {
      ingredientlist.filter(ingredient =>{
        console.log("from search",ingredient)
        ingredient.ingredients.some(item => {
          if (item.name == name.name) {
            item.clicked = true
            console.log("dasdasd" + item)
          }
        })})
    
  }
    else {
      console.log(JSON.stringify(name.name) + "name")
      ingredientlist.filter(ingredient =>
        ingredient.ingredients.some(item => {
          if (item.name == name.name) {
            item.clicked == true ? item.clicked = false : item.clicked = true
            //  console.log(item)
          }
        }))
    }
    this.setState({ ingredientlist })
    //console.log(JSON.stringify(ingredientlist) + "list=>>>>>>>>>>>>>>>>>>>>>>>")
  }


  render() {
    // console.log(this.props.data.results ? this.props.data.results : null)
    const { selectedIngredients } = this.state;
    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

    return (
      // <View style={{ flex: 1 }} behavior="padding">
      //    <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>My ingredients</Text>
      // </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.9 }}>

            <View style={{ paddingBottom: 20, backgroundColor: COLORS.primary, flexDirection: 'row' }}>
              <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10 ,fontSize:18}}></Icon>
                        </TouchableOpacity>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>My ingredients</Text>
              </View>
            </View>
            <View>
              <View style={{ marginTop: height(3), marginLeft: 17, zIndex: 1 }}>
                <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 14, color: '#868CA9' }}>Select at least {this.state.limit} ingredients</Text>
               
                <Autocomplete
                  //  key={shortid.generate()}
                  //   scrollToInput={ev => scrollToInput(ev)}
                  //ref={componentRef}
                  handleSelectItem={this.handleSelectItem}
                  //       onDropdownClose={() => this.onDropdownClose()}
                  // onDropdownShow={() => onDropdownShow()}
                  renderIcon={() => (
                    <Icon style={styles.plus}
                      name="search"
                      type="EvilIcons"
                    />)}
                  placeholder={'Search Ingredients'}
                  //  fetchDataUrl={apiUrl}
                //  onChangeText={(val) => this.onsearchIngredients(val)}
                  fetchData={(val) => this.onsearchIngredients(val)}
                  minimumCharactersCount={0}
                  highlightText
                  valueExtractor={item => item.name}
                  //  rightContent={true}
                  // rightTextExtractor={item => item.properties}
                  noDataText={'No ingredient found'}
                  inputContainerStyle={styles.inputContainer}
                  //  placeholderColor={'#868CA9'}
                  spinnerStyle={{ marginLeft: '12%' }}
                  inputStyle={{ borderRadius: 5, borderWidth: 0.5, borderColor: '#868CA9', fontFamily: FONTFAMILY.regular, fontSize: 14, paddingTop: 13, height: 44 }}
                  pickerStyle={{ width: '74%', marginTop: 4, borderColor: '#868CA9', borderWidth: 0.1 }}
                  noDataTextStyle={{ fontFamily: FONTFAMILY.regular, fontSize: 12, marginTop: 10 }}
                  //            separatorStyle={{backgroundcolor:'pink'}}
                  listFooterStyle={{ height: 0.1, marginTop: 3 }}
                  containerStyle={{ fontSize: 20 }}
                //  overlayStyle={{fontSize:20}}
                // containerStyle={{borderColor:'pink',borderRadius:10}}
                />

                {/* <View style={{backgroundColor:'pink'}}> */}
                {/* <Icon style={{ fontSize: 22, flex: 0.1, alignSelf: 'center', color: COLORS.primary }}
              name="search"
              type="EvilIcons"
            /> */}
                {/* <Input style={{ alignSelf: 'center', color: '#868CA9', marginTop: height(1), fontFamily: FONTFAMILY.regular, fontSize: 14, alignSelf: 'center' }}
              placeholder="Search Ingredients"
              onChangeText={val => this.onsearchIngredients(val)}
              // value={this.state.type}
              maxLength={16}>
            </Input> */}
                {/* <MultiSelect
             hideTags={false}
              items={this.state.searchResults}
              uniqueKey="name"
            single={true}
              ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={(val)=>this.onsearchIngredients(val)}
              selectedItems={selectedIngredients}
              selectText={this.state.selectText}
              searchInputPlaceholderText="Search Ingredients"
              onChangeInput={ (text)=> this.onsearchIngredients(text)}
           //   styleInputGroup={{ display: "none" }}
             // onAddItem={(val)=>this.onAddItem()}
              
            //  altFontFamily="ProximaNova-Light"
           //   tagRemoveIconColor="#CCC"
           //   tagBorderColor="#CCC"
           //   tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
             // submitButtonColor="#CCC"
             // submitButtonText="Submit"
             styleMainWrapper={{marginRight:15,marginTop:20,backgroundColor:'pink'}}
               hideSubmitButton
               hideDropdown
               /> */}
                {/* </View> */}
              </View>
              {this.state.loading ? 
            <Spinner small color="#FFAA2F" />
           : 
              <ScrollView keyboardShouldPersistTaps="always" style={{ flexGrow: 2, marginBottom: '56%',marginTop:10 }}>
              {this.state.ingredientlist.map((item) =>
                <View style={{ marginTop: height(2) }}>
                  <View style={{ marginHorizontal: width(5), borderRadius: 12, borderColor: '#rgba(9, 56, 149, 0.1)', borderWidth: 1, backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row',flexGrow:1,flexWrap:'wrap'}}>
                      <Image style={{ height: 24, marginTop: 13, width: '5%', marginLeft: 23 }} source={require('../../assets/Ingredients/dairy.png')}></Image>
                      <Text style={{ marginTop: 15, marginLeft: 12,width:'60%', fontSize: 12,flexShrink:0.2, fontFamily: FONTFAMILY.regular, color: '#868CA9' }}>{item.aisle}</Text>
                      <Text style={{ marginTop: 17, width:'20%',fontSize: 10, fontFamily: FONTFAMILY.regular, color: '#868CA9'}}>1/20 Selected</Text>
                    </View>
                    <View style={{ borderWidth: 0.6, borderColor: '#rgba(9, 56, 149, 0.1)', marginTop: 7 }}>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', minHeight: 50, paddingBottom: 10 }}>
                      {item.ingredients?.map((x) =>
                        <View style={x.clicked ? styles.tagsClicked : styles.tags}>
                          <Text style={x.clicked ? styles.tagstextClicked : styles.tagstext}
                            onPress={() => {
                              this.checkItem(x, false)
                              //  this.setState({ clicked: true })
                            }}>{x.name}</Text>
                        </View>
                      )}
                      
                    </View>
                  </View>
                </View>
                
              )}
              </ScrollView>
              }
            </View>

        </View>

        <View style={{ flexDirection: 'row', position: 'absolute', left: 0, right: 0, bottom: this.state.bottomHeight, height: '11%', backgroundColor: 'white', borderRadius: 10 }}>
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
              onPress={() => this.searchRecipes()}
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
    //   width: '85%',
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
    paddingVertical: 3,
    paddingHorizontal: 25,
    borderRadius: 27,
    alignSelf: 'flex-start',
    // width: width(15),
    alignItems: "center",
    //  backgroundColor: 'black',
    marginLeft: 10
  },
  tagsClicked: {
    marginTop: 14,
    textTransform: 'capitalize',
    color: "#ffffff",
    backgroundColor: COLORS.primary,
    //  paddingHorizontal: 6,
    paddingVertical: 3,
    paddingHorizontal: 25,
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
    textTransform: 'capitalize',
    alignSelf: 'flex-start'
  },
  tagstextClicked: {
    fontSize: 14,
    fontFamily: FONTFAMILY.regular,
    color: '#28292F',
    textTransform: 'capitalize',
    alignSelf: 'flex-start'
  },
  autocompletesContainer: {

    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
  },

  inputContainer: {
    display: "flex",
    marginTop: 15,
    // flexShrink: 0,
    // flexGrow: 0,
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "center",
    //  borderBottomWidth: 1,
    //  borderColor: "",
    // paddingVertical: 13,
    paddingLeft: 20,
    paddingRight: 20,
    width: "92%",
    maxHeight: 200,
    // justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 25,
    top: 10,
    fontSize: 22,
    // flex: 0.1, 
    alignSelf: 'center',
    color: COLORS.primary
  }

})
const GetIngredients = gql`
query ingredientAutoCompleteSearch($type: String!){
  ingredientAutoCompleteSearch(type: $type)
  {
      name,
      id,
      aisle
  }
}
`;

const getCacheIngredients = gql`
query cacheIngredients($name: String=""){
  cacheIngredients(name: $name)
 {data 
    {
      name,
      id,
      aisle
    }
} }
`;
export default withApollo(InGredentsInput);

//const InGredentsInputTab = graphql(mutation)(InGredentsInput);
//export default withAuth(InGredentsInputTab);
