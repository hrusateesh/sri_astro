/* eslint-disable */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// $FlowFixMe: suppressing this error until we can refactor
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('user') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;
