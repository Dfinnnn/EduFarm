"use client";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide Header & Footer on login and signup pages
  const hideHeaderFooter = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          background: "#f5f5f5",
        }}
      >
        {!hideHeaderFooter && <Header />}
        <main>{children}</main>
        {!hideHeaderFooter && <Footer />}
      </body>
    </html>
  );
}

