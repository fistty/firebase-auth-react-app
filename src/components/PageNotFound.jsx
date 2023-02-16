import React from "react";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../routes/routes";
import "./PageNotFound.css";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>PAGE DOES NOT EXIST</h1>
      <p onClick={() => navigate(ROUTES.DASHBOARD)} className="link">
        Go back home
      </p>
    </div>
  );
};
