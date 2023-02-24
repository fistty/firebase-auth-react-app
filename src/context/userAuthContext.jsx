import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../Firebase";

export const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState(false);
  const [firebaseSuccess, setFirebaseSuccess] = useState(false);

  const signUpUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = async () => {
    return signOut(auth);
  };

  const updateUserEmail = async newEmail => {
    return updateEmail(auth.currentUser, newEmail);
  };

  const reAuthenticateUser = async credential => {
    return reauthenticateWithCredential(auth.currentUser, credential);
  };

  const updateUserPassword = async newPassword => {
    return updatePassword(auth.currentUser, newPassword);
  };

  const resetUserPassword = async email => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setCurrentUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        currentUser,
        loading,
        setLoading,
        signUpUser,
        logInUser,
        logOutUser,
        updateUserEmail,
        reAuthenticateUser,
        updateUserPassword,
        resetUserPassword,
        firebaseError,
        setFirebaseError,
        firebaseSuccess,
        setFirebaseSuccess,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
