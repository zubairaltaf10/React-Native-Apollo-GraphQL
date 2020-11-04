import React from 'react';
import {Text, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import SplashScreen from '../components/Splash/Splash';
import SignupScreen from '../components/Auth/Signup';
import PackagesScreen from '../components/Packages/Packages';
import Intro from '../components/Auth/Intro';
import VerificationScreen from '../components/Auth/Verification';
import LoginScreen from '../components/Auth/Login';
import ForgotPassword from '../components/Auth/ForgotPassword';
import WideBanner from '../components/Ads/WideBanner';
import styles from '../Styles/NavigationStyles';
import ResetPassword from '../components/Auth/ResetPassword';
import SignupOptionsScreen from '../components/Auth/signupoptions';
import HomeScreen from '../components/Home/ingredentsinput';

const AppStack = createStackNavigator(
  {
    
    
    // Type: {
    //   screen: Type,
    //   navigationOptions: {header: null},
    // },
    // Documents: {
    //   screen: Documents,
    //   navigationOptions: {header: null},
    // },
    // DocumentUploaded: {
    //   screen: DocumentUploaded,
    //   navigationOptions: {header: null},
    // },
    Home: {
      screen: HomeScreen,
      navigationOptions: {header: null},
    },
    // Library: {
    //   screen: Library,
    //   navigationOptions: {header: null},
    // },
  },
  {
    transitionConfig: () => fromRight(500),
    initialRouteName: 'Home',
    headerLayoutPreset: 'center',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

const AuthStack = createStackNavigator(
  {
    Verification: {
      screen: VerificationScreen,
      navigationOptions: {header: false},
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {header: false},
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {header: true},
    },
   
    Packages: {
      screen: PackagesScreen,
      navigationOptions: {header: false},
    },
    Forgot: {
      screen: ForgotPassword,
      navigationOptions: {header: true, headerBackTitleVisible:true },
      
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {header: false},
    },
    Intro :{
      screen: Intro,
      navigationOptions : {header : false}
    },
    SignupOptions :{
      screen: SignupOptionsScreen,
      navigationOptions : {header : false}
    }
  },
  {
    transitionConfig: () => fromRight(500),
    initialRouteName: 'Login',
    headerLayoutPreset: 'center',
    cardStyle: { backgroundColor: '#FFFFFF' },
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

const App = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Splash',
  },
);
export default createAppContainer(App);