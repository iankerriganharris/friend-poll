import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PublicRouter = ({ component: Component, authed, ...rest }) => {
  JSON.parse(authed)
  console.log('Public route...')
return (
  <Route
    {...rest}
    render={ props =>
      JSON.parse(authed) === true ? (
        <Redirect
        to={{
          pathname: "/",
          state: { referrer: props.location }
        }}
      />
      ) : (
        <Component {...props} />
      )
    }
  />
);
}

export default withRouter(PublicRouter);