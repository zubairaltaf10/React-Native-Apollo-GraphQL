import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet, Platform, TouchableOpacity, Button, Keyboard, KeyboardAvoidingView, Modal } from "react-native";
import { width, height } from "react-native-dimension";
import { Input, Toast } from "native-base";
import { withAuth } from "../../store/hoc/withAuth";
import {
    Icon,
} from "native-base";
import COLORS from '../../Theme/Colors';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import { ScrollView } from "react-native-gesture-handler";

class RecipesDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#F6F6F6'}}>
                  
                    <View style={{ flex: 0.45, marginTop: height(1) }}> 
                        <View style={styles.whitebox}>
                        <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigation.navigate('RecipeDetails')}>
                            <View style={styles.imagebox}>
                                <ImageBackground source={require('../../assets/searchrecipes/download.jpg')} resizeMode={'cover'} imageStyle={{ borderTopLeftRadius: 12,borderTopRightRadius:12 }} style={styles.image}>
                                <View style={{flexDirection:'row'}}>
                                <View style={{ backgroundColor: '#536f89', height: 32, width: 32, borderRadius: 40, justifyContent: 'center',margin:15 }}>
                                    <Icon name="arrowleft" type="AntDesign" style={{ fontSize:18,color: COLORS.primary,alignSelf:'center' }}></Icon>
                                    </View>
                                    <View style={{flex:1,alignItems:'flex-end'}}>
                                    <View style={{ backgroundColor: '#536f89', height: 32, width: 32, borderRadius: 40, justifyContent: 'center', margin: 15 }}>
                                        <Icon style={{ fontSize: 18, alignSelf: 'center', color: COLORS.primary }}
                                            name="favorite-border"
                                            type="MaterialIcons" />
                                    </View>
                                    </View>
                                    </View>
                                    
                                </ImageBackground>
                            </View>
                            <View style={{flex:0.4,backgroundColor:'white',marginHorizontal:11,borderBottomLeftRadius:12,borderBottomRightRadius:12}}>
                                <View style={{flexDirection:'row'}}>

                            <Text style={{fontFamily:FONTFAMILY.regular,fontSize:18,alignSelf:'flex-start',marginTop:10,flex:0.85,marginHorizontal:10}}>Blue berry and banana butter pancakes</Text>
                            <View style={{ justifyContent: 'center',flexDirection:'row',alignItems:'center',flex:0.25}}>
                            <Icon style={{ fontSize: 20, color: COLORS.primary }}
                                            name="favorite-border"
                                            type="MaterialIcons" />
                                        <Text style={{fontSize:12,fontFamily:FONTFAMILY.regular,marginLeft:5,marginTop:5}}>1.2k</Text>
                            </View>
                            </View>
                                <Text style={{fontFamily:FONTFAMILY.regular,fontSize:12,alignSelf:'flex-start',marginHorizontal: 11,color:'#868CA9'}}>by biggerbolderbaking.com</Text>
                            </View>
                            
                            </TouchableOpacity>
                           
                        </View>
                    </View>
                     <View style={{flexDirection:'row',flex:0.1,marginHorizontal:15,marginTop:5}}>
                     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{ backgroundColor: '#43E871', height: 35, width: 90, borderRadius: 15, justifyContent: 'center',marginHorizontal:5,flexDirection:'row',alignItems:'center',marginTop:10}}>
                                        <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                            name="bar-chart-2"
                                            type="Feather" />
                                        <Text style={{fontSize:13,fontFamily:FONTFAMILY.regular,marginLeft:5,marginTop:5,color:'white'}}>Easy</Text>
                            </View>
                            <View style={{ backgroundColor:COLORS.primary, height: 35, width: 90, borderRadius: 15, justifyContent: 'center',marginHorizontal:5,flexDirection:'row',alignItems:'center',marginTop:10}}>
                                        <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                            name="clock"
                                            type="EvilIcons" />
                                        <Text style={{fontSize:13,fontFamily:FONTFAMILY.regular,marginLeft:5,marginTop:5,color:'white'}}>25 mins</Text>
                             </View>
                             <View style={{ backgroundColor:COLORS.primary, height: 35, width: 90, borderRadius: 15, justifyContent: 'center',marginHorizontal:5,flexDirection:'row',alignItems:'center',marginTop:10}}>
                                        <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                            name="clock"
                                            type="EvilIcons" />
                                        <Text style={{fontSize:13,fontFamily:FONTFAMILY.regular,marginLeft:5,marginTop:5,color:'white'}}>25 mins</Text>
                             </View>
                             <View style={{ backgroundColor:COLORS.primary, height: 35, width: 90, borderRadius: 15, justifyContent: 'center',marginHorizontal:5,flexDirection:'row',alignItems:'center',marginTop:10}}>
                                        <Icon style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}
                                            name="clock"
                                            type="EvilIcons" />
                                        <Text style={{fontSize:13,fontFamily:FONTFAMILY.regular,marginLeft:5,marginTop:5,color:'white'}}>25 mins</Text>
                             </View>
                             </ScrollView>
                            </View>
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
        borderColor: 'transparent',
    //    borderTopLeftRadius:14,
    //    borderTopRightRadius:14,
    //    borderBottomLeftRadius:0
    },
    image: {
        flex: 1,
        resizeMode: "contain",
      //  flexDirection:'row'
        //  justifyContent: "center",
    },
    whitebox: {
       // backgroundColor: 'white',
        marginHorizontal: 10,
   //     borderWidth: 1,
        borderColor: '#rgba(9, 56, 149, 0.1)',
      //  borderRadius: 12,
        flex: 1
    }
})

export default withAuth(RecipesDetails)
