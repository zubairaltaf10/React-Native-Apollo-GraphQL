import {connect} from 'react-redux';
import {
  signup,
  login,
  logout,
  verifyEmail,
  sendVerificationCode,
  updatePassword,
} from '../actions/AuthActions';

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
  };
};
const mapdispatchToProps = {
  login,
  signup,
  logout,
  verifyEmail,
  sendVerificationCode,
  updatePassword,
};

export const withAuth = Component => {
  return connect(
    mapStateToProps,
    mapdispatchToProps,
  )(Component);
};
