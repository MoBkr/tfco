"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Lang } from "./translations";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
  isAr: boolean;
}

const Ctx = createContext<LangCtx>({ lang: "ar", toggle: () => {}, isAr: true });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const stored = localStorage.getItem("tf_lang") as Lang | null;
    if (stored === "en") setLang("en");
  }, []);

  useEffect(() => {
    localStorage.setItem("tf_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggle = () => setLang(p => p === "ar" ? "en" : "ar");

  return <Ctx.Provider value={{ lang, toggle, isAr: lang === "ar" }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
