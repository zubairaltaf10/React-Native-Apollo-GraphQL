import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from "react-native";
import Swiper from 'react-native-swiper'
import { height, width } from "react-native-dimension";
import PrimaryButton from '../Button/PrimaryButton';
import PrimaryButton2 from '../Button/PrimaryButton2';
import COLORS from '../../Theme/Colors';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import Icon from 'react-native-vector-icons/Entypo';
import { NETWORK_INTERFACE } from '../../config';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Mutation } from 'react-apollo';
import packageSlider from './packageSlider.json'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import SNACKBAR from '../../Helpers/SNACKBAR';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from "react-native-snackbar";
import { parse } from "graphql";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PaypalUI from '../Payment/PaypalUI'

class Packages extends Component {
  swiperRef = React.createRef()
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
      yellowloading:false,
      packageSlider : [],
    }
  }
  // componentDidUpdate = async () => {
  //   console.log(this.props.data);
  // }
  componentDidMount = async () =>{
     //g(this.props.data)
    let user = await AsyncStorage.getItem('user');
    //console.log("signup ", user)
   // DevSettings.reload()
     
     let data = packageSlider.filter(p=>p.name == "Basic");
     //console.log(data[0].Slider)
      this.setState({packageSlider:  data[0].Slider})

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
     this.setState({packageSlider:  data[0].Slider})
   }
   if(model.name == "Standard")
   {
    let data = packageSlider.filter(p=>p.name == "Standard");
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
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user).user;
   // console.log(user.id)
   // console.log(this.state.subscription_id)
    this.props
    .mutate({
      variables: {
        user_id: user.id,
        subscription_id:this.state.subscription_id
      },
    })
    .then((res) => {
      this.setState({loading:false, yellowloading:false})
     
      this.updateupdatelocalstorage(res.data.addUserSubscription.subscription)
     
    })
    .catch((err) => {
      this.setState({loading:false, yellowloading:false})
     
     // console.log(JSON.stringify(err));
    });
  }
  async updateupdatelocalstorage(subscription)
      {
        this.setState({loading:false})
       // console.log(subscription);
        
        let user = await AsyncStorage.getItem('user');
       // console.log(user)
       if (user) {
         user = JSON.parse(user);
         user.user.user_subscription == null ? user.user.user_subscription = {subscription : {} } : user.user.user_subscription 
         user.user.user_subscription.subscription = subscription; 
        }
       
       SNACKBAR.simple("Subscription added successfully") ;
       AsyncStorage.setItem('user', JSON.stringify(user)).then(
        () => {
          this.props.navigation.navigate('App');
        },
      );
    }
  onBasicSubmit = () => {
     // var res = this._onSaveUserSubscription();
  };

  render() {
    const { subscriptions } = this.props.data ? this.props.data : null;
    if (!subscriptions) {
      return <ActivityIndicator style={styles.spinner} color={Colors.primary} /> 

    }
  //  const CrdStyle = this.state.cardClicked ? styles.cardStyleClicked : styles.cardStyleSimple
    //console.log(subscriptions)
    return (
     
      <View style={{ flex: 1 }}>
       <StatusBar translucent backgroundColor="transparent" />
        <View style={{ flex: 0.2, paddingTop:20 ,backgroundColor: COLORS.primary, flexDirection: 'row' }}>
          <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
            <Icon name="cross" size={30} onPress={()=>{
              this.props.navigation.navigate("Home");
      }}></Icon>
          </View>
          <View style={{ flex: 0.75 }}>
            <Image style={{ alignSelf: 'center', marginTop: height(5) }} source={require('../../assets/packages/logo_small.png')}></Image>
          </View>

        </View>
        <View style={{ flex: 0.6 }}>
          <Swiper ref={(ref) => this._slider = ref} style={styles.wrapper}
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
              bottom: undefined, left: undefined, top: height(33), right: 0, alignItems: 'center', width: '100%', position: 'absolute'
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
              <Image source={this.getImage(subscription.image)}></Image>
              <Text style={styles.text}>  {subscription.name}</Text>
            </View>
           ))}
            
          </Swiper>
        </View>
        {this.state.cardName == 'Basic' ?
          <View style={{ flex: 0.12,marginTop:height(5) }}>
          <PrimaryButton
            title="CONTINUE"
             onPress={() => this.onSubmit(0,this.state.cardName , "month")}
            marginTop={height(40)}
           loading={this.state.loading}
          />
        </View>
        :
        <View style={{ flex: 0.2 }}>
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
        <View style={{ flex: 0.6 }}>
          <Text style={styles.picktext}>Pick your plan</Text>
          <View style={{ flexDirection: 'row' }}>
            <ScrollView
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
               {subscriptions?.map((subscription) => (
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
          <Text style={styles.footertext}>Your plan will be automatically subscribed after {'\n'}trial period</Text>
        </View>

      </View>

    );
  }
}
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 0.95,
    // height:'60%',  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: height(5.5),
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
    margin: height(3.5),
    borderRadius: 5
  },
  text: {
    color: 'black',
    fontSize: 22,
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
  }
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
         person_limit,
    ingredient_limit,
    amount,
    amount_per_year,
    amount_per_month,
    amount_description,
    name,
    trial_days,
    description
    }
  }
}
`;
export default graphql(mutation)(
  graphql(query)(Packages)
);

