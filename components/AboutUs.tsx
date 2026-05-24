"use client";
import { motion } from "framer-motion";
import { Zap, Target, Brain, Handshake } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useInView } from "@/lib/useInView";

const PILLAR_ICONS = [Zap, Target, Brain, Handshake];
const PILLAR_COLORS = ["#00D4FF", "#00E676", "#7B2FFF", "#D4A843"];

export default function AboutUs() {
  const { lang } = useLang();
  const tx = t[lang].about;
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="about"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "var(--deep)" }}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse" />
            {tx.label}
          </div>
          <h2
            className="font-black leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {lang === "ar" ? (
              <><span className="text-white">نبني بالتقنية،</span>{" "}<span className="grad-text">نُميّز بالذكاء</span></>
            ) : (
              <><span className="text-white">We Build with Technology,</span>{" "}<span className="grad-text">We Differentiate with Intelligence</span></>
            )}
          </h2>
          <p
            className="text-gray-400 text-base sm:text-lg leading-relaxed mx-auto"
            style={{ maxWidth: "58ch" }}
          >
            {tx.sub}
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tx.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            const color = PILLAR_COLORS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="card p-6"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
