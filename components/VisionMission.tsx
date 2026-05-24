"use client";
import { motion } from "framer-motion";
import { Eye, Rocket } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useInView } from "@/lib/useInView";

export default function VisionMission() {
  const { lang } = useLang();
  const tx = t[lang].visionMission;
  const [ref, visible] = useInView();

  const cards = [
    {
      icon: Eye,
      color: "#00D4FF",
      gradient: "rgba(0,212,255,0.08)",
      border: "rgba(0,212,255,0.2)",
      tag: tx.vision.tag,
      title: tx.vision.title,
      desc: tx.vision.desc,
    },
    {
      icon: Rocket,
      color: "#7B2FFF",
      gradient: "rgba(123,47,255,0.08)",
      border: "rgba(123,47,255,0.2)",
      tag: tx.mission.tag,
      title: tx.mission.title,
      desc: tx.mission.desc,
    },
  ];

  return (
    <section
      ref={ref}
      id="vision"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "var(--surf1)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(123,47,255,0.06) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-label mx-auto mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse" />
            {tx.label}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative p-8 rounded-3xl overflow-hidden"
                style={{
                  background: card.gradient,
                  border: `1px solid ${card.border}`,
                }}
              >
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{
                  background: `radial-gradient(circle, ${card.gradient} 0%, transparent 70%)`,
                  filter: "blur(20px)",
                }} />

                <div className="relative z-10">
                  {/* Tag */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                    style={{ background: `${card.color}18`, color: card.color, border: `1px solid ${card.color}30` }}
                  >
                    <Icon size={12} />
                    {card.tag}
                  </div>

                  <h3
                    className="font-black text-white leading-snug mb-4"
                    style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)" }}
                  >
                    {card.title}
                  </h3>

                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {card.desc}
                  </p>

                  {/* Decorative line */}
                  <div
                    className="mt-6 h-0.5 rounded-full opacity-30"
                    style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
