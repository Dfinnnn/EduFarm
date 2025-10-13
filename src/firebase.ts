// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Firebase configuration (from your Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCV298kpz5vjc7yYFJDPpegG8Q4TuvAYU8",
  authDomain: "edufarm-eb4d7.firebaseapp.com",
  projectId: "edufarm-eb4d7",
  storageBucket: "edufarm-eb4d7.appspot.com",
  messagingSenderId: "597484452933",
  appId: "1:597484452933:web:d80c737b34faedab29b72c",
  measurementId: "G-D48GJSZWFK",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const auth = getAuth(app);
const db = getFirestore(app); // optional, if you plan to use Firestore

// ✅ Export everything once
export { app, auth, db };
