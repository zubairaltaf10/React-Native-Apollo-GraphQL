import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { withAuth } from "../../store/hoc/withAuth";
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
import { ApolloProvider, Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import SNACKBAR from '../../Helpers/SNACKBAR';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from "react-native-snackbar";
import { parse } from "graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: NETWORK_INTERFACE }),
  cache: new InMemoryCache()
})
class Packages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardClicked: "",
      cardName:'Basic',
      default:'Basic',
      subscription_id :1,
      loading:false,
     // subscriptions :[]
    }
  }
  // componentDidUpdate = async () => {
  //   console.log(this.props.data);
  // }
  //  componentDidMount = async () =>{
  //    console.log(this.props.data)
  //   await this.setState({subscriptions:this.props.data ? this.props.data : null})
  // } 

  _onPressButton = async (model) => {
    console.log(model)
    this.setState({default:''})
    this.setState({cardClicked:model.name})
    this.setState({cardName:model.name})
    this.setState({subscription_id:model.id})

    console.log(this.state.cardClicked)
  }
  _onSaveUserSubscription = async () => {
    this.setState({loading:true})
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    console.log((Number)(user.id))
    console.log((Number)(this.state.subscription_id))
    this.props
    .mutate({
      variables: {
        user_id: (Number)(user.id),
        subscription_id:(Number)(this.state.subscription_id)
      },
    })
    .then((res) => {
      this.setState({loading:false})
      this.props.navigation.navigate('App');
    })
    .catch((err) => {
      this.setState({loading:false})
      console.log(JSON.stringify(err));
    });
  }
  onBasicSubmit = () => {
     // var res = this._onSaveUserSubscription();
  };

  render() {
    const { subscriptions } = this.props ? this.props.data : null;
  //  const CrdStyle = this.state.cardClicked ? styles.cardStyleClicked : styles.cardStyleSimple
    console.log(subscriptions)
    return (
     
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.2, backgroundColor: COLORS.primary, flexDirection: 'row' }}>
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
          <Swiper style={styles.wrapper}
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
           {subscriptions?.map((subscription) => (
            <View style={styles.slide1}>
              <Image source={require('../../assets/packages/unlimited_ingredients.png')}></Image>
              <Text style={styles.text}>  {subscription.ingredient_limit} ingredients</Text>
            </View>
           ))}
            
          </Swiper>
        </View>
        {this.state.cardName == 'Basic' ?
          <View style={{ flex: 0.12,marginTop:height(5) }}>
          <PrimaryButton
            title="Continue"
             onPress={() => this._onSaveUserSubscription()}
            marginTop={height(40)}
          // loading={this.state.loading}
          />
         
        </View>
        :
        <View style={{ flex: 0.2 }}>
          <PrimaryButton
            title="Subscribe $3.49/MONTH"
            onPress={() => this._onSaveUserSubscription()}
            marginTop={height(50)}
          // loading={this.props.auth.loadingLogin}
          />
          <PrimaryButton2
            title="Subscribe $3.49/YEAR"
            onPress={() => this._onSaveUserSubscription()}
            marginTop={height(10)}
           //loading={this.props.auth.loadingLogin}
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
                <Text style={styles.plantext2}>{subscription.amount}</Text>
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
    margin: height(5.5),
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
    fontSize: 20,
    fontFamily: FONTFAMILY.bold,
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 10
  },
  picktext: {
    color: '#868CA9',
    fontSize: 15,
    fontFamily: FONTFAMILY.bold,
    fontWeight: 'bold',
    marginTop: height(5),
    paddingLeft: 15
  },
  footertext: {
    color: '#868CA9',
    fontSize: 14,
    fontFamily: FONTFAMILY.regular,
    marginTop: height(3),
    alignSelf: 'center',
    paddingLeft: 15,
    textAlign: 'center',
    lineHeight: height(3)

  },
  plantext2: {
    color: '#868CA9',
    fontSize: 16,
    fontFamily: FONTFAMILY.medium,
    marginTop: 8,
    paddingLeft: 10,
  },
  cardStyleSimple : {
    marginLeft: 1, 
    height: height(16), 
    width: width(45), 
    borderRadius: 10, 
    backgroundColor: '#fff', 
    marginTop: 10 
  },
  cardStyleClicked : {
    marginLeft: 1, 
    height: height(16), 
    width: width(45), 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#fff', 
    marginTop: 10 
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
    amount_per_year,
    amount_per_month,
    name,
    trial_days,
    description
       
    }
  }
`;
const mutation = gql`
mutation addUserSubscription($userid: Number!, $subid: Number!){
  addUserSubscription(input:{
    user_id: $userid,
    subscription_id: $subid
  }){
    user{
      name
    },
    subscription{
      name
    }
  }
}
`;
export default graphql(mutation)(
  graphql(query)(Packages)
);
//  const PackagesTab = graphql(query)(Packages);
//   export default withAuth(PackagesTab);
