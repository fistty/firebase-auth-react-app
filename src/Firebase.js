// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBT6svFOzfosN2p8ljloyjSAFHJW91c0Xk",
  authDomain: "firestore-practice-c15fd.firebaseapp.com",
  projectId: "firestore-practice-c15fd",
  storageBucket: "firestore-practice-c15fd.appspot.com",
  messagingSenderId: "128534099808",
  appId: "1:128534099808:web:b51f9ab90e8b254ef45005",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export { db, collection, addDoc };
