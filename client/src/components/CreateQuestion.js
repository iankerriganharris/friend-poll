import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../actions/index';
import {Modal, Form, Input, Button} from 'antd';
import GeneralSearch from "./GeneralSearch";
const FormItem = Form.Item;

function mapStateToProps(state) {
  return { idAccount: state.user.id };
};

class CreateQuestion extends React.Component {
  state = {
    visible: false,
    loading: false
  }
  toggleModal = () => this.setState((prevState) => (
    { visible: !prevState.visible }
  ))
  handleCancel = () => this.setState(() => (
    { visible: false }
  ))
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true})
    this.props.form.validateFields((err, values) => {
      if (!err) {
          setTimeout(() => this.setState({loading: false, visible: false}), 1000)
          this.props.dispatch(createQuestion(values, this.props.idAccount));
      }
    });
  }
  render() {
    const { visible, loading } = this.state;
    return (
      <div className={this.props.className}>
        <Button
          className='header-button'
          icon='form'
          shape='circle'
          onClick={this.toggleModal}
        />
        <Modal
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
              Start Looking
            </Button>,
          ]}
        >
          <Form layout='vertical'>
            <FormItem>
              {this.props.form.getFieldDecorator('description')(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Form.create()(CreateQuestion));