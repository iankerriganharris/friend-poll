import React from 'react';



class Profile extends React.Component {
  render() {
    console.log('Profile ' + this.props.match)
    return(
      <div>{this.props.match.params.screen_name}</div>
    )
  }
}


export default Profile;