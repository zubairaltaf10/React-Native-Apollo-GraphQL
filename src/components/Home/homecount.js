import React from "react";
import { View, Text, Image, StyleSheet,Platform,StatusBar, TouchableOpacity, TouchableWithoutFeedback, Button, Keyboard,KeyboardAvoidingView,Modal,Share} from "react-native";
import { width, height } from "react-native-dimension";
import { Input, Toast } from "native-base";
import {
  Icon,
  //TouchableOpacity
} from "native-base";
import PrimaryButton from '../Button/PrimaryButton';
import PrimaryButton2 from '../Button/PrimaryButton2';
import PlusButton from '../Button/PlusButton';
import MinusButton from '../Button/MinusButton';
import {ApplicationStyles} from '../../Theme';
import COLORS from '../../Theme/Colors';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AsyncStorage from '@react-native-community/async-storage';
import AnimatedNumbers from 'react-native-animated-numbers';
import {Metrics} from '../../Theme';
import {_} from 'lodash';
import * as Linking from 'expo-linking';
import PaypalUI from '../Payment/PaypalUI'
import { parse } from "graphql";
import SNACKBAR from "../../Helpers/SNACKBAR";
import WideBanner from '../Ads/WideBanner.js';
//const [animateToNumber, setAnimateToNumber] = 0;
const onRequestClose = false;
class HomeCount extends React.Component {
  async componentWillMount() {
    this._unsubscribe = this.props.navigation.addListener("didFocus", () => {
     
      this.loadloginuser();
    });
    this.loadloginuser();
  this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
  this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
 }
 loadloginuser = async  () =>
 {
  let user = await AsyncStorage.getItem('user');
  if (user) {
    user = JSON.parse(user).user;
    if(user.user_subscription == null)
    {
      this.props.navigation.navigate('ManagePackge')
      return;
    }
    var subcription = user.user_subscription.subscription
    this.setState({ currentsubscription: subcription , loginuser: user });
   
  } else {
  }
 }
  constructor(props) {
    super(props);
  }
  state = {
    clicked: false,
    bottomHeight:0,
    clicks: 1,
    show: true,
    modal:false,
    currentsubscription: {} ,
    loginuser:{},
    modalVisible:false,
    viewplanmodel:false,
    showpayment:true,
    paid:false,
    viewloginmodel:false
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
   
  }

componentWillUnmount() {
  this.RBSheet.open()
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
}

_keyboardDidShow(e) {
    this.setState({ bottomHeight: e.endCoordinates.height - 500 })
}

_keyboardDidHide() {
    this.setState({ bottomHeight: 0 })
}
IncrementItem = () => {
  
  if(this.state.clicks > 998){
    return;
  }


   if(_.isEmpty(this.state.currentsubscription))
   {
    if((this.state.clicks + 1) > 1)
    {
      this.setState({viewplanmodel: true});
    }
   }
   else if(this.state.currentsubscription.name == "Bisic")
    {
      if((this.state.clicks + 1) > parseInt(this.state.currentsubscription.person_limit))
      {
        this.setState({modal: true});
      }
      else{
        this.setState({ clicks: parseInt(this.state.clicks) + 1 });
      }
  }else{
    this.setState({ clicks: parseInt(this.state.clicks) + 1 });
  }
  }
  DecreaseItem = () => {
    this.setState({ clicks: parseInt(this.state.clicks) - 1 });
    //setAnimateToNumber(animateToNumber + this.state.clicks);
  }
  ViewPlan = () => {
    this.setState({modal:false})
    this.setState({viewplanmodel:false})
    this.props.navigation.navigate('ManagePackge')
  }
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  }
  
  modalOpen =async () => {
  if(this.state.clicks == 0){
    SNACKBAR.simple('Please add one indiviual')
    return;
  }


    if( parseInt(this.state.clicks) >  parseInt(this.state.currentsubscription.person_limit))
    {
      this.setState({modal: true});
    }
    else{
      this.props.navigation.navigate('Ingredients', {
        person: this.state.clicks
      });
    }
    
  }
  
  RateApp = () => {
    Linking.openURL("https://play.google.com/store/apps");
  }
  async Logout () {
    await removeItemValue('user');
    this.props.navigation.navigate('Auth');
  }
  async removeItemValue() {
    try {
       var abc = await AsyncStorage.removeItem('user'); 
       let user = await AsyncStorage.getItem('user');
  
        this.props.navigation.navigate('Auth'); 
      }
    catch(exception) {
        return false;
    }
}
 onrequestModelclose = () =>
 {
   this.setState({modal: false})
 }
 onrequestViewModelclose = () =>
 {
   this.setState({viewplanmodel: false})
 }
 onrequestViewloginModelclose = () =>
 {
   this.setState({viewloginmodel: false})
 }
 openMyFav = () =>
 {
  if(_.isEmpty(this.state.loginuser)){
    this.setState({viewloginmodel:true})
     }else{
      this.props.navigation.navigate('MyFaviourites'); 
     }
 }
 OpenMangneSub = () =>
 {
  
   if(_.isEmpty(this.state.loginuser)){
  this.setState({viewloginmodel:true})
   }else{
    this.props.navigation.navigate('ManagePackge'); 
   }
 }
 onSubmit = async (amount) =>{
  let a = await PaypalUI(true,amount.toString())
 if(a == true){
   var currsub = this.state.currentsubscription
   currsub.person_limit = parseInt(this.state.currentsubscription.person_limit) + 1;
    this.setState({currentsubscription:currsub})
 }else{
   SNACKBAR.simple('Please complete your paymnet then to subscibe this package');
 }
}

onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

  render() {
    const  currentsubscription  = this.state.currentsubscription;
    
    return (
      <View style={{ flex: 1,backgroundColor: this.state.modal ? "transparent" : null,opacity: this.state.modal ? 0.03 : 1}} behavior="padding">
        
        <StatusBar translucent backgroundColor="transparent" />
       <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.modal}
      onRequestClose={this.onrequestModelclose}>
      <View style={styles.overlay} onTouchEnd={this.onrequestModelclose} />
      <View onTouchEnd={this.onrequestModelclose}
        style={[
          styles.modelContainer,
          {
            marginTop:  Metrics.screenHeight / 5,
          },
        ]}>
        <Text style={styles.modeltext} >
        You can add one more person by making a one time purchase
         or upgrade your plan to get more person
        </Text>
        <View style={{alignItems:'center', marginTop:'20%', marginBottom:'15%' }}>
        <Image
          source={require("../../assets/home/coin.png")}
          style={{
            height:77,
            width: 77,
          }}
        />
        </View>
        <PrimaryButton
          //disabled={saveBtnDisabled}
          //loading={loading}
          onPress={() => this.onSubmit("0.79")}
          title="ADD A PERSON FOR £0.79"
          marginTop={40}
        />
        <PrimaryButton2
            title= "           VIEW PLANS            " 
            onPress={()=>{this.props.navigation.navigate('ManagePackge') }}
            marginTop={height(10)}
            //loading={this.state.loading}
            onPress={this.ViewPlan }
          />
      </View>
    </Modal>
    <Modal
      animationType="fade"
      transparent={true}
      
      visible={this.state.viewplanmodel}
      onRequestClose={this.onrequestViewModelclose}>
      <View style={styles.overlay} onTouchEnd={this.onrequestViewModelclose} />
      <View onTouchEnd={this.onrequestViewModelclose}
        style={[
          styles.modelContainer,
          {
            marginTop:  Metrics.screenHeight / 5,
          },
        ]}>
        <Text style={styles.modeltext} >
        Sign in or create an account to get the full experience of this app
        </Text>
        
        <PrimaryButton
          title="        SIGN UP      "
          marginTop={8}
          onPress={()=>{this.props.navigation.navigate('Signup')}}
        />
        <PrimaryButton2
            title= "           LOGIN            " 
            onPress={() => this._onSaveUserSubscription()}
            marginTop={height(10)}
            //loading={this.state.loading}
            onPress={()=>{this.props.navigation.navigate('Login') }}
          />
        <PrimaryButton
          title="        SKIP NOW       "
          marginTop={40}
          onPress={()=>{this.setState({viewplanmodel:false})}}
        />
        
      </View>
    </Modal>
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
            marginTop:  Metrics.screenHeight / 2.5,
          },
        ]}>
        <Text style={styles.modeltext} >
        Sign in or create an account to get the full experience of this app
        </Text>
        
      
        <PrimaryButton
            title= "           Login            " 
            onPress={() => this._onSaveUserSubscription()}
            marginTop={height(5)}
            //loading={this.state.loading}
            onPress={()=>{this.props.navigation.navigate('Login') }}
          />
      
        
      </View>
    </Modal>

        <View style={{ paddingBottom:20, paddingTop:20, backgroundColor: COLORS.primary, flexDirection: 'row' }}>
          <View style={{ flex: 0.1, marginTop: height(5), marginLeft: 10 }}>
          <TouchableOpacity onPress={() => this.RBSheet.open()}>
          <Image 
                source={require('../../assets/home/menu.png')}
                
                style={{width:20, height:20}}
              />
              </TouchableOpacity>
            {/* <Icon name="bars" type="AntDesign" style={{ marginLeft: 10 }} onPress={() => this.RBSheet.open()}></Icon> */}
          </View>
         
          <View style={{flex:3,paddingTop:10, alignItems: 'center', marginTop: height(5),position: 'absolute', left: 0, right: 0}}>
              <Image 
                source={require('../../assets/packages/logo_small.png')}
                style={styles.logo}
              />
            </View>
        </View>
        <View style={{ flex: 1 }}>

        
          <View style={{ marginTop: height(5), height:height(9) }}>
          <View style={{  marginLeft: 17 }}>
          <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 26, color: '#28292F' }}>Let's Get Started!</Text>
            <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 14, color: '#868CA9', marginTop:'8%',alignSelf:'center' }}>Select number of individuals for your recipes</Text>
            
          </View>
            

            <View style={styles.alternativeLayoutButtonContainer}>
            <MinusButton
              title="-"
              onPress={this.DecreaseItem}
              marginTop={height(40)}
              disabled={this.state.clicks == 0 ? true : false}
              bdcolor={this.state.clicks == 0 ? '#868CA9' : COLORS.primary}
            // loading={this.state.loading}
            />

           <AnimatedNumbers
        includeComma
        animateToNumber={this.state.clicks}
        fontStyle={{fontSize: 30, fontWeight: 'bold'}}
      />
            
            {/* <Text style={{ alignItems:'center', backgroundColor:'#eee',  fontFamily: FONTFAMILY.extraBold,
             fontSize: 22, color: '#868CA9', marginTop:'5%' }}>
            { this.state.show ?  this.state.clicks  : '' }</Text> */}

        
      <PlusButton
              title="+"
              onPress={this.IncrementItem}
              marginTop={height(40)}
              disabled={this.state.clicks == parseInt(this.state.currentsubscription?.person_limit) ? true : false}
              bgcolor={this.state.clicks == parseInt(this.state.currentsubscription?.person_limit) ? '#dedede' : COLORS.primary}
            />
       
        </View>

            <View style={{alignSelf:'center'}}>
              <Text style={{fontFamily:FONTFAMILY.extraBold,marginTop:10}}>OR</Text>
            </View>

            <View style={styles.search}>
              <Input
              placeholder="Enter Number of individuals" maxLength={3 }
              style={ApplicationStyles.textbox}
              value={this.state.clicks}
              keyboardType={'numeric'}
              onChangeText={val => this.setState({'clicks': val.replace(/[^0-9]/g, '')})}
            />
            </View>

            
          </View>
          <View style={{ marginTop: height(5) }}>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop:20, position: 'absolute', left: 0, right: 0,bottom: this.state.bottomHeight, height: '15%', borderRadius: 10 }}>
         
          <View style={{ flex: 0.8 ,alignItems: 'center',position: 'absolute', left: 0, right: 0, justifyContent: 'center' }}>
            <PrimaryButton
              title="CONTINUE"
              onPress={() => this.modalOpen()}
              marginTop={height(40)}
            // loading={this.state.loading}
            />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={370}
          openDuration={400}
          customStyles={{
            container: {
          //    justifyContent: "center",
           //   alignItems: "center",
              borderTopEndRadius:15
            }
          }}
        >
          <View style={{flex:0.24,backgroundColor:COLORS.primary,flexDirection:'row'}}>
          {!_.isEmpty(this.state.loginuser) &&(
              <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:0.2}}>
            <View style={{margin:15,height:50,width:50,top:5,backgroundColor:'black',borderRadius:55,justifyContent:'center',alignItems:'center'}}>
            {this.state.loginuser.profile_image != null && (
                  <Image
                    source={{ uri: this.state.loginuser.profile_image }}
                    style={styles.avatar}
                  />
                )}
                {this.state.loginuser.profile_image == null && (
                  <Icon name="user" type="FontAwesome" style={{fontSize: 25, color: COLORS.primary}}></Icon>
                )}
               
                
            </View>
            </View>
            <View style={{flex:0.65,marginVertical:15,marginLeft:width(5),top:5}}>
              <Text style={{fontFamily:FONTFAMILY.bold,fontSize:17,color:'#fff'}}>{this.state.loginuser.first_name + " " + this.state.loginuser.last_name}</Text>
              <Text style={{fontFamily:FONTFAMILY.regular,fontSize:13,color:'#fff'}}>{this.state.loginuser.bio}</Text>
            </View>
            <View style={{flex:0.2,margin:5,justifyContent:'center',bottom:4}}>
            <TouchableOpacity onPress={()=>{
              this.RBSheet.close()
              this.props.navigation.navigate('UpdateProfile')
              }}>
            {/* <Icon style={{alignSelf:'flex-end', fontSize:18}} name={'edit'} type="MaterialIcons"  onPress={this.handlePicker}/> */}
            <Image 
                source={require('../../assets/icons/forms/edit-fill.png')}
                style={{fontSize: 22,alignSelf:'center', width:24, height:24}}
              />
            </TouchableOpacity>
            </View>
            </View>
          )}
            {_.isEmpty(this.state.loginuser) &&(
              <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:0.2}}>
            <View style={{margin:15,height:50,width:50,top:5,backgroundColor:'black',borderRadius:55,justifyContent:'center',alignItems:'center'}}>
                <Icon name="user" type="FontAwesome" style={{fontSize: 25, color: COLORS.primary}}></Icon>
            </View>
            </View>
            <View style={{flex:0.65,marginVertical:15,marginLeft:width(5),top:5}}>
              <Text style={{fontFamily:FONTFAMILY.bold,fontSize:17,color:'#fff'}}>Hi,</Text>
              <Text style={{fontFamily:FONTFAMILY.regular,fontSize:13,color:'#fff'}}>Sign in or create an account!</Text>
            </View>
            <View style={{flex:0.2,margin:15,justifyContent:'center',bottom:4}}>
            <TouchableOpacity onPress={()=>{
              this.RBSheet.close()
              this.props.navigation.navigate('SignupOptions')
              }}>
            <Icon name="user-plus" type="FontAwesome" style={{fontSize: 18,alignSelf:'flex-end'}}
             
            ></Icon>
            </TouchableOpacity>
            </View>
            </View>
            
            )}
            
          </View>
          <View style={{flex:0.73}}>
            <View style={{flex:0.25,flexDirection:'row',margin:7}}>
           
            <Image 
                source={require('../../assets/icons/forms/subscription.png')}
                style={{fontSize: 22,alignSelf:'center',color:COLORS.primary,left:5}}
              />
            {/* <Icon name="folder-open" type="MaterialIcons" ></Icon> */}
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}}
            onPress={()=>{
              this.RBSheet.close()
              this.OpenMangneSub()
              }}>Manage Subscription</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
           
            </View>
            <View style={{borderWidth:0.2,borderColor:'#868CA9',marginHorizontal:15}}>
            </View>
            <View style={{flex:0.24,flexDirection:'row',margin:7}}>
            <Icon name="bookmark" type="Feather" style={{fontSize: 22,alignSelf:'center',color:COLORS.primary,left:5}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}}
             onPress={()=>{
              this.RBSheet.close();
              this.openMyFav()
              }}>My Favourites</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
            </View>
            <View style={{borderWidth:0.2,borderColor:'#868CA9',marginHorizontal:15}}>
            </View>
            <View style={{flex:0.25,flexDirection:'row',margin:7}}>
            <Icon name="adduser" type="AntDesign" style={{fontSize: 22,alignSelf:'center',color:COLORS.primary,left:5}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}} onPress={this.onShare}>Invite Friends</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
            </View>
            <View style={{borderWidth:0.2,borderColor:'#868CA9',marginHorizontal:15}}>
            </View>
            <View style={{flex:0.25,flexDirection:'row',margin:7}}>
            <Icon name="star" type="EvilIcons" style={{fontSize: 22,alignSelf:'center',color:COLORS.primary,left:5}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}}
            onPress={()=>{
              this.RBSheet.close();
              this.RateApp()
              //this.props.navigation.navigate('Login')
              }}
            >Rate Applications</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
            </View>
            <View style={{borderWidth:0.2,borderColor:'#868CA9',marginHorizontal:15}}>
            </View>
            {!_.isEmpty(this.state.loginuser) &&(
            <View style={{flex:0.25,flexDirection:'row',margin:7}} >
            <Icon name="logout" type="MaterialIcons" style={{fontSize: 21,alignSelf:'center',color:COLORS.primary,left:8}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}} 
            onPress={()=>{
              this.RBSheet.close()
              this.removeItemValue()
              //this.props.navigation.navigate('Login')
              }}>Logout</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
            </View>
            )}
          </View>
        </RBSheet>
        </View>
        {this.state.currentsubscription.name == "Basic" &&(
        <WideBanner/>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:'5%',
    marginTop:'20%',
    marginBottom:'25%',

  },
  search: {
    flexDirection: 'row',
    //marginLeft: 5,
    marginTop: '12%',
    fontSize: 13,
    paddingBottom: '5%',
    fontFamily: FONTFAMILY.regular,
    marginHorizontal:'7%'
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
    marginHorizontal:'10%'
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

export default HomeCount;
