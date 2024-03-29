import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Modal
} from "react-native";
import Swiper from 'react-native-swiper'
import { height, width } from "react-native-dimension";
import PrimaryButton from '../Button/PrimaryButton';
import PrimaryButton2 from '../Button/PrimaryButton2';
import COLORS from '../../Theme/Colors';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import {Content, Form, Input, Icon} from 'native-base';
import { ApolloProvider, Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import SNACKBAR from '../../Helpers/SNACKBAR';
import AsyncStorage from '@react-native-community/async-storage';
import { parse } from "graphql";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PaypalUI from '../Payment/PaypalUI';
import packageSlider from '../Packages/packageSlider.json';
import {_} from 'lodash';
import {Metrics} from '../../Theme';
//(null)
class ManagePackages extends Component {
  swiperRef = React.createRef()
    async componentDidMount() {
      this._unsubscribe = this.props.navigation.addListener("didFocus", () => {
      //  console.log('check')
         this.loaduser();
       });
       this.loaduser();
      }
  loaduser = async () =>{
    let user = await AsyncStorage.getItem('user');
        // console.log('localstorage', user);
        if (user) {
          user = JSON.parse(user).user;
          this.setState({ loginuser: user });
          //console.log('user localstorage', this.state.loginuser);
          
          var subcription = user.user_subscription.subscription
          this.setState({ currentsubscription: subcription });
          //console.log('user subcription found in localstorage', this.state.currentsubscription);
          
          if(this.state.currentsubscription.name == "Basic"){
            let data = packageSlider.filter(p=>p.name == "Standard");
             this.setState({packageSlider:  data[0].Slider})
          }else if(this.state.currentsubscription.name == "Standard"){
              let data = packageSlider.filter(p=>p.name == "Basic");
               this.setState({packageSlider:  data[0].Slider})
            }else
            {
              let data = packageSlider.filter(p=>p.name == "Basic");
               this.setState({packageSlider:  data[0].Slider})
            }

            if(subcription.name == "Basic")
          {
            this.setState({cardClicked : "Standard" ,cardName:"Standard" , default: "Standard", pricepermonth: 2.49 , priceperyear:15.99  })
          
            
          }else{
            this.setState({cardClicked : "Basic" ,cardName:"Basic" , default: "Basic"    })
          }
        } else {
          this.props.navigation.navigate('Auth');
        }
  }  
      
  constructor(props) {
    super(props);
    this.state = {
      cardClicked: "Basic",
      cardName:'Basic',
      default:'Basic',
      subscription_id :1,
      loading:false,
      priceperyear:0,
      pricepermonth:0,
      showContextMenu:false,
      currentsubscription : {},
      subscriptionmodel : {},
      loginuser : {},
      yellowloading:false,
      packageSlider : [],
      allsubscriptions : [],
      model:false,
    }
  }

  componentWillReceiveProps(nextProps) 
      {
        if (this.props.subscriptions != nextProps.subscriptions){
          this.setState({
            allsubscriptions: this.props.subscriptions
          })
        }
      }
  
  getImage = (image) => {

    switch (image) {
        case "ingredients":
            return require('../../assets/packages/unlimited_ingredients.png')
            break;
        case "Meals":
            return require('../../assets/packages/meals.png')
            break;
        case "Nutritional":
            return require('../../assets/packages/nutitional_value.png')
            break;
        case "Calories":
              return require('../../assets/packages/calories.png')
              break;
        case "Advertisement":
                return require('../../assets/packages/adverts.png')
                break;
        case "NoAdvertisement":
                  return require('../../assets/packages/no_adverts.png')
                  break;     
        default:
            return require('../../assets/packages/unlimited_ingredients.png');
            break;
    }
}
  _onPressButton = async (model) => {
    if(model.name == "Basic")
    {
     let data = packageSlider.filter(p=>p.name == "Basic");
     //console.log(data[0].Slider)
      this.setState({packageSlider:  data[0].Slider})
    }
    if(model.name == "Standard")
    {
     let data = packageSlider.filter(p=>p.name == "Standard");
    // console.log(data[0].Slider)
      this.setState({packageSlider:  data[0].Slider})
    }
    if(model.name == "Premium")
    {
     let data = packageSlider.filter(p=>p.name == "Premium");
      this.setState({packageSlider:  data[0].Slider})
    }

    this.setState({default:'', cardClicked:model.name, cardName:model.name,pricepermonth:model.amount_per_month, subscription_id:model.id , priceperyear:model.amount_per_year})
    
   
  }

  onSubmit = async (amount , subcription, type) =>{
    if(subcription == "Basic"){
     this._onSaveUserSubscription(type);
 }else if(subcription == "Standard")
 {
   let a = await PaypalUI(true,amount.toString())
   if(a == true){
    this._onSaveUserSubscription(type);
   }else{
     SNACKBAR.simple('Please complete your paymnet then to subscibe this package');
   }
   
 }else if(subcription == "Premium"){
   let a = await PaypalUI(true,amount.toString())
   if(a == true){
    this._onSaveUserSubscription(type);
   }else{
     SNACKBAR.simple('Please complete your paymnet then to subscibe this package');
   }
 }

}
  _onSaveUserSubscription = async (type) => {
    type == "month" ?this.setState({loading:true}) :this.setState({yellowloading:true})
    
    this.props
    .mutate({
      variables: {
        user_id: this.state.loginuser.id,
        subscription_id:this.state.subscription_id
      },
    })
    .then((res) => {
      this.setState({loading:false, yellowloading:false})
     
      this.updateupdatelocalstorage( res.data.addUserSubscription.subscription)
    })
    .catch((err) => {
      this.setState({loading:false, yellowloading:false})
      console.log(JSON.stringify(err));
    });
  }
  async updateupdatelocalstorage(subscription)
      {
        this.setState({loading:false})
        
        let user = await AsyncStorage.getItem('user');
        
       if (user) {
         user = JSON.parse(user);
         user.user.user_subscription == null ? user.user.user_subscription = {subscription : {} } : user.user.user_subscription 
         user.user.user_subscription.subscription = subscription; 
        // this.setState({loginuser:user.user.user_subscription.subscription }) ;
         this.setState({currentsubscription:subscription }) ;
            
        
         
       }
       
       SNACKBAR.simple("Subscription updated successfully") ;
       AsyncStorage.setItem('user', JSON.stringify(user)).then(
        () => {
          
        },
      );
    }
    async cancelsubcriptionfromlocalstorage()
      {
        SNACKBAR.simple("Subscription cancel successfully") 
        let user = await AsyncStorage.getItem('user');
      
       if (user) {
         user = JSON.parse(user);
         let basicsub = {
          "name": "Basic",
          "person_limit": 3,
          "ingredient_limit": 3,
          "amount": null,
          "amount_per_year": null,
          "amount_per_month": null,
          "amount_description": "Free Plan",
          "trial_days": null,
          "description": "Upgrade anytime"
        } 
         user.user.user_subscription.subscription= basicsub; 
        let bb = await this.setState({currentsubscription:basicsub }) ;
      let nn =  await AsyncStorage.setItem('user', JSON.stringify(user))
       SNACKBAR.simple("Subscription shifted to  basic") 
       }
       
    }
  onCancelSubmit = () => {
     // var res = this._onSaveUserSubscription();
  };
  onrequestModelclose = () =>
  {
    this.setState({model: false})
  }
  onrequestModelOpen = () =>
  {
    console.log('dd')
    this.setState({model: true});
  }
  
  render() {
    const  currentsubscription  = this.state.currentsubscription;
    const { subscriptions } = this.props.data ? this.props.data : null;
    if (!subscriptions) {
      return <ActivityIndicator style={styles.spinner} color={Colors.primary} /> 
    }
    return (
      // <ScrollView>
      <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop:20 ,paddingBottom:20,backgroundColor: COLORS.primary, flexDirection: 'row' }}>
      <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.model}
      onRequestClose={this.onrequestModelclose}>
      <View style={styles.overlay} onTouchEnd={this.onrequestModelclose} />
      <View onTouchEnd={this.onrequestModelclose}
        style={[
          styles.modelContainer,
          {
            marginTop:  Metrics.screenHeight / 5,
          },
        ]}>
        <View>
          <Text style={{fontFamily:FONTFAMILY.bold, fontSize:14 , alignSelf:'center', alignItems:'center'}}>Are you sure!</Text>
        </View>
        <Text style={styles.modeltext} >
        Do you really want to unsubscribe? Your plan will be automatically downgraded to our free basic plan!
        </Text>
        <Mutation
            mutation={removemutation}
            variables={{ user_id: this.state.loginuser.id,
              subscription_id:this.state.subscription_id }}
             onError={()=>{SNACKBAR.simple("Error") ; }}
            onCompleted={ () => { this.cancelsubcriptionfromlocalstorage()} }
          >
           {mutation => (
        <PrimaryButton2
          title="            YES            "
          marginTop={40}
          onPress={mutation}
        />
        
            )} 
  </Mutation>
        <PrimaryButton
            title= "           NO            " 
            onPress={() =>{this.onrequestModelclose()}}
            marginTop={height(10)}
            //loading={this.state.loading}
            onPress={this.ViewPlan }
          />
      </View>
    </Modal>
          <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10, fontSize:18 }}></Icon>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={{ alignSelf: 'center', marginTop: height(4), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>Manage Subscription</Text>
          </View>
          <View style={{ flex: 0.2 ,marginTop: height(4), textAlign:'right' , alignItems:'center' , alignContent:'flex-end'}}>
      
        <Icon onPress={() => { this.setState({showContextMenu: !this.state.showContextMenu})}} name="dots-three-horizontal" type="Entypo" style={{ marginLeft: 10, fontSize:18 }}></Icon>
          </View>
        {this.state.showContextMenu && ( 
          <View style={styles.contextMenu}>
          
          <TouchableOpacity  onPress={this.onrequestModelOpen}
              >
            <View style={styles.row} >
               <Icon
              name="circle-with-cross"
              style={{fontSize:16, color:'red'}}
              type="Entypo"
            />
              <Text style={styles.contextMenuLabel} >Cancel Subcription</Text>
              </View>
            </TouchableOpacity>
             {/* </Mutation> */}
          </View>
         )}  
      
        </View>
        <View  styles={{marginBottom:10}}>
          <Text style={styles.toptext}>Your current plan </Text>
          <View >
         
          <View style={{ marginLeft: 10}} >
          
            <View style={styles.cardSimple}>
                <Text style={styles.planstext}>{currentsubscription?.name}</Text>
                <Text style={styles.plantext2}>{currentsubscription?.amount_description}</Text>
                <Text style={styles.plantext2}>{currentsubscription?.description}</Text>
              </View>
            </View>
        
          </View>
          <Text style={styles.upgradetext}>Upgrade your plan</Text>
        </View>
       
        <View style={{ flex: 0.75 }}>
        
          <Swiper     ref={(ref) => this._slider = ref} style={styles.wrapper } 
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,.2)',
                  width: 5,
                  height: 5,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3
                }}
              />
            }
            paginationStyle={{
              bottom: undefined, left: undefined, top: height(27), right: 0, alignItems: 'center', width: '100%', position: 'absolute'
            }}
            loop
            activeDot={
              <View
                style={{
                  backgroundColor: '#FFBD59',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3
                }}
              />
            }
            dot={
              <View
                style={{
                  backgroundColor: '#FFBD5959',
                  width: 5,
                  height: 5,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3
                }}
              />
            }
          >
             {this.state.packageSlider?.map((subscription) => (
            <View style={styles.slide1}>
              <Image resizeMode="contain" style={{height:'30%' , width:'20%'}} source={this.getImage(subscription.image)}></Image>
              <Text style={styles.text}>  {subscription.name}</Text>
            </View>
           ))}
            
            
          </Swiper>
        </View>
        {this.state.cardName == 'Basic' ?
          <View style={{ flex: 0.11, }}>
          <PrimaryButton
            title="CONTINUE"
            onPress={() => this.onSubmit(0,this.state.cardName, "month" )}
            marginTop={height(40)}
           loading={this.state.loading}
          />
        </View>
        :
        <View style={{ flex: 0.26 }}>
          <PrimaryButton
            title={ "SUBSCRIBE £" + this.state.pricepermonth + " / MONTH" }
            onPress={() => this.onSubmit(this.state.pricepermonth, this.state.cardName, "month")}
            marginTop={height(50)}
           loading={this.state.loading}
          />
          <PrimaryButton2
            title={ "SUBSCRIBE £" + this.state.priceperyear + " / YEAR" }
            onPress={() => this.onSubmit(this.state.priceperyear ,this.state.cardName, "year")}
            marginTop={height(10)}
            loading={this.state.yellowloading}
          />
        </View>
      }
        <View style={{ flex: 0.40 , marginTop:30, marginBottom:2}}>
        
          <View style={{ flexDirection: 'row' }}>
            <ScrollView
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
               {subscriptions.filter(p=>p.name != this.state.currentsubscription.name)?.map((subscription) => (
                <TouchableOpacity onPress={() => this._onPressButton(subscription)}>
            <View style={{ marginLeft: 10}} >
            <View style={this.state.cardClicked == subscription.name || this.state.default == subscription.name ? styles.cardStyleClicked : styles.cardStyleSimple}>
                <Text style={styles.planstext}>{subscription.name}</Text>
                <Text style={styles.plantext2}>{subscription.amount_description}</Text>
                <Text style={styles.plantext2}>{subscription.description}</Text>
              </View>
            </View>
            </TouchableOpacity>
           ))}
             
              
            </ScrollView>
          </View>
          </View>

      </View>
      // </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    contextMenuLabel: {
        marginLeft: 4,
        fontFamily: FONTFAMILY.medium,
      },
    contextMenu: {
        right: 13,
        backgroundColor: 'white',
        bottom: -15,
        position: 'absolute',
        zIndex: 100,
        elevation: 5,
        width:190,
        borderRadius: 8,
        paddingHorizontal:10,
        paddingVertical:3
      },
      contextMenuLabel: {
        marginLeft: 4,
        paddingTop:2,
        color:'#868CA9',
        fontFamily: FONTFAMILY.medium,
      },
        row: {
        flex: 1,
        padding:7,
        borderRadius:5,
        alignItems: 'center',
        width:180,
        flexDirection: 'row'
      },
      row1: {
        flexDirection: 'row',
        alignItems: 'center',
        width:180
      },
  wrapper: {},
  slide1: {
    flex: 0.80,
    // height:'60%',  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
     marginVertical: '2%',
    marginHorizontal:20,
    borderRadius: 5
    
  },
  slide2: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: height(3.5),
    borderRadius: 5
  },
  slide3: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: height(2.5),
    borderRadius: 5
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontFamily: FONTFAMILY.bold,
    fontWeight: 'bold',
    marginTop: 10
  },
  planstext: {
    color: 'black',
    fontSize: 16,
    fontFamily: FONTFAMILY.bold,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom:10,
    paddingLeft: 10
  },
  picktext: {
    color: '#868CA9',
    fontSize: 16,
    marginBottom:10,
    fontFamily: FONTFAMILY.bold,
    fontWeight: 'bold',
    marginTop: height(5),
    paddingLeft: 15
  },
  toptext: {
    color: '#868CA9',
    fontSize: 16,
    marginBottom:5,
    fontFamily: FONTFAMILY.bold,
    fontWeight: 'bold',
    marginTop: height(3),
    paddingLeft: 15
  },
  upgradetext: {
    color: '#868CA9',
    fontSize: 16,
    fontFamily: FONTFAMILY.bold,
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 15
  },
  footertext: {
    color: '#868CA9',
    fontSize: 11,
    fontFamily: FONTFAMILY.regular,
    marginTop: height(3),
    alignSelf: 'center',
    paddingLeft: 15,
    textAlign: 'center',
    lineHeight: height(3)

  },
  plantext2: {
    color: '#868CA9',
    fontSize: 12,
    fontFamily: FONTFAMILY.medium,
    marginTop: 2,
    paddingLeft: 10,
  },
  cardStyleSimple : {
    marginLeft: 1, 
    height: height(14), 
    width: width(45), 
    borderRadius: 10, 
    backgroundColor: '#fff', 
    marginTop: 10 
  },
  cardSimple : {
    marginLeft: 1, 
    height: height(14), 
    width: width(90), 
    borderRadius: 10, 
    backgroundColor: '#fff', 
    marginTop: 5 ,
    marginHorizontal:'2%'
  },
  cardStyleClicked : {
    marginLeft: 1, 
    height: height(14), 
    width: width(45), 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#fff', 
    marginTop: 10 
  },
  spinner: {
    marginRight: 20,
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
    marginTop: 30,
    marginBottom:30,
    color: '#868CA9',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FONTFAMILY.regular,
    marginHorizontal:5
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

const query = gql`

  query{ subscriptions
    {
      id,
      type,
      person_limit,
    ingredient_limit,
    amount,
    amount_description,
    amount_per_year,
    amount_per_month,
    name,
    trial_days,
    description
       
    }
  }
`;
const mutation = gql`
mutation addUserSubscription($user_id: Int!, $subscription_id: Int!){
  addUserSubscription(input:{
    user_id: $user_id,
    subscription_id:$subscription_id
  }){
    user{
      name
    },
    subscription{
      name,
      amount_per_month,
      amount_per_year,
      trial_days,
      amount,
      amount_description,
      person_limit,
      ingredient_limit,
      description
    }
  }
}
`;
const removemutation = gql`
mutation removeUserSubscription($user_id: Int!, $subscription_id: Int!){
  removeUserSubscription(input:{
    user_id: $user_id,
    subscription_id:$subscription_id
  }){
    status,
    message
  }
}
`;
export default graphql(mutation)(
  graphql(query)(ManagePackages)
);

