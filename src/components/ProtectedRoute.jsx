import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { SIGN_IN } from "../routes/routes";

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useUserAuth();

  if (!currentUser) {
    return <Navigate to={SIGN_IN} replace />;
  }

  return children;
};
