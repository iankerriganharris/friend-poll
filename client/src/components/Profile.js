import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

const mapStateToProps = state => {
  return { user: state.user };
};

const ConnectedProfile = ({ user }) => (
  <Form layout='vertical'>
    <FormItem>
      <Input />
    </FormItem>
  </Form>
);

const Profile = connect(mapStateToProps)(ConnectedProfile);

export default Profile;