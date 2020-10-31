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
import { NETWORK_INTERFACE } from './src/config';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Mutation } from 'react-apollo'
const client = new ApolloClient({
  link: new HttpLink({ uri: NETWORK_INTERFACE }),
  cache: new InMemoryCache()
})
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', BackButtonHandler);
  }
  render() {
  
    return (
      <Provider store={STORE}>
      <ApolloProvider client={client}>
        <AppNavigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          onNavigationStateChange={(prevState, currentState) =>
            NavigationStateHandler(prevState, currentState)
          }
        />
        </ApolloProvider>
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
