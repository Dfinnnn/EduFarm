"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        company,
        email,
        createdAt: new Date(),
      });

      alert("🎉 Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* 🖼 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/signup_bg.jpg')` }}
      />

      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-96 z-10 border border-green-100"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-green-700">
          🌾 Create Your EduFarm Account
        </h1>

        {/* Username */}
        <div className="relative mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="peer w-full border border-green-300 rounded-lg p-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 font-medium"
            placeholder="Username"
            required
          />
          <label className="absolute left-3 top-3.5 text-gray-900 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-700 bg-white px-1">
            Username
          </label>
        </div>

        {/* Company */}
        <div className="relative mb-4">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="peer w-full border border-green-300 rounded-lg p-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 font-medium"
            placeholder="Company"
            required
          />
          <label className="absolute left-3 top-3.5 text-gray-900 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-700 bg-white px-1">
            Company
          </label>
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full border border-green-300 rounded-lg p-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 font-medium"
            placeholder="Email"
            required
          />
          <label className="absolute left-3 top-3.5 text-gray-900 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-700 bg-white px-1">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full border border-green-300 rounded-lg p-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 font-medium"
            placeholder="Password"
            required
          />
          <label className="absolute left-3 top-3.5 text-gray-900 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-700 bg-white px-1">
            Password
          </label>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 shadow-lg"
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </motion.button>

        <p className="mt-4 text-sm text-gray-800">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </motion.form>
    </div>
  );
}
