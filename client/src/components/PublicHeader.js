import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';

const PublicHeader = (props) => {
  return (
    <Menu
      mode='horizontal'
      selectedKeys={[props.location.pathname]}
    >
      <Menu.Item key='/login'>
        <NavLink to='/login' activeClassName='selected'>
          <Icon type="login" />Login
        </NavLink>
      </Menu.Item>
      <Menu.Item key='/register'>
        <NavLink to='/register' activeClassName='selected'>
          <Icon type="register" />Register
        </NavLink>
      </Menu.Item>
    </Menu>
  )
}

export default PublicHeader;

