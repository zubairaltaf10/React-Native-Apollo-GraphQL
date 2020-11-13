import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet, Platform, TouchableWithoutFeedback, Button, Keyboard, KeyboardAvoidingView, Modal } from "react-native";
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
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors } from "react-native/Libraries/NewAppScreen";


class HomeCount extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}

    render() {
        return (
            <View style={{ flex: 1 }} behavior="padding">
                <View style={{ paddingBottom: 20, backgroundColor: COLORS.primary, flexDirection: 'row' }}>
                    <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
                        <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10 }}></Icon>
                    </View>
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>Recipes</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: height(4) }}>
                        <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 14, color: '#868CA9', alignSelf: 'center', lineHeight: 24 }}>You can make 4 recipes with{'\n'}   the ingredients selected</Text>
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
                            <Icon style={{ fontSize: 25, flex: 0.1, alignSelf: 'center' }}
                                name="options-sharp"
                                type="Ionicons"
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop: height(3) }}>
                        <View style={styles.whitebox}>
                            <View style={styles.imagebox}>
                                <ImageBackground source={require('../../assets/searchrecipes/download.jpg')} resizeMode={'cover'} imageStyle={{ borderRadius: 12 }} style={styles.image}>
                                    <View style={{ backgroundColor: '#536f89', height: 32, width: 32, borderRadius: 40, justifyContent: 'center', alignSelf: 'flex-end', margin: 10 }}>
                                        <Icon style={{ fontSize: 18, alignSelf: 'center', color: COLORS.primary }}
                                            name="favorite-border"
                                            type="MaterialIcons" />
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={{flex:0.4}}>
                            <Text style={{fontFamily:FONTFAMILY.regular,fontSize:16,alignSelf:'flex-start',marginHorizontal: 11}}>Blue berry and banana butter pancakes</Text>
                                <Text style={{fontFamily:FONTFAMILY.regular,fontSize:12,alignSelf:'flex-start',marginHorizontal: 11,color:'#868CA9'}}>by biggerbolderbaking.com</Text>
                            </View>
                            <View style={{flex:0.22,flexDirection:'row'}}>
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
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
export default HomeCount;

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
        flex: 0.7
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
        resizeMode: "contain",
        //  justifyContent: "center",
    }
})