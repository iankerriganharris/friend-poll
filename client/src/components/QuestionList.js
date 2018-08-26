import React from 'react';
import { connect } from 'react-redux';
import { List, Button } from 'antd';
import { destroyQuestion } from '../actions';

function mapStateToProps(state) {
  return { questions: state.questions };
};

const QuestionList = (props) => {
  return(
    <List
      dataSource={props.questions}
      renderItem={item => (
        <List.Item>
          {item.description}
          <Button onClick={() => { props.dispatch(destroyQuestion(item.id))}}>Delete</Button>
        </List.Item>
      )}
    />
  )
}

export default connect(mapStateToProps)(QuestionList);