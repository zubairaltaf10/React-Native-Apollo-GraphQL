
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';

// import AsyncStorage from '@react-native-community/async-storage';
// import { withApollo } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';
// import { NETWORK_INTERFACE } from './index';
// import { createUploadLink } from 'apollo-upload-client'
// import { ApolloLink } from 'apollo-link';

//   const authLink = setContext((_, { headers }) => {
//     AsyncStorage.getItem('user')
//     .then(userData => JSON.parse(userData))
//     .then(userData =>{
//       const Token = userData.access_token
//        //console.log('token ' , Token)
//       return {
//         headers: {
//           ...headers,
//           authorization: `Bearer `+Token ,
//         }
//       }
//     })
//   })
//   const uploadLink = createUploadLink({ uri: NETWORK_INTERFACE });
//   export const client = new ApolloClient({
//     link: ApolloLink.from([authLink, uploadLink]),
//     cache: new InMemoryCache(),
//   });