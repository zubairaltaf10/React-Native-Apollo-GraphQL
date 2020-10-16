import {FULFILLED, PENDING, REJECTED} from '../utils/constants';
import * as types from '../types/index';
import createReducer from '../utils/createReducer';
const initialState = {
  loading: false,
  error: null,
  loaded: false,
  user: [],
};

const loginReducer = createReducer(initialState)({
  [types.LOGIN + PENDING]: state => ({
    ...state,
    errorLogin: null,
    loadingLogin: true,
    loadedLogin: false,
  }),
  [types.LOGIN + FULFILLED]: (state, {payload}) => ({
    ...state,
    user: payload.user,
    loadingLogin: false,
    loadedLogin: true,
    errorLogin: null,
  }),
  [types.LOGIN + REJECTED]: (state, {error}) => ({
    ...state,
    errorLogin: error,
    loadingLogin: false,
    loadedLogin: false,
  }),
  [types.LOGOUT + FULFILLED]: (state, {payload}) => ({
    ...initialState,
  }),
  [types.SIGNUP + PENDING]: state => ({
    ...state,
    errorSignup: null,
    loadingSignup: true,
    loadedSignup: false,
  }),
  [types.SIGNUP + FULFILLED]: (state, {payload}) => ({
    ...state,
    user: payload.user,
    loadingSignup: false,
    loadedSignup: true,
    errorSignup: null,
  }),
  [types.SIGNUP + REJECTED]: (state, {error}) => ({
    ...state,
    errorSignup: error,
    loadingSignup: false,
    loadedSignup: false,
  }),
  [types.VERIFY_EMAIL + PENDING]: state => ({
    ...state,
    loadingEmailVerify: true,
    loadedEmailVerify: false,
    errorEmailVerify: null,
  }),
  [types.VERIFY_EMAIL + FULFILLED]: (state, {payload}) => ({
    ...state,
    user: payload.user,
    loadingEmailVerify: false,
    loadedEmailVerify: true,
    errorEmailVerify: null,
  }),
  [types.VERIFY_EMAIL + REJECTED]: (state, {error}) => ({
    ...state,
    loadingEmailVerify: false,
    loadedEmailVerify: false,
    errorEmailVerify: error,
  }),
  [types.SEND_VERIF_CODE + PENDING]: state => ({
    ...state,
    loadingSendVerifCode: true,
    loadedSendVerifCode: false,
    errorSendVerifCode: null,
  }),
  [types.SEND_VERIF_CODE + FULFILLED]: state => ({
    ...state,
    loadingSendVerifCode: false,
    loadedSendVerifCode: true,
    errorSendVerifCode: null,
  }),
  [types.SEND_VERIF_CODE + REJECTED]: (state, {error}) => ({
    ...state,
    loadingSendVerifCode: false,
    loadedSendVerifCode: false,
    errorSendVerifCode: error,
  }),
  [types.UPDATE_PASSWORD + PENDING]: state => ({
    ...state,
    loadingUpdatePassword: true,
    loadedUpdatePassword: false,
    errorUpdatePassword: null,
  }),
  [types.UPDATE_PASSWORD + FULFILLED]: state => ({
    ...state,
    loadingUpdatePassword: false,
    loadedUpdatePassword: true,
    errorUpdatePassword: null,
  }),
  [types.UPDATE_PASSWORD + REJECTED]: (state, {error}) => ({
    ...state,
    loadingUpdatePassword: false,
    loadedUpdatePassword: false,
    errorUpdatePassword: error,
  }),
});

export default loginReducer;
