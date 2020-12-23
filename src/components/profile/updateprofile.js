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
  TextInput,
  Modal
} from 'react-native';
import {Content, Form, Input, Icon} from 'native-base';
import {ApplicationStyles} from '../../Theme';
import PrimaryButton from '../Button/PrimaryButton';
import styles from '../../Styles/auth.styles';
//import WideBanner from '../../Components/Ads/WideBanner';
import {GetProfileErrors} from '../../Helpers/GetProfileErrors';
import {GetPasswordErrors} from '../../Helpers/GetProfileErrors';
import ErrorLabel from '../ErrorLabel/ErrorLabel';
import COLORS from '../../Theme/Colors';
import ToggleSwitch from 'toggle-switch-react-native';
import { NETWORK_INTERFACE } from '../../config';
import { ApolloClient, } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Mutation } from 'react-apollo'
import { width, height } from "react-native-dimension";
import gql from 'graphql-tag';
import { graphql, compose } from "react-apollo";
import SNACKBAR from '../../Helpers/SNACKBAR';
import Header from '../Header/index.js';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
import UpdatePassword from './UpdatePassword';
import ImagePicker from 'react-native-image-picker'
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import {Metrics} from '../../Theme';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as mime from 'react-native-mime-types';
import { ReactNativeFile } from 'apollo-upload-client';
import { withApollo } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link';
import { parse } from 'graphql';
//import {client} from '../../config/apploclient'
const onRequestClose = false;
const authLink = setContext(async (req, {headers}) => {
  const user = await AsyncStorage.getItem('user')
  let token = JSON.parse(user)
  return {
    ...headers,
    headers: { authorization: token ? `Bearer ${token. access_token}` : null }
  }
})
// 
const uploadLink = createUploadLink({ uri: NETWORK_INTERFACE });
const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

class UpdateProfile extends Component {
  
  constructor(props) {
    super(props);
   
    this.state = {
      formData: {
        id:0,
        first_name: '',
        last_name: '',
        email: '',
        roleId: 1,
        date:null,
        bio:"",
        date_of_birth : new Date(),
        
        loading:false,
        image:"",
        deleteaccountpassword:"",
      },
      isPasswordFieldSecure: true,
      isnewPasswordFieldSecure:true,
      isConfirmPasswordFieldSecure: true,
      errors: ['errors'],
      isOnToggleSwitch: false,
      changepasswordmodel:false,
      userimage:"",
      image:"",
      isuserimage:false,
      loginuser:{},
      date: new Date(),
      show:false,
      passworddata :{
        old_password:"",
        password:"",
        confirmPassword:""
      },
      loading:false,
      passswordloading:false,
      deleteloading:false,
      deletemodal:false
    };
    
  }
  convertDateToString = (date) =>  {
    date = date.getFullYear() + '-' + (("0" + (date.getMonth() + 1)).slice(-2)) + '-' + ("0"+date.getDate()).slice(-2)
    return date;
}
  hideDateTimePicker = () => {
    this.setState({ show: false });
  };
  handleDatePicked = date => {
        let _date = this.convertDateToString(date);
   
    this.setState({ date: _date });
    this.hideDateTimePicker();
  };
  async componentWillMount() {
     
  

    let user = await AsyncStorage.getItem('user');
   if (user) {
     user = JSON.parse(user).user;
     this.setState({ formData: user });
    
     if(this.state.formData.profile_image != null){
       this.setState({ isuserimage: true});
     }
     this.setState({date: this.state.formData.date_of_birth})


   } else {
     //this.props.navigation.navigate('Auth');
   }

 }
  handlePicker = () => {
   
    ImagePicker.showImagePicker({}, (response) => {
      
      if (response.didCancel) {
        
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
       
        this.setState({userimage:response.uri})
        this.setState({isuserimage:true})
        const file =  this.generateRNFile(response.uri, response.fileName)
       
        this.setState({image:file})
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
  onPasswordTextInput = (key, val) => {
    console.log(key , val)
    this.setState({passworddata: {...this.state.passworddata, [key]: val}});
    // remove error
    const newErrors = this.state.errors;
    let errIndex = newErrors.indexOf(key);
    if (errIndex !== -1) {
      newErrors.splice(errIndex, 1);
      this.setState({errors: newErrors});
    }
  };
  handleChange(date) {
    this.setState({
      date: date
    })
  }
  onSubmit = () => {
    //this.props.navigation.navigate('ResetPassword');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({errors: GetProfileErrors(this.state.formData)}, () => {
    
      
      if (this.state.errors.length === 0) {
        this.setState({loading:true})
        let firstName = this.state.formData.first_name;
        let lastName = this.state.formData.last_name; 
        client
      .mutate({
        mutation: updatemutation,
        variables: {
          ID:  parseInt(this.state.formData.id),
          firstname: this.state.formData.first_name,
          lastname:this.state.formData.last_name,
          DateofBirth: this.state.date,
          bio: this.state.formData.bio,
          profile_image: this.state.image == "" ? null : this.state.image
        },
      })
      .then((res) => {
        this.setState({loading:false})
        this.updateupdatelocalstorage()
        SNACKBAR.simple('Profile updated successfully.');
      })
      .catch((err) => {
        this.setState({loading:false})
        SNACKBAR.simple('Error in updating profile');
      });
   }
   });
  };
   generateRNFile(uri, name) {
    return uri ? new ReactNativeFile({
      uri,
      type: mime.lookup(uri) || 'image/jpg',
      name,
    }) : null;
  }
  async updateupdatelocalstorage()
  {
    let user = await AsyncStorage.getItem('user');
   if (user) {
     user = JSON.parse(user);
     user.user.first_name= this.state.formData.first_name; 
     user.user.last_name= this.state.formData.last_name;
     user.user.bio =  this.state.formData.bio
     user.user.date_of_birth = this.state.date;
    user.user.profile_image = this.state.userimage
     
   }

   AsyncStorage.setItem('user', JSON.stringify(user)).then(
    () => {
      
    },
  );

  let users = await AsyncStorage.getItem('user');
   if (user) {
    //console.log('user ss' , users)
     
   }

  }
   
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
  updatepassword = () => {
    this.setState({errors: GetPasswordErrors(this.state.passworddata)}, () => {
      
      if (this.state.errors.length === 0) {
        this.setState({passswordloading:true})
        client
      .mutate({
        mutation: mutation,
        variables: {
          old_password:this.state.passworddata.old_password,
          password:this.state.passworddata.password,
          password_confirmation:this.state.passworddata.confirmPassword
        },
      })
      .then((res) => {
        this.setState({passswordloading:false})
        this.setState({changepasswordmodel:false})
        SNACKBAR.simple('Password updated.');
      })
      .catch((err) => {
        this.setState({passswordloading:false})
        console.log(err)
        if(err.graphQLErrors.length > 0)
        {
          var mess = err.graphQLErrors[0].message
          if(mess.includes("Validation")){
            SNACKBAR.simple('Old password is incorrect');
          }
        }
        

      });
    }
    });
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
  showDatepicker = () => {
    this.setState({
      show: true,
    })
  };
  async logout() {
    try {
        await AsyncStorage.removeItem('user'); 
        this.props.navigation.navigate('Auth'); 
      }
    catch(exception) {
      this.props.navigation.navigate('Auth'); 
        return false;
        
    }
}
onrequestModelclose = () =>
 {
   this.setState({deletemodal: false})
 }
 deletemodel = () =>
 {
   this.setState({deletemodal: true})
 }
 deleteaccount = () =>{
   this.setState({deleteloading:true})
        client
      .mutate({
        mutation: deleteaccountmutation,
        variables:{ password: this.state.formData.deleteaccountpassword}
      })
      .then((res) => {
        this.setState({deleteloading:false})
        SNACKBAR.simple("account has been deleted")
        this.logout();
      })
      .catch((err) => {
        
        this.setState({deleteloading:false})
        //console.log(err)

        if(err.graphQLErrors.length > 0)
        {
          var mess = err.graphQLErrors[0].message
          if(mess.includes("Authentication")){
            SNACKBAR.simple('Password is incorrect');
          }
        }
      });

 }
  render() {
    return (
     
        <Content style={styles.profilecontainer}>
        <StatusBar translucent backgroundColor="transparent" />
        <UpdatePassword
          modalVisible={this.state.changepasswordmodel}
          onRequestClose={() => this.setState({changepasswordmodel: false})}
          isPasswordFieldSecure={this.state.isPasswordFieldSecure}
          isnewPasswordFieldSecure={this.state.isnewPasswordFieldSecure}
          isConfirmPasswordFieldSecure={this.state.isConfirmPasswordFieldSecure}
          loading={this.state.passswordloading }
          handleSecurityVerification={this.handleSecurityVerification}
          handleSecurity2={this.handleSecurity2}
          handleSecurity3={this.handleSecurity3}
          updatepassword={this.updatepassword}
          errors={this.state.errors}
          onChangeText={password =>
                  this.onPasswordTextInput('old_password', password)
                }
                onChangeText1={password =>
                  this.onPasswordTextInput('password', password)
                }
                onChangeText2={password =>
                  this.onPasswordTextInput('confirmPassword', password)
                }
        />
        <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.deletemodal}
      onRequestClose={this.onrequestModelclose}>
      <View style={styles.overlay} onTouchEnd={this.onrequestModelclose} />
      <View
        style={[
          styles.modelContainer,
          {
            marginTop: Metrics.screenHeight / 8,
          },
        ]}>
         <Text style={styles.modelHeading}>
                         Delete Account
          </Text>
            <Text style={styles.modeltext}>
            Please enter Password to delete account
            </Text>
            <View style={styles.passwordFieldContainer}>
              <TextInput
                placeholder="Password"
                secureTextEntry={this.state.isnewPasswordFieldSecure}
                maxLength={16}
                style={ApplicationStyles.textbox}
                onChangeText={val => this.onTextInput('deleteaccountpassword', val)}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={this.handleSecurity2
                }>
                {!this.state.isnewPasswordFieldSecure && (
                  <Icon name="eye" type="AntDesign" style={{fontSize: 16, color: COLORS.primary}}></Icon>
                 
                )}
                {this.state.isnewPasswordFieldSecure && (
                  <Image
                    source={require('../../assets/icons/forms/eye-close-fill.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            
          
        <PrimaryButton
              loading={this.state.deleteloading}
              title="   DELETE ACCOUNT   "
              onPress={()=>{ this.deleteaccount()}}
              marginTop={5}
            />
          
            
      </View>
    </Modal>
        <View style={{ paddingTop:20, paddingBottom:20,backgroundColor: COLORS.primary, flexDirection: 'row' }}>
          <View style={{ flex: 0.1, marginTop: height(5), marginLeft: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10, fontSize:18 }}></Icon>
         </TouchableOpacity>
          </View>
          <View style={{ flex: 0.8 }}>
            <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>Account Settings</Text>
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
            <Image 
                source={require('../../assets/icons/forms/edit-fill.png')}
                style={{justifyContent: 'center', alignItems:'center',alignSelf:'center', width:18, height:18}}
              />
            {/* <Icon style={{justifyContent: 'center', alignItems:'center' , fontSize:18}} name={'edit'} type="MaterialIcons"  onPress={this.handlePicker}/> */}
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
              onChangeText={val => this.onTextInput('first_name', val)}
            />
            {ErrorLabel('firstName', this.state.errors)}
          </View>
            
            <Text style={styles.label}>Last Name</Text>
            <View style={{marginHorizontal:'3%'}}>
            <Input
              placeholder="Last Name" maxLength={12}
              style={ApplicationStyles.textbox}
              value={this.state.formData.last_name}
              onChangeText={val => this.onTextInput('last_name', val)}
            />
            {ErrorLabel('lastName', this.state.errors)}
            </View>
            <Text style={styles.label}>Email Address</Text>
            <View style={{marginHorizontal:'3%'}}>
            <Input
            disabled={true}
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
              value={this.state.formData.bio}
              onChangeText={val => this.onTextInput('bio', val)}
            />
            </View>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={{marginHorizontal:'3%'}}>
            <Input
              placeholder="Date of birth"
              value={this.state.date}
              style={ApplicationStyles.textbox}
              //onChangeText={val => this.onTextInput('date_of_birth', val)}
              //value={this.state.formData.date_of_birth}
              onFocus={this.showDatepicker}
            />
            <TouchableOpacity
                style={styles.eyeIcon}
                >
                <Icon name="calendar" type="MaterialCommunityIcons" style={{fontSize: 16, color: COLORS.primary}}></Icon>
                 
               
              </TouchableOpacity>
            <DateTimePicker
            isVisible={this.state.show}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          testID="dateTimePicker"
           
          display="default"
          dateFormat="yyyy-MM-dd"
          //onChange={this.handleDatePicked}
          mode={"date"}
            datePickerModeAndroid={"spinner"}
            timePickerModeAndroid={"spinner"}
        />
          
  
        </View>
        <Text style={styles.skipAccountLabel}>
                
                <Text
                  style={styles.redText}
                  onPress={this.modalOpen}>
                Change Password
                </Text>
              </Text>
         

      <View style={{flex:0.25,flexDirection:'row',margin:17, padding:10, backgroundColor:'#fff'}}>
        <TouchableOpacity style={{flex:1,flexDirection:'row', backgroundColor:'#fff'}} onPress={this.deletemodel}>
            <Icon name="delete" type="MaterialIcons" style={{fontSize: 22,alignSelf:'center',color:'#FF3A55',left:5}}></Icon>
            <Text style={{flex:0.96,fontFamily:FONTFAMILY.regular,fontSize:14,color:'#FF3A55',alignSelf:'center',top:2,marginLeft:15}}>Delete my account</Text>
            <Icon name="chevron-right" type="Entypo" style={{fontSize: 16,alignSelf:'center'}}></Icon>
            </TouchableOpacity>
            </View>
            {/* <WideBanner /> */}
          </Form>
          <View style={{alignItems:'center' , paddingBottom:'7%' }} >
        <Mutation
        context={{hasUpload: true}}
            mutation={ updatemutation}
            variables={{ ID: this.state.formData.id,
          firstname: this.state.formData.first_name,
          lastname:this.state.formData.last_name,
          DateofBirth: this.state.date,
          bio: this.state.formData.bio,
          profile_image: this.state.image == "" ? null : this.state.image }}
            onCompleted={ () => { SNACKBAR.simple("Profile updated") ; this.updateupdatelocalstorage()  } }
          >
          {mutation => (
        <PrimaryButton
              loading={this.state.loading}
              title="   UPDATE   "
              onPress={() => { this.onSubmit() }}
              marginTop={30}
            />
            )}
            </Mutation>
        </View>
        </Content>
       

    );
  }
}

 

const updatemutation = gql`
mutation updateUser($ID:ID!, $firstname: String, $lastname: String , $DateofBirth: Date, $bio: String, $profile_image:Upload){
  updateUser(input: {
    id:$ID,
    first_name: $firstname,
    last_name: $lastname,
    bio: $bio,
    date_of_birth: $DateofBirth,
    profile_image:$profile_image,
  }){
    name,
    first_name,
    last_name,
    email_verified_at,
    bio
  }
}
`;
const deleteaccountmutation = gql`
mutation deleteAccount($password: String!){
  deleteAccount(
    password:$password,
  ){
    status
  }
}
`;
const mutation = gql`
mutation updatePassword($old_password: String!, $password: String! , $password_confirmation: String!){
  updatePassword(input: {
    old_password:$old_password,
    password:$password,
    password_confirmation:$password_confirmation
    }){
    status,
    message
  }
} 
`;

//  const UpdateProfileTab = graphql(mutation)
//  (withApollo);
export default withApollo(UpdateProfile);


