import React from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ImageBackground, StyleSheet, Platform, TouchableWithoutFeedback, Button, Keyboard, KeyboardAvoidingView, Modal } from "react-native";
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
import { graphql } from "react-apollo";
import { ScrollView } from "react-native-gesture-handler";
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { NETWORK_INTERFACE } from '../../config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link';
import AsyncStorage from '@react-native-community/async-storage';
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
class MyFavorites extends React.Component {
    async componentDidMount() {
       
  
       this.setState({loading:true})
      client.query({
        query: query,
        // variables: {
          
        // }
      })
        .then(async (data) => {
          this.setState({loading:false})
          console.log(data.data.userFavourites)
        
        this.setState({recipes:data.data.userFavourites})
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
        recipes:[],
        loading:false
    }
    onUnfav = (recipeId ) => {
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
    render() {
        // const  recipes  = this.props.data.userFavourites ? this.props.data.userFavourites : null;
        // console.log(recipes)
        
        // if (!recipes) {
        //   return <ActivityIndicator style={styles.spinner }  color={Colors.primary}  /> 
    
        // }
        return (
            
            <View style={{ flex: 1 }} behavior="padding">
                <View style={{ paddingBottom: 20, backgroundColor: COLORS.primary, flexDirection: 'row' }}>
                    <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
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
                                // onChangeText={val => this.onTextInput('loginPassword', val)}
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
                        
                            <View style={styles.imagebox}>
                                <ImageBackground source={{uri:x.image}} resizeMode={'cover'} imageStyle={{ borderRadius: 12 }} style={styles.image}>
                                    <View style={{ backgroundColor: '#FFFFFF', opacity: 0.7, height: 32, width: 32, borderRadius: 40, justifyContent: 'center', alignSelf: 'flex-end', margin: 10 }}>
                                    <ImageBackground source={require('../../assets/icons/forms/round.png')} resizeMode={'contain'} style={styles.image1}>
                                    <TouchableOpacity  onPress={() => {this.onUnfav(x.id) }}>
                                        <Icon style={{ fontSize: 18, marginTop:7, alignSelf: 'center', color: COLORS.primary }}
                                            name="bookmark"
                                            type="Feather" />
                                            </TouchableOpacity>
                                            </ImageBackground>
                                    </View>
                                    
                                </ImageBackground>
                            </View>
                            <View style={{flex:0.4}}>
                            <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigation.navigate('RecipeDetails')}>
                            <Text style={{fontFamily:FONTFAMILY.regular,fontSize:16,alignSelf:'flex-start',marginHorizontal: 11}}>{x.title}</Text>
                            </TouchableOpacity>
                                {/* <Text style={{fontFamily:FONTFAMILY.regular,fontSize:12,alignSelf:'flex-start',marginHorizontal: 11,color:'#868CA9'}}>by biggerbolderbaking.com</Text> */}
                            </View>
                            {/* <View style={{flex:0.22,flexDirection:'row'}}>
                            <View style={{ backgroundColor: '#43E871', height: 35, width: 90, borderRadius: 15, justifyContent: 'center',marginHorizontal:11,flexDirection:'row',alignItems:'center'}}>
                                        <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                            name="bar-chart-2"
                                            type="Feather" />
                                        <Text style={{fontSize:13,fontFamily:FONTFAMILY.regular,marginLeft:5,marginTop:5,color:'white'}}>Easy</Text>
                            </View>
                            <View style={{ backgroundColor:COLORS.primary, height: 35, width: 90, borderRadius: 15, justifyContent: 'center',marginHorizontal:11,flexDirection:'row',alignItems:'center'}}>
                                        <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                            name="clock"
                                            type="EvilIcons" />
                                        <Text style={{fontSize:13,fontFamily:FONTFAMILY.regular,marginLeft:5,marginTop:5,color:'white'}}>25 mins</Text>
                                    </View>
                            </View> */}
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