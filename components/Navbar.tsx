"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { useTheme } from "@/lib/ThemeContext";
import { t } from "@/lib/translations";
import { openCal } from "@/lib/openCal";

export default function Navbar() {
  const { lang, toggle } = useLang();
  const { theme, toggleTheme } = useTheme();
  const tx = t[lang].nav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about",     label: tx.about },
    { href: "#solutions", label: tx.services },
    { href: "#work",      label: tx.work },
    { href: "#contact",   label: tx.contact },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "glass-nav" : "bg-transparent"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo — orbital icon + flipping brand name */}
          <a href="#hero" className="flex items-center gap-3 shrink-0 group">

            {/* Orbital icon wrapper */}
            <div className="relative flex items-center justify-center" style={{ width: 46, height: 46 }}>

              {/* Orbit path 1 — cyan ring */}
              <div className="absolute pointer-events-none" style={{
                width: 68, height: 68,
                borderRadius: "50%",
                border: "1px solid rgba(0,212,255,0.22)",
                top: -11, left: -11,
              }} />

              {/* Orbit path 2 — purple dashed */}
              <div className="absolute pointer-events-none" style={{
                width: 82, height: 82,
                borderRadius: "50%",
                border: "1px dashed rgba(123,47,255,0.18)",
                top: -18, left: -18,
              }} />

              {/* Orbiting dot 1 — cyan, fast */}
              <div className="nav-orbit-dot absolute pointer-events-none" style={{
                width: 7, height: 7,
                borderRadius: "50%",
                background: "#00D4FF",
                boxShadow: "0 0 10px rgba(0,212,255,0.9), 0 0 20px rgba(0,212,255,0.45)",
                top: "50%", left: "50%",
                marginTop: -3.5, marginLeft: -3.5,
                animation: "navOrbit1 3.5s linear infinite",
                willChange: "transform",
              }} />

              {/* Orbiting dot 2 — purple, slow reverse */}
              <div className="nav-orbit-dot absolute pointer-events-none" style={{
                width: 5, height: 5,
                borderRadius: "50%",
                background: "#7B2FFF",
                boxShadow: "0 0 8px rgba(123,47,255,0.9)",
                top: "50%", left: "50%",
                marginTop: -2.5, marginLeft: -2.5,
                animation: "navOrbit2 6s linear infinite reverse",
                willChange: "transform",
              }} />

              {/* Icon */}
              <div style={{
                width: 46, height: 46,
                borderRadius: "12px",
                overflow: "hidden",
                background: "white",
                position: "relative",
                zIndex: 1,
                animation: "iconGlow 3s ease-in-out infinite",
              }}>
                <Image
                  src="/icon.png"
                  alt="ذكاء فلو"
                  width={46}
                  height={46}
                  style={{ display: "block", width: "46px", height: "46px", objectFit: "contain" }}
                  priority
                />
              </div>
            </div>

            {/* Brand name — flips when language changes */}
            <div style={{ overflow: "hidden", lineHeight: 1 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  style={{ display: "block", fontWeight: 900, fontSize: "1.08rem", letterSpacing: "-0.01em" }}
                >
                  {lang === "ar" ? (
                    <>
                      <span className="grad-text">ذكاء</span>
                      <span className="text-white"> فلو</span>
                    </>
                  ) : (
                    <span className="grad-text">ThakaaFlow</span>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle language"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-gray-300 hover:border-cyan hover:text-cyan transition-all"
            >
              <Globe size={12} />
              {tx.langSwitch}
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-gray-300 hover:border-cyan hover:text-cyan transition-all"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              onClick={() => setOpen(p => !p)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 inset-x-0 glass-nav border-t border-white/5 px-4 pb-6 pt-4 md:hidden"
            style={{ zIndex: 39 }}
          >
            <div className="flex flex-col gap-1">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 px-3 text-base font-medium text-gray-200 hover:text-cyan hover:bg-white/5 rounded-xl transition-all"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex gap-2.5 mt-3 pt-3 border-t border-white/5">
                <button
                  onClick={() => { toggle(); setOpen(false); }}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-gray-300 hover:border-cyan hover:text-cyan transition-all"
                >
                  {tx.langSwitch}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
