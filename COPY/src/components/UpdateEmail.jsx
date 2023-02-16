import React, { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { auth } from "../Firebase";
import { EmailAuthProvider } from "firebase/auth";
import { formatError } from "../helpers/formatError";
import { FirebaseErrorComponent } from "./FirebaseErrorComponent";
import { FirebaseSuccessComponent } from "./FirebaseSuccessComponent";
import "./updateEmail.css";

export const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const headerRef = useRef();

  const {
    currentUser,
    updateUserEmail,
    reAuthenticateUser,
    setLoading,
    firebaseError,
    setFirebaseError,
    firebaseSuccess,
    setFirebaseSuccess,
  } = useUserAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = e => {
    e.preventDefault();
    setPasswordShow(prev => !prev);
  };

  // HANDLES USER EMAIL UPDATE
  const handleEmailUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    setFirebaseError(false);
    setFirebaseSuccess(false);
    emailRef.current.classList.remove("error-border");
    passwordRef.current.classList.remove("error-border");

    const user = auth.currentUser;
    const oldEmail = user.email;

    if (!email && !password) {
      setFirebaseError("ENTRIES CAN'T BE EMPTY");
      emailRef.current.classList.add("error-border");
      passwordRef.current.classList.add("error-border");
      setLoading(false);
      return;
    }

    if (email === oldEmail) {
      setFirebaseError("EMAIL CAN'T BE THE SAME");
      setLoading(false);
      return;
    }

    // RE-AUTHENTICATES THE USER
    try {
      const credential = EmailAuthProvider.credential(oldEmail, password);
      await reAuthenticateUser(credential);
    } catch (error) {
      setLoading(false);
      setFirebaseError(formatError(error.code));
      return;
    }

    // UPDATES THE USER
    try {
      await updateUserEmail(email);
      headerRef.current.innerText = email;
      setLoading(false);
      setFirebaseSuccess("EMAIL UPDATED");
    } catch (error) {
      setLoading(false);
      setFirebaseError(formatError(error.code));
      return;
    }
    setLoading(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    setLoading(true);
    if (currentUser?.email) {
      setLoading(false);
    }
    return () => {
      setFirebaseSuccess(false);
      setFirebaseError(false);
    };
  }, [currentUser?.email]);

  useEffect(() => {
    setFirebaseSuccess(false);
    setFirebaseError(false);
    return () => {
      setFirebaseSuccess(false);
      setFirebaseError(false);
    };
  }, []);

  return (
    <div className="update-profile-div">
      <h1 className="h1">UPDATE EMAIL</h1>
      <h2 ref={headerRef}>{currentUser.email} </h2>
      <form onSubmit={handleEmailUpdate} className="update-profile__form">
        {firebaseSuccess ? <FirebaseSuccessComponent /> : null}
        {firebaseError ? <FirebaseErrorComponent /> : null}
        <div className="update-profile__input-div">
          <input
            type="text"
            placeholder="Enter your new Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            ref={emailRef}
          />
        </div>
        <div className="update-profile__input-div">
          <input
            type={passwordShow === true ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            ref={passwordRef}
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
        </div>
        <button className="update-button">Update</button>
      </form>
      <div className="adds">
        <button className="cancel-button" onClick={handleCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};
