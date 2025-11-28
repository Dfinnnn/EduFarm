"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useApp } from "../context/appcontext";
import { useTranslations } from "../../hooks/useTranslations";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { lang, setLang } = useApp();
  const { t } = useTranslations();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!isLoggingOut) setUser(currentUser);
    });
    return () => unsubscribe();
  }, [isLoggingOut]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  const links = [
    { href: "/home", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/product", label: t("nav.product") },
    { href: "/videos", label: t("nav.videos") },
    { href: "/forum", label: t("nav.forum") },
  ];

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-green-100 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-700 tracking-tight"
        >
          {t("header.brand")}
        </motion.div>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-3 lg:gap-4 text-lg lg:text-xl font-semibold items-center">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li
                key={link.href}
                className="relative group"
                style={{ minWidth: "110px", textAlign: "center" }}
              >
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-full transition-all duration-300 block ${
                    isActive
                      ? "bg-green-600 text-white shadow-md"
                      : "text-green-700 hover:bg-green-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}

          {/* Language Switch */}
          <div className="flex gap-2 items-center ml-4">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full text-sm w-12 text-center ${
                lang === "en"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("bm")}
              className={`px-3 py-1 rounded-full text-sm w-12 text-center ${
                lang === "bm"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700"
              }`}
            >
              BM
            </button>
          </div>

          {/* Logout */}
          {user && (
            <li>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all min-w-[110px]"
              >
                {isLoggingOut ? "..." : t("header.logout")}
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile nav (SCROLLABLE) */}
      <div className="md:hidden overflow-x-auto flex justify-start gap-2 px-3 py-2 border-t border-green-100 bg-white">

        {/* Mobile navigation links */}
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-md text-base font-semibold whitespace-nowrap ${
              pathname === link.href
                ? "bg-green-600 text-white"
                : "text-green-700 hover:bg-green-100"
            }`}
          >
            {link.label}
          </Link>
        ))}

        {/* 🔥 Language Switch added to Mobile */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
              lang === "en"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700"
            }`}
          >
            EN
          </button>

          <button
            onClick={() => setLang("bm")}
            className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
              lang === "bm"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700"
            }`}
          >
            BM
          </button>
        </div>

        {/* Mobile Logout */}
        {user && (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-3 py-2 rounded-md text-base font-semibold bg-red-600 hover:bg-red-700 text-white whitespace-nowrap"
          >
            {isLoggingOut ? "..." : t("header.logout")}
          </button>
        )}
      </div>
    </header>
  );
}
