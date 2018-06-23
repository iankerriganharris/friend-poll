import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/index';
import { Redirect, withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    logout: user => {dispatch(logout(user))}
  };
};

const Logout = (props) => {
  props.logout();
  return null
}

export default connect(null, mapDispatchToProps)(Logout);