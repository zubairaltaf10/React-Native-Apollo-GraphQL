import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet, ActivityIndicator, Platform, TouchableOpacity, Button, Keyboard, KeyboardAvoidingView, Modal } from "react-native";
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
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors } from "react-native/Libraries/NewAppScreen";
import gql from 'graphql-tag';
import { graphql , Mutation } from "react-apollo";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';
import SNACKBAR from '../../Helpers/SNACKBAR';
import { color } from "react-native-reanimated";
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { NETWORK_INTERFACE } from '../../config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link';
import {_} from 'lodash';
// import RBSheet from "react-native-raw-bottom-sheet";
const getToken = async () => {
    let token;
  
    // get the authentication token from local storage if it exists
    let user = await AsyncStorage.getItem("user")
    user = JSON.parse(user)
    if(user != null)
    {
      token = user.access_token
       return token
    }else
    {
      return ""
    }
      
  }
  const token = getToken();
  const  authLink =  setContext((_, { headers } )  =>  {
    console.log('token ' , token)
  return {
    headers: {
      ...headers,
      authorization: token._W  != ""? `Bearer ${token._W}` : "",
    }
  }
  })
  const uploadLink = createUploadLink({ uri: NETWORK_INTERFACE });
  const client = new ApolloClient({
    link: ApolloLink.from([ authLink, uploadLink ]),
    cache : new InMemoryCache(),
  });
  
class SearchRecipes extends React.Component {
    async componentDidMount() {
      let ingregents =[]
      _.forEach(this.props.navigation.getParam('clickeditems'), function(value) {
         ingregents.push(value.name)
      });

        console.log('selected item ' , ingregents)
        this.setState({loading:true})
    client.query({
      query: query,
      variables: {
        ingredients: ingregents
      }
    })
      .then(async (data) => {
        this.setState({loading:false})
        console.log(data.data.recipes)
      
      this.setState({recipes:data.data.recipes})
      this.setState({backup:data.data.recipes})
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
        this.setState({clickedItems:this.props.navigation.getParam('clickeditems')})
        let user = await AsyncStorage.getItem('user');
    if (user) {
      user = JSON.parse(user).user;
      var subcription = user.user_subscription.subscription
      this.setState({ currentsubscription: subcription });
      console.log('user ', user);
      this.setState({ loginuser: user });
      console.log('user subcription found in localstorage', this.state.currentsubscription);
    } else {
     console.log('no user found');
    }
   
  }
    constructor(props) {
        super(props);
    }
    state = {
        loginuser:{},
        currentsubscription:{},
        clickedItems: [],
        loading:false,
        recipes:[],
        backup:[],
        isfav:false
    }

    onAddfav = (recipeId ) => {
       console.log(recipeId)
           // this.setState({loading:true})
           client.mutate({
            mutation: mutation,
            variables: { user_id: this.state.loginuser.id,
                recipe_id: recipeId }
          })
            .then(async (data) => {
                SNACKBAR.simple("Added in favourite") ; 
            })
            .catch((err) => {
             // this.setState({loading:false})
              console.log(err)
            })
            
      };
      async updateupdatelocalstorage(subscription)
      {
        let user = await AsyncStorage.getItem('user');
        console.log(user)
       if (user) {
         user = JSON.parse(user);
         user.user.first_name= this.state.formData.first_name; 
         user.user.last_name= this.state.formData.last_name;
         user.user.bio =  this.state.formData.bio
         user.user.date_of_birth = this.state.date;
        user.user.profile_image = this.state.userimage
         
       }
    
       AsyncStorage.setItem('user', JSON.stringify(user)).then(
        () => {
          
        },
      );
    }

    onTextInput = (value) => {
      
      if (value){
      let recipes = [...this.state.recipes]
      recipes = recipes.filter(x=> x.title.indexOf(value) > -1 )
      if (recipes.length > 0){
      this.setState({recipes})
      }
      }
      else {
        this.setState({recipes:this.state.backup})
      }
     // this.setState({recipes:this.state.recipes.filter(x=>{return x.title.startsWith(value)})})
    }


    onRemove = (itemm) => {
    //  let ingredientlist = [...this.state.ingredientlist]
      let clickedItems = [...this.state.clickedItems]
      clickedItems = clickedItems.filter(item => item.name != itemm.name);
      if (clickedItems.length == 0){
      //  this.setState({showSelected:false})
      }
        //   this.setState({checkedItems})
        this.setState({clickedItems})
       // this.setState({ingredientlist})
  
    }
    render() {
        
        return (
            <View style={{ flex: 1 }}>
                <View style={{ paddingBottom: 20, backgroundColor: COLORS.primary, flexDirection: 'row' }}>
                <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10 ,fontSize:18}}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>Recipes</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: height(4) }}>
                        <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 12, color: '#868CA9', alignSelf: 'center', lineHeight: 24 }}>You can make {this.state.recipes.length} recipes with{'\n'}   the ingredients selected</Text>
                        <View style={styles.search}>
                            <Icon style={{ fontSize: 22, flex: 0.1, alignSelf: 'center', color: COLORS.primary }}
                                name="search"
                                type="EvilIcons"
                            />
                            <Input style={{ alignSelf: 'center', flex: 0.8, color: '#868CA9', marginTop: height(1), fontFamily: FONTFAMILY.regular, fontSize: 14, alignSelf: 'center' }}
                                placeholder="Find Recipes"
                                 onChangeText={val => this.onTextInput(val)}
                                // value={this.state.type}
                                maxLength={16}>
                            </Input>
                            
                        </View>
                    </View>
                    {this.state.loading ? 
            <Spinner small color="#FFAA2F" />
           : 
                    <ScrollView>
                    { this.state.recipes?.map((x) =>
                    
                  
                    <View style={{ flex: 1, marginTop: height(3) }}>
                        <View style={styles.whitebox}>
                        
                        
                            <View style={styles.imagebox}>
                                <ImageBackground source={{uri:x.image}} resizeMode={'cover'} imageStyle={{ borderRadius: 12 }} style={styles.image}>
                                    {/* <View style={{ backgroundColor: '#536f89', height: 32, width: 32, borderRadius: 40, justifyContent: 'center', alignSelf: 'flex-end', margin: 10 }}>
                         
                                        <TouchableOpacity  onPress={() => {this.onAddfav(x.id)}}>
                                        <Icon style={{ fontSize: 18, alignSelf: 'center', color: COLORS.primary }}
                                            name="favorite-border"
                                            type="MaterialIcons" />
                                            </TouchableOpacity>
                                    </View> */}
                                    <View style={{   height: 32, width: 32, borderRadius: 40, justifyContent: 'center', alignSelf: 'flex-end', margin: 10 }}>
                                    <ImageBackground source={require('../../assets/icons/forms/round.png')} resizeMode={'contain'} style={styles.image1}>
                                    <TouchableOpacity  onPress={() => {this.onAddfav(x.id) ; x.fav =true }}>
                                       {x.fav == true  && ( 
                                        <Icon style={{ fontSize: 18,marginTop:7,  alignSelf: 'center', color: COLORS.primary }}
                                            name="favorite"
                                            type="Fontisto" />)} 
                                                {x.fav != true  && (
                                              <Icon style={{ fontSize: 18,marginTop:7,  alignSelf: 'center', color: COLORS.primary }}
                                            name="bookmark"
                                            type="Feather" />
                                                )}
                                       
                                            </TouchableOpacity>
                                            </ImageBackground>
                                    </View>
                                    <View style={{ backgroundColor: '#F4F4F8', opacity: 0.9,  flexDirection:'row', height: 24, paddingHorizontal:5,
                                     borderRadius: 20, justifyContent: 'center', alignSelf: 'flex-start', top:50, margin: 10 }}>
                                    
                                        <Icon style={{ fontSize: 18, alignSelf: 'center', color: COLORS.primary }}
                                            name="favorite"
                                            type="MaterialIcons" />
                                            <Text style={{ fontSize: 12, fontFamily: FONTFAMILY.regular, marginLeft: 5, marginTop: 5 , marginRight:5}}>{x.likes}</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            
                            <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigation.navigate('RecipeDetails')}>
                            <View style={{flex:0.4}}>
                           
                            <Text style={{fontFamily:FONTFAMILY.regular,fontSize:16,alignSelf:'flex-start',marginHorizontal: 11}}>{x.title}</Text>
                                {/* <Text style={{fontFamily:FONTFAMILY.regular,fontSize:12,alignSelf:'flex-start',marginHorizontal: 11,color:'#868CA9'}}>by biggerbolderbaking.com</Text> */}
                            </View>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                     ) }
                    
                     </ScrollView>
                    } 
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', left: 0, right: 0,bottom: 0, height: '13%',  borderRadius: 10 }}>
          
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' ,alignSelf:'flex-end', marginRight:15, marginBottom:10 }}>
          <TouchableOpacity onPress={() => this.RBSheet.open()}>
            <View style={{ backgroundColor: '#28292F', height: 55, width: 55, borderRadius: 40 }}>
            <View style={{height:20,width:20,backgroundColor:COLORS.primary,alignSelf:'flex-end',borderRadius:40,left:2}}>
             <Text style={{color:'white',alignSelf:'center',fontSize:12,fontFamily:FONTFAMILY.medium}}>{this.state.clickedItems.length}</Text>
             </View>
              <Image style={{ height: 25, width: 16,alignSelf:'center',bottom:3 }} source={require('../../assets/Ingredients/list.png')}></Image>
            </View>
            </TouchableOpacity>
          </View>
          <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={170}
          openDuration={400}
          customStyles={{
            container: {
          //    justifyContent: "center",
           //   alignItems: "center",
              borderTopEndRadius:15
            }
          }}
        >
         
          <View style={{flex:1, paddingTop:10}}>
          <View style={styles.alternativeLayoutButtonContainer}>
            <Text style={{fontFamily:FONTFAMILY.regular, fontSize:14, marginTop:10, color:'#474956'}}>
            Selected Ingredients
            </Text>
            <View style={[styles.addmore]} >
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <Text style={styles.addmoretext}>Add more</Text>
                </TouchableOpacity>
              </View>
        </View>
        <View style={{ flexDirection: 'row',flexWrap:'wrap' }}>
              {this.state.clickedItems.map((x)=>
              <View style={styles.bottomtags}>
                <Text style={styles.tagstext}>{x.name}</Text>
                  <TouchableOpacity onPress={() => this.onRemove(x)}>
                <Icon name="circle-with-cross" type="Entypo" style={{ fontSize: 14, paddingLeft: 12, color: COLORS.primary }}></Icon>
                  </TouchableOpacity>
              </View>
              )}
            </View>
        {/* {this.state.clickedItems.map(x=>
          <View style={[styles.tagsClicked]}>
          
        <Text style={styles.tagstextClicked}>{x.name}</Text>
                <Icon name="circle-with-cross" type="Entypo" style={{marginTop:2,fontSize:14,marginLeft:10,color:COLORS.primary}}></Icon>
              </View>
        )} */}

        
            
          </View>
        </RBSheet>
        </View>
            </View>
            
        )
    }
}
const mutation = gql`
mutation addUserFavourite($user_id: ID!, $recipe_id: Int!){
    addUserFavourite(input:{
    user_id: $user_id,
    recipe_id:$recipe_id
  }){
    user_id
  }
}
`;
const query = gql`

query recipes($ingredients: [String!]!){
    recipes(ingredients:$ingredients)
    {
        id,
      title,
      image,
      unusedIngredients{
        image
      },
      likes
      
    }
  }
`;
export default withApollo(SearchRecipes);

//export default SearchRecipes;

const styles = StyleSheet.create({
    alternativeLayoutButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:'3%'
      },
    search: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '85%',
        borderWidth: 1,
        borderColor: '#rgba(9, 56, 149, 0.1)',
        borderRadius: 12,
        height: 50,
        color: '#868CA9',
        marginTop: 25,
        fontSize: 13,
        paddingBottom: 5,
        fontFamily: FONTFAMILY.regular,
        paddingLeft: 10,
        marginLeft: 30
    },
    whitebox: {
        backgroundColor: 'white',
        marginHorizontal: 17,
   //     borderWidth: 1,
        borderColor: '#rgba(9, 56, 149, 0.1)',
        borderRadius: 12,
        flex: 0.7,
        paddingBottom:20
    },
    image1: {
        resizeMode: "cover",
        height:32
        //  justifyContent: "center",
    },
    imagebox: {
        //   backgroundColor:'black',
        marginHorizontal: 11,
        marginVertical: 11,
        flex: 1,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 14,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        height:150
        //  justifyContent: "center",
    },
    
      tagsClicked: {
    //    justifyContent: 'space-between',
        marginTop: 14,
        color: "#ffffff",
        backgroundColor: '#F4F4F8',
        //  paddingHorizontal: 6,
        paddingVertical: 3,
        paddingHorizontal: 10,
        
        borderRadius: 27,
        // width: width(15),
        alignSelf: 'flex-start',
        // width: width(15),
        //  backgroundColor: 'black',
        marginLeft: 10
      },
      addmore: {
        marginTop: 10,
        color: "#474956",
        backgroundColor: COLORS.primary,
        //  paddingHorizontal: 6,
        paddingVertical: 5,
        paddingHorizontal: 15,
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
        fontSize: 10,
        fontFamily: FONTFAMILY.regular,
        color: '#9E9E9E',
        alignSelf: 'flex-start',
        marginTop:2
      //  backgroundColor:'#333',
       // flex:0.2
      },
      addmoretext: {
        fontSize: 10,
        fontFamily: FONTFAMILY.bold,
        color: '#28292F',
        alignSelf: 'flex-start'
      },
      bottomtags: {
        marginTop: 2,
        flexDirection: 'row',
        color: "#ffffff",
        backgroundColor: "#F4F4F8",
        paddingHorizontal: 7,
        paddingVertical: 5,
        flexWrap: 'wrap',
        // paddingHorizontal: 15,
        //  width:'17%',
        borderRadius: 27,
        alignSelf: 'flex-start',
        // width: width(15),
        alignItems: "center",
        //  backgroundColor: 'black',
        marginLeft: 10
      }
})