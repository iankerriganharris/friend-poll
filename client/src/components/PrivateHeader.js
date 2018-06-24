import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const PrivateHeader = (props) => {
  return (
    <Menu
      mode='horizontal'
      // activeKey={props.location.pathname}
      selectedKeys={[props.location.pathname]}
    >
      <Menu.Item key='/'>
        <NavLink to='/' activeClassName='selected'>
          <Icon type="home" />Home
        </NavLink>
      </Menu.Item>
      <Menu.Item key='/discover'>
        <NavLink to='/discover' activeClassName='selected'>
          <Icon type="share-alt" />Discover
        </NavLink>
      </Menu.Item>
      <Menu.Item key='/profile'>
        <NavLink to='/profile' activeClassName='selected'>
          <Icon type="idcard" />Profile
        </NavLink>
      </Menu.Item>
      <Menu.Item key='/question'>
        <NavLink to='/question' activeClassName='selected'>
          <Icon type="question" />Question
        </NavLink>
      </Menu.Item>
      <Menu.Item key='/logout'>
        <NavLink to='/logout' activeClassName='selected'>
          <Icon type="logout" />Logout
        </NavLink>
      </Menu.Item>
    </Menu>
  )
}

export default PrivateHeader;

// function mapStateToProps(state) {
//   console.log(state)
//   return { isAuthenticated: state.user.isAuthenticated };
// };

// class PrivateHeader extends Component {
//   render() {
//     return (
//       <Menu
//         mode='horizontal'
//         activeKey={this.props.location.pathname}
//       >
//         <Menu.Item key='/home'>
//           <NavLink to='/' activeClassName='selected'>
//             <Icon type="home" />Home
//           </NavLink>
//         </Menu.Item>
//         <Menu.Item key='/discover'>
//           <NavLink to='/discover' activeClassName='selected'>
//             <Icon type="share-alt" />Discover
//           </NavLink>
//         </Menu.Item>
//         <Menu.Item key='/profile'>
//           <NavLink to='/profile' activeClassName='selected'>
//             <Icon type="idcard" />Profile
//           </NavLink>
//         </Menu.Item>
//         <Menu.Item key='/logout'>
//           <NavLink to='/logout' activeClassName='selected'>
//             <Icon type="logout" />Logout
//           </NavLink>
//         </Menu.Item>
//       </Menu>
//     )
//   }
// }

// export default connect(mapStateToProps)(PrivateHeader);