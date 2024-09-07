import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated by checking token
  const token = localStorage.getItem('token');
  
  // If there is no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;