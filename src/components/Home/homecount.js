import React from "react";
import { View, Text, Image, StyleSheet,Platform, TouchableWithoutFeedback, Button, Keyboard,KeyboardAvoidingView,Modal} from "react-native";
import { width, height } from "react-native-dimension";
import { Input, Toast } from "native-base";
import { withAuth } from "../../store/hoc/withAuth";
import {
  Icon,
  TouchableOpacity
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
//const [animateToNumber, setAnimateToNumber] = 0;
class HomeCount extends React.Component {
  async componentWillMount() {
       
    let user = await AsyncStorage.getItem('user');
   if (user) {
     user = JSON.parse(user);
     var subcription = user.user_subscription.subscription
     this.setState({ currentsubscription: subcription });
     this.setState({ loginuser: user });
     console.log('user subcription found in localstorage', this.state.currentsubscription);
   } else {
     this.props.navigation.navigate('Auth');
   }
  // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
  // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
 }
  constructor(props) {
    super(props);
  }
  state = {
    clicked: false,
    bottomHeight:0,
    clicks: 0,
    show: true,
    modal:false,
    currentsubscription: {},
    loginuser:{},
    modalVisible:false
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
  
    this.setState({ clicks: this.state.clicks + 1 });
    if(this.state.currentsubscription.person_limit < this.state.clicks)
    {

      this.setState({
        modalVisible: true});
    }

   // setAnimateToNumber(animateToNumber + this.state.clicks);
  }
  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
    //setAnimateToNumber(animateToNumber + this.state.clicks);
  }
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  }
  modalOpen = () => {
    this.setState({modal:true})
  }
  render() {
    const  currentsubscription  = this.state.currentsubscription;
    console.log( 'currentsubscription ' + currentsubscription.person_limit)
    if (!currentsubscription) {
      return <ActivityIndicator style={styles.spinner} color={Colors.primary} /> 
    }
    return (
      <View style={{ flex: 1,backgroundColor: this.state.modal ? "transparent" : null,opacity: this.state.modal ? 0.03 : 1}} behavior="padding">
        
       {/* //* Modal starts from here */}

        <Modal 
            animationType="fade"
            transparent={true}
            visible={this.state.modal}
            onRequestClose={() => this.setState({modalVisible: false})}
           // backdropOpacity={-1}
           >
          <View style={{flex: 1,justifyContent: "center", alignItems: "center"}}>
                    <View style={{flex:2,justifyContent:'center',alignContent:'center'}}>
                    <View style={{backgroundColor:'white',height:300,width:300}}>
                      <Text>
                      check
                      </Text>
                      </View>
                    </View>
          </View>
        </Modal>

        {/* /* ends here */}

        <View style={{ paddingBottom:20,backgroundColor: COLORS.primary, flexDirection: 'row' }}>
          <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
            <Icon name="bars" type="AntDesign" style={{ marginLeft: 10 }} onPress={() => this.RBSheet.open()}></Icon>
          </View>
         
          <View style={{flex:3, alignItems: 'center', marginTop:'8%',position: 'absolute', left: 0, right: 0}}>
              <Image 
                source={require('../../assets/packages/logo_small.png')}
                style={styles.logo}
              />
            </View>
        </View>
        <View style={{ flex: 1 }}>

        
          <View style={{ marginTop: height(5), height:height(9) }}>
          <View style={{  marginLeft: 17 }}>
          <Text style={{ fontFamily: FONTFAMILY.bold, fontSize: 25, color: 'black' }}>Let's Get Started</Text>
            <Text style={{ fontFamily: FONTFAMILY.regular, fontSize: 14, color: '#868CA9', marginTop:'8%' }}>Select number of individuals for your recipes</Text>
            
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
            // loading={this.state.loading}
            />
       
        </View>


            <View style={styles.search}>
             
              {/* <Input style={{ alignSelf: 'center', color: '#868CA9', marginTop: height(1), fontFamily: FONTFAMILY.regular, fontSize: 14, alignSelf: 'center' }}
                placeholder="Enter number of individuals"
                // onChangeText={val => this.onTextInput('loginPassword', val)}
                // value={this.state.type}
                maxLength={16}>
              </Input> */}
              <Input
              placeholder="First Name" maxLength={12}
              style={ApplicationStyles.textbox}
              //value={this.state.formData.firstName}
              //onChangeText={val => this.onTextInput('firstName', val)}
            />
            </View>

            
          </View>
          <View style={{ marginTop: height(5) }}>
          </View>
        </View>
        <View style={{ flexDirection: 'row', position: 'absolute', left: 0, right: 0,bottom: this.state.bottomHeight, height: '20%', borderRadius: 10 }}>
         
          <View style={{ flex: 0.9 ,alignItems: 'center',position: 'absolute', left: 0, right: 0, justifyContent: 'center' }}>
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
              borderRadius:15
            }
          }}
        >
          <View style={{flex:0.24,backgroundColor:COLORS.primary,flexDirection:'row'}}>
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
            <Icon name="user-plus" type="FontAwesome" style={{fontSize: 18,alignSelf:'flex-end'}}></Icon>
            </View>
          </View>
          <View style={{flex:0.73}}>
            <View style={{flex:0.25,flexDirection:'row',margin:7}}>
            <TouchableOpacity onPress={() =>
             this.props.navigation.navigate('ManagePackge')
            }>
        
            <Icon name="folder-open" type="MaterialIcons" style={{fontSize: 22,alignSelf:'center',color:COLORS.primary,left:5}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}}>Manage Subscription</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
           </TouchableOpacity>
            </View>
            <View style={{borderWidth:0.2,borderColor:'#868CA9',marginHorizontal:15}}>
            </View>
            <View style={{flex:0.24,flexDirection:'row',margin:7}}>
            <Icon name="folder-open" type="MaterialIcons" style={{fontSize: 22,alignSelf:'center',color:COLORS.primary,left:5}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}}>My Favourites</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
            </View>
            <View style={{borderWidth:0.2,borderColor:'#868CA9',marginHorizontal:15}}>
            </View>
            <View style={{flex:0.25,flexDirection:'row',margin:7}}>
            <Icon name="adduser" type="AntDesign" style={{fontSize: 22,alignSelf:'center',color:COLORS.primary,left:5}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}}>Invite Friends</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
            </View>
            <View style={{borderWidth:0.2,borderColor:'#868CA9',marginHorizontal:15}}>
            </View>
            <View style={{flex:0.25,flexDirection:'row',margin:7}}>
            <Icon name="star" type="EvilIcons" style={{fontSize: 22,alignSelf:'center',color:COLORS.primary,left:5}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}}>Rate Application</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
            </View>
            <View style={{borderWidth:0.2,borderColor:'#868CA9',marginHorizontal:15}}>
            </View>
            <View style={{flex:0.25,flexDirection:'row',margin:7}}>
            <Icon name="logout" type="MaterialIcons" style={{fontSize: 21,alignSelf:'center',color:COLORS.primary,left:8}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}}>Logout</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
            </View>
          </View>
        </RBSheet>
        </View>
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
    marginTop:'15%',
    marginBottom:'45%',

  },
  search: {
    flexDirection: 'row',
    //marginLeft: 5,
    marginTop: 15,
    fontSize: 13,
    paddingBottom: 5,
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
  }

})

export default withAuth(HomeCount);
