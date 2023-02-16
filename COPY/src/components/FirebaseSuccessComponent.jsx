import React from "react";
import { BsCheckSquareFill } from "react-icons/bs";
import { useUserAuth } from "../context/userAuthContext";

export const FirebaseSuccessComponent = () => {
  const { firebaseSuccess } = useUserAuth();

  return (
    <p className="firebase-success">
      <span>
        <BsCheckSquareFill size="1.2rem" />
      </span>
      {firebaseSuccess}
    </p>
  );
};
