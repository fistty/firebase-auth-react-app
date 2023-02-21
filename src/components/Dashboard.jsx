import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { formatError } from "../helpers/formatError";
import * as ROUTES from "../routes/routes";
import "./Dashboard.css";

export const Dashboard = ({ setMessage }) => {
  const { currentUser, logOutUser, setLoading, setFirebaseError } =
    useUserAuth();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOutUser();
      setTimeout(() => {
        navigate(ROUTES.SIGN_IN, { replace: true });
      }, 295);
    } catch (error) {
      setFirebaseError(formatError(error.code));
    }
  };

  useEffect(() => {
    setLoading(true);
    if (currentUser?.email) {
      setLoading(false);
    }
    setMessage(false);
  }, [currentUser?.email, setMessage, setLoading]);

  return (
    <>
      <div className="dashboard">
        <h1>Welcome to your Dashboard</h1>
        <h2>{currentUser.email}</h2>
        <Link
          className="update-profile update-profile-email"
          to={ROUTES.UPDATE_EMAIL}
        >
          Update Email
        </Link>

        <Link
          className="update-profile update-profile-password "
          to={ROUTES.UPDATE_PASSWORD}
        >
          Change Password
        </Link>
        <hr />
        <button className="cancel-button" onClick={handleSignOut}>
          LOGOUT
        </button>
      </div>
    </>
  );
};
