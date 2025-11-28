"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lang, setLang] = useState<"en" | "bm">("en");

  const router = useRouter();

  const t = {
    en: {
      title: "Welcome to Blue Sky Farm",
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
      title: "Selamat Datang ke Blue Sky Farm",
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
      router.push("/home");
    } catch (error: any) {
      setErrorMsg("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/loginpage_1.png')` }}
      />

      {/* Language Switch */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        {["en", "bm"].map((lng) => (
          <button
            key={lng}
            className={`px-3 py-1 rounded-xl transition ${
              lang === lng
                ? "bg-green-600 text-white shadow"
                : "bg-white text-black hover:bg-gray-200"
            }`}
            onClick={() => setLang(lng as "en" | "bm")}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Login Form */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative bg-white/90 p-10 rounded-2xl shadow-xl w-96 text-center backdrop-blur-sm border border-green-200 z-10"
      >

        {/* Logo */}
        <motion.img
          src="/logoresize.png"
          alt="Blue Sky Farm Logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-32 mx-auto mb-4 drop-shadow-md"
        />

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-extrabold mb-2 text-green-700"
        >
          {text.title}
        </motion.h1>

        <p className="text-sm text-gray-800 mb-6">{text.subtitle}</p>

        {/* Email */}
        <div className="mb-4 text-left">
          <label className="block text-gray-900 text-sm mb-1 font-medium">
            {text.email}
          </label>
          <input
            type="email"
            placeholder={text.emailPH}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-gray-900"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 text-left">
          <label className="block text-gray-900 text-sm mb-1 font-medium">
            {text.password}
          </label>

          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={text.passwordPH}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-gray-900"
              required
            />

            {/* Eye Toggle */}
            <button
              type="button"
              className="absolute right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {errorMsg && (
          <motion.p
            className="text-red-700 mb-3 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ {errorMsg}
          </motion.p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? text.loading : text.login}
        </button>

        {/* Signup */}
        <p className="mt-5 text-sm text-gray-800">
          {text.noAccount}{" "}
          <a href="/signup" className="text-green-700 font-semibold hover:underline">
            {text.signup}
          </a>
        </p>
      </motion.form>
    </div>
  );
}
