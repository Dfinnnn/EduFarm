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

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Firestore instance
const db = getFirestore(app);

// ✅ Firebase Auth instance (for login/signup)
const auth = getAuth(app);

// ❌ Remove anonymous sign-in (we now use email/password instead)

// ✅ Export for use throughout your app
export { app, db, auth };
