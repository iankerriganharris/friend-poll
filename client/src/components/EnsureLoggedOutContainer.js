import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function mapStateToProps(state) {
  return { isAuthenticated: state.user.isAuthenticated };
};

class EnsureLoggedOutContainer extends React.Component {
  render() {
    console.log('ensure logged out')
    if (JSON.parse(this.props.isAuthenticated) === false) {
      return this.props.children
    } else {
      return <Redirect to='/' />
    }
  }
}

export default connect(mapStateToProps)(EnsureLoggedOutContainer)