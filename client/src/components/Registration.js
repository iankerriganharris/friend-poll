import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/configureStore';
import { register } from '../actions/index';
import { callApi } from '../util';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class RegistrationForm extends React.Component {
  state = {
    passwordConfirmationDirty: false,
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.dispatch(register(values));
        }
      }
    );
  }
  handlePasswordConfirmationBlur = (e) => {
    const value = e.target.value;
    this.setState({ passwordConfirmationDirty: this.state.passwordConfirmationDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords you entered don\'t match.');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.passwordConfirmationDirty) {
      form.validateFields(['passwordConfirmation'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email');
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const passwordConfirmationError = isFieldTouched('passwordConfirmation') && getFieldError('passwordConfirmation');
    return(
      <Form layout='vertical' onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}
        >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email.' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input a username.' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input a password.' },
                    { validator: this.validateToNextPassword },
                  ],
          })(
            <Input type='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordConfirmationError ? 'error' : ''}
          help={passwordConfirmationError || ''}
        >
          {getFieldDecorator('passwordConfirmation', {
            rules: [{ required: true, message: 'Please type your password again.' },
                    { validator: this.compareToFirstPassword },
                  ],
            })(
            <Input type='password' onBlur={this.handlePasswordConfirmationBlur} 
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                    placeholder="Confirm password" 
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Register
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const ConnectedRegistrationForm = connect()(RegistrationForm);

const WrappedRegistrationForm = Form.create()(ConnectedRegistrationForm);

export default WrappedRegistrationForm;