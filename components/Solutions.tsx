"use client";
import { motion } from "framer-motion";
import { Bot, FileSearch, Brain, Workflow, Globe, Layers, Users, Sparkles } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useInView } from "@/lib/useInView";

const ICONS = [Bot, FileSearch, Brain, Workflow, Globe, Layers, Users, Sparkles];
const GRADS = [
  "from-cyan/20 to-purple/10",
  "from-gold/15 to-purple/10",
  "from-purple/20 to-live/10",
  "from-live/15 to-cyan/10",
  "from-cyan/15 to-purple/15",
  "from-purple/20 to-cyan/10",
  "from-gold/20 to-purple/15",
  "from-cyan/10 to-gold/10",
];
const ICON_COLORS = ["#00D4FF","#D4A843","#7B2FFF","#00E676","#00D4FF","#7B2FFF","#D4A843","#00D4FF"];

export default function Solutions() {
  const { lang } = useLang();
  const tx = t[lang].solutions;
  const [ref, visible] = useInView();

  return (
    <section ref={ref} id="solutions" className="py-20 lg:py-28" style={{ background: "var(--deep)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="section-label mx-auto mb-5">{tx.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">{tx.h2}</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">{tx.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tx.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="card p-5 group cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${GRADS[i]} transition-transform group-hover:scale-110`}
                >
                  <Icon size={22} color={ICON_COLORS[i]} />
                </div>
                <h3 className="font-bold text-white mb-2 text-base leading-snug">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
