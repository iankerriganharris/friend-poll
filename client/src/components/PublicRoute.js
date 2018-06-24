import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PublicRouter = ({ component: Component, authed, ...rest }) => {
  JSON.parse(authed)
return (
  <Route
    {...rest}
    render={ props =>
      JSON.parse(authed) === true ? (
        <Redirect
        to={{
          pathname: "/profile",
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