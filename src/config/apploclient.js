
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import AsyncStorage from '@react-native-community/async-storage';
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { NETWORK_INTERFACE } from './index';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link';

const authLink = setContext(async (req, {headers}) => {
    const user = await AsyncStorage.getItem('user')
    let token = JSON.parse(user)
    return {
      ...headers,
      headers: { authorization: token ? `Bearer ${token. access_token}` : null }
    }
  })
  const uploadLink = createUploadLink({ uri: NETWORK_INTERFACE });
  export const client = new ApolloClient({
    link: ApolloLink.from([ authLink, uploadLink ]),
      cache : new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
        }
      }
  });