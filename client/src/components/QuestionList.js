import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';

function mapStateToProps(state) {
  return { questions: state.user.questions };
};

const QuestionList = (props) => {
  return(
    <List
      dataSource={props.questions}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
  )
}

export default connect(mapStateToProps)(QuestionList);