import React from "react";
import { useNavigate, Link } from "react-router-dom";
import * as ROUTES from "../routes/routes";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>PAGE DOES NOT EXIST</h1>
      <Link to={ROUTES.DASHBOARD}></Link>
    </div>
  );
};
