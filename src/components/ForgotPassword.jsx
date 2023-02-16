import React, { useState, useEffect } from "react";
import { useUserAuth } from "../context/userAuthContext";
import { useNavigate } from "react-router-dom";
import { formatError } from "../helpers/formatError";
import { FirebaseErrorComponent } from "./FirebaseErrorComponent";
import { FirebaseSuccessComponent } from "./FirebaseSuccessComponent";
import "./forgotPassword.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const {
    resetUserPassword,
    firebaseError,
    setFirebaseError,
    firebaseSuccess,
    setFirebaseSuccess,
    setLoading,
  } = useUserAuth();
  const navigate = useNavigate();

  const handlePasswordReset = async e => {
    e.preventDefault();
    setLoading(true);
    setFirebaseError(false);
    setFirebaseSuccess(false);
    try {
      await resetUserPassword(email);
      setLoading(false);
      setFirebaseSuccess("PASSWORD RESET EMAIL SENT");
    } catch (error) {
      setLoading(false);
      setFirebaseError(formatError(error.code));
    }
    setLoading(false);
  };

  const handleCancel = e => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    setFirebaseError(false);
    setFirebaseSuccess(false);
  }, []);
  return (
    <div className="forgot-password-div">
      <h1 className="h1">RESET YOUR PASSWORD</h1>
      {firebaseError ? <FirebaseErrorComponent /> : null}
      {firebaseSuccess ? <FirebaseSuccessComponent /> : null}
      <form onSubmit={handlePasswordReset}>
        <div className="email-div">
          <input
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button className="reset-password-button">RESET</button>
      </form>
      <div className="adds">
        <button className="cancel-button" onClick={handleCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};
