"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, BarChart3, Bot, Package, Zap } from "lucide-react";

// Translations
import eng from "../translations/en.json";
import bm from "../translations/bm.json";

export default function LandingPage() {
  const [lang, setLang] = useState("en");
  const t = lang === "en" ? eng.landing : bm.landing;

  const renderTitleWithLineBreaks = (title: string) =>
    title.split("\n").map((line, idx) => (
      <span key={idx}>
        {line}
        <br />
      </span>
    ));

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#e9f5ff] to-white text-gray-900 overflow-x-hidden relative">

      {/* LANGUAGE SWITCHER */}
      <div className="absolute top-6 right-6 z-20 flex gap-4">
        {["en", "bm"].map((lng) => (
          <button
            key={lng}
            onClick={() => setLang(lng)}
            className={`px-4 py-2 rounded-xl transition shadow ${
              lang === lng
                ? "bg-blue-600 text-white shadow-blue-300"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center text-center pt-36 pb-24 px-6 relative">

        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10"
        >
          <motion.img
            src="/logoresize.png"
            alt="Blue Sky Farm Logo"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-64 md:w-72 h-auto drop-shadow-xl"
          />
        </motion.div>

        {/* HERO TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500"
        >
          {renderTitleWithLineBreaks(t.hero.title)}
        </motion.h1>

        {/* HERO SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="mt-6 text-lg md:text-xl max-w-2xl text-gray-600"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link href="/login">
            <button
              className="
                px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all
                bg-blue-600 text-white shadow-lg shadow-blue-300/40
                hover:scale-[1.07] hover:shadow-blue-500/60 hover:shadow-2xl hover:brightness-110
                active:scale-95
              "
            >
              {t.hero.login}
              <ArrowRight size={18} />
            </button>
          </Link>

          <Link href="/signup">
            <button
              className="
                relative px-8 py-3 rounded-xl font-medium text-blue-600 border border-blue-600 transition-all
                overflow-hidden
                hover:bg-blue-50 hover:scale-[1.07] active:scale-95
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400 before:to-teal-400
                before:opacity-0 hover:before:opacity-20 before:transition-opacity
              "
            >
              {t.hero.signup}
            </button>
          </Link>
        </motion.div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="w-full py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">{t.features.title}</h2>

          <div className="flex flex-col items-center gap-10">

            {/* TOP 3 CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">

              <motion.div whileHover={{ scale: 1.05 }} className="p-8 rounded-2xl bg-white shadow-md border hover:shadow-xl transition text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">{t.features.card1Title}</h3>
                <p className="text-gray-600">{t.features.card1Desc}</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="p-8 rounded-2xl bg-white shadow-md border hover:shadow-xl transition text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">{t.features.card2Title}</h3>
                <p className="text-gray-600">{t.features.card2Desc}</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="p-8 rounded-2xl bg-white shadow-md border hover:shadow-xl transition text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">{t.features.card3Title}</h3>
                <p className="text-gray-600">{t.features.card3Desc}</p>
              </motion.div>
            </div>

            {/* BOTTOM 2 CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:w-[70%]">

              <motion.div whileHover={{ scale: 1.05 }} className="p-8 rounded-2xl bg-white shadow-md border hover:shadow-xl transition text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">{t.features.card4Title}</h3>
                <p className="text-gray-600">{t.features.card4Desc}</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="p-8 rounded-2xl bg-white shadow-md border hover:shadow-xl transition text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">{t.features.card5Title}</h3>
                <p className="text-gray-600">{t.features.card5Desc}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="w-full py-24 px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">{t.about.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            {t.about.desc}
          </p>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="w-full py-24 px-6 bg-white text-center">
        <h2 className="text-4xl font-bold mb-6">{t.cta.title}</h2>
        <p className="text-gray-600 mb-10 text-lg">{t.cta.subtitle}</p>

        <Link href="/signup">
          <button
            className="
              px-10 py-4 rounded-xl bg-blue-600 text-white font-medium text-lg
              transition-all shadow-lg shadow-blue-300/40
              hover:scale-[1.07] hover:shadow-blue-500/60 hover:shadow-2xl hover:brightness-110
              active:scale-95
            "
          >
            {t.cta.getStarted}
          </button>
        </Link>
      </section>
    </main>
  );
}
