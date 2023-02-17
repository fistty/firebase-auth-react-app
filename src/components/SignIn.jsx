import React, { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { Link } from "react-router-dom";
import { FirebaseErrorComponent } from "./FirebaseErrorComponent";
import * as ROUTES from "../routes/routes";
import "./SignIn.css";
import { formatError } from "../helpers/formatError";

export function SignIn({ setMessage, showEmail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  const { logInUser, setLoading, firebaseError, setFirebaseError } =
    useUserAuth();
  const navigate = useNavigate();
  const emailRef = useRef();

  const handleShowPassword = e => {
    e.preventDefault();
    setPasswordShow(prev => !prev);
  };

  // HANDLES USER SIGN IN
  const handleSignIn = async e => {
    e.preventDefault();
    setFirebaseError(false);
    setLoading(true);

    try {
      await logInUser(email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setLoading(false);
      setFirebaseError(formatError(error.code));
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (showEmail) {
      setEmail(showEmail);
      setLoading(false);
    }
    setLoading(false);
    setTimeout(() => {
      setMessage(false);
    }, 15000);
    return () => {
      setFirebaseError(false);
    };
  }, [setLoading, setFirebaseError, setMessage, showEmail]);

  return (
    <div className="sign-in-div">
      <h1 className="h1">SIGN IN</h1>
      {firebaseError && <FirebaseErrorComponent />}
      <form onSubmit={handleSignIn}>
        <div className="email-div sign-in-email-div">
          <input
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            ref={emailRef}
          />
        </div>
        <div className="pass-div sign-in-pass-div">
          <input
            type={passwordShow === true ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {password.length > 0 && (
            <IconContext.Provider value={{ size: "1.3rem" }}>
              <span className="show-icon-button" onClick={handleShowPassword}>
                {passwordShow === true ? <BiHide /> : <BiShowAlt />}
              </span>
            </IconContext.Provider>
          )}
        </div>
        <button className="sign-in-button">Sign In</button>
      </form>
      <div className="adds">
        <p className="signin__adds-first">
          Don't have an account?
          <button className="signin__adds-first-button">
            <Link className="signin__adds_first-link" to={ROUTES.SIGN_UP}>
              Sign Up
            </Link>
          </button>
        </p>
        <Link className="sign-in__adds-second" to={ROUTES.FORGOT_PASSWORD}>
          Forgot Password
        </Link>
      </div>
    </div>
  );
}
