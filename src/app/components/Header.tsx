"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/videos", label: "Videos" },
    { href: "/forum", label: "Forum" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-green-100 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-10 py-3">
        {/* 🌿 Logo (left aligned to the edge) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-green-700 tracking-tight"
        >
          EduFarm 🌱
        </motion.div>

        {/* 🌿 Navigation Links (larger labels) */}
        <ul className="hidden md:flex gap-8 text-xl font-semibold">
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
      </div>
    </header>
  );
}
