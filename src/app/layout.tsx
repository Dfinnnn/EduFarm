"use client";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/chatbot";
import { usePathname } from "next/navigation";
import { AppProvider } from "./context/appcontext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
        <AppProvider>
          {!hideUI && <Header />}
          <main>{children}</main>
          {!hideUI && <Footer />}
          {!hideUI && <Chatbot />}
        </AppProvider>
      </body>
    </html>
  );
}
