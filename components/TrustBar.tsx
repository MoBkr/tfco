"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

const CLIENTS = [
  { name: "نصوص",          en: "Nusoos" },
  { name: "ECIT",           en: "ECIT" },
  { name: "Ezz Solutions",  en: "Ezz Solutions" },
  { name: "Uniford",        en: "Uniford" },
];

export default function TrustBar() {
  const { lang } = useLang();
  const tx = t[lang].trust;
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-10 border-y border-white/[0.06] overflow-hidden" style={{ background: "rgba(13,18,32,0.5)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-5 flex items-center gap-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 shrink-0">{tx.label}</span>
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-xs text-gray-600 shrink-0">{tx.sub}</span>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="marquee-track flex items-center gap-8 w-max">
          {doubled.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.07] bg-white/[0.03] shrink-0 group hover:border-cyan/30 transition-all"
            >
              {/* Logo placeholder circle */}
              <div
                className="w-6 h-6 rounded-full shrink-0"
                style={{ background: "linear-gradient(135deg,#00D4FF44,#7B2FFF44)" }}
              />
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">
                {lang === "ar" ? c.name : c.en}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
