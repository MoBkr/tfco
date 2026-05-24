"use client";
import { motion } from "framer-motion";
import { Check, Bot, Workflow, Layers, Sparkles } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useInView } from "@/lib/useInView";
import { openCal } from "@/lib/openCal";

const ICONS: Record<string, React.ElementType> = {
  Bot, Workflow, Layers, Sparkles,
};

export default function Pricing() {
  const { lang } = useLang();
  const tx = t[lang].pricing;
  const [ref, visible] = useInView();

  const waLink = "https://wa.me/TODO_WA_NUMBER?text=%D8%A3%D9%87%D9%84%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%A7%D9%82%D8%A7%D8%AA%20%D8%B0%D9%83%D8%A7%D8%A1%20%D9%81%D9%84%D9%88";

  return (
    <section ref={ref} id="pricing" className="py-24 lg:py-32" style={{ background: "var(--deep)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-label mx-auto mb-5">{tx.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">{tx.h2}</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">{tx.sub}</p>
        </div>

        {/* 4-card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {tx.tiers.map((tier, i) => {
            const Icon = ICONS[tier.icon] ?? Bot;
            const isCustom = tier.custom;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`flex flex-col rounded-2xl p-6 transition-all duration-300 ${
                  isCustom
                    ? "border-2 border-dashed border-white/15 hover:border-cyan/40"
                    : tier.featured
                    ? "pricing-card featured"
                    : "pricing-card"
                }`}
              >
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: tier.featured
                        ? "linear-gradient(135deg,rgba(0,212,255,0.25),rgba(123,47,255,0.25))"
                        : isCustom
                        ? "rgba(212,168,67,0.12)"
                        : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Icon
                      size={20}
                      style={{ color: tier.featured ? "#00D4FF" : isCustom ? "#D4A843" : "#8892A4" }}
                    />
                  </div>
                  <div>
                    {tier.featured && (
                      <div className="text-[10px] font-bold text-cyan uppercase tracking-widest leading-none mb-0.5">
                        {lang === "ar" ? "الأكثر طلباً" : "Most Popular"}
                      </div>
                    )}
                    <h3 className="font-black text-white text-base leading-none">{tier.name}</h3>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-2xl font-black ${isCustom ? "text-gold" : "grad-text"}`}>
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-gray-400 text-xs mb-0.5">{tier.period}</span>
                  )}
                </div>

                {/* Desc */}
                <p className="text-gray-400 text-xs leading-relaxed mb-5">{tier.desc}</p>

                {/* Features */}
                <ul className="space-y-2 flex-1 mb-6">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-xs text-gray-300">
                      <Check
                        size={12}
                        className="shrink-0 mt-0.5"
                        style={{ color: isCustom ? "#D4A843" : tier.featured ? "#00D4FF" : "#00E676" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    onClick={openCal}
                    className={
                      tier.featured
                        ? "btn-primary w-full justify-center py-2.5 text-sm"
                        : isCustom
                        ? "w-full justify-center py-2.5 text-sm rounded-full border-2 border-dashed border-gold/40 text-gold font-semibold hover:border-gold hover:bg-gold/5 transition-all flex items-center gap-2"
                        : "btn-ghost w-full justify-center py-2.5 text-sm"
                    }
                  >
                    <Bot size={14} />
                    {lang === "ar" ? "احجز جلسة استشارية" : "Book a Consultation"}
                  </a>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-full text-xs font-semibold transition-all hover:opacity-80"
                    style={{
                      background: "rgba(37,211,102,0.08)",
                      border: "1px solid rgba(37,211,102,0.25)",
                      color: "#25D366",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {lang === "ar" ? "تحدث عبر واتساب" : "Chat on WhatsApp"}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            {lang === "ar"
              ? "كل باقة تبدأ بمكالمة مجانية 30 دقيقة — بلا أي التزام"
              : "Every package starts with a free 30-minute call — no commitment"}
          </p>
        </div>
      </div>
    </section>
  );
}
