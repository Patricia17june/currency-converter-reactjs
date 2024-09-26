import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Custom hook to get user authentication state

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If logged in, allow access to the component
  return children;
};

export default ProtectedRoute;
