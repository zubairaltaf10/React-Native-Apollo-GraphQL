import {connect} from 'react-redux';
const mapStateToProps = state => {
  return state.user;
};

export const withUser = Component => {
  // eslint-disable-next-line prettier/prettier
  return connect(mapStateToProps, null)(Component);
};
