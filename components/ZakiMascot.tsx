"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LangContext";

export default function ZakiMascot() {
  const { lang } = useLang();
  const [bubble, setBubble] = useState(false);
  const [hasZaki, setHasZaki] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setHasZaki(true);
    img.onerror = () => setHasZaki(false);
    img.src = "/zaki.png";
  }, []);

  useEffect(() => {
    if (!hasZaki) return;
    const t = setTimeout(() => setBubble(true), 2500);
    const t2 = setTimeout(() => setBubble(false), 8000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [hasZaki]);

  const triggerWidget = () => {
    const widget = document.querySelector("elevenlabs-convai");
    if (!widget) return;
    const sr = (widget as any).shadowRoot as ShadowRoot | null;
    const btn = sr?.querySelector("button") as HTMLButtonElement | null;
    btn?.click();
  };

  if (!hasZaki) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[45] hidden md:flex flex-col items-end gap-2">
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.22 }}
            className="relative text-sm text-white rounded-2xl px-4 py-2.5 max-w-[180px] text-center"
            style={{
              background: "var(--surf1)",
              border: "1px solid rgba(0,212,255,0.18)",
              boxShadow: "0 0 20px rgba(0,212,255,0.1)",
            }}
          >
            {lang === "ar" ? "أهلاً! أنا ذكي 👋 تحدث معي!" : "Hi! I'm Zaki 👋 Talk to me!"}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2"
              style={{
                width: 0, height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "8px solid rgba(13,18,32,0.98)",
              }}
            />
            <button
              onClick={() => setBubble(false)}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gray-700 text-white text-[10px] flex items-center justify-center hover:bg-gray-500 transition-colors"
              style={{ lineHeight: 1 }}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={triggerWidget}
        onMouseEnter={() => setBubble(true)}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className="relative cursor-pointer bg-transparent border-0 p-0"
        aria-label={lang === "ar" ? "تحدث مع ذكي" : "Talk to Zaki"}
      >
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)",
            filter: "blur(12px)",
            transform: "scale(1.3)",
          }}
        />
        <Image
          src="/zaki.png"
          alt="ذكي"
          width={84}
          height={84}
          style={{ position: "relative", zIndex: 1, filter: "drop-shadow(0 0 12px rgba(0,212,255,0.35))" }}
        />
      </motion.button>
    </div>
  );
}
