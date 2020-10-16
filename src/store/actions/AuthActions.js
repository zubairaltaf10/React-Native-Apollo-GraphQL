import * as types from '../types';
import {Alert} from 'react-native';
import {FULFILLED, PENDING, REJECTED} from '../utils/constants';
import Axios from 'axios';
import API from '../../Constants/API';
import NavigationService from '../../routes/Routes';
import AsyncStorage from '@react-native-community/async-storage';
import COLORS from '../../Theme/Colors';
import SNACKBAR from '../../Helpers/SNACKBAR';

const setTokenInHeaders = token => {
  Axios.defaults.headers.common.Authorization = token;
};

const reLogin = user => dispatch => {
  setTokenInHeaders(user.token);
  dispatch({type: types.LOGIN + FULFILLED, payload: {user}});
};

const login = (formData, showSecurityQuestionModel) => async dispatch => {
  dispatch({type: types.LOGIN + PENDING});

  Axios.post(API.login, {
    userName: formData.userNameOrEmail,
    password: formData.loginPassword,
  })
    .then(data => {
      let userData = data.data.data;
      console.log('userData after login', userData);
      dispatch({type: types.LOGIN + FULFILLED, payload: {user: userData}});
      setTokenInHeaders(userData.token);
      showSecurityQuestionModel();
      console.log('dispatched');
    })
    .catch(err => {
      // if user response object exists
      console.log('err', err);
      console.log('err', err.response.data);
      if (
        err.response.data.data &&
        err.response.data.data.email_verified === 0
      ) {
        let userData = err.response.data.data;
        setTokenInHeaders(userData.token);
        dispatch({type: types.LOGIN + FULFILLED, payload: {user: userData}});
        Axios.post(API.sendVerificationCode, {
          email: formData.userNameOrEmail,
        })
          .then(res => {
            NavigationService.navigate('Verification', {
              verificationCode: res.data.data.code,
              type: 'UnverifiedLogin',
            });
          })
          .catch(e =>
            SNACKBAR.simple(
              'Unable to send verification email, Please retry later.',
            ),
          );
      } else {
        SNACKBAR.simple(err.response.data.message);
        dispatch({
          type: types.LOGIN + REJECTED,
          error: err.response.data.message,
        });
      }
    });
};

const logout = user => async dispatch => {
  await AsyncStorage.clear();
  dispatch({type: types.LOGOUT + FULFILLED});
  NavigationService.navigate('Auth');
};

const signup = formData => async dispatch => {
  dispatch({type: types.SIGNUP + PENDING});
  Axios.post(API.signup, formData)
    .then(data => {
      let userData = data.data.data;
      console.log('userData', userData);
      console.log('dispatched');
      setTokenInHeaders(userData.token);
      dispatch({type: types.SIGNUP + FULFILLED, payload: {user: userData}});
      NavigationService.navigate('Verification', {
        verificationCode: userData.verificationCode,
        type: 'Signup',
      });
    })
    .catch(err => {
      console.log('CATCH IN SIGNUP--', err.response.data.message);
      dispatch({
        type: types.SIGNUP + REJECTED,
        payload: {error: err},
      });
      if (typeof err.response.data.message === 'object') {
        if (err.response.data.message.error.userName) {
          Alert.alert('Failed', err.response.data.message.error.userName);
        }
        if (err.response.data.message.error.email) {
          Alert.alert('Failed', err.response.data.message.error.email);
        }
      } else {
        Alert.alert('Oops!', err.response.data.message);
      }
    });
};

const verifyEmail = (userID, type) => {
  console.log('userID in verifyEmail', userID);
  console.log('type in verifyEmail', type);
  return dispatch => {
    dispatch({type: types.VERIFY_EMAIL + PENDING});
    Axios.put(
      API.update + userID,
      {verifyEmail: true},
      {headers: {'content-type': 'application/json'}},
    )
      .then(data => {
        let userData = data.data.data;
        console.log('userData in update', userData);
        setTokenInHeaders(userData.token);
        AsyncStorage.setItem('user', JSON.stringify(userData)).then(() => {
          dispatch({
            type: types.VERIFY_EMAIL + FULFILLED,
            payload: {user: userData},
          });
          if (type === 'Signup') {
            NavigationService.navigate('Packages');
          } else if (type === 'UnverifiedLogin') {
            NavigationService.navigate('App');
          }
        });
      })
      .catch(err => {
        dispatch({type: types.VERIFY_EMAIL + REJECTED, error: err.response});
        console.log('CATCH IN verify email--', err.response);
      });
  };
};

const sendVerificationCode = email => async dispatch => {
  try {
    dispatch({type: types.SEND_VERIF_CODE + PENDING});
    const res = await Axios.post(API.sendVerificationCode, {email});
    dispatch({type: types.SEND_VERIF_CODE + FULFILLED});
    return {verificationCode: res.data.data.code};
  } catch (e) {
    Alert.alert('Error', e.response.data.message);
    dispatch({type: types.SEND_VERIF_CODE + REJECTED});
  }
};

const updatePassword = formData => async dispatch => {
  try {
    dispatch({type: types.UPDATE_PASSWORD + PENDING});
    const res = await Axios.post(API.updatePassword, formData);
    dispatch({type: types.UPDATE_PASSWORD + FULFILLED});
    setTimeout(() => {
      SNACKBAR.simple('Password reset successfull!');
    }, 300);
    return res.data;
  } catch (e) {
    console.warn('errr updatePassword', e);
    SNACKBAR.simple('Unable to update password! Please retry');

    dispatch({type: types.UPDATE_PASSWORD + REJECTED});
  }
};

export {
  login,
  reLogin,
  signup,
  logout,
  verifyEmail,
  sendVerificationCode,
  updatePassword,
};
