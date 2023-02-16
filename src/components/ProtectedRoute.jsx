import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useUserAuth();

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
