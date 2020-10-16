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
const TabNav = createBottomTabNavigator(
  {
   
    VoiceOptions: {screen: LoginScreen},
    
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (focused) {
          iconName = icons[routeName].hover;
        } else {
          iconName = icons[routeName].simple;
        }
        return (
          <Image
            source={iconName}
            style={{width: 24, height: 24, marginTop: 4}}
          />
        );
      },
    }),
  },
);
const TabWithAds = props => {
  return (
    <>
    <TabNav {...props} />
      <WideBanner />
    </>
  );
};
//<TabNav {...props} />
TabWithAds.router = TabNav.router;

const AppStack = createStackNavigator(
  {
    Home: {
      screen: TabWithAds,
      navigationOptions: {header: null},
    },
    
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
    // Packages: {
    //   screen: PackagesScreen,
    //   navigationOptions: {header: null},
    // },
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
    Login: {
      screen: LoginScreen,
      navigationOptions: {header: null},
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {header: null},
    },
    Verification: {
      screen: VerificationScreen,
      navigationOptions: {header: null},
    },
    Packages: {
      screen: PackagesScreen,
      navigationOptions: {header: null},
    },
    Forgot: {
      screen: ForgotPassword,
      navigationOptions: {header: null},
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {header: null},
    },
    Intro :{
      screen: Intro,
      navigationOptions : {header : null}
    }
  },
  {
    transitionConfig: () => fromRight(500),
    initialRouteName: 'Login',
    headerLayoutPreset: 'center',
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