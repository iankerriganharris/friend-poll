import React from 'react';
import {NavLink, Route} from 'react-router-dom';
import { Row, Col, Menu, Button, Icon } from 'antd';
import GeneralSearch from "./GeneralSearch";
import CreateQuestion from './CreateQuestion';

const PrivateHeader = (props) => {
  return (
    <div>
      <Row type='flex' align='middle'>
        <Col span={22}>
          <GeneralSearch className='header-search'/>
          <CreateQuestion className='header-button'/>
          <Menu
            mode='horizontal'
            selectedKeys={[props.location.pathname]}
          >
            <Menu.Item key='/'>
              <NavLink to='/' activeClassName='selected'>
                <Icon type="home"/>Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key='/discover'>
              <NavLink to='/discover' activeClassName='selected'>
                <Icon type="share-alt"/>Discover
              </NavLink>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={2}>
          <Menu
            mode='horizontal'
            selectedKeys={[props.location.pathname]}
          >
            <Menu.Item style={{float: 'right'}} key='/logout'>
              <NavLink to='/logout' activeClassName='selected'>
                <Icon type="logout"/>Logout
              </NavLink>
            </Menu.Item>
          </Menu>
          {/*<Menu.Item className="no-hover" style={{float:'right', width: '20%'}} >*/}

          {/*</Menu.Item>*/}
        </Col>
      </Row>
    </div>
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