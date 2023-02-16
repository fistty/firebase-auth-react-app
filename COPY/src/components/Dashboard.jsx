import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { formatError } from "../helpers/formatError";
import "./Dashboard.css";

export const Dashboard = ({ setMessage }) => {
  const { currentUser, logOutUser, setLoading, setFirebaseError } =
    useUserAuth();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOutUser();
      navigate("/signin", { replace: true });
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
  }, [currentUser?.email]);

  return (
    <>
      <div className="dashboard">
        <h1>Welcome to your Dashboard</h1>
        <h2>{currentUser.email}</h2>
        <Link
          className="update-profile update-profile-email"
          to="/update-email"
        >
          Update Email
        </Link>

        <Link
          className="update-profile update-profile-password "
          to="/update-password"
        >
          Change Password
        </Link>
        <hr />
        <button className="logout" onClick={handleSignOut}>
          LOGOUT
        </button>
      </div>
    </>
  );
};
