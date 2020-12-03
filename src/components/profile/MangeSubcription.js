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
import { withAuth } from "../../store/hoc/withAuth";
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
//(null)
class ManagePackages extends Component {
  swiperRef = React.createRef()
    async componentWillMount() {
       
         let user = await AsyncStorage.getItem('user');
         console.log('localstorage', user);
        if (user) {
          user = JSON.parse(user).user;
          this.setState({ loginuser: user });
          console.log('user localstorage', this.state.loginuser);
          
          var subcription = user.user_subscription.subscription
          this.setState({ currentsubscription: subcription });
          console.log('user subcription found in localstorage', this.state.currentsubscription);
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
      yellowloading:false
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
   if(this.state.cardClicked == "Basic")
   {
     if(model.name == "Standard")
     {
      this._slider.scrollBy(1, true)
     }
     else if(model.name == "Premium")
     {
      this._slider.scrollBy(2, true)
     }
   }
   if(this.state.cardClicked == "Standard")
   {
     if(model.name == "Basic")
     {
      this._slider.scrollBy(-1, true)
     }
     else if(model.name == "Premium")
     {
      this._slider.scrollBy(1, true)
     }
   }
   if(this.state.cardClicked == "Premium")
   {
     if(model.name == "Basic")
     {
      this._slider.scrollBy(-2, true)
     }
     else if(model.name == "Standard")
     {
      this._slider.scrollBy(-1, true)
     }
   }

    console.log("nameee"+model.name)
    await this.setState({subscriptionmodel:model})
   await this.setState({default:''})
   await this.setState({cardClicked:model.name})
   await this.setState({cardName:model.name})
   await this.setState({subscription_id:model.id})
   await this.setState({priceperyear:model.amount_per_year})
   await this.setState({pricepermonth:model.amount_per_month})

    console.log("dsadasdasd" +this.state.cardClicked)
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
    console.log(this.state.subscription_id);
    this.props
    .mutate({
      variables: {
        user_id: this.state.loginuser.id,
        subscription_id:this.state.subscription_id
      },
    })
    .then((res) => {
      this.setState({loading:false})
      this.setState({yellowloading:false})
      this.updateupdatelocalstorage( res.data.addUserSubscription.subscription)
    })
    .catch((err) => {
      this.setState({loading:false})
      this.setState({yellowloading:false})
      console.log(JSON.stringify(err));
    });
  }
  async updateupdatelocalstorage(subscription)
      {
        this.setState({loading:false})
        console.log(subscription);
        
        let user = await AsyncStorage.getItem('user');
        console.log(user)
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
        console.log('ssss')
        SNACKBAR.simple("Subscription cancel successfully") 
        let user = await AsyncStorage.getItem('user');
        console.log(user)
       if (user) {
         user = JSON.parse(user);

         user.user.user_subscription.subscription= {}; 
       }
       this.setState({currentsubscription:{} }) ;
       AsyncStorage.setItem('user', JSON.stringify(user)).then(
        () => {
          
        },
      );
    }
  onBasicSubmit = () => {
     // var res = this._onSaveUserSubscription();
  };

  render() {
    const { subscriptions } = this.props.data ? this.props.data : null;
   
    const  currentsubscription  = this.state.currentsubscription;
    console.log( 'sss ' + currentsubscription.name)
    if (!subscriptions) {
      return <ActivityIndicator style={styles.spinner} color={Colors.primary} /> 

    }
  //  const CrdStyle = this.state.cardClicked ? styles.cardStyleClicked : styles.cardStyleSimple
    //console.log(subscriptions)
    return (
     
      <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop:20 ,paddingBottom:20,backgroundColor: COLORS.primary, flexDirection: 'row' }}>
          <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10, fontSize:18 }}></Icon>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={{ alignSelf: 'center', marginTop: height(4), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>Manage Subscription</Text>
          </View>
          <View style={{ flex: 0.2 ,marginTop: height(4), textAlign:'right' , alignItems:'center' , alignContent:'flex-end'}}>
        {/* <TouchableOpacity style={{flex:1, width:40}} onPress={() =>
              this.setState({showContextMenu: !this.state.showContextMenu})
            }> */}
        
        <Icon onPress={() => { this.setState({showContextMenu: !this.state.showContextMenu})}} name="dots-three-horizontal" type="Entypo" style={{ marginLeft: 10, fontSize:18 }}></Icon>
          </View>
        {/* </TouchableOpacity> */}
        {this.state.showContextMenu && ( 
          <View style={styles.contextMenu}>
          <Mutation
            mutation={removemutation}
            variables={{ user_id: this.state.loginuser.id,
              subscription_id:this.state.subscription_id }}
             onError={()=>{SNACKBAR.simple("Error") ; }}
            onCompleted={ () => { this.cancelsubcriptionfromlocalstorage()} }
          >
          {mutation => (
            <TouchableOpacity  onPress={mutation}
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
            )} 
             </Mutation>
          </View>
         )}  
      
        </View>
        <View >
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
       
        <View style={{ flex: 0.8 }}>
        
          <Swiper     ref={(ref) => this._slider = ref} style={styles.wrapper} 
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
              bottom: undefined, left: undefined, top: height(30), right: 0, alignItems: 'center', width: '100%', position: 'absolute'
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
           {subscriptions.map((subscription) => { 
             return(
            <View style={styles.slide1} >
              <Image style={{width:52, height:52}} source={require('../../assets/packages/unlimited_ingredients.png')}></Image>
              <Text style={styles.text}>  {subscription.ingredient_limit == null ? "Unlimited" : subscription.ingredient_limit} ingredients</Text>
            </View>
           )})}
            
          </Swiper>
        </View>
        {this.state.cardName == 'Basic' ?
          <View style={{ flex: 0.11,marginTop:height(5) }}>
          <PrimaryButton
            title="CONTINUE"
            onPress={() => this.onSubmit(0,this.state.cardName, "month" )}
            marginTop={height(40)}
           loading={this.state.loading}
          />
        </View>
        :
        <View style={{ flex: 0.3 }}>
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
        <View style={{ flex: 0.4 , marginTop:20, marginBottom:10}}>
        
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
          </View>

      </View>

    );
  }
}
const styles = StyleSheet.create({
    contextMenuLabel: {
        marginLeft: 4,
        fontFamily: FONTFAMILY.medium,
      },
    contextMenu: {
        right: 10,
        backgroundColor: 'white',
        bottom: -10,
        position: 'absolute',
        zIndex: 100,
        elevation: 5,
        width:180,
        borderRadius: 8,
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
    flex: 0.95,
    // height:'60%',  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: height(4.5),
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

// export default graphql(mutation)(
//   graphql(query, {
//     options: (props) => {
//       //const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       // return {
//       //   variables: { userId: userInfo.id },
//       // };
//     },
//   })(Packages)
// );
//  const PackagesTab = graphql(query)(Packages);
//   export default withAuth(PackagesTab);
