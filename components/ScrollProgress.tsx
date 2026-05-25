"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => {
      const s = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(s / h) * 100}%` : "0%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full z-[60] h-[2px] pointer-events-none">
      <div ref={barRef} style={{
        height: "100%", width: "0%",
        background: "linear-gradient(90deg, #00D4FF, #7B2FFF, #00D4FF)",
        backgroundSize: "200% 100%",
        animation: "gradShift 3s linear infinite",
        boxShadow: "0 0 8px rgba(0,212,255,0.8), 0 0 16px rgba(0,212,255,0.3)",
        transition: "width 0.08s ease-out",
      }} />
    </div>
  );
}
