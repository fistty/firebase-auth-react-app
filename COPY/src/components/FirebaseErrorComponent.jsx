import React from "react";
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import { useUserAuth } from "../context/userAuthContext";

export const FirebaseErrorComponent = () => {
  const { firebaseError } = useUserAuth();
  return (
    <p className="firebase-error">
      <span>
        <BsFillExclamationOctagonFill size="1.2rem" />
      </span>
      {firebaseError}
    </p>
  );
};
