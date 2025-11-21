"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "bm";

type AppContextType = {
  lang: Lang;
  setLang: (v: Lang) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("lang") as Lang | null;
      if (savedLang) setLangState(savedLang);
    }
  }, []);

  // Wrapper to set state and save to localStorage
  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", newLang);
    }
  };

  return <AppContext.Provider value={{ lang, setLang }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside <AppProvider>");
  }
  return ctx;
}
