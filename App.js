import React from 'react';
import { Root } from "native-base";
import {Provider} from 'react-redux';
import MainApp from "./src/components/App";
import {STORE} from './src/store/index';
import AppNavigation from './src/Navigation/AppNavigation';
import {BackHandler, UIManager, Platform} from 'react-native';
import BackButtonHandler from './src/Helpers/BackButtonHandler';
import {NavigationStateHandler} from './src/Helpers/ScreenTrackingMiddleware';
import NavigationService from './NavigationService';
class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', BackButtonHandler);
  }
  render() {
  
    return (
      <Provider store={STORE}>
        <AppNavigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          onNavigationStateChange={(prevState, currentState) =>
            NavigationStateHandler(prevState, currentState)
          }
        />
      </Provider>
    );
  //   return (
  //   <Root>
  //   <MainApp />
  // </Root>
  //   );
  }
};


export default App;
