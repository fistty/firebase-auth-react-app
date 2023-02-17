import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";

export const addUserToCollection = async user => {
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    name: user.email.split("@")[0],
    email: user.email,
    emailVerified: user.emailVerified,
    authProvider: "local",
    userCreated: serverTimestamp(),
  }).catch(err => {
    throw new Error(err);
  });
};

export const updateUserInCollection = async (oldEmail, newEmail) => {
  let id = "";
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", oldEmail));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    alert("EMPTY");
    throw new Error("Email does not exist");
  }
  id = querySnapshot.docs[0].id;

  const ref = doc(db, "users", id);
  await updateDoc(ref, {
    email: newEmail,
  }).catch(err => {
    throw new Error("Email couldn't be updated");
  });
};
