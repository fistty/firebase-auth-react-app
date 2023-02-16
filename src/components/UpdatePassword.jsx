import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { EmailAuthProvider } from "firebase/auth";
import { auth } from "../Firebase";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { IconContext } from "react-icons";
import { formatError } from "../helpers/formatError";
import { FirebaseErrorComponent } from "./FirebaseErrorComponent";
import { FirebaseSuccessComponent } from "./FirebaseSuccessComponent";
import "./updatePassword.css";

export const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordShow, setCurrentPasswordShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [formError, setFormError] = useState({});

  const {
    currentUser,
    updateUserPassword,
    reAuthenticateUser,
    setLoading,
    firebaseError,
    setFirebaseError,
    firebaseSuccess,
    setFirebaseSuccess,
  } = useUserAuth();
  const navigate = useNavigate();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const togglePasswordVisibility = (e, currentPassword) => {
    e.preventDefault();
    if (currentPassword) {
      setCurrentPasswordShow(prev => !prev);
      return;
    }
    setPasswordShow(prev => !prev);
  };

  const resetError = e => {
    setFormError({ ...formError, [e.target.name]: "" });
  };

  // HANDLES USER SIGN IN
  const handlePasswordChange = async e => {
    e.preventDefault();
    setLoading(true);
    setFirebaseError(false);
    setFirebaseSuccess(false);

    currentPasswordRef.current.classList.remove("error-border");
    newPasswordRef.current.classList.remove("error-border");
    confirmPasswordRef.current.classList.remove("error-border");

    const user = auth.currentUser;
    const email = user.email;

    let error = {};

    if (!currentPassword) {
      error.currentPassword = "Password can't be empty";
      currentPasswordRef.current.classList.add("error-border");
    }
    if (!newPassword) {
      error.newPassword = "New password can't be empty";
      newPasswordRef.current.classList.add("error-border");
    } else if (newPassword.length < 6) {
      error.newPassword = "Password must 6 or more character";
      newPasswordRef.current.classList.add("error-border");
    }
    if (!confirmPassword) {
      error.confirmPassword = "Confirm your password";
      confirmPasswordRef.current.classList.add("error-border");
    } else if (confirmPassword !== newPassword) {
      error.confirmPassword = "Password must be the same";
      confirmPasswordRef.current.classList.add("error-border");
    }

    // RETURNS IF THERE'S ERROR
    if (Object.keys(error).length > 0) {
      setFormError(error);
      setLoading(false);
      return;
    }

    // RE-AUTHENTICATES THE USER
    try {
      const credential = EmailAuthProvider.credential(email, currentPassword);
      await reAuthenticateUser(credential);
      setLoading(false);
    } catch (error) {
      setFirebaseError(formatError(error.code));
      setLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
      setFirebaseError("PASSWORDS ARE THE SAME");
      setLoading(false);
      return;
    }

    try {
      await updateUserPassword(newPassword);
      setFirebaseSuccess("PASSWORD UPDATED");
    } catch (error) {
      setFirebaseError(formatError(error.code));
      setLoading(false);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setTimeout(() => {
      navigate(-1);
    }, 295);
  };

  useEffect(() => {
    setLoading(true);
    if (currentUser?.email) {
      setLoading(false);
    }
  }, [formError, currentUser?.email, setLoading]);

  useEffect(() => {
    setFirebaseError(false);
    setFirebaseSuccess(false);
    return () => {
      setFirebaseSuccess(false);
      setFirebaseError(false);
    };
  }, [setFirebaseError, setFirebaseSuccess]);

  return (
    <div className="update-password-div">
      <h1 className="h1">CHANGE PASSWORD</h1>
      <h2>{auth.currentUser?.email} </h2>
      <form onSubmit={handlePasswordChange} className="update-profile__form">
        {firebaseError ? <FirebaseErrorComponent /> : null}
        {firebaseSuccess ? <FirebaseSuccessComponent /> : null}
        <div className="update-profile__input-div">
          <div className="pass-div">
            <input
              type={currentPasswordShow === true ? "text" : "password"}
              name="currentPassword"
              placeholder="Enter your old Password"
              value={currentPassword}
              onChange={e => {
                setCurrentPassword(e.target.value);
                resetError(e);
              }}
              ref={currentPasswordRef}
            />
            {currentPassword.length > 0 ? (
              <IconContext.Provider value={{ size: "1.3rem" }}>
                <span
                  className="show-icon-button"
                  onClick={e => togglePasswordVisibility(e, "currentPassword")}
                >
                  {currentPasswordShow === true ? <BiHide /> : <BiShowAlt />}
                </span>
              </IconContext.Provider>
            ) : null}
            {formError?.currentPassword && (
              <p className="email-div-error">{formError.currentPassword}</p>
            )}
          </div>
          <div className="pass-div">
            <input
              type={passwordShow === true ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new Password"
              value={newPassword}
              onChange={e => {
                setNewPassword(e.target.value);
                resetError(e);
              }}
              ref={newPasswordRef}
            />
            {newPassword.length > 0 ? (
              <IconContext.Provider value={{ size: "1.3rem" }}>
                <span
                  className="show-icon-button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordShow === true ? <BiHide /> : <BiShowAlt />}
                </span>
              </IconContext.Provider>
            ) : null}
            {formError.newPassword && (
              <p className="email-div-error">{formError.newPassword}</p>
            )}
          </div>
          <div className="confirm-pass-div">
            <input
              type={passwordShow === true ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm new Password"
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
                resetError(e);
              }}
              ref={confirmPasswordRef}
            />
            {confirmPassword.length > 0 ? (
              <IconContext.Provider value={{ size: "1.3rem" }}>
                <span
                  className="show-icon-button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordShow === true ? <BiHide /> : <BiShowAlt />}
                </span>
              </IconContext.Provider>
            ) : null}
            {formError.confirmPassword && (
              <p className="email-div-error">{formError.confirmPassword}</p>
            )}
          </div>
        </div>
        <button className="update-button">Confirm</button>
      </form>
      <div className="adds">
        <button className="cancel-button" onClick={handleCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};
