import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../actions/index';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

// const mapDispatchToProps = dispatch => {
//   return {
//     createQuestion: questionData => {dispatch(createQuestion(questionData))}
//   };
// };

class CreateQuestion extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.dispatch(createQuestion(values));
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

export default connect()(Form.create()(CreateQuestion));