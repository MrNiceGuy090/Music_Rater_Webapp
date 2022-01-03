import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '../../store';

const PrivateRoute = ({ children }: any) => {
  const auth: any = useSelector((state: RootState) => state.auth);
  console.log(auth);
  return auth.authenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;