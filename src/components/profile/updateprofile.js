import React, {Component,useState} from 'react';
import {
  Text,
  LayoutAnimation,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  StatusBar,
  Modal
} from 'react-native';
import {Content, Form, Input, Icon} from 'native-base';
import {ApplicationStyles} from '../../Theme';
import PrimaryButton from '../Button/PrimaryButton';
import styles from '../../Styles/auth.styles';
//import WideBanner from '../../Components/Ads/WideBanner';
import {GetSignupErrors} from '../../Helpers/GetErrors';
import ErrorLabel from '../ErrorLabel/ErrorLabel';
import COLORS from '../../Theme/Colors';
import {withAuth} from '../../store/hoc/withAuth';
import ToggleSwitch from 'toggle-switch-react-native';
import { NETWORK_INTERFACE } from '../../config';
import { ApolloClient, } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Mutation } from 'react-apollo'
import { width, height } from "react-native-dimension";
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import SNACKBAR from '../../Helpers/SNACKBAR';
import Header from '../Header/index.js';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import UpdatePassword from './UpdatePassword';
import ImagePicker from 'react-native-image-picker'
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import {Metrics} from '../../Theme';
import AsyncStorage from '@react-native-community/async-storage';
const httpLink = createHttpLink({
  uri: NETWORK_INTERFACE,
});
// const client = new ApolloClient({
//   link: new HttpLink({ uri: NETWORK_INTERFACE }),
//   cache: new InMemoryCache()
// })

const authLink = setContext((_, { headers }) => {
  console.log('fff')
  // get the authentication token from local storage if it exists
  AsyncStorage.getItem("user").then((value) => {
    console.log(value.access_token)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${value.access_token}` : "",
      }
    }

})
 
  // return the headers to the context so httpLink can read them
 
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const onRequestClose = false;

class UpdateProfile extends Component {
  
  constructor(props) {
    super(props);
   
    this.state = {
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        roleId: 1,
        date:null,
        loading:false,
        image:""
      },
      isPasswordFieldSecure: true,
      isnewPasswordFieldSecure:true,
      isConfirmPasswordFieldSecure: true,
      errors: ['errors'],
      isOnToggleSwitch: false,
      changepasswordmodel:false,
      userimage:"",
      isuserimage:false,
      loginuser:{}
    };
    
  }
  async componentWillMount() {
       
    let user = await AsyncStorage.getItem('user');
   if (user) {
     user = JSON.parse(user).user;
     this.setState({ formData: user });
     console.log('form data' , this.state.formData);
   } else {
     //this.props.navigation.navigate('Auth');
   }

 }
  handlePicker = () => {
    // console.log('edit');
    ImagePicker.showImagePicker({}, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({image:response.data})
        this.setState({userimage:response.uri})
        this.setState({isuserimage:true})
       // setAvatar({uri: response.uri});userimage
        // here we can call a API to upload image on server
      }
    });
  };
  onTextInput = (key, val) => {
    this.setState({formData: {...this.state.formData, [key]: val}});
    // remove error
    const newErrors = this.state.errors;
    let errIndex = newErrors.indexOf(key);
    if (errIndex !== -1) {
      newErrors.splice(errIndex, 1);
      this.setState({errors: newErrors});
    }
  };
  
  onSubmit = () => {
    //this.props.navigation.navigate('ResetPassword');
   
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({errors: GetSignupErrors(this.state.formData)}, () => {
      console.log(this.state.errors.length)
      
      if (this.state.errors.length === 0) {
        this.setState({loading:true})
        let firstName = this.state.formData.first_name;
        let lastName = this.state.formData.last_name; 
        this.props
      .mutate({
        variables: {
          firstname: firstName,
          lastname:lastName,
          email:email,
          password: password,
        },
      })
      .then((res) => {
        this.setState({loading:false})
        this.props.navigation.navigate('Verification', {
          type: 'Signup',
          email:email});
      })
      .catch((err) => {

        this.setState({loading:false})
       // var error = JSON.stringify(err);
       // console.log(error)
        if(err.graphQLErrors.length > 0)
        {
          var mess = err.graphQLErrors[0].message
          if(mess.includes("Validation")){
            SNACKBAR.simple("Email address already exist");
          }
        }
        
      });
      }
    });
  };

  modalOpen = () => {
    this.setState({changepasswordmodel:true})
  }
  onTextInput = (key, val) => {
    this.setState({formData: {...this.state.formData, [key]: val}});
    // remove error
    const newErrors = this.state.errors;
    let errIndex = newErrors.indexOf(key);
    if (errIndex !== -1) {
      newErrors.splice(errIndex, 1);
      this.setState({errors: newErrors});
    }
  };
  
  handleSecurityVerification = () => {
    this.setState({
      isPasswordFieldSecure: !this.state.isPasswordFieldSecure,
    })
  };
  handleSecurity2 = () => {
    this.setState({
      isnewPasswordFieldSecure: !this.state.isnewPasswordFieldSecure,
    })
  };
  handleSecurity3 = () => {
    this.setState({
      isConfirmPasswordFieldSecure: !this.state.isConfirmPasswordFieldSecure,
    })
  };
  render() {
    return (
      <ApolloProvider>
        <Content style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <UpdatePassword
          modalVisible={this.state.changepasswordmodel}
          onRequestClose={() => this.setState({changepasswordmodel: false})}
          isPasswordFieldSecure={this.state.isPasswordFieldSecure}
          isnewPasswordFieldSecure={this.state.isnewPasswordFieldSecure}
          isConfirmPasswordFieldSecure={this.state.isConfirmPasswordFieldSecure}
          //user={this.props.auth.user}
          handleSecurityVerification={this.handleSecurityVerification}
          handleSecurity2={this.handleSecurity2}
          handleSecurity3={this.handleSecurity3}
          onChangeText={password =>
                  this.onTextInput('password', password)
                }
                onChangeText1={password =>
                  this.onTextInput('newpassword', password)
                }
                onChangeText2={password =>
                  this.onTextInput('confirmpassword', password)
                }
        />
        <View style={{ paddingBottom:20,backgroundColor: COLORS.primary, flexDirection: 'row' }}>
          <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
            <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10, fontSize:18 }}></Icon>
          </View>
          <View style={{ flex: 0.8 }}>
            <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>My ingredients</Text>
          </View>
        </View>
      
          <View >
          
            <View style={styles.headerContent}>
            
            <View style={styles.avatar}>
            {!this.state.isuserimage && (
              <Icon name="user" type="FontAwesome" style={{  fontSize:36 , color:COLORS.primary}}></Icon>
                )}
                {this.state.isuserimage && (
                  <Image
                    source={{ uri: this.state.userimage }}
                    style={styles.avatar}
                  />
                )}
            
                  
            </View>
            <View style={styles.avatareditcircle}>
            <Icon style={{justifyContent: 'center', alignItems:'center' , fontSize:18}} name={'edit'} type="MaterialIcons"  onPress={this.handlePicker}/>
            </View>
            
            </View>
           
          </View>
        
          <Form style={styles.editform}>
          <Text style={styles.label}>First Name</Text>
          <View style={{marginHorizontal:'3%'}}>
          <Input 
              placeholder="First Name" maxLength={12}
              style={ApplicationStyles.textbox}
              value={this.state.formData.first_name}
              onChangeText={val => this.onTextInput('firstName', val)}
            />
            {ErrorLabel('firstName', this.state.errors)}
          </View>
            
            <Text style={styles.label}>Last Name</Text>
            <View style={{marginHorizontal:'3%'}}>
            <Input
              placeholder="Last Name" maxLength={12}
              style={ApplicationStyles.textbox}
              value={this.state.formData.last_name}
              onChangeText={val => this.onTextInput('lastName', val)}
            />
            {ErrorLabel('lastName', this.state.errors)}
            </View>
            <Text style={styles.label}>Email Address</Text>
            <View style={{marginHorizontal:'3%'}}>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              style={ApplicationStyles.textbox}
              value={this.state.formData.email}
              onChangeText={val => this.onTextInput('email', val)}
            />
            {ErrorLabel('email', this.state.errors)}
            </View>
            <Text style={styles.label}>Bio</Text>
            <View style={{marginHorizontal:'3%'}}>
            <Input
              placeholder="Bio"
              
              style={ApplicationStyles.textbox}
              value={this.state.formData.email}
              onChangeText={val => this.onTextInput('email', val)}
            />
            </View>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={{marginHorizontal:'3%'}}>
           
  
        </View>
        <Text style={styles.skipAccountLabel}>
                
                <Text
                  style={styles.redText}
                  onPress={this.modalOpen}>
                Change Password
                </Text>
              </Text>
         

      <View style={{flex:0.25,flexDirection:'row',margin:17, padding:10, backgroundColor:'#fff'}}>
            <Icon name="delete" type="MaterialIcons" style={{fontSize: 22,alignSelf:'center',color:COLORS.primary,left:5}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#868CA9',alignSelf:'center',top:2,marginLeft:15}}>Delete my account</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
            </View>
            {/* <WideBanner /> */}
          </Form>
        </Content>
        <View style={{alignItems:'center' , paddingBottom:'7%' }} >
        <PrimaryButton
              loading={this.state.loading}
              title="   Update   "
              onPress={this.onSubmit}
              marginTop={30}
            />
        </View>
        </ApolloProvider>

    );
  }
}



const mutation = gql`
mutation updateUser($Id: Int!, $firstname: String!, $lastname: String! ,$email: String!, $DateofBirth: Date!){
  updateUser(input: {
    Id:$Id,
    first_name: $firstname,
    last_name: $lastname,
    bio: $password,
    date_of_birth: $DateofBirth
  }){
    tokens{
      access_token,
      user{
        id,
        name,
        email
      }
    },
    status
  }
}
`;
const UpdateProfileTab = graphql(mutation)(UpdateProfile);
export default withAuth(UpdateProfileTab);


