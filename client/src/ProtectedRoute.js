import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./utils/auth"; // Update import path as needed

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useAuth(); // Use the authenticated state from context

  if (!authenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  return children; // If authenticated, render the children components
};

export default ProtectedRoute;
