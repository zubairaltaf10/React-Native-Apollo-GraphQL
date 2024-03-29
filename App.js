import React from 'react';
import { Root } from "native-base";
import {Provider} from 'react-redux';
import MainApp from "./src/components/App";
import AppNavigation from './src/Navigation/AppNavigation';
import {BackHandler, UIManager, Platform} from 'react-native';
import BackButtonHandler from './src/Helpers/BackButtonHandler';
import {NavigationStateHandler} from './src/Helpers/ScreenTrackingMiddleware';
import NavigationService from './NavigationService';
import { NETWORK_INTERFACE } from './src/config';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Mutation , } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import AsyncStorage from '@react-native-community/async-storage';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link';
import Toast from "react-native-fast-toast";

const authLink = setContext(async (req, {headers}) => {
  const user = await AsyncStorage.getItem('user')
  let token = JSON.parse(user)
  return {
    ...headers,
    headers: { authorization: token ? `Bearer ${token. access_token}` : null }
  }
})
const uploadLink = createUploadLink({ uri: NETWORK_INTERFACE });
const client = new ApolloClient({
  link: ApolloLink.from([ authLink, uploadLink ]),
  cache : new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    }
  }
});

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// })
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
      
      <ApolloProvider client={client}>
        <AppNavigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          onNavigationStateChange={(prevState, currentState) =>
            NavigationStateHandler(prevState, currentState)
          }
        />
        <Toast ref={(ref) => global['toast'] = ref} />
        </ApolloProvider>
        
          );
  //   return (
  //   <Root>
  //   <MainApp />
  // </Root>
  //   );
  }
};


export default App;
