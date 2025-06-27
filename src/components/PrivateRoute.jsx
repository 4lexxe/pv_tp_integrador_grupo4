import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; 

const PrivateRoute = () => {
  const { isAuthenticated } = useAppContext(); 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;