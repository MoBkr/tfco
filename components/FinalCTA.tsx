"use client";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { openCal } from "@/lib/openCal";
import { useInView } from "@/lib/useInView";

const WA_NUMBER = "TODO_WA_NUMBER"; // TODO: replace with real WhatsApp number

export default function FinalCTA() {
  const { lang } = useLang();
  const tx = t[lang].cta;
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      id="contact"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "var(--deep)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(123,47,255,0.12) 0%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 40% at 30% 30%, rgba(0,212,255,0.08) 0%, transparent 60%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center"
      >
        <div className="section-label mx-auto mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          {lang === "ar" ? "ابدأ الآن" : "Start Now"}
        </div>

        <h2 className="font-black leading-tight mb-5" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
          {tx.h2}
        </h2>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          {tx.sub}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <button onClick={openCal} className="btn-primary text-base px-8 py-3.5">
            <Bot size={18} /> {tx.btn1}
          </button>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lang === "ar" ? "أهلاً، أريد معرفة المزيد عن خدمات ذكاء فلو" : "Hello, I'd like to learn more about ThakaaFlow services")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-base px-8 py-3.5"
            style={{ borderColor: "rgba(37,211,102,0.35)", color: "#25D366" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {tx.btn2}
          </a>
        </div>

        <p className="text-xs text-gray-500">{tx.note}</p>
      </motion.div>
    </section>
  );
}
