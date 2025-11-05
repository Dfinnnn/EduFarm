"use client";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/chatbot"; // ✅ Import chatbot
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide Header, Footer, and Chatbot on login and signup pages
  const hideUI =
    pathname === "/login" ||
    pathname === "/signup";

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          background: "#f5f5f5",
        }}
      >
        {!hideUI && <Header />}
        <main>{children}</main>
        {!hideUI && <Footer />}

        {/* ✅ Global chatbot (visible on all pages except login/signup) */}
        {!hideUI && <Chatbot />}
      </body>
    </html>
  );
}
