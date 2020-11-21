import React from "react";
import { View, Text, Image, ActivityIndicator ,ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Button, Keyboard, KeyboardAvoidingView, Modal } from "react-native";
import { width, height } from "react-native-dimension";
import { Input, Toast } from "native-base";
import { withAuth } from "../../store/hoc/withAuth";
import {
    Icon
} from "native-base";
import COLORS from '../../Theme/Colors';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import AppIntroSlider from 'react-native-app-intro-slider';
import PrimaryButton from '../Button/PrimaryButton';
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
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
    constructor(props) {
        super(props);
    }
    state = {
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
        recDetail:{}
    }

    _renderItem = ({ item }) => {
        console.log(item.index)
        return (
            <View
                style={{ backgroundColor: 'white', flex: 1,marginTop:height(2), marginHorizontal: 10, borderRadius: 12 }}>
                <View style={{ flex: 1, marginHorizontal: 15, marginTop: 10 }}>
                {item.index == 1 && ( 
                    
                    <ScrollView style={{flex:1,  margin: 10, maxHeight: 200 }} onTouchStart={(ev) => { 
									  this.setState({enabled:false }); }}
									  onMomentumScrollEnd={(e) => { this.setState({ enabled:true }); }}
									onScrollEndDrag={(e) => { this.setState({ enabled:true }); }}>
                    <Text style={{ alignSelf:'flex-end', fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-start', color: '#868CA9' }}>{this.state.recDetail.summary.replace(regex, '')}</Text>
                
                </ScrollView>
                ) }
                {item.index == 2 && (
                    
                    this.state.recDetail.extendedIngredients?.map((x) =>
                      <View style={{flex:1}}> 
                    <View style={{flex:0.5}}>
                    <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-start', color: '#868CA9' }}>{x.originalName}</Text>
                    </View>
                    <View style={{flex:0.5}}>
                    <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-end', color: '#868CA9' }}>{x.unit}</Text>
                    </View>
                    </View> 
                    
                    )
                ) }
                {item.index == 3 && (
                    <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-start', color: '#868CA9' }}>{item.index}</Text>
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

        console.log(this.state.tabheaderArray)
    }

    viewfull = () => {
        this.setState({viewfull:true})
    }
    render() {
        const  recipeDetail  = this.props.data.recipe ? this.props.data.recipe : null;
        console.log(this.props.data)
        this.state.recDetail = recipeDetail;
        if (!recipeDetail) {
          return <ActivityIndicator style={styles.spinner}  /> 
    
        }
        return (
            <ScrollView contentContainerStyle={{height: this.state.viewfull ? 1100 : 750}}>
            <View style={{ flex: 1, backgroundColor: '#F6F6F6'}}>
                <View style={{ flex:0.5, marginTop: height(1),justifyContent: 'flex-end' }}>
                    <View style={styles.whitebox}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('RecipeDetails')}>
                            <View style={styles.imagebox}>
                                <ImageBackground source={{uri:recipeDetail.image}} resizeMode={'cover'} imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }} style={styles.image}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#536f89', height: 32, width: 32, borderRadius: 40, justifyContent: 'center', margin: 15 }}>
                                            <Icon name="arrowleft" type="AntDesign" style={{ fontSize: 18, color: COLORS.primary, alignSelf: 'center' }}></Icon>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <View style={{ backgroundColor: '#536f89', height: 32, width: 32, borderRadius: 40, justifyContent: 'center', margin: 15 }}>
                                                <Icon style={{ fontSize: 18, alignSelf: 'center', color: COLORS.primary }}
                                                    name="favorite-border"
                                                    type="MaterialIcons" />
                                            </View>
                                        </View>
                                    </View>

                                </ImageBackground>
                            </View>
                            <View style={{backgroundColor: 'white', marginHorizontal: 11, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                                <View style={{ flexDirection: 'row' }}>

                                    <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 18, alignSelf: 'flex-start', marginTop: 10, flex: 0.85, marginHorizontal: 10 }}>{recipeDetail.title}</Text>
                                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 0.25 }}>
                                        <Icon style={{ fontSize: 20, color: COLORS.primary }}
                                            name="favorite-border"
                                            type="MaterialIcons" />
                                        <Text style={{ fontSize: 12, fontFamily: FONTFAMILY.regular, marginLeft: 5, marginTop: 5 }}>1.2k</Text>
                                    </View>
                                </View>
                                <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 12, alignSelf: 'flex-start', marginHorizontal: 11, color: '#868CA9',paddingBottom:10 }}>by {recipeDetail.sourceName}</Text>
                            </View>

                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 5 ,flex:0.1}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                        <View style={{ backgroundColor: '#43E871', height: 35, width: 90, borderRadius: 15, justifyContent: 'center', marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                name="bar-chart-2"
                                type="Feather" />
                            <Text style={{ fontSize: 13, fontFamily: FONTFAMILY.regular, marginLeft: 5, marginTop: 5, color: 'white' }}>Easy</Text>
                        </View>
                        <View style={{ backgroundColor: COLORS.primary, height: 35, width: 90, borderRadius: 15, justifyContent: 'center', marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                name="clock"
                                type="EvilIcons" />
                            <Text style={{ fontSize: 13, fontFamily: FONTFAMILY.regular, marginLeft: 5, marginTop: 5, color: 'white' }}>25 mins</Text>
                        </View>
                        <View style={{ backgroundColor: COLORS.primary, height: 35, width: 90, borderRadius: 15, justifyContent: 'center', marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                name="clock"
                                type="EvilIcons" />
                            <Text style={{ fontSize: 13, fontFamily: FONTFAMILY.regular, marginLeft: 5, marginTop: 5, color: 'white' }}>25 mins</Text>
                        </View>
                        <View style={{ backgroundColor: COLORS.primary, height: 35, width: 90, borderRadius: 15, justifyContent: 'center', marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                name="clock"
                                type="EvilIcons" />
                            <Text style={{ fontSize: 13, fontFamily: FONTFAMILY.regular, marginLeft: 5, marginTop: 5, color: 'white' }}>25 mins</Text>
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
              <View style={{flexDirection:'row',width:'100%',flex:0.3}}>
                  <View style={{backgroundColor:'white',width:120,height:130,borderRadius:12,marginTop:10}}>
                      <Text style={{fontFamily:FONTFAMILY.regular,fontSize:12,color:'#868CA9',alignSelf:'center',marginTop:5}}>Wooden Spoon</Text>
                      <Image source={require('../../assets/searchrecipes/woodenspoon.jpg')} resizeMode={'contain'} style={[styles.image,{alignSelf:'center'}]}>
                        </Image>
                  </View>
                  <View style={{backgroundColor:'white',width:120,height:130,borderRadius:12,marginTop:10,marginLeft:10}}>
                      <Text style={{fontFamily:FONTFAMILY.regular,fontSize:12,color:'#868CA9',alignSelf:'center',marginTop:5}}>Wooden Spoon</Text>
                      <Image source={require('../../assets/searchrecipes/woodenspoon.jpg')} resizeMode={'contain'} style={[styles.image,{alignSelf:'center'}]}>
                        </Image>
                  </View>
              </View>
              <View style={{flex:1}}>
              <Text style={{fontFamily:FONTFAMILY.medium,fontSize:15,marginTop:height(5)}}>Instructions</Text>
              <View
                style={{ backgroundColor: 'white',borderRadius: 12,marginTop:10 }}>
                <View style={{marginTop: 10,flexDirection:'row' }}>
                <View style={{ backgroundColor: COLORS.primary, height: 30, width: 30, borderRadius: 40, justifyContent: 'center', margin: 15 }}>
                    <Text style={{ fontSize: 18, alignSelf: 'center' }}>1</Text>
                </View>
                    <Text style={{ fontFamily: FONTFAMILY.regular,flex:1, fontSize: 12, alignSelf: 'flex-start', color: '#868CA9' }}>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
                </View>
            </View>
            </View>
              </View>
              

              }

            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    imagebox: {
        //   backgroundColor:'black',
        marginHorizontal: 11,
        flex: 1,
        borderWidth: 1,
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

const query = gql`

query{ recipe(id:716429 )
    {
        id,
      title,
      image,
      imageType,
      serving,
      readyInMinutes,
      sourceName,
      sourceUrl,
      aggregateLikes,
      healthScore,
      spoonacularScore,
      analyzedInstructions,
      cheap,
      creditsText,
      cuisines,
      dairyFree,
      diets,
      instructions,
      ketogenic,weightWatcherSmartPoints,dishTypes,
      extendedIngredients{
        id,
        aisle,
        originalName,
        image,
        unit
      },
      summary,
      winePairing{
        pairedWines,
        pairingText,
        productMatches{
          id,title,description
        }
      }
      
    }
  }
`;
export default (
    graphql(query)(RecipesDetails)
  );
// export default withAuth(RecipesDetails)
