import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';

function mapStateToProps(state) {
  return { userId: state.user.id };
};

class Profile extends React.Component {

  state = {
    data: null
  }

  componentDidMount = async () => {
    const request = {
      credentials: 'include',
      method: 'GET'
    }
    const response = await axios(`/api/accounts/${this.props.match.params.screen_name}`, request)
    if (response.status >= 200 && response.status < 300) {
      this.setState( { data: {...response.data} })
    } else {
      const error = response.statusText
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (this.props.match.params.screen_name !== prevProps.match.params.screen_name){
      const request = {
        credentials: 'include',
        method: 'GET'
      }
      const response = await axios(`/api/accounts/${this.props.match.params.screen_name}`, request)
      if (response.status >= 200 && response.status < 300) {
        this.setState( { data: {...response.data} })
      } else {
        const error = response.statusText
      }
    }
  }

  toggleFollow = async () => {
    console.log('Follow clicked...')
    const followData = {idAccount: this.state.data.profile.id, idFollower: this.props.userId}
    const request = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: this.state.data.following ? 'DELETE' : 'POST',
      data: JSON.stringify(followData)
    }
    const response = await axios(`/api/follow`, request)
    if (response.status >= 200 && response.status < 300) {
      this.setState((prevState) => {return {data: {...prevState.data, following: !prevState.data.following}}})
    } else {
      const error = response.statusText
    }
  }


  render() {
    console.log(this.state.data)
    if (!this.state.data) return null
    const accountQuestions = this.state.data.questions.map((q) => <p key={q.id}>{q.description}</p>)
    return(
      <Row>
        <Col span={6}>
          <p>{this.state.data.profile.first_name} {this.state.data.profile.last_name}</p>
          <p>{this.state.data.profile.screen_name}</p>
          {this.state.data.following ?
            <Button type='primary' onClick={this.toggleFollow}>Following</Button>
            : <Button onClick={this.toggleFollow}>Follow</Button>}
        </Col>
        <Col span={18}>
          {accountQuestions}
        </Col>
      </Row>
    )
  }
}


export default connect(mapStateToProps)(Profile);