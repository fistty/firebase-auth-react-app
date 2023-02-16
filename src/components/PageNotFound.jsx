import React from "react";
import { useNavigate, Link } from "react-router-dom";
import * as ROUTES from "../routes/routes";
import "./PageNotFound.css";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className=".not-found">
      <h1>PAGE DOES NOT EXIST</h1>
      <Link to={ROUTES.DASHBOARD} className="link"></Link>
    </div>
  );
};
