"use client";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useInView } from "@/lib/useInView";

export default function Problem() {
  const { lang } = useLang();
  const tx = t[lang].problem;
  const [ref, visible] = useInView();

  return (
    <section ref={ref} id="about" className="py-20 lg:py-28" style={{ background: "var(--surf1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="section-label mx-auto mb-5">{tx.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black max-w-3xl mx-auto leading-tight">
            {tx.h2}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Old way */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 24 : -24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-red-500/20 overflow-hidden"
            style={{ background: "rgba(239,68,68,0.04)" }}
          >
            <div className="px-5 py-4 border-b border-red-500/15 flex items-center gap-2">
              <X size={16} className="text-red-400" />
              <span className="font-bold text-red-400 text-sm">{tx.oldTitle}</span>
            </div>
            <ul className="p-5 space-y-4">
              {tx.old.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-gray-300"
                >
                  <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* New way */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? -24 : 24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-live/20 overflow-hidden"
            style={{ background: "rgba(0,230,118,0.04)" }}
          >
            <div className="px-5 py-4 border-b border-live/15 flex items-center gap-2">
              <Check size={16} className="text-live" />
              <span className="font-bold text-live text-sm">{tx.newTitle}</span>
            </div>
            <ul className="p-5 space-y-4">
              {tx.neu.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-gray-200"
                >
                  <Check size={14} className="text-live shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
