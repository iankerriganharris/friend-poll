import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return { isAuthenticated: state.user.isAuthenticated };
};

class EnsureLoggedInContainer extends React.Component {
  
  render() {
    console.log('ensure login')
    if (JSON.parse(this.props.isAuthenticated) === true) {
      return this.props.children
    } else {
      return <Redirect to='/login' />
    }
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)