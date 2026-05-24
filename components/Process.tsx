"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { openCal } from "@/lib/openCal";
import { useInView } from "@/lib/useInView";

export default function Process() {
  const { lang } = useLang();
  const tx = t[lang].process;
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "var(--surf1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="section-label mx-auto mb-5">{tx.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black">{tx.h2}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tx.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line (hidden on last item) */}
              {i < tx.steps.length - 1 && (
                <div
                  className="absolute top-7 hidden lg:block h-px w-1/2"
                  style={{
                    background: "linear-gradient(90deg,rgba(0,212,255,0.3),transparent)",
                    [lang === "ar" ? "left" : "right"]: 0,
                    [lang === "ar" ? "right" : "left"]: "50%",
                  }}
                />
              )}

              {/* Step number badge */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black text-white mx-auto mb-4"
                style={{ background: "linear-gradient(135deg,#00D4FF,#7B2FFF)" }}
              >
                {step.num}
              </div>
              <h3 className="font-bold text-white mb-2 text-base">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={openCal}
            className="btn-primary"
          >
            {tx.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
