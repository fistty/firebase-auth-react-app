import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";

export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useUserAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        user ? <Component {...props} /> : <Navigate to="/signin" replace />;
      }}></Route>
  );
}
