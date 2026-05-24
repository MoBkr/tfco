"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useInView } from "@/lib/useInView";

const GROUP_COLORS = ["#00D4FF","#7B2FFF","#00E676","#D4A843","#7B2FFF"];

export default function TechStack() {
  const { lang } = useLang();
  const tx = t[lang].tech;
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "var(--deep)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="section-label mx-auto mb-5">{tx.label}</div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">{tx.h2}</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">{tx.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tx.groups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.08 }}
              className="card p-4"
            >
              <div
                className="text-xs font-bold uppercase tracking-wider mb-3 pb-2 border-b border-white/[0.06]"
                style={{ color: GROUP_COLORS[gi] }}
              >
                {group.name}
              </div>
              <ul className="space-y-2">
                {group.items.map((item, ii) => (
                  <li key={ii} className="flex items-center gap-2 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GROUP_COLORS[gi] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
