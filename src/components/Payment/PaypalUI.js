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
const PaypalUI = async (show,amount) => {
    return new Promise((resolve, reject) => {
    if (show == true){
        BraintreeDropIn.show({
        clientToken: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTURjd09UVTVOREVzSW1wMGFTSTZJbU15TkdJd1pqQTFMVGswTVRRdE5EaGlOeTFpWlRJd0xUQXlOakUzTVRRek56QmpOeUlzSW5OMVlpSTZJbUo1Wm01blluTnpOVGh5T1dJeWVEVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pWW5sbWJtZGljM00xT0hJNVlqSjROU0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LndOcDJSZ0ltS3ZELUJPdDYyeVBDSjNFOTNmbUhWT2hwRHRKVnY5NV93QzRnbmV6VkhqM3RNdzlCZkF3UThmVHBEbHhkcjY5NjdZWmJFbDl1b2d1MGZ3IiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2J5Zm5nYnNzNThyOWIyeDUvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvYnlmbmdic3M1OHI5YjJ4NS9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6ImJ5Zm5nYnNzNThyOWIyeDUiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2J5Zm5nYnNzNThyOWIyeDUifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJhbGxvd0h0dHAiOnRydWUsImRpc3BsYXlOYW1lIjoiV2hhdCBZb3UgR290PyIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJtZXJjaGFudEFjY291bnRJZCI6IndoYXR5b3Vnb3QiLCJjdXJyZW5jeUlzb0NvZGUiOiJFVVIifX0=',
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
            return reject(false)
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
};

export default PaypalUI;
