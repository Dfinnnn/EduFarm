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

  // language state (local, does not touch routes)
  const [lang, setLang] = useState<"en" | "bm">("en");

  // inline translations (simple, self-contained)
  const translations: Record<
    "en" | "bm",
    Record<string, string>
  > = {
    en: {
      title: "🌾 Create Your EduFarm Account",
      subtitle: "Sign up to start automating and learning",
      usernameLabel: "Username",
      usernamePH: "your name",
      companyLabel: "Company",
      companyPH: "company (optional)",
      emailLabel: "Email",
      emailPH: "you@example.com",
      passwordLabel: "Password",
      passwordPH: "••••••••",
      signUp: "Sign Up",
      creating: "Creating Account...",
      already: "Already have an account?",
      login: "Login",
    },
    bm: {
      title: "🌾 Cipta Akaun EduFarm Anda",
      subtitle: "Daftar untuk memulakan automasi dan pembelajaran",
      usernameLabel: "Nama Pengguna",
      usernamePH: "nama anda",
      companyLabel: "Syarikat",
      companyPH: "syarikat (pilihan)",
      emailLabel: "Emel",
      emailPH: "anda@contoh.com",
      passwordLabel: "Kata Laluan",
      passwordPH: "••••••••",
      signUp: "Daftar",
      creating: "Sedang Mendaftar...",
      already: "Sudah mempunyai akaun?",
      login: "Log Masuk",
    },
  };

  const t = (k: string) => translations[lang][k] ?? k;

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
      {/* subtle background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/signup_bg.jpg')` }}
      />

      {/* Language toggle top-right (local only) */}
      <div className="absolute top-5 right-5 flex gap-2 z-20">
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
            lang === "en"
              ? "bg-green-600 text-white"
              : "bg-white/80 text-green-800"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang("bm")}
          className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
            lang === "bm"
              ? "bg-green-600 text-white"
              : "bg-white/80 text-green-800"
          }`}
        >
          BM
        </button>
      </div>

      {/* Form container — matches Login style: subtle frosted card, centered */}
      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 z-10 border border-green-100"
      >
        <h1 className="text-3xl font-extrabold mb-2 text-green-700">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-700 mb-6">{t("subtitle")}</p>

        {/* Username */}
        <div className="mb-4 text-left">
          <label className="block text-gray-900 text-sm mb-1 font-medium">
            {t("usernameLabel")}
          </label>
          <input
            type="text"
            placeholder={t("usernamePH")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-gray-900 font-medium placeholder-gray-400 bg-white/90"
            required
          />
        </div>

        {/* Company */}
        <div className="mb-4 text-left">
          <label className="block text-gray-900 text-sm mb-1 font-medium">
            {t("companyLabel")}
          </label>
          <input
            type="text"
            placeholder={t("companyPH")}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-gray-900 font-medium placeholder-gray-400 bg-white/90"
          />
        </div>

        {/* Email */}
        <div className="mb-4 text-left">
          <label className="block text-gray-900 text-sm mb-1 font-medium">
            {t("emailLabel")}
          </label>
          <input
            type="email"
            placeholder={t("emailPH")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-gray-900 font-medium placeholder-gray-400 bg-white/90"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 text-left">
          <label className="block text-gray-900 text-sm mb-1 font-medium">
            {t("passwordLabel")}
          </label>
          <input
            type="password"
            placeholder={t("passwordPH")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-gray-900 font-medium placeholder-gray-400 bg-white/90"
            required
          />
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? t("creating") : t("signUp")}
        </motion.button>

        <p className="mt-4 text-sm text-gray-800 text-center">
          {t("already")}{" "}
          <a href="/login" className="text-green-700 font-semibold hover:underline">
            {t("login")}
          </a>
        </p>
      </motion.form>
    </div>
  );
}
