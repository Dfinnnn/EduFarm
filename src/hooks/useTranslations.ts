"use client";

import en from "@/translations/en.json";
import bm from "@/translations/bm.json";
import { useApp } from "../app/context/appcontext";

/**
 * useTranslations()
 * Returns a `t(key)` function and current lang.
 * key uses dot notation, e.g. "product.title"
 */
export function useTranslations() {
  const { lang } = useApp();
  const dict: any = lang === "en" ? en : bm;

  function t(key: string, fallback?: string) {
    if (!key) return fallback ?? "";
    const parts = key.split(".");
    let cur: any = dict;
    for (const p of parts) {
      if (cur && typeof cur === "object" && p in cur) {
        cur = cur[p];
      } else {
        return fallback ?? key;
      }
    }
    return typeof cur === "string" ? cur : fallback ?? key;
  }

  return { t, lang };
}
