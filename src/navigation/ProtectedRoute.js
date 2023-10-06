// ProtectedRoute.js
import React, { useContext } from 'react';
import { Redirect } from 'react-router-native';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
