import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie to access cookies

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get('auth_token'); // Get the token from cookies


console.log("token11",token)

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token exists, render the element (the component)
  return element;
};

export default ProtectedRoute;
