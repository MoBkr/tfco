"use client";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useInView } from "@/lib/useInView";

const WA_LINK = "https://wa.me/TODO_WA_NUMBER?text=%D8%A3%D9%87%D9%84%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%B0%D9%83%D8%A7%D8%A1%20%D9%81%D9%84%D9%88";

export default function CaseStudies() {
  const { lang } = useLang();
  const tx = t[lang].work;
  const [ref, visible] = useInView();

  return (
    <section ref={ref} id="work" className="py-20 lg:py-28" style={{ background: "var(--surf1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="section-label mx-auto mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse" />
            {tx.label}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">{tx.h2}</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">{tx.sub}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {(tx.cases as unknown as Array<Record<string, any>>).map((c, i) => {
            const isDev = c.status === "dev";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="cs-card flex flex-col relative group"
              >
                <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span
                        className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2"
                        style={{ background: `${c.dot}18`, color: c.dot, border: `1px solid ${c.dot}33` }}
                      >
                        {c.tag}
                      </span>
                      <div className="text-xs text-gray-500">{c.industry}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-300 shrink-0">{c.client}</div>
                  </div>

                  <h3 className="font-bold text-white text-lg leading-snug mb-3">{c.h3}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{c.desc}</p>

                  <ul className="space-y-2 mb-5">
                    {(c.results as string[]).map((r: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check size={14} className="shrink-0 mt-0.5" style={{ color: c.dot }} />
                        <span className="text-gray-300">{r}</span>
                      </li>
                    ))}
                  </ul>

                  {!isDev && (
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold transition-colors group/link"
                      style={{ color: c.dot }}
                    >
                      {tx.cta}
                      <ArrowUpRight size={15} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                </div>

                {/* Coming-soon overlay — appears on hover for dev projects */}
                {isDev && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      background: "rgba(8,11,20,0.75)",
                    }}
                  >
                    <div
                      className="px-5 py-3 rounded-2xl text-center"
                      style={{
                        background: "rgba(13,18,32,0.9)",
                        border: "1px solid rgba(212,168,67,0.4)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                      }}
                    >
                      <div className="text-2xl mb-1">✦</div>
                      <div className="font-black text-white text-lg">
                        {lang === "ar" ? "يُطلق قريباً" : "Coming Soon"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {lang === "ar" ? "هذا المشروع تحت التطوير حالياً" : "This project is currently in development"}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
