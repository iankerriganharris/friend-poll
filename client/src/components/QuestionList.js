import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';

function mapStateToProps(state) {
  return { questions: state.questions };
};

const QuestionList = (props) => {
  return(
    <List
      dataSource={props.questions}
      renderItem={item => (<List.Item>{item.description}</List.Item>)}
    />
  )
}

export default connect(mapStateToProps)(QuestionList);