import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { NETWORK_INTERFACE,SANDBOX_BRAINTREE } from '../../config';
import gql from 'graphql-tag';
import SNACKBAR from '../../Helpers/SNACKBAR';


const uploadLink_braintree = createUploadLink({ uri: SANDBOX_BRAINTREE });
//const HttpLink = HttpLink({ uri: "https://payments.sandbox.braintree-api.com/graphql" });
const  authLink_braintree =  setContext((_, { headers } )  =>  {
  
return {
  headers: {
    ...headers,
    "Authorization": "Basic ZzkzNGtnZjQ2N3hrMzlrNjo4MzlkZTIxM2NmZDA0OTBkNDYyM2IxMmYwMzczOTVhYw==",
    "Braintree-Version": "2019-01-01",
    "Content-Type":"application/json"
  }
}
})
const client_braintree = new ApolloClient({ 
  link: ApolloLink.from([ authLink_braintree , uploadLink_braintree]),
  cache : new InMemoryCache(),
});

const mutations = gql`
mutation chargePaymentMethod($input: ChargePaymentMethodInput!) {
      chargePaymentMethod(input: $input) {
        transaction {
          id
          status
        }
      }
    }`
;
const mutations2 = gql`
mutation ExampleClientToken($input: CreateClientTokenInput) {
  createClientToken(input: $input) {
    clientToken
  }
}`
;

const PaypalUI = async (show,amount) => {
    return new Promise(async(resolve, reject) => {
     await client_braintree.mutate({
        mutation: mutations2,
        variables: {
          CreateClientTokenInput: {
            merchant : "byfngbss58r9b2x5",
          }
        }
      }).then(async (data) => {
        if (show == true && data){
          BraintreeDropIn.show({
          clientToken: data.data.createClientToken.clientToken,
       //   merchantIdentifier: 'applePayMerchantIdentifier',
          googlePayMerchantId: 'byfngbss58r9b2x5',
       //   countryCode: 'US',    //apple pay setting
          currencyCode: 'USD',   //apple pay setting
       //   merchantName: 'Your Merchant Name for Apple Pay',
          orderTotal:amount.toString(),
          googlePay: true,
          applePay: false,
          vaultManager: false,
          cardDisabled: false,
          darkTheme: true,
        })
        .then(result => 
          { 
              if (result) {
            executePayment(result.nonce,amount.toString())
              }
              else {
                  return reject(false)
              }
          })
        .catch((error) => {
          if (error.code === 'USER_CANCELLATION') {
           //   return reject(false)
            // update your UI to handle cancellation
          } else {
            console.log(error.toString())
            SNACKBAR.simple(error.toString());
            // update your UI to handle other errors
          }
        });
      }
  
    const executePayment = (nonce, amount) => {
        client_braintree.mutate({
            mutation: mutations,
            variables: {
              input: {
                paymentMethodId: nonce,
                transaction: {
                  amount: amount
                }
              }
            }
          })
            .then(async (data) => {
              console.log(data + "running")
              SNACKBAR.simple('Successfully Paid');
              return resolve(true)
  
            })
            .catch((err) => {
              SNACKBAR.simple(err.toString());
              console.log(err)
              return reject(false)
            })
           // return true
         //  return resolve(true)
  
          }
  
      })
      }).catch((err) => {
        SNACKBAR.simple(err.toString());
        console.log(err)
        return reject(false)
      })

    
};

export default PaypalUI;
