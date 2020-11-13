import React, {Component,useState} from 'react';
import {
  Text,
  LayoutAnimation,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch
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
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Mutation } from 'react-apollo'
import { width, height } from "react-native-dimension";
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import SNACKBAR from '../../Helpers/SNACKBAR';
import Header from '../Header/index.js';
import { FONTSIZES, FONTFAMILY } from '../../Theme/Fonts';
const client = new ApolloClient({
  link: new HttpLink({ uri: NETWORK_INTERFACE }),
  cache: new InMemoryCache()
})


class UpdateProfile extends Component {
  
  constructor(props) {
    super(props);
   
    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: 1,
        date,
        loading:false
      },
      isPasswordFieldSecure: true,
      isConfirmPasswordFieldSecure: true,
      errors: ['errors'],
      isOnToggleSwitch: false,
    };
    
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
  
  onSubmit = () => {
    //this.props.navigation.navigate('ResetPassword');
   
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({errors: GetSignupErrors(this.state.formData)}, () => {
      console.log(this.state.errors.length)
      if(this.state.isOnToggleSwitch == false)
      {
        SNACKBAR.simple("Please check term and condition.");
        return;
      }
      
      if (this.state.errors.length === 0) {
        this.setState({loading:true})
        let firstName = this.state.formData.firstName;
        let lastName = this.state.formData.lastName; 
        let email = this.state.formData.email;
        let password = this.state.formData.password; 
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

  renderitem = () => {
    return (
      <>
         <View style={docCardStyles.contextMenu}>
            <TouchableOpacity
              style={docCardStyles.row}
              onPress={this.handleEdit}>
             
              <Text style={docCardStyles.contextMenuLabel}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[docCardStyles.row, {borderBottomWidth: 0}]}
              onPress={this.handleDelete}>
              <Text style={docCardStyles.contextMenuLabel}>Delete</Text>
            </TouchableOpacity>
          </View>
      </>
    );
  };
  render() {
    return (
      <ApolloProvider>
        
        <Content style={styles.container}>
        <View style={{ paddingBottom:20,backgroundColor: COLORS.primary, flexDirection: 'row' }}>
          <View style={{ flex: 0.1, marginTop: height(4), marginLeft: 10 }}>
            <Icon name="arrowleft" type="AntDesign" style={{ marginLeft: 10, fontSize:18 }}></Icon>
          </View>
          <View style={{ flex: 0.8 }}>
            <Text style={{ alignSelf: 'center', marginTop: height(4.5), fontFamily: FONTFAMILY.regular, fontSize: 16 }}>My ingredients</Text>
          </View>
        </View>
      
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            </View>
          </View>
        
          <Form style={styles.editform}>
          <Text style={styles.label}>First Name</Text>
          <View style={{marginHorizontal:'3%'}}>
          <Input 
              placeholder="First Name" maxLength={12}
              style={ApplicationStyles.textbox}
              value={this.state.formData.firstName}
              onChangeText={val => this.onTextInput('firstName', val)}
            />
            {ErrorLabel('firstName', this.state.errors)}
          </View>
            
            <Text style={styles.label}>Last Name</Text>
            <View style={{marginHorizontal:'3%'}}>
            <Input
              placeholder="Last Name" maxLength={12}
              style={ApplicationStyles.textbox}
              value={this.state.formData.lastName}
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
            <DateTimePicker 
        value={ date }
        mode='default'
        display='default'
        onChange={ date => this.onTextInput('date', val)} />
    );
</View>
<Text style={styles.skipAccountLabel}>
        
        <Text
          style={styles.redText}
          onPress={() => this.props.navigation.navigate('App')}>
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
        </ApolloProvider>

    );
  }
}

const mutation = gql`
mutation register($firstname: String!, $lastname: String! ,$email: String!, $password: String!){
  register(input: {
    first_name: $firstname,
    last_name: $lastname,
    email: $email,
    password: $password,
    password_confirmation: $password
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


