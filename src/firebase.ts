// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV298kpz5vjc7yYFJDPpegG8Q4TuvAYU8",
  authDomain: "edufarm-eb4d7.firebaseapp.com",
  projectId: "edufarm-eb4d7",
  storageBucket: "edufarm-eb4d7.firebasestorage.app",
  messagingSenderId: "597484452933",
  appId: "1:597484452933:web:d80c737b34faedab29b72c",
  measurementId: "G-D48GJSZWFK",
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Firestore instance
const db = getFirestore(app);

// ✅ Auth instance
const auth = getAuth(app);

// ✅ Anonymous sign-in for demo (only in browser)
if (typeof window !== "undefined") {
  signInAnonymously(auth).catch((error) => {
    console.error("Anonymous sign-in failed:", error);
  });
}

// ✅ Export for use in other components
export { app, db, auth };
