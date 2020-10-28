import Splash from "../components/Splash/Splash";
import Login from "../components/Auth/Login";
import Intro from "../components/Auth/Intro";
import Signup from "../components/Auth/Signup";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const SplashNavigator = createStackNavigator(
    {
      Splash,
    },
    {
      headerShown: false,
      headerMode: "none",
      initialRouteName: "Splash",
    },
  );
  const AuthNavigator = createSwitchNavigator(
    {
      Login,
      Intro,
      Signup,
      
    },
    {
      initialRouteName: "Login",
      headerShown: false,
      headerMode: "none",
    },
  );

  const RootNavigator = createSwitchNavigator(
    {
      SplashNavigator,
      AuthNavigator,
    //  AppNavigator,
    },
    {
      initialRouteName: "SplashNavigator",
      headerShown: false,
      headerMode: "none",
    },
  );
  export default createAppContainer(RootNavigator);
