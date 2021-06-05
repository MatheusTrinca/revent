import React from 'react';
import UnAuthModal from '../../features/auth/UnAuthModal';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, prevLocation, ...rest }) {
  const { authenticated } = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={props => (authenticated ? <Component {...props} /> : <UnAuthModal {...props} />)}
    />
  );
}
