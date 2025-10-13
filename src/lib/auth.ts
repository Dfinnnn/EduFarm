// src/lib/auth.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User created:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error("Signup error:", error.message);
    return { success: false, message: error.message };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error("Login error:", error.message);
    return { success: false, message: error.message };
  }
};
