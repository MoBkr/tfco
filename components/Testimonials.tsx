"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useInView } from "@/lib/useInView";

export default function Testimonials() {
  const { lang } = useLang();
  const tx = t[lang].testimonials;
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "var(--surf1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="section-label mx-auto mb-5">{tx.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black">{tx.h2}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tx.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="testimonial-card flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote size={24} className="text-cyan/20 absolute -top-1 -start-1" />
                <p className="text-gray-300 text-sm leading-relaxed pt-4">{item.text}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.07]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
                  style={{ background: "linear-gradient(135deg,#00D4FF,#7B2FFF)" }}
                >
                  {item.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{item.name}</div>
                  <div className="text-gray-500 text-xs">{item.title} · {item.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
