import React from "react";
import { View, Text, Image, StyleSheet, Platform, Modal, StatusBar, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView } from "react-native";
import { width, height } from "react-native-dimension";
import { Input, Toast } from "native-base";
import {
  Icon,
  Spinner
} from "native-base";
import { Metrics } from '../../Theme';
import PrimaryButton from '../Button/PrimaryButton';
import PrimaryButton2 from '../Button/PrimaryButton2';
import COLORS from '../../Theme/Colors';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { NETWORK_INTERFACE, SANDBOX_BRAINTREE } from '../../config';
import MultiSelect from "react-native-multiple-select";
import ingredientlist from './ingredientslist.json'
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import { _ } from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import RBSheet from "react-native-raw-bottom-sheet";

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
    loading: false,
    limit: 0,
    checkedItems: [],
    checkedItemsLength: 0,
    showSelected: false,
    viewloginmodel: false,
    refresh: true,
    user:{},
    title:"Search Recipes"
  }

  async componentDidMount() {
    await this.getRecipes()
    this._unsubscribe = this.props.navigation.addListener("didFocus", async () => {
      if (this.state.refresh){
        this.clearAll()
        let user = await AsyncStorage.getItem('user');
        if (user) {
          user = JSON.parse(user).user;
          this.setState({user})
          this.setState({ limit: parseInt(user.user_subscription.subscription.ingredient_limit) })
        } else {
          this.setState({ limit: 3 })
          this.setState({user:null})
        }
        
      }
    });
    // this.setState({ ingredientlist: ingredientlist })
  }

  getRecipes = async () => {
    this.setState({ loading: true })
    client.query({
      query: getCacheIngredients,
      variables: {
        name: ""
      }
    })
      .then(async (data) => {
        this.setState({ loading: false })
        
        const resultsCount = _(data.data.cacheIngredients.data).groupBy('aisle').map((ingredients, aisle) => ({
          aisle: aisle ? aisle : "Others",
          ingredients,
          total: ingredients.length
        })).value()
        this.setState({ ingredientlist: resultsCount })
        let user = await AsyncStorage.getItem('user');
        if (user) {
          user = JSON.parse(user).user;
          this.setState({ limit: parseInt(user.user_subscription.subscription.ingredient_limit) })
       
        } else {
          this.setState({ limit: 3 })
        }
      })
      .catch((err) => {
        this.setState({ loading: false })
        console.log(err)
      })
  }

  _keyboardDidShow(e) {
    this.setState({ bottomHeight: e.endCoordinates.height - 500 })
  }

  _keyboardDidHide() {
    this.setState({ bottomHeight: 0 })
  }
  onrequestViewloginModelclose = () => {
    this.setState({ viewloginmodel: false })
  }

  onsearchIngredients = async (ingredient) => {
   
    client.query({
      query: GetIngredients,
      variables: {
        type: ingredient
      }
    })
      .then(async (data) => {
        await this.setState({ searchResults: data.data.ingredientAutoCompleteSearch })
       
      })
      .catch((err) => {
        console.log(err)
      })
    //  let a = [{name:"Milk"},{name:"Butter"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"},{name:"water"}]
    //  this.setState({searchResults:a})

    //  }
    return this.state.searchResults
  }

  searchRecipes = (from) => {
    
    let checkedItems = []

    this.state.ingredientlist.filter(ingredient => {
      console.log("from search", ingredient)
      ingredient.ingredients.some(item => {
        if (item.clicked == true) {
          checkedItems.push(item)
          this.setState({ checkedItems: checkedItems })
        }
      })
    })
    if (checkedItems.length > 0) {
      if (from == 'button') {
        this.props.navigation.navigate('SearchRecipes', {
          clickeditems: checkedItems,
          updateData: this.updateRecipes
        })
      }
      else {
        if (checkedItems.length > 0) {
          this.RBSheet.open()
        }
      }
    }
  }

  updateRecipes = checkedItems => {
    this.setState({ refresh: false })
    this.setState({title:"Update Recipes"})
    let items = [];
    if (checkedItems.length == 0) {
      this.clearAll()
      return
    }
    else {
    if (this.state.checkedItems.length != checkedItems.length) {
      this.state.checkedItems.filter(ingredient => {
        if (checkedItems.findIndex(x=>x.name == ingredient.name)< 0){
          let data = { name: ""}
          data.name = ingredient.name
          items.push(data)
        }
      })
      this.setState({checkedItemsLength:this.state.checkedItems.length - items.length})
      items.forEach(x => {
        this.onRemove(x,true)
      })
    }
    }
  };

  handleSelectItem = (item, index) => {
    this.aisleAdd(item)
    this.checkItem(item, true)
    
  }
  ingredientAdd = (itemm) => {

    let ingredientlist = [...this.state.ingredientlist]
    ingredientlist.filter(ingredient => {
      if (ingredient.aisle == itemm.aisle) {
        let obj = { name: "" }
        //   ingredient.ingredients.some(item => {
        if (ingredient.ingredients.indexOf(itemm.name) < 0)
          obj.name = itemm.name
        ingredient.ingredients.push(obj)
      }
    }

    )
    this.setState({ ingredientlist })
  }

  aisleAdd = (item) => {
 
    let ingredientlist = [...this.state.ingredientlist]
    let obj = { aisle: "" }
    
    const a = _.filter(ingredientlist, ing => ing.aisle == item.aisle);
    if (a.length == 0) {
      obj.aisle = item.aisle
      ingredientlist.unshift(obj)
    }
    ingredientlist.filter(ingredient => {
     
      if (ingredient.aisle == item.aisle) {
        let obj = { name: "" }
        if (ingredient.ingredients != undefined) {
          if (ingredient.ingredients.filter(x => x.name == item.name).length <= 0) {
            obj.name = item.name
            ingredient.ingredients.push(obj)
          }
        }
        else {
          let arr = []
          let obj = { name: "" }
          obj.name = item.name
          arr.push(obj)
          ingredient['ingredients'] = arr
        }
      }

    }
    )
    this.setState({ ingredientlist })
  }
  onDropdownClose = () => {
  }


  checkItem = (name, fromSearch) => {
    let ingredientlist = [...this.state.ingredientlist]
    // if (this.state.checkedItemsLength == this.state.limit) {
    //   this.setState({ viewloginmodel: true })
    //   return;
    // }
    if (fromSearch == true) {
      ingredientlist.filter(ingredient => {
        ingredient.ingredients.some(item => {
          if (item.name == name.name) {
            if (parseInt(this.state.limit) >= this.state.checkedItemsLength + 1) {
              item.clicked = true
            }
            if (item.clicked == true) {
              ingredient.checked ? ingredient.checked = ingredient.checked + 1 : ingredient.checked = 1
              this.setState({ checkedItemsLength: item.clicked == false ? this.state.checkedItemsLength - 1 : this.state.checkedItemsLength + 1 })
            }
            else {
              ingredient.checked = ingredient.checked - 1
              this.setState({ checkedItemsLength: item.clicked == false ? this.state.checkedItemsLength - 1 : this.state.checkedItemsLength + 1 })
            }
          }
        })
      })

    }
    else {
     // console.log(JSON.stringify(name.name) + "name")
      ingredientlist.filter(ingredient =>
        ingredient.ingredients.some(item => {
          if (item.name == name.name) {

            // if (this.state.checkedItemsLength + 1 > parseInt(this.state.limit)){
            //   item.clicked = false
            //   this.setState({ checkedItemsLength: item.clicked == false ? this.state.checkedItemsLength - 1 : this.state.checkedItemsLength + 1 })
            // }
            // if (item.clicked == true){
            //   ingredient.checked ? ingredient.checked = ingredient.checked + 1 : ingredient.checked = 1
            // }
            // else {
            //   ingredient.checked = ingredient.checked -1 
            // }
            // this.setState({ checkedItemsLength: item.clicked == false ? this.state.checkedItemsLength - 1 : this.state.checkedItemsLength + 1 })
            if (item.clicked == true) {
              item.clicked = false
              this.setState({ checkedItemsLength: this.state.checkedItemsLength == 0 ? 0 : this.state.checkedItemsLength - 1 })
              ingredient.checked ? ingredient.checked = ingredient.checked - 1 : 0
            }
            else {
              if(this.state.checkedItemsLength == this.state.limit) {
                this.setState({ viewloginmodel: true })
                return;
              }
              if (parseInt(this.state.limit) >= this.state.checkedItemsLength + 1) {
                ingredient.checked ? ingredient.checked = ingredient.checked + 1 : ingredient.checked = 1
                item.clicked = true
                this.setState({ checkedItemsLength: this.state.checkedItemsLength + 1 })
              }
            }
          }
        }))
    }
    this.setState({ ingredientlist })
  }
  
  

  onRemove = (itemm,fromUpdate) => {
    
    let ingredientlist = [...this.state.ingredientlist]
    let checkedItems = [...this.state.checkedItems]
    ingredientlist.filter(ingredient =>
      ingredient.ingredients.some(item => {
        if (item.name == itemm.name) {
          item.clicked == true ? item.clicked = false : item.clicked = true
          //  this.setState({ checkedItemsLength: item.clicked == false ? this.state.checkedItemsLength - 1 : this.state.checkedItemsLength + 1 })
          if (item.clicked == false) {
            ingredient.checked ? ingredient.checked = ingredient.checked - 1 : 0
           if (fromUpdate != true){
              this.setState({ checkedItemsLength: this.state.checkedItemsLength == 0 ? 0 : this.state.checkedItemsLength - 1 })
           }
          }
          else {
            this.setState({ checkedItemsLength: this.state.checkedItemsLength + 1 })
          }
        }

      }))

    checkedItems = checkedItems.filter(item => item.name != itemm.name);
    if (checkedItems.length == 0) {
      this.setState({ showSelected: false })
    }
    this.setState({ checkedItems })
    this.setState({ ingredientlist })

  }

  clearAll = () => {
    this.setState({ checkedItemsLength: 0 })
    let ingredientlist = [...this.state.ingredientlist]
    let checkedItems = [...this.state.checkedItems]
    ingredientlist.filter(ingredient =>
      ingredient.ingredients.some(item => {
        if (item.clicked = true) {
          item.clicked = false
          ingredient.checked = 0
          //  this.setState({ checkedItemsLength: item.clicked == false ? this.state.checkedItemsLength - 1 : this.state.checkedItemsLength + 1 })
        }
      }))

    checkedItems = checkedItems.filter(item => item.clicked == true);
    if (checkedItems.length == 0) {
      this.setState({ showSelected: false })
    }
    //   this.setState({checkedItems})
    this.setState({ checkedItems })
    this.setState({ ingredientlist })
    this.RBSheet.close()
  }
  render() {
    
    const { selectedIngredients } = this.state;
    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <Modal
          animationType="fade"
          transparent={true}

          visible={this.state.viewloginmodel}
          onRequestClose={this.onrequestViewloginModelclose}>
          <View style={styles.overlay} onTouchEnd={this.onrequestViewloginModelclose} />
          <View onTouchEnd={this.onrequestViewloginModelclose}
            style={[
              styles.modelContainer,
              {
                marginTop: Metrics.screenHeight / 2.5,
              },
            ]}>
            <Text style={styles.modeltext} >
              To add an other Ingredient, you will need to subscribe a plan
        </Text>


            <PrimaryButton
              title="           VIEW PLANS            "
              onPress={() => this._onSaveUserSubscription()}
              marginTop={height(5)}
              //loading={this.state.loading}
              onPress={() => { this.props.navigation.navigate('ManagePackge') }}
            />


          </View>
        </Modal>
        <View style={{ flex: 0.9 }}>

          <View style={{ paddingTop: 20, paddingBottom: 20, backgroundColor: COLORS.primary, flexDirection: 'row' }}>
            <View style={{ flex: 0.1, marginTop: height(5), marginLeft: 10 }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10, fontSize: 18 }}></Icon>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.8 }}>
              <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>My ingredients</Text>
            </View>
          </View>
          <View>
            <View style={{ marginTop: height(3), marginLeft: 17, zIndex: 1 }}>
              <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 14, color: '#868CA9' }}>{this.state.limit > 6 ? "You can select as many as you want" : 'Select at least ' + this.state.limit + ' ingredients'}</Text>

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
                onChangeText={(val) => this.onsearchIngredients(val)}
                fetchData={(val) => this.onsearchIngredients(val)}
                minimumCharactersCount={0}
                highlightText
                valueExtractor={item => item.name}
                // data={this.state.searchResults}
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
              //  valueExtractor={item => item.name}
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
              <ScrollView keyboardShouldPersistTaps="always" style={{ flexGrow: 2, marginBottom: this.state.showSelected ? '75%' : '56%', marginTop: 10 }}>
                {this.state.ingredientlist.map((item) =>
                  <View style={{ marginTop: height(2) }}>
                    <View style={{ marginHorizontal: width(5), borderRadius: 12, borderColor: '#rgba(9, 56, 149, 0.1)', borderWidth: 1, backgroundColor: 'white' }}>
                      <View style={{ flexDirection: 'row', flexGrow: 1, flexWrap: 'wrap' }}>
                        <Image style={{ height: 24, marginTop: 13, width: '5%', marginLeft: 15 }} source={require('../../assets/Ingredients/dairy.png')}></Image>
                        <Text style={{ marginTop: 15, marginLeft: 12, width: '63%', fontSize: 12, flexShrink: 0.2, fontFamily: FONTFAMILY.regular, color: '#868CA9' }}>{item.aisle}</Text>
                        <Text style={{ marginTop: 17, width: '20%', fontSize: 10, fontFamily: FONTFAMILY.regular, color: '#868CA9' }}>{!item.checked ? 0 : item.checked}/{item.total} Selected</Text>
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
                        {/* <View style={[styles.tagsClicked]}>
                <Text style={styles.tagstextClicked}>Greek Yogurt</Text>
              </View>
              <View style={[styles.tags]}>
                <Text style={styles.tagstext}>Whey</Text>
              </View> */}
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
              <View style={{ backgroundColor: '#28292F', height: 50, width: 50, borderRadius: 40 }}>
                <View style={{ height: 20, width: 20, backgroundColor: COLORS.primary, alignSelf: 'flex-end', borderRadius: 40, left: 2 }}>
                  <Text style={{ color: 'white', alignSelf: 'center', fontSize: 12, fontFamily: FONTFAMILY.medium }}>{this.state.checkedItemsLength}</Text>
                </View>
                <TouchableOpacity onPress={() => this.searchRecipes('image')}>
                  <Image style={{ height: 25, width: 16, alignSelf: 'center', bottom: 5 }} source={require('../../assets/Ingredients/list.png')}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 0.8, justifyContent: 'center' }}>
              <PrimaryButton
                title={this.state.title}
                onPress={() => this.searchRecipes('button')}
                marginTop={height(40)}
                checkeditems={this.state.checkedItemsLength > 0 ? true : false}
              // loading={this.state.loading}
              />
            </View>
          </View>
          
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={180}
            openDuration={400}
            customStyles={{
              container: {
                //    justifyContent: "center",
                //   alignItems: "center",
               // flex:0.1,
             //  alignSelf:'flex-start',
              //  flexWrap:'wrap',
                borderTopEndRadius: 15
              }
            }}
          >
            <ScrollView>
          <View style={{ left: 0, right: 0,marginTop:'3%',bottom: this.state.bottomHeight, backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', width: '100%', marginHorizontal: 15 }}>
              <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 14, color: '#474956', alignSelf: 'center', width: '60%' }}>Selected Ingredients</Text>
              <View style={styles.bottombutton}>
                <Text style={styles.bottombuttonText}
                  onPress={() => {
                    this.clearAll()
                    //  this.setState({ clicked: true })
                  }}>CLEAR ALL</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: '6%',marginTop:'2%' }}>
              {this.state.checkedItems.map((x) =>
                <View style={styles.bottomtags}>
                  <Text style={styles.tagstext}
                  >{x.name}</Text>
                  <TouchableOpacity style={{ fontSize: 14, paddingLeft: 12, color: COLORS.primary }} onPress={() => this.onRemove(x,false)}>
                    <Icon name="circle-with-cross" type="Entypo" style={{ fontSize: 14, paddingLeft: 12, color: COLORS.primary }}></Icon>
                  </TouchableOpacity>
                </View>
              )}
            </View>

          </View>
          </ScrollView>
          </RBSheet>
        
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
    marginLeft: '5%',
 //   paddingRight: '5%',
    width: "85%",
    maxHeight: 200,
    backgroundColor:'white'
    // justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 10,
    top: 10,
    fontSize: 22,
    // flex: 0.1, 
    alignSelf: 'center',
    color: COLORS.primary
  },
  bottombutton: {
    color: "#ffffff",
    backgroundColor: COLORS.primary,
    //  paddingHorizontal: 6,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 27,
    alignSelf: 'center',
    // width: width(15),
    alignItems: "center",
    //  backgroundColor: 'black',
    marginLeft: 15,
    width: '26%'
  },

  bottombuttonText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.bold,
    color: '#28292F',
    alignSelf: 'center'
  },
  bottomtags: {
    marginTop: 2,
    flexDirection: 'row',
    color: "#ffffff",
    backgroundColor: "#F4F4F8",
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginBottom: 10,
    flexWrap: 'wrap',
    // paddingHorizontal: 15,
    //  width:'17%',
    borderRadius: 27,
    alignSelf: 'flex-start',
    // width: width(15),
    alignItems: "center",
    //  backgroundColor: 'black',
    marginLeft: 10
  },

  overlay: {
    backgroundColor: '#f2f2f4',
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  modelHeading: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.bold,
    fontSize: 18,
  },
  modeltext: {
    marginTop: 20,
    color: '#868CA9',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FONTFAMILY.regular,
    marginHorizontal: '10%'
  },
  modelSubheading: {
    marginTop: 10,
    color: 'rgba(106, 106, 106, 1)',
    textAlign: 'center',
    fontSize: 13,
    paddingHorizontal: 20,
    fontFamily: FONTFAMILY.medium,
  },
  modelContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: Metrics.screenHeight / 2.8,
    padding: 20,
    elevation: 6,
    borderRadius: 7,
  },


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

