// import {
//   SET_LOADING_STATE,
//   LOGOUT_USER,
//   LOGIN_USER,
// } from '../constants/userConstants';
// import {Platform, Alert} from 'react-native';
// import Axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
// import API from '../../Constants/API';
// import NavigationService from '../../../NavigationService';

// export const setLoadingState = loading => ({
//   type: SET_LOADING_STATE,
//   loading,
// });
// export const loginUserAct = user => ({
//   type: LOGIN_USER,
//   user: user,
// });
// export const logoutUserAct = () => ({
//   type: LOGOUT_USER,
// });

// const setTokenInHeaders = token => {
//   Axios.defaults.headers.common.Authorization = token;
// };

// const signupUser = formData => {
//   return dispatch => {
//     dispatch(setLoadingState({name: 'signup'}));
//     Axios.post(API.signup, formData)
//       .then(data => {
//         let userData = data.data.data;
//         console.log('userData', userData);
//         console.log('dispatched');
//         setTokenInHeaders(userData.token);
//         dispatch(loginUserAct(userData));
//         NavigationService.navigate('Verification', {
//           verificationCode: userData.verificationCode,
//           type: 'Signup',
//         });
//       })
//       .catch(err => {
//         console.log('CATCH IN SIGNUP--', err.response.data.message);
//         if (typeof err.response.data.message === 'object') {
//           if (err.response.data.message.error.userName) {
//             Alert.alert('Failed', err.response.data.message.error.userName);
//           }
//           if (err.response.data.message.error.email) {
//             Alert.alert('Failed', err.response.data.message.error.email);
//           }
//         } else {
//           Alert.alert('Oops!', err.response.data.message);
//         }
//       })
//       .finally(() => dispatch(setLoadingState({})));
//   };
// };

// const updateUser = (formData, type) => {
//   return dispatch => {
//     console.log('type in updateUser', type);
//     dispatch(setLoadingState({name: 'Signup'}));
//     Axios.put(API.update + formData.user_id, formData).then(data => {
//       let userData = data.data.data;
//       console.log('userData in update', userData);
//       setTokenInHeaders(userData.token);
//       AsyncStorage.setItem('user', JSON.stringify(userData)).then(() => {
//         dispatch(loginUserAct(userData));
//         if (type === 'Signup') {
//           NavigationService.navigate('Packages');
//         } else {
//           NavigationService.navigate('ResetPassword');
//         }
//       });
//     });
//   };
// };

// const verifyEmail = (userID, type) => {
//   console.log('userID in verifyEmail', userID);
//   console.log('type in verifyEmail', type);
//   return dispatch => {
//     dispatch(setLoadingState({name: 'Verification'}));
//     Axios.put(
//       API.update + userID,
//       {verifyEmail: true},
//       {headers: {'content-type': 'application/json'}},
//     )
//       .then(data => {
//         let userData = data.data.data;
//         console.log('userData in update', userData);
//         setTokenInHeaders(userData.token);
//         AsyncStorage.setItem('user', JSON.stringify(userData)).then(() => {
//           dispatch(loginUserAct(userData));
//           if (type === 'Signup') {
//             NavigationService.navigate('Packages');
//           } else if (type === 'UnverifiedLogin') {
//             NavigationService.navigate('App');
//           }
//         });
//       })
//       .catch(err => {
//         console.log('CATCH IN verify email--', err.response);
//       })
//       .finally(() => dispatch(setLoadingState({})));
//   };
// };

// const loginUser = (formData, showSecurityQuestionModel) => {
//   return dispatch => {
//     dispatch(setLoadingState({name: 'login'}));
//     Axios.post(API.login, {
//       userName: formData.userNameOrEmail,
//       password: formData.loginPassword,
//     })
//       .then(data => {
//         let userData = data.data.data;
//         console.log('userData after login', userData);
//         dispatch(loginUserAct(userData));
//         setTokenInHeaders(userData.token);
//         showSecurityQuestionModel();
//         console.log('dispatched');
//       })
//       .catch(err => {
//         // if user response object exists
//         if (
//           err.response.data.data &&
//           err.response.data.data.email_verified === 0
//         ) {
//           let userData = err.response.data.data;
//           setTokenInHeaders(userData.token);
//           dispatch(loginUserAct(userData));
//           Axios.post(API.sendVerificationCode, {
//             email: formData.userNameOrEmail,
//           })
//             .then(res => {
//               NavigationService.navigate('Verification', {
//                 verificationCode: res.data.data.code,
//                 type: 'UnverifiedLogin',
//               });
//             })
//             .catch(e =>
//               Alert.alert(
//                 'Error',
//                 'Unable to send verification email, Please retry later.',
//               ),
//             );
//         } else {
//           Alert.alert('Failed', err.response.data.message);
//         }
//       })
//       .finally(() => dispatch(setLoadingState({})));
//   };
// };

// const logoutUser = (formData, navigation) => {
//   return dispatch => {
//     dispatch(setLoadingState('Logout'));
//     let formDataObj = new FormData();
//     for (var key in formData) {
//       formDataObj.append(key, formData[key]);
//     }
//     Axios.get(API.logout, formDataObj)
//       .then(() => {
//         AsyncStorage.removeItem('user').then(() => dispatch(logoutUserAct()));
//         navigation.navigate('News');
//       })
//       .catch(err => {
//         console.log('ERORRR in logout', err);
//         Alert.alert('Oops!', err);
//       });
//   };
// };
// export {signupUser, updateUser, loginUser, logoutUser, verifyEmail};
