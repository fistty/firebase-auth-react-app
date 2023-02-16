import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";

export const addUserToCollection = async user => {
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    name: user.email.split("@")[0],
    email: user.email,
    emailVerified: user.emailVerified,
    authProvider: "local",
    userCreated: serverTimestamp(),
  })
    .then(() => console.log("ADDED TO DATABASE"))
    .catch(err => {
      throw new Error(err);
    });
};
