"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MessageSquare, Workflow, Zap } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

type Tab = "voice" | "chat" | "workflow";

export default function AIDemo() {
  const { lang } = useLang();
  const tx = t[lang].demo;
  const [tab, setTab] = useState<Tab>("voice");

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "voice",    label: tx.tabs.voice,    icon: <Mic size={15} /> },
    { key: "chat",     label: tx.tabs.chat,     icon: <MessageSquare size={15} /> },
    { key: "workflow", label: tx.tabs.workflow,  icon: <Workflow size={15} /> },
  ];

  return (
    <section id="demo" className="py-20 lg:py-28" style={{ background: "var(--surf2)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="section-label mx-auto mb-5">{tx.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">{tx.h2}</h2>
          <p className="text-gray-400 max-w-xl mx-auto">{tx.sub}</p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {tabs.map(tab_ => (
            <button
              key={tab_.key}
              onClick={() => setTab(tab_.key)}
              className={`demo-tab flex items-center gap-2 ${tab === tab_.key ? "active" : ""}`}
            >
              {tab_.icon} {tab_.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: "var(--surf1)" }}>
          <AnimatePresence mode="wait">
            {tab === "voice" && (
              <motion.div key="voice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <VoiceTab lang={lang} tx={tx.voice} />
              </motion.div>
            )}
            {tab === "chat" && (
              <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <ChatTab lang={lang} tx={tx.chat} />
              </motion.div>
            )}
            {tab === "workflow" && (
              <motion.div key="workflow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <WorkflowTab lang={lang} tx={tx.workflow} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── Voice tab ─────────────────────────────── */
function VoiceTab({ lang, tx }: { lang: string; tx: any }) {
  return (
    <div className="p-8 flex flex-col items-center text-center gap-5">
      {/* Zaki animated avatar */}
      <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
        {/* Pulsing rings */}
        {[180, 140, 100].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size, height: size,
              border: `1px solid rgba(0,212,255,${0.12 + i * 0.1})`,
              animation: `zakiPulse 3s ease-in-out ${i * 0.55}s infinite`,
            }}
          />
        ))}
        {/* Zaki image or fallback mic orb */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative z-10"
          style={{ filter: "drop-shadow(0 0 18px rgba(0,212,255,0.45))" }}
        >
          <ZakiOrFallback size={90} />
        </motion.div>
      </div>

      {/* Live badge */}
      <div
        className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full"
        style={{ background: "rgba(0,230,118,0.1)", border: "1px solid rgba(0,230,118,0.25)", color: "#00E676" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
        {lang === "ar" ? "ذكي متاح الآن" : "Zaki is Online"}
      </div>

      <h3 className="text-2xl font-black text-white">{tx.h3}</h3>
      <p className="text-gray-400 max-w-sm text-sm leading-relaxed">{tx.desc}</p>

      <div className="w-full flex flex-col items-center gap-3">
        <elevenlabs-convai agent-id="agent_6801kse15x6afb3t77e4nrqhvfrb" />
        <p className="text-xs text-gray-600">{tx.note}</p>
      </div>
    </div>
  );
}

function ZakiOrFallback({ size }: { size: number }) {
  return (
    <div className="relative">
      <Image
        src="/zaki.png"
        alt="ذكي"
        width={size}
        height={size}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      {/* Fallback: mic orb shown via CSS if image missing */}
      <noscript>
        <div
          style={{
            width: size, height: size, borderRadius: "50%",
            background: "linear-gradient(135deg,rgba(0,212,255,0.2),rgba(123,47,255,0.2))",
            border: "1px solid rgba(0,212,255,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Mic size={size * 0.4} color="#00D4FF" />
        </div>
      </noscript>
    </div>
  );
}

/* ── Chat tab ─────────────────────────────── */
function ChatTab({ lang, tx }: { lang: string; tx: any }) {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="space-y-4">
        {tx.msgs.map((msg: { role: string; text: string }, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className={`flex ${msg.role === "user" ? (lang === "ar" ? "justify-start" : "justify-end") : (lang === "ar" ? "justify-end" : "justify-start")}`}
          >
            <div
              className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "text-white"
                  : "text-gray-200 border border-white/8"
              }`}
              style={
                msg.role === "user"
                  ? { background: "linear-gradient(135deg,#00D4FF,#7B2FFF)" }
                  : { background: "var(--surf2)" }
              }
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex gap-2 opacity-50 pointer-events-none">
        <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none" placeholder={tx.placeholder} disabled />
        <button className="btn-primary px-4 py-3 text-sm">→</button>
      </div>
      <p className="text-center text-xs text-gray-600 mt-3">
        {lang === "ar" ? "هذا عرض توضيحي — تحدث مع وكيلنا الحقيقي عبر الصوت أعلاه" : "This is a demo — talk to our real agent via voice above"}
      </p>
    </div>
  );
}

/* ── Workflow tab ──────────────────────────── */
function WorkflowTab({ lang, tx }: { lang: string; tx: any }) {
  return (
    <div className="p-8">
      <svg viewBox="0 0 800 180" className="w-full h-auto" style={{ maxHeight: 220 }}>
        {/* Connection lines */}
        {[0, 1, 2].map(i => (
          <line
            key={i}
            x1={160 + i * 170} y1={90}
            x2={220 + i * 170} y2={90}
            stroke="rgba(0,212,255,0.3)"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="flow-line"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Node circles */}
        {tx.nodes.map((node: { label: string; sub: string; color: string }, i: number) => {
          const cx = 90 + i * 170;
          return (
            <g key={i}>
              <circle cx={cx} cy={90} r={42} fill={`${node.color}18`} stroke={node.color} strokeWidth="1.5" />
              <circle cx={cx} cy={90} r={28} fill={`${node.color}30`} />
              <circle cx={cx} cy={90} r={14} fill={node.color} className="node-glow" />
              <text x={cx} y={148} textAnchor="middle" fill="white" fontSize="11" fontWeight="600">
                {node.label}
              </text>
              <text x={cx} y={163} textAnchor="middle" fill="#8892A4" fontSize="9">
                {node.sub}
              </text>
            </g>
          );
        })}

        {/* Animated progress dot */}
        <circle r="6" fill="white">
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#workflow-path" />
          </animateMotion>
        </circle>
        <path id="workflow-path" d="M 90 90 L 710 90" fill="none" />
      </svg>
      <p className="text-center text-xs text-gray-500 mt-4">
        {lang === "ar" ? "مثال على تدفق أتمتة ذكية — نصممها حسب احتياجك" : "Example of a smart automation flow — we design it around your needs"}
      </p>
    </div>
  );
}
