import React from "react";
import { View, Text, Image, ActivityIndicator,StatusBar, TouchableOpacity, ImageBackground, StyleSheet, Platform, TouchableWithoutFeedback, Button, Keyboard, KeyboardAvoidingView, Modal } from "react-native";
import { width, height } from "react-native-dimension";
import { Input, Toast } from "native-base";
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
import { graphql } from "react-apollo";
import { ScrollView } from "react-native-gesture-handler";
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { NETWORK_INTERFACE } from '../../config';
import SNACKBAR from '../../Helpers/SNACKBAR';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { _ } from 'lodash';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'MyFaviourites' })],
});

const authLink = setContext(async (req, {headers}) => {
  const user = await AsyncStorage.getItem('user')
  let token = JSON.parse(user)
  return {
    ...headers,
    headers: { authorization: token ? `Bearer ${token. access_token}` : null }
  }
})
// 
const uploadLink = createUploadLink({ uri: NETWORK_INTERFACE });
const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    }
  }
});
class MyFavorites extends React.Component {
    async componentDidMount() {
      //DevSettings.reload()
      this._unsubscribe = this.props.navigation.addListener("didFocus", () => {
        
        this.loaddata();
       });
       this.setState({clickedItems:this.props.navigation.getParam('clickeditems')})
       let user = await AsyncStorage.getItem('user');
   if (user) {
     user = JSON.parse(user).user;
     var subcription = user.user_subscription.subscription
     this.setState({ currentsubscription: subcription });
    
     this.setState({ loginuser: user });
     //console.log('user subcription found in localstorage', this.state.currentsubscription);
   } else {
    console.log('no user found');
   }
    }
    async loaddata(){
     // DevSettings.reload()
     const authLink = setContext(async (req, {headers}) => {
      const user = await AsyncStorage.getItem('user')
      let token = JSON.parse(user)
      return {
        ...headers,
        headers: { authorization: token ? `Bearer ${token. access_token}` : null }
      }
    })
    const uploadLink = createUploadLink({ uri: NETWORK_INTERFACE });
    const sclient = new ApolloClient({
      link: ApolloLink.from([ authLink, uploadLink ]),
      cache : new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
        }
      }
    });
      this.setState({loading:true})
      sclient.query({
        query: query,
        // variables: {
          
        // }cache
        pollInterval: 0,
        partialRefetch:true
      })
        .then(async (data) => {
          this.setState({loading:false})
          
        this.setState({recipes:data.data.userFavourites, backup:data.data.userFavourites})
       
        
        })
        .catch((err) => {
          this.setState({loading:false})
          console.log(err)
        })
    }

    constructor(props) {
        super(props);

    }
    state = {
        recipes:[],
        loading:false,
        backup:[]
    }
    onUnfav = async (recipeId ) => {
        console.log(recipeId)
            // this.setState({loading:true})
            client.mutate({
             mutation: mutation,
             variables: { user_id: this.state.loginuser.id,
                 recipe_id: recipeId }
           })
             .then(async (data) => {
              var evens = _.remove(this.state.recipes, function(n) {
                return n.id == recipeId;
              });
              this.setState({recipes:evens})
              toast.show("Removed from favourites", {textStyle: { color:COLORS.primary },style: { borderRadius:20,width:'80%',backgroundColor:'#000' }, icon:<Icon name="exclamationcircleo" type="AntDesign" style={{ marginLeft:10,color:COLORS.primary,fontSize:14}}></Icon>});
              await this.loaddata();
             })
             .catch((err) => {
              // this.setState({loading:false})
               console.log(err)
             })
             
       };

       onTextInput = (value) => {
      
        if (value){
        let recipes = [...this.state.backup]
        recipes = recipes.filter(x=> x.title.indexOf(value) > -1 )
         if (recipes.length > 0){
          this.setState({recipes})
          }
        else {
          this.setState({recipes:[]})
        }
        }
        else {
          this.setState({recipes:this.state.backup})
        }
       // this.setState({recipes:this.state.recipes.filter(x=>{return x.title.startsWith(value)})})
      }
    render() {
        // const  recipes  = this.props.data.userFavourites ? this.props.data.userFavourites : null;
        // console.log(recipes)
        
        // if (!recipes) {
        //   return <ActivityIndicator style={styles.spinner }  color={Colors.primary}  /> 
    
        // }
        return (
            
            <View style={{ flex: 1 }} behavior="padding">
            <StatusBar translucent backgroundColor="transparent" />
                <View style={{ paddingTop: 20,paddingBottom: 20, backgroundColor: COLORS.primary, flexDirection: 'row' }}>
                    <View style={{ flex: 0.1, marginTop: height(5), marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10 ,fontSize:18}}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>My Favorites</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: height(4) }}>
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
                            {/* <Icon style={{ fontSize: 25, flex: 0.1, alignSelf: 'center' }}
                                name="options-sharp"
                                type="Ionicons"
                            /> */}
                        </View>
                    </View>
                    {this.state.loading ? 
            <Spinner small color="#FFAA2F" />
           : 
                    <ScrollView>
                          { this.state.recipes?.map((x) =>
                  
                            <View style={{ flex: 1, marginTop: height(3) }}>
                        <View style={styles.whitebox}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('RecipeDetails', { id: x.id })}>
                            <View style={styles.imagebox}>
                            
                                <ImageBackground source={{uri:x.image}} resizeMode={'cover'} imageStyle={{ borderRadius: 12 }} style={styles.image}>
                                    <View style={{ backgroundColor: '#FFFFFF', opacity: 0.7, height: 32, width: 32, borderRadius: 40, justifyContent: 'center', alignSelf: 'flex-end', margin: 10 }}>
                                    <ImageBackground source={require('../../assets/icons/forms/round.png')} resizeMode={'contain'} style={styles.image1}>
                                    <TouchableOpacity  onPress={() => {this.onUnfav(x.id) }}>
                                    <Image source={require('../../assets/icons/forms/fav.png')}
                                   style={{ marginTop: 7, alignSelf: 'center',alignSelf:'center'}}
                                  />
                                            </TouchableOpacity>
                                            </ImageBackground>
                                    </View>
                                    
                                </ImageBackground>
                                
                            </View>
                            <View style={{flex:0.4}}>
                            <Text style={{fontFamily:FONTFAMILY.regular,fontSize:16,alignSelf:'flex-start',marginHorizontal: 11}}>{x.title}</Text>
                            
                              
                            </View>
                            </TouchableOpacity>
                           
                        </View>
                    </View>
                    ) }
                    </ScrollView>
                    }
                </View>
            </View>
        )
    }
}
//aggregateLikes
const query = gql`
query{ userFavourites
    {
          image,
          id,
          title,
          aggregateLikes
    }
  }
`;
const mutation = gql`
mutation removeUserFavourite($user_id: ID!, $recipe_id: Int!){
    removeUserFavourite(input:{
    user_id: $user_id,
    recipe_id:$recipe_id
  }){
    status
  }
}
`;
export default withApollo(MyFavorites);
//export default MyFavorites;

const styles = StyleSheet.create({
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
    image1: {
        resizeMode: "cover",
        height:32
        //  justifyContent: "center",
    }
})