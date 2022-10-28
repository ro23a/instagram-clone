import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy0NIA1frjTzwMaBY6zm9J6OALoDLS1r0",
  authDomain: "react-instagram-11075.firebaseapp.com",
  projectId: "react-instagram-11075",
  storageBucket: "react-instagram-11075.appspot.com",
  messagingSenderId: "633458178630",
  appId: "1:633458178630:web:76e861b78440a475a6a847",
  measurementId: "G-JHRVVPT3BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
