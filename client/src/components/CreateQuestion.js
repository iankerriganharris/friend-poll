import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../actions/index';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

function mapStateToProps(state) {
  return { idAccount: state.user.id };
};

class CreateQuestion extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          console.log(this.props)
          this.props.dispatch(createQuestion(values, this.props.idAccount));
        }
      }
    );
  }
  render() {
    return (
      <Form layout='vertical' onSubmit={this.handleSubmit} >
        <FormItem>
          {this.props.form.getFieldDecorator('description')(
          <Input />
          )}
        </FormItem>
        <FormItem>
          <Button
              type="primary"
              htmlType="submit"
            >
              Create question
            </Button>
        </FormItem>
      </Form>
    )
  }
}

export default connect(mapStateToProps)(Form.create()(CreateQuestion));