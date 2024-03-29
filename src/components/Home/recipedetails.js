import React from "react";
import { View, Text, Image, ActivityIndicator ,StatusBar, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Button, Keyboard, KeyboardAvoidingView, Modal } from "react-native";
import { width, height } from "react-native-dimension";
import { Input, Toast } from "native-base";
import {
    Icon,
    Spinner
} from "native-base";
import COLORS from '../../Theme/Colors';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import AppIntroSlider from 'react-native-app-intro-slider';
import PrimaryButton from '../Button/PrimaryButton';
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { NETWORK_INTERFACE } from '../../config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link';
import AsyncStorage from '@react-native-community/async-storage';
import {  equipments } from './ingredientslist.json';
import SNACKBAR from '../../Helpers/SNACKBAR';
import {client} from '../../config/apploclient'
import {_} from 'lodash';
const authLink = setContext(async (req, {headers}) => {
  const user = await AsyncStorage.getItem('user')
  let token = JSON.parse(user)
  return {
    ...headers,
    headers: { authorization: token ? `Bearer ${token. access_token}` : null }
  }
})
const uploadLink = createUploadLink({ uri: NETWORK_INTERFACE });
const regex = /(<([^>]+)>)/ig;
const data = [
    {
        text: 'it is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    index:1
    },
    {
        text: 'it is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        index:2
    },
    {
        text: "it is  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        index:3
    },
];

class RecipesDetails extends React.Component {
    
    async componentDidMount() {
      
      let id = this.props.navigation.getParam('id');
      this.setState({loading:true})
      const sclient = new ApolloClient({
        link: ApolloLink.from([ authLink, uploadLink ]),
          cache : new InMemoryCache(),
          defaultOptions: {
            watchQuery: {
              fetchPolicy: 'no-cache',
            }
          }
      });  
      sclient.query({
        query: query,
        variables: {
          id:  id
        }
      })
        .then(async (data) => {
          
        this.setState({recDetail:data.data.recipe , nutrients:data.data.recipe.nutrition.nutrients })
               const instructions = data.data.recipe.instructions;
        const allequipments = [];
        const steps  = [];
        _.forEach(instructions, function(value) {
            _.forEach(value.steps, function(step) {
               
                steps.push(step)
                _.forEach(step.equipment, function(equipment) {
                  let foundObject = _.find(allequipments, function(e) {
                    return e.name === equipment.name;
                  });
              
                  if(!foundObject) {
                    allequipments.push(equipment)
                  }
                    
                  });
              });
          });
          console.log(allequipments)
          _.forEach(allequipments, function(equipment) {
            equipment.image = "https://spoonacular.com/cdn/equipment_100x100/" + equipment.image;
          });
        this.setState({allequipments:allequipments})
        this.setState({allsteps:steps})
        
        this.setState({loading:false})

        })
        .catch((err) => {
          console.log(err)
          this.setState({loading:false})
          
        })
        let user = await AsyncStorage.getItem('user');
        if (user) {
          user = JSON.parse(user).user;
          this.setState({ loginuser: user });
        } else {
          console.log('no user found');
        }
     
    }
    constructor(props) {
        super(props);
    }
    state = {
        loginuser: {},
        currentSlide: 0,
        viewfull : false,
        tabheaderArray: [
            {
                id:0,
                name: 'Overview',
                isActive: true,
            },
            {
                id:1,
                name: 'Ingredients',
                isActive: false,
            },
            {
                id:2,
                name: 'Nutrition',
                isActive: false,
            }
        ],
        recDetail:{},
        loading:true,
        allequipments:[],
        nutrients:[],
        allsteps:[],
    }
    isInt(n){
      return Number(n) === n && n % 1 === 0;
  }
  
   isFloat(n){
      return Number(n) === n && n % 1 !== 0;
  }

    _renderItem = ({ item }) => {
       
        return (
         
         
            <View
                style={{ backgroundColor: 'white', flex: 1,marginTop:height(2), marginHorizontal: 10, borderRadius: 12 }}>
                <View style={{ flex: 1, marginHorizontal: 15, marginTop: 10 }}>
                {item.index == 1 && ( 
                    
                    <ScrollView style={{flex:1,  margin: 10, maxHeight: 200 }} nestedScrollEnabled={true} onTouchStart={(ev) => { 
									  this.setState({enabled:false }); }}
									  onMomentumScrollEnd={(e) => { this.setState({ enabled:true }); }}
									onScrollEndDrag={(e) => { this.setState({ enabled:true }); }}
                                    >
                    <Text style={{ alignSelf:'flex-end', fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-start', color: '#868CA9' }}>{this.state.recDetail.summary?.replace(regex, "")}</Text>
                
                </ScrollView>
                ) }
                {item.index == 2 && (
                    <ScrollView style={{flex:1, maxHeight: 200 }} nestedScrollEnabled={true} onTouchStart={(ev) => { 
									  this.setState({enabled:false }); }}
									  onMomentumScrollEnd={(e) => { this.setState({ enabled:true }); }}
									onScrollEndDrag={(e) => { this.setState({ enabled:true }); }}>
                   { this.state.recDetail.extendedIngredients?.map((x) =>
                   
                      <View style={{flex:1, flexDirection: 'row',justifyContent: 'space-between',}}> 
                    <View style={{flex:0.65, margin:5}}>
                    <Text numberOfLines={1} style={{ width: 200 , fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-start', color: '#868CA9' }}>{x.originalName}</Text>
                    </View>
                    <View style={{flex:0.35,  margin:5}}>
                    <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-end', color: '#868CA9' }}> { (Number.isInteger(x.amount) == true ? x.amount : x.amount.toFixed(2))   + " " + x.unit}</Text>
                    </View>
                    </View> 
                   
                    )}
                    </ScrollView>
                ) }
                {item.index == 3 && (
                    <ScrollView style={{flex:1, maxHeight: 200 }} nestedScrollEnabled={true} onTouchStart={(ev) => { 
									  this.setState({enabled:false }); }}
									  onMomentumScrollEnd={(e) => { this.setState({ enabled:true }); }}
									onScrollEndDrag={(e) => { this.setState({ enabled:true }); }}>
                   { this.state.nutrients?.map((x) =>
                   
                      <View style={{flex:1, flexDirection: 'row',justifyContent: 'space-between',}}> 
                    <View style={{flex:0.6, margin:5}}>
                    <Text numberOfLines={1} style={{ width: 200 , fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-start', color: '#868CA9' }}>{x.title}</Text>
                    </View>
                    <View style={{flex:0.4,  margin:5}}>
                    <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-end', color: '#868CA9' }}>{x.amount + " " + x.unit }</Text>
                    </View>
                    </View> 
                   
                    )}
                    </ScrollView>
                ) }
                </View>
            </View>
                
        );
    };

    renderPagination = () => {
        return (
            <View style={{ backgroundColor: 'white' }}>
            </View>
        )
    }

    tabcontrols = (index) => {
        //  console.log(active)
       let a = this.state.tabheaderArray
        a.find(x=>{
            if (x.isActive == true){
                x.isActive = false
            }
            if(x.id == index){
                x.isActive = true
            }
        })
        this.setState({tabheaderArray:a})
        this._slider.goToSlide(index)

    }

    viewfull = () => {
        this.setState({viewfull:true})
    }
    onAddfav = (recipe) => {
        //console.log(this.state.loginuser.id)
        // this.setState({loading:true})
        client.mutate({
          mutation:  recipe.fav != true ? addUserFavourite : removeUserFavourite,
          variables: {
            user_id: this.state.loginuser.id,
            recipe_id: recipe.id
          }
        })
          .then(async (data) => {
            var recepi = this.state.recDetail;
           
        if(recepi.fav != true)
        {
          recepi.fav = true;
          toast.show("Added to favourites", {textStyle: { color:COLORS.primary },style: { borderRadius:20,backgroundColor:'#000',alignItems:'center',alignSelf:'center',paddingHorizontal:30 }, icon:<Icon name="checkcircleo" type="AntDesign" style={{ marginLeft:10,color:COLORS.primary,fontSize:14}}></Icon>});
        }else
        {
          recepi.fav = false;
          toast.show("Removed from favourites", {textStyle: { color:COLORS.primary },style: { borderRadius:20,width:'80%',backgroundColor:'#000' }, icon:<Icon name="exclamationcircleo" type="AntDesign" style={{ marginLeft:10,color:COLORS.primary,fontSize:14}}></Icon>});
        }
        this.setState({recipes: recepi})
          
          })
          .catch((err) => {
            // this.setState({loading:false})
            console.log(err)
          })
      };
      onAddLiked = (recipe) => {
        console.log(this.state.loginuser.id)
        // this.setState({loading:true})

        client.mutate({
          mutation:  recipe.Liked != true ? likeRecipe : unlikeRecipe,
          variables: {
            user_id: this.state.loginuser.id,
            recipe_id: recipe.id
          }
        })
          .then(async (data) => {
            var recepi = this.state.recDetail;
           
            if(recipe.Liked != true)
            {
              recepi.Liked = true;
              recepi.aggregateLikes = recepi.aggregateLikes +1
            SNACKBAR.simple("Recipe liked successfully");
            }else
            {
              recepi.Liked = false;
              recepi.aggregateLikes = recepi.aggregateLikes - 1
              SNACKBAR.simple("Recipe UnLike successfully") ; 
            }
            
            this.setState({recDetail: recepi})
          })
          .catch((err) => {
            // this.setState({loading:false})
            console.log(err)
          })
      };
    render() {
        
        return (
            <View>
            { this.state.loading ? 
                <Spinner small color="#FFAA2F" />
               : 
            <ScrollView contentContainerStyle={{height: this.state.viewfull ? 1100 : 750}}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={{ marginTop:30, flex: 1, backgroundColor: '#F6F6F6'}}>
                <View style={{ flex:0.5, marginTop: height(1),justifyContent: 'flex-end' }}>
                    <View style={styles.whitebox}>
                        
                            <View style={styles.imagebox}>
                                <ImageBackground source={{uri:this.state.recDetail.image}} resizeMode={'cover'} imageStyle={{  borderTopLeftRadius: 12, borderTopRightRadius: 12 }} style={styles.image}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#536f89', height: 32, width: 32, borderRadius: 40, justifyContent: 'center', margin: 15 }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                            <Icon name="arrowleft" type="AntDesign" style={{ fontSize: 18, color: COLORS.primary, alignSelf: 'center' }}></Icon>
                                        </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <View style={{ backgroundColor: '#536f89', height: 32, width: 32, borderRadius: 40, justifyContent: 'center', margin: 15 }}>
                                            <TouchableOpacity onPress={() => { this.onAddfav(this.state.recDetail); }}>
                              {this.state.recDetail.fav == true && (
                                <Image source={require('../../assets/icons/forms/fav.png')}
                                   style={{alignSelf: 'center',alignSelf:'center'}}
                                  />
                                  )}
                              {this.state.recDetail.fav != true && (
                                <Image source={require('../../assets/icons/forms/unfav.png')}
                                   style={{alignSelf:'center',  marginTop: 2, alignSelf: 'center'}}
                                  />
                              )}
                            </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                </ImageBackground>
                            </View>
                            <View style={{backgroundColor: 'white', marginHorizontal: 11, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                                <View style={{ flexDirection: 'row' }}>

                                    <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 18, alignSelf: 'flex-start', marginTop: 10, flex: 0.80, marginHorizontal: 10 }}>{this.state.recDetail.title}</Text>
                                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 0.20 }}>
                                    <TouchableOpacity  style={{ flexDirection: 'row' }} onPress={() => { this.onAddLiked(this.state.recDetail); }}>
                                    <View  style={{ flex:1, flexDirection: 'row' }}>
                                                {this.state.recDetail.Liked == true && (
                                              <View style={{flex:1, flexDirection: 'row'}} >
                                                  <Icon style={{flex:0.40,  alignSelf: 'center', fontSize: 20, color: COLORS.primary }}
                                            name="favorite"
                                            type="MaterialIcons" />
                                        <Text style={{ fontSize: 12, flex:0.60,  alignSelf: 'center', fontFamily: FONTFAMILY.regular, marginLeft: 5, marginTop: 5 }}>{this.state.recDetail.aggregateLikes}</Text>
                                        </View>
                                         )}
                                        {this.state.recDetail.Liked != true && (
                                        <View style={{flex:1, flexDirection: 'row'}} > 
                                          <Icon style={{ flex:0.40, alignSelf: 'center', fontSize: 20, color: COLORS.primary }}
                                            name="favorite-border"
                                            type="MaterialIcons" />
                                           <Text style={{ fontSize: 12, flex:0.60, alignSelf: 'center', fontFamily: FONTFAMILY.regular, marginLeft: 5, marginTop: 5 }}>{this.state.recDetail.aggregateLikes}</Text>
                                        </View>
                                         )}
                                         </View>
                                      </TouchableOpacity>
                                            

                                        
                                    </View>
                                </View>
                                <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-start', marginHorizontal: 11, color: '#868CA9',paddingBottom:10 }}>by {this.state.recDetail.sourceName}</Text>
                            </View>


                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 5 ,flex:0.1}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                        <View style={{ backgroundColor: '#43E871', height: 30, width: 90, borderRadius: 15, justifyContent: 'center', marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                name="bar-chart-2"
                                type="Feather" />
                            <Text style={{ fontSize: 13, fontFamily: FONTFAMILY.regular, marginLeft: 5, marginTop: 5, color: 'white' }}>Easy</Text>
                        </View>
                        <View style={{ backgroundColor: COLORS.primary, height: 30, width: 90, borderRadius: 15, justifyContent: 'center', marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                name="clock"
                                type="EvilIcons" />
                            <Text style={{ fontSize: 13, fontFamily: FONTFAMILY.regular, marginLeft: 5, marginTop: 5, color: 'white' }}>{this.state.recDetail.readyInMinutes}</Text>
                        </View>
                        <View style={{ backgroundColor: this.state.recDetail.vegetarian  != true ? '#ff3a55' : '#43e871', height: 30,  borderRadius: 15, justifyContent: 'center', marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 13, fontFamily: FONTFAMILY.regular, marginHorizontal: 15, marginTop: 5, color: 'white' }}>Vegetarian</Text>
                        </View>
                        <View style={{ backgroundColor: this.state.recDetail.glutenFree  != true ? '#ff3a55' : '#43e871', height: 30,
                          borderRadius: 15, justifyContent: 'center',  flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 13, fontFamily: FONTFAMILY.regular, marginHorizontal: 15, marginTop: 5, color: 'white' }}>Gluten-Free</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex:0.45, marginHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', fontSize: 15 }}>
                        {this.state.tabheaderArray?.map((x) =>
                            <View>
                            <Text style={x.isActive ? styles.tabtextSelected : styles.tabtextsimple} onPress={()=>this.tabcontrols(x.id)}>{x.name}</Text>
                            {x.isActive ? 
                            <View style={{height:6,marginTop:1,width:6,backgroundColor:COLORS.primary,marginHorizontal:40,borderRadius:20}}/>
                            : null 
                            }
                            </View>

                          )}
                    </View>
                    <AppIntroSlider
                        renderItem={this._renderItem}
                        data={data}
                        ref={(ref) => this._slider = ref}
                        renderPagination={this.renderPagination}
                        onSlideChange={(index) => {
                          this.tabcontrols(index)
                        }}
                    />
                </View>
                {!this.state.viewfull ?
              <View style={{justifyContent:'flex-start',alignSelf:'center'}}>
              <PrimaryButton
              title="   VIEW FULL RECIPE   "
              onPress={() => this.viewfull()}
              marginTop={height(10)}
            // loading={this.state.loading}
            />
              </View>
              : 
             
              <View style={{marginHorizontal:15,marginTop:10,flex:1}}>
                  <Text style={{fontFamily:FONTFAMILY.medium,fontSize:15}}>Equipment Required</Text>
                  
                  
              <View style={{flexDirection:'row',width:'100%',height:'25%'}}>
              <ScrollView style={{flexDirection:'row',width:'100%', maxHeight: 450}} horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
              { this.state.allequipments?.map((x ) =>
                  <View style={{backgroundColor:'white', width:110,  borderRadius:12,marginTop:10, marginRight:10,paddingHorizontal:5,paddingVertical:10}}>
                      <Text style={{fontFamily:FONTFAMILY.regular,fontSize:12,color:'#868CA9',alignSelf:'center',marginLeft:5}}>{x.name}</Text>
                     <View style={{flex: 1 }}>
                     <Image source={{uri:x.image}} style={[styles.image1,{resizeMode:"contain"}]}>
                        </Image>
                     </View>
                  </View>
              )}
              </ScrollView>
              </View>
              <View style={{flex:1}}>
              <Text style={{fontFamily:FONTFAMILY.medium,fontSize:15,marginTop:height(5)}}>Instructions</Text>
              <ScrollView style={{flex:1, maxHeight: 350 }} nestedScrollEnabled={true} onTouchStart={(ev) => { 
									  this.setState({enabled:false }); }}
									  onMomentumScrollEnd={(e) => { this.setState({ enabled:true }); }}
									onScrollEndDrag={(e) => { this.setState({ enabled:true }); }}>
              <View
                style={{ backgroundColor: 'white',borderRadius: 12,marginTop:15, marginBottom:10 }}>
              
                 { this.state.allsteps?.map((x , index) =>
                  
                <View style={{marginTop: 10,flexDirection:'row' }}>
                <View style={{ backgroundColor: COLORS.primary, height: 30, width: 30, borderRadius: 40, justifyContent: 'center', marginLeft: 20 , marginRight:10 }}>
                    <Text style={{ fontSize: 12, fontFamily:FONTFAMILY.bold  ,alignSelf: 'center', marginTop:2 }}>{index + 1}</Text>
                </View>
                    <Text style={{ fontFamily: FONTFAMILY.regular,flex:1, fontSize: 12, alignSelf: 'flex-start', color: '#868CA9' }}>{x.step}</Text>
                </View>
                 )}
                 
            </View>
            </ScrollView>
            </View>
              </View>
              

              }

            </View>
            </ScrollView>
            
            }
            </View>
            )
            
    }
}

const styles = StyleSheet.create({
    imagebox: {
        //   backgroundColor:'black',
        marginHorizontal: 11,
        flex: 1,
        borderWidth: 1,
        height:200,
        borderColor: 'transparent',
        //    borderTopLeftRadius:14,
        //    borderTopRightRadius:14,
        //    borderBottomLeftRadius:0
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        //  flexDirection:'row'
     //   alignSelf: "center",
    },
    image1: {
      //  backgroundColor:'pink',
        resizeMode: "contain",
        width:100,
        flex:1
      //  height:'10%'
},
    whitebox: {
        // backgroundColor: 'white',
        marginHorizontal: 10,
        //     borderWidth: 1,
        borderColor: '#rgba(9, 56, 149, 0.1)',
        //  borderRadius: 12,
        flex: 1
    },
    tabtextSelected: {
        fontFamily: FONTFAMILY.regular,
        marginHorizontal: 20,
        color: '#868CA9'
    },
    tabtextsimple: {
        fontFamily: FONTFAMILY.regular,
        marginHorizontal: 20,
        color:'#000'

    },
    green: {
        color: '#00ff00',
        marginHorizontal:10
      },
      red: {
        color: '#ff0000',
        marginHorizontal:10
      }
})
const addUserFavourite = gql`
mutation addUserFavourite($user_id: ID!, $recipe_id: Int!){
    addUserFavourite(input:{
    user_id: $user_id,
    recipe_id:$recipe_id
  }){
    user_id
  }
}
`;
const removeUserFavourite = gql`
mutation removeUserFavourite($user_id: ID!, $recipe_id: Int!){
    removeUserFavourite(input:{
    user_id: $user_id,
    recipe_id:$recipe_id
  }){
    status
  }
}
`;
const likeRecipe = gql`
mutation likeRecipe($user_id: ID!, $recipe_id: Int!){
  likeRecipe(input:{
    user_id: $user_id,
    recipe_id:$recipe_id
  }){
    status
  }
}
`;
const unlikeRecipe = gql`
mutation unlikeRecipe($user_id: ID!, $recipe_id: Int!){
  unlikeRecipe(input:{
    user_id: $user_id,
    recipe_id:$recipe_id
  }){
    status
  }
}
`;
const query = gql`

query recipe($id: Int!){
    recipe(id: $id)
    {
        id,
      title,
      image,
      imageType,
      serving,
      sourceName,
      readyInMinutes,
      sourceName,
      sourceUrl,
      fav,
      aggregateLikes,
      healthScore,
      cheap,
      nutrition {
        nutrients{
                                title,
                                amount,
                                unit,
                              }
      },
vegetarian,
glutenFree,
      instructions{
        name,
       steps{
         step,
          equipment{
            name,
             image
         },
     },
     },
     summary,
    extendedIngredients{
        id,
        aisle,
        originalName,
        image,
        unit,
              amount,
              original
      },
      
    }
  }
`;
export default  withApollo(RecipesDetails);
