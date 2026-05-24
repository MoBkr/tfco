"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Bot, FileSearch, Brain, Workflow, Globe } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { openCal } from "@/lib/openCal";

function initParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0;
  const COLORS = ["rgba(0,212,255,", "rgba(123,47,255,", "rgba(212,168,67,"];
  interface Particle { x: number; y: number; vx: number; vy: number; r: number; ci: number; }
  let particles: Particle[] = [];

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 0.5,
      ci: Math.floor(Math.random() * 3),
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.07 * (1 - d / 140)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = COLORS[p.ci] + "0.55)";
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  resize();
  draw();
  return () => window.removeEventListener("resize", resize);
}

const BADGES_AR = [
  { label: "وكيل AI نشط",       icon: Bot,       color: "#00E676", dot: "#00E676" },
  { label: "معالجة مستندات",    icon: FileSearch, color: "#00D4FF", dot: "#00D4FF" },
  { label: "تنبؤات حية",        icon: Brain,     color: "#7B2FFF", dot: "#7B2FFF" },
  { label: "أتمتة تعمل",        icon: Workflow,  color: "#D4A843", dot: "#D4A843" },
  { label: "حلول ويب جاهزة",   icon: Globe,     color: "#00D4FF", dot: "#00D4FF" },
];
const BADGES_EN = [
  { label: "AI Agent Live",      icon: Bot,       color: "#00E676", dot: "#00E676" },
  { label: "OCR Processing",     icon: FileSearch, color: "#00D4FF", dot: "#00D4FF" },
  { label: "Live Predictions",   icon: Brain,     color: "#7B2FFF", dot: "#7B2FFF" },
  { label: "Automation Running", icon: Workflow,  color: "#D4A843", dot: "#D4A843" },
  { label: "Web Solutions",      icon: Globe,     color: "#00D4FF", dot: "#00D4FF" },
];

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang].hero;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badges = lang === "ar" ? BADGES_AR : BADGES_EN;
  const isRTL = lang === "ar";

  useEffect(() => {
    if (!canvasRef.current) return;
    if (window.innerWidth < 768) return;
    return initParticles(canvasRef.current);
  }, []);

  return (
    <section id="hero" className="relative flex items-center justify-center pt-16 min-h-svh overflow-hidden">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-glow" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40 hidden md:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* ── LOGO SIDE ── order-2 on mobile (below text), order-1 on desktop (right in RTL, left in LTR) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-shrink-0 relative flex items-center justify-center order-2 lg:order-1"
            style={{ width: 300, height: 300 }}
          >
            {/* Soft radial glow behind icon */}
            <div className="absolute pointer-events-none" style={{
              width: 360, height: 360,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,212,255,0.18) 0%, rgba(123,47,255,0.12) 40%, transparent 70%)",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              filter: "blur(16px)",
            }} />

            {/* Orbit ring 1 — outer 300px */}
            <div className="absolute pointer-events-none" style={{
              width: 300, height: 300,
              borderRadius: "50%",
              border: "1px solid rgba(0,212,255,0.18)",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
            }} />
            {/* Orbit ring 2 — mid 260px dashed */}
            <div className="absolute pointer-events-none" style={{
              width: 260, height: 260,
              borderRadius: "50%",
              border: "1px dashed rgba(123,47,255,0.22)",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
            }} />
            {/* Orbit ring 3 — inner 220px */}
            <div className="absolute pointer-events-none" style={{
              width: 220, height: 220,
              borderRadius: "50%",
              border: "1px solid rgba(212,168,67,0.12)",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
            }} />

            {/* Orbiting dot — cyan, outer ring */}
            <div className="hero-orbit-dot absolute pointer-events-none" style={{
              width: 12, height: 12, borderRadius: "50%",
              background: "#00D4FF",
              boxShadow: "0 0 16px rgba(0,212,255,1), 0 0 32px rgba(0,212,255,0.5)",
              top: "50%", left: "50%",
              marginTop: -6, marginLeft: -6,
              animation: "heroOrbit1 4.5s linear infinite",
              transformOrigin: "0 0",
              willChange: "transform",
            }} />
            {/* Orbiting dot — purple, mid ring */}
            <div className="hero-orbit-dot absolute pointer-events-none" style={{
              width: 9, height: 9, borderRadius: "50%",
              background: "#7B2FFF",
              boxShadow: "0 0 12px rgba(123,47,255,1), 0 0 24px rgba(123,47,255,0.5)",
              top: "50%", left: "50%",
              marginTop: -4.5, marginLeft: -4.5,
              animation: "heroOrbit2 7s linear infinite reverse",
              transformOrigin: "0 0",
              willChange: "transform",
            }} />
            {/* Orbiting dot — gold, inner ring */}
            <div className="hero-orbit-dot absolute pointer-events-none" style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#D4A843",
              boxShadow: "0 0 10px rgba(212,168,67,1), 0 0 20px rgba(212,168,67,0.4)",
              top: "50%", left: "50%",
              marginTop: -4, marginLeft: -4,
              animation: "heroOrbit3 10s linear infinite",
              transformOrigin: "0 0",
              willChange: "transform",
            }} />

            {/* The icon — 200px */}
            <div style={{
              width: 200, height: 200,
              borderRadius: "44px",
              overflow: "hidden",
              background: "white",
              position: "relative",
              zIndex: 1,
              animation: "iconGlow 3s ease-in-out infinite",
              boxShadow: "0 0 60px rgba(0,212,255,0.28), 0 0 120px rgba(123,47,255,0.14)",
              willChange: "opacity",
            }}>
              <Image
                src="/icon.png"
                alt="ذكاء فلو"
                width={200}
                height={200}
                style={{ display: "block", width: "200px", height: "200px", objectFit: "contain" }}
                priority
              />
            </div>
          </motion.div>

          {/* ── TEXT SIDE ── order-1 on mobile (top), order-2 on desktop (left in RTL, right in LTR) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-start order-1 lg:order-2"
          >
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="section-label mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse" />
              {tx.pill}
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="font-black leading-tight mb-6"
              style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
                lineHeight: 1.1,
                textShadow: "0 0 80px rgba(0,212,255,0.12)",
              }}
            >
              {lang === "ar" ? (
                <>عملك يستحق<br /><span className="grad-text">ذكاءً لا يتعب</span></>
              ) : (
                <>Your Business Deserves<br /><span className="grad-text">Intelligence That Never Sleeps</span></>
              )}
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.6 }}
              className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8"
              style={{ maxWidth: "46ch" }}
            >
              {tx.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button onClick={openCal} className="btn-primary text-base px-8 py-3.5">
                <Bot size={18} />
                {tx.cta1}
              </button>
              <a href="#solutions" className="btn-ghost text-base px-8 py-3.5">
                {tx.cta2}
                <ChevronDown size={16} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl mb-10"
            >
              {[
                { v: tx.stat1v, l: tx.stat1l, c: "grad-text" },
                { v: tx.stat2v, l: tx.stat2l, c: "grad-text" },
                { v: tx.stat3v, l: tx.stat3l, c: "text-gold" },
                { v: tx.stat4v, l: tx.stat4l, c: "text-white" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-3 text-center"
                >
                  <div className={`text-xl sm:text-2xl font-black ${s.c}`}>{s.v}</div>
                  <div className="text-xs text-gray-400 mt-1 leading-tight">{s.l}</div>
                </div>
              ))}
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {badges.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-default"
                  style={{
                    background: `${b.color}0d`,
                    border: `1px solid ${b.color}28`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
                    style={{ background: b.dot, boxShadow: `0 0 6px ${b.dot}` }}
                  />
                  <b.icon size={12} style={{ color: b.color }} />
                  <span className="text-gray-300">{b.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
