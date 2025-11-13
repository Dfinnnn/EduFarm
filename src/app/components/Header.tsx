"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ✅ Track user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!isLoggingOut) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [isLoggingOut]);

  // ✅ Smooth logout without flicker
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
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/product", label: "Product" }, // ✅ New Product section
    { href: "/videos", label: "Videos" },
    { href: "/forum", label: "Forum" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-green-100 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-10 py-3">
        {/* 🌿 Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-green-700 tracking-tight"
        >
          EduFarm
        </motion.div>

        {/* 🌿 Navigation Links */}
        <ul className="hidden md:flex gap-8 text-xl font-semibold items-center">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <motion.li
                key={link.href}
                whileHover={{ scale: 1.08 }}
                className="relative group"
              >
                <Link
                  href={link.href}
                  className={`px-5 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-green-600 text-white shadow-md"
                      : "text-green-700 hover:bg-green-100"
                  }`}
                >
                  {link.label}
                </Link>
                {!isActive && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-green-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  />
                )}
              </motion.li>
            );
          })}

          {/* ✅ Show Logout only if logged in */}
          {user && (
            <li>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* 🌿 Mobile Menu */}
      <div className="md:hidden flex justify-center border-t border-green-100 bg-white py-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`mx-2 px-3 py-2 rounded-md text-base font-semibold ${
              pathname === link.href
                ? "bg-green-600 text-white"
                : "text-green-700 hover:bg-green-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
        {user && (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mx-2 px-3 py-2 rounded-md text-base font-semibold bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoggingOut ? "..." : "Logout"}
          </button>
        )}
      </div>
    </header>
  );
}
