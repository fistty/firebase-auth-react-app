import { FirebaseErrorComponent } from "./FirebaseErrorComponent";
import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { addUserToCollection } from "../helpers/addUserToCollection";
import { validateCredentials } from "../helpers/ValidateCredentials.js";
import * as ROUTES from "../routes/routes";
import "./SignUp.css";

export function SignUp({ setMessage, setShowEmail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const navigate = useNavigate();
  const { signUpUser, setLoading, firebaseError, setFirebaseError } =
    useUserAuth();

  const togglePasswordVisibility = e => {
    e.preventDefault();
    setPasswordShow(prev => !prev);
  };

  const resetError = setError => {
    setError(false);
  };

  const handleChange = (e, setValue, setError) => {
    setValue(e.target.value);
    resetError(setError);
    if (e.target.name === "email") {
      setFirebaseError(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setEmail(prev => prev.trim());
    setFirebaseError(false);

    try {
      await validateCredentials(
        email,
        password,
        confirmPassword,
        setEmailError,
        setPasswordError,
        setConfirmPasswordError
      );
    } catch (error) {
      setLoading(false);
      return;
    }

    try {
      const res = await signUpUser(email, password);
      const user = res.user;

      // SAVES USER'S DATA TO DATABASE
      await addUserToCollection(user).catch(error => {
        console.log(error);
        throw new Error("ERROR at DATABASE");
      });
      console.log("USER SUCCESFULLY CREATED");
      setMessage(true);
      setShowEmail(user.email);
      navigate(ROUTES.SIGN_IN);
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setFirebaseError(error.code);
      console.log(error.code, "=>=>", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setMessage(false);
    setFirebaseError(false);
    return () => {
      setFirebaseError(false);
    };
  }, [setMessage, setFirebaseError]);

  return (
    <>
      <h1 className="h1">SIGN UP</h1>
      {firebaseError ? <FirebaseErrorComponent /> : null}
      <form onSubmit={handleSubmit} className="sign-up-form">
        <div className="email-div">
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            value={email}
            onChange={e => handleChange(e, setEmail, setEmailError)}
            className={emailError ? "input-field-error" : "input-field"}
          />
          {emailError && <p className="email-div-error">{emailError}</p>}
        </div>
        <div className="pass-div">
          <input
            type={passwordShow === true ? "text" : "password"}
            name="password"
            placeholder="Enter your Password"
            value={password}
            onChange={e => handleChange(e, setPassword, setPasswordError)}
            className={passwordError ? "input-field-error" : "input-field"}
          />

          {password.length > 0 ? (
            <IconContext.Provider value={{ size: "1.3rem" }}>
              <button
                className="show-icon-button"
                onClick={togglePasswordVisibility}
              >
                {passwordShow === true ? <BiHide /> : <BiShowAlt />}
              </button>
            </IconContext.Provider>
          ) : null}
          {passwordError && <p className="email-div-error">{passwordError}</p>}
        </div>
        <div className="confirm-pass-div">
          <input
            type={passwordShow === true ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e =>
              handleChange(e, setConfirmPassword, setConfirmPasswordError)
            }
            className={
              confirmPasswordError ? "input-field-error" : "input-field"
            }
          />

          {confirmPassword.length > 0 && (
            <IconContext.Provider value={{ size: "1.3rem" }}>
              <button
                className="show-icon-button"
                onClick={togglePasswordVisibility}
              >
                {passwordShow === true ? <BiHide /> : <BiShowAlt />}
              </button>
            </IconContext.Provider>
          )}
          {confirmPasswordError && (
            <p className="email-div-error">{confirmPasswordError}</p>
          )}
        </div>
        <button className="sign-up-button">Sign Up</button>
      </form>
      <div className="adds">
        <p className="adds-first">
          Already have an account?
          <Link className="sign-in-link" to={ROUTES.SIGN_IN}>
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
