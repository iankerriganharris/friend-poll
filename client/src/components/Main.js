import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Profile from './Profile.js';
import Discover from './Discover.js';
import Logout from './Logout.js';
import WrappedHorizontalLoginForm from './HorizontalLoginForm';
import WrappedRegistrationForm from './Registration';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';
import PrivateHeader from './PrivateHeader';
import PublicHeader from './PublicHeader';
import PublicRoute from './PublicRoute';
import DecisionRoute from './DecisionRoute';
import CreateQuestion from './CreateQuestion';
import QuestionList from './QuestionList';
import Feed from './Feed';

function mapStateToProps(state) {
  return { isAuthenticated: state.user.isAuthenticated };
};

const Main = (props) => {
  return(
  <main>
    <DecisionRoute
            trueComponent={PrivateHeader}
            falseComponent={PublicHeader}
            decisionFunc={props.isAuthenticated}
          />
    <Switch>
      <PublicRoute exact path="/login"
              component={WrappedHorizontalLoginForm}
              authed={props.isAuthenticated}
            />
      <PublicRoute exact path="/register"
              component={WrappedRegistrationForm}
              authed={props.isAuthenticated}
            />
      <EnsureLoggedInContainer>
        <Switch>
        <Route exact path='/(|feed|home)' component={Feed} />
        <Route exact path='/discover' component={Discover}/>
        <Route exact path='/question' component={CreateQuestion}/>
        <Route exact path='/logout' component={Logout} />
        <Route path='/:screen_name' component={Profile} />
        </Switch>
      </EnsureLoggedInContainer>
    </Switch>
  </main>
)}

export default withRouter(connect(mapStateToProps)(Main));