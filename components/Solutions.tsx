"use client";
import { motion } from "framer-motion";
import { Bot, FileSearch, Brain, Workflow, Layers, Users, Mic, MessageCircle, BarChart3, Globe, Sparkles, Database } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useInView } from "@/lib/useInView";

const PILLAR_ICONS: Record<string, React.ElementType> = { Bot, Workflow, Layers };

const CARD_ICONS = [
  [Bot, Mic, Users, Brain],
  [FileSearch, Database, MessageCircle, BarChart3],
  [Layers, Globe, Workflow, Sparkles],
];

const CARD_COLORS = [
  ["#00D4FF", "#00D4FF", "#00D4FF", "#00D4FF"],
  ["#00E676", "#00E676", "#00E676", "#00E676"],
  ["#7B2FFF", "#7B2FFF", "#7B2FFF", "#7B2FFF"],
];

export default function Solutions() {
  const { lang } = useLang();
  const tx = t[lang].solutions;
  const [ref, visible] = useInView();

  return (
    <section ref={ref} id="solutions" className="py-20 lg:py-28" style={{ background: "var(--deep)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="section-label mx-auto mb-5">{tx.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">{tx.h2}</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">{tx.sub}</p>
        </div>

        <div className="space-y-14">
          {(tx as any).pillars.map((pillar: any, pi: number) => {
            const PillarIcon = PILLAR_ICONS[pillar.icon] ?? Bot;
            return (
              <div key={pi}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${pillar.color}18`, border: `1px solid ${pillar.color}40` }}
                  >
                    <PillarIcon size={18} color={pillar.color} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                  <div className="flex-1 h-px" style={{ background: `${pillar.color}20` }} />
                </div>

                {/* Bento grid — items 0 & 3 are wide (zigzag) */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pillar.items.map((item: any, ii: number) => {
                    const Icon = CARD_ICONS[pi]?.[ii] ?? Sparkles;
                    const color = CARD_COLORS[pi]?.[ii] ?? "#00D4FF";
                    const isFeatured = ii === 0 || ii === 3;

                    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
                      const el = e.currentTarget;
                      const r = el.getBoundingClientRect();
                      const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
                      const y = ((e.clientY - r.top)  / r.height - 0.5) * 16;
                      el.style.transform = `perspective(700px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(10px)`;
                      el.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 30px ${color}28`;
                      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
                      el.style.setProperty("--my", `${e.clientY - r.top}px`);
                    };

                    const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "";
                      e.currentTarget.style.setProperty("--mx", "-9999px");
                      e.currentTarget.style.setProperty("--my", "-9999px");
                    };

                    return (
                      <motion.div
                        key={ii}
                        initial={{ opacity: 0, y: 20 }}
                        animate={visible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.45, delay: pi * 0.1 + ii * 0.07 }}
                        className={`card group cursor-default${isFeatured ? " lg:col-span-2" : ""}`}
                        style={{
                          padding: isFeatured ? "1.75rem" : "1.25rem",
                          transition: "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.3s ease",
                        }}
                        onMouseMove={handleMove}
                        onMouseLeave={handleLeave}
                      >
                        {/* Inner spotlight — follows mouse via CSS vars */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            borderRadius: "inherit",
                            background: `radial-gradient(280px circle at var(--mx, -9999px) var(--my, -9999px), ${color}10, transparent 55%)`,
                          }}
                        />
                        {/* Content — above spotlight by DOM order */}
                        <div className="relative">
                          <div
                            className={`${isFeatured ? "w-12 h-12 mb-5" : "w-10 h-10 mb-4"} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
                            style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                          >
                            <Icon size={isFeatured ? 22 : 20} color={color} />
                          </div>
                          <h4 className={`font-bold text-white mb-2 ${isFeatured ? "text-base" : "text-sm"} leading-snug`}>
                            {item.title}
                          </h4>
                          <p className={`text-gray-400 ${isFeatured ? "text-sm" : "text-xs"} leading-relaxed`}>
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
