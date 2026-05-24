"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import { useInView } from "@/lib/useInView";

export default function FounderMessage() {
  const { lang } = useLang();
  const [ref, visible] = useInView();
  const [imgError, setImgError] = useState(false);

  return (
    <section
      ref={ref}
      id="founder"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "var(--surf1)" }}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(123,47,255,0.07) 0%, transparent 70%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 40% 50% at 20% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex-shrink-0 order-1"
          >
            <div className="relative" style={{ width: 230, height: 230 }}>
              {/* Gradient border ring */}
              <div className="absolute inset-0 rounded-full" style={{
                padding: "3px",
                background: "linear-gradient(135deg, #00D4FF, #7B2FFF)",
                borderRadius: "50%",
              }}>
                <div style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                  background: "var(--surf2)",
                }}>
                  {imgError ? (
                    /* Placeholder until founder.jpg is added to /public */
                    <div style={{
                      width: "100%", height: "100%",
                      background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,47,255,0.25))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "3.5rem", fontWeight: 900, color: "rgba(255,255,255,0.5)",
                    }}>
                      ف
                    </div>
                  ) : (
                    <Image
                      src="/founder.jpg"
                      alt={lang === "ar" ? "فيصل الحارثي" : "Faisal Al-Harthi"}
                      width={224}
                      height={224}
                      onError={() => setImgError(true)}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  )}
                </div>
              </div>

              {/* Outer glow pulse */}
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                boxShadow: "0 0 40px rgba(0,212,255,0.18), 0 0 80px rgba(123,47,255,0.1)",
                borderRadius: "50%",
                animation: "iconGlow 4s ease-in-out infinite",
              }} />

              {/* Founder badge */}
              <div
                className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white whitespace-nowrap"
                style={{
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(8,11,20,0.95)",
                  border: "1px solid rgba(0,212,255,0.3)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00E676" }} />
                {lang === "ar" ? "المؤسس" : "Founder"}
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? -50 : 50 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="flex-1 order-2"
          >
            <div className="section-label mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse" />
              {lang === "ar" ? "رسالة من المؤسس" : "Founder's Message"}
            </div>

            {/* Opening quote */}
            <div
              className="text-7xl font-black leading-none mb-2 select-none"
              style={{ color: "rgba(0,212,255,0.18)", fontFamily: "Georgia, serif" }}
            >
              "
            </div>

            <p
              className="text-lg sm:text-xl text-gray-200 leading-loose mb-6"
              style={{ maxWidth: "50ch" }}
            >
              {lang === "ar"
                ? "من اليوم الأول، كان حلمنا أن يكون الذكاء الاصطناعي في متناول كل شركة سعودية. نحن لا نبيع تقنية — نبني شراكات حقيقية، ونضمن أن كل ريال تستثمره يتحول إلى نتائج ملموسة تشعر بها في أرباحك وكفاءتك كل يوم."
                : "From day one, our dream was to make AI accessible to every Saudi business. We don't sell technology — we build real partnerships and ensure every riyal you invest turns into tangible results you feel in your profit and efficiency every single day."}
            </p>

            {/* Closing quote + signature */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-0.5 flex-shrink-0 rounded-full"
                style={{ background: "linear-gradient(90deg, #00D4FF, #7B2FFF)" }}
              />
              <div>
                <div className="font-black text-white text-base">
                  {lang === "ar" ? "فيصل الحارثي" : "Faisal Al-Harthi"}
                </div>
                <div className="text-sm text-gray-400">
                  {lang === "ar" ? "المؤسس والرئيس التنفيذي — ذكاء فلو" : "Founder & CEO — ThakaaFlow"}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
