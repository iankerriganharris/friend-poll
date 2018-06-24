import React from 'react';
import { Route } from 'react-router-dom';

const DecisionRoute = ({ trueComponent, falseComponent, decisionFunc, ...rest }) => {
  return (
    <Route
      {...rest}

      component={
        JSON.parse(decisionFunc)
          ? trueComponent
          : falseComponent
      }
    />
  )
}

export default DecisionRoute;