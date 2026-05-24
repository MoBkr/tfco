"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useInView } from "@/lib/useInView";

export default function FAQ() {
  const { lang } = useLang();
  const tx = t[lang].faq;
  const [open, setOpen] = useState<number | null>(null);
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "var(--surf1)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="section-label mx-auto mb-5">{tx.label}</div>
          <h2 className="text-3xl sm:text-4xl font-black">{tx.h2}</h2>
        </div>

        <div className="space-y-3">
          {tx.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/[0.07] overflow-hidden"
              style={{ background: "var(--surf2)" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-white text-sm leading-snug">{item.q}</span>
                <span className="shrink-0 text-cyan">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/[0.05] pt-3">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
