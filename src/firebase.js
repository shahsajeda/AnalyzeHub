// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCAdV75cpM9MOhbZ1hLqjnNX_pNFCvIaL0",
  authDomain: "analysehub-2034e.firebaseapp.com",
  projectId: "analysehub-2034e",
  storageBucket: "analysehub-2034e.appspot.com",  // Fixed incorrect domain
  messagingSenderId: "691010457732",
  appId: "1:691010457732:web:45c0a47e762a1abec972d1",
  measurementId: "G-HM93M762SQ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export {app, auth, onAuthStateChanged, signInWithEmailAndPassword, signOut };
// src/firebaseConfig.js

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCAdV75cpM9MOhbZ1hLqjnNX_pNFCvIaL0",
//   authDomain: "analysehub-2034e.firebaseapp.com",
//   projectId: "analysehub-2034e",
//   storageBucket: "analysehub-2034e.appspot.com",
//   messagingSenderId: "691010457732",
//   appId: "1:691010457732:web:45c0a47e762aL0"
// };

// // Initialize Firebase App
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Auth
// const auth = getAuth(app);

// export { app, auth };
