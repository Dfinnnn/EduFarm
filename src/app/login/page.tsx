"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lang, setLang] = useState<"en" | "bm">("en");

  const router = useRouter();

  // 🔥 Simple inline translations
  const t = {
    en: {
      title: "Welcome Back to EduFarm 👋",
      subtitle: "Please log in to your account",
      email: "Email",
      emailPH: "you@example.com",
      password: "Password",
      passwordPH: "••••••••",
      login: "Login",
      loading: "Logging in...",
      noAccount: "Don't have an account?",
      signup: "Sign Up",
    },
    bm: {
      title: "Selamat Datang ke EduFarm 👋",
      subtitle: "Sila log masuk ke akaun anda",
      email: "Emel",
      emailPH: "anda@contoh.com",
      password: "Kata Laluan",
      passwordPH: "••••••••",
      login: "Log Masuk",
      loading: "Sedang memproses...",
      noAccount: "Tiada akaun?",
      signup: "Daftar",
    },
  };

  const text = t[lang];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login successful!");
      router.push("/");
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/login_bg.jpg')` }}
      />

      {/* Language Switch */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          className={`px-3 py-1 rounded ${
            lang === "en" ? "bg-green-600 text-white" : "bg-white text-black"
          }`}
          onClick={() => setLang("en")}
        >
          EN
        </button>
        <button
          className={`px-3 py-1 rounded ${
            lang === "bm" ? "bg-green-600 text-white" : "bg-white text-black"
          }`}
          onClick={() => setLang("bm")}
        >
          BM
        </button>
      </div>

      {/* Login Box */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative bg-white/90 p-10 rounded-2xl shadow-xl w-96 text-center backdrop-blur-sm border border-green-200 z-10"
      >
        <h1 className="text-3xl font-extrabold mb-4 text-green-700">
          {text.title}
        </h1>
        <p className="text-sm text-gray-800 mb-6">{text.subtitle}</p>

        <div className="mb-4 text-left">
          <label className="block text-gray-900 text-sm mb-1 font-medium">
            {text.email}
          </label>
          <input
            type="email"
            placeholder={text.emailPH}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-gray-900 font-medium placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-6 text-left">
          <label className="block text-gray-900 text-sm mb-1 font-medium">
            {text.password}
          </label>
          <input
            type="password"
            placeholder={text.passwordPH}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-gray-900 font-medium placeholder-gray-400"
            required
          />
        </div>

        {errorMsg && (
          <motion.p
            className="text-red-700 mb-3 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ {errorMsg}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? text.loading : text.login}
        </button>

        <p className="mt-5 text-sm text-gray-800">
          {text.noAccount}{" "}
          <a
            href="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            {text.signup}
          </a>
        </p>
      </motion.form>
    </div>
  );
}
