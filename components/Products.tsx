"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Scale, Package, Sparkles } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { openCal } from "@/lib/openCal";
import { useInView } from "@/lib/useInView";

export default function Products() {
  const { lang } = useLang();
  const tx = t[lang].products;
  const [ref, visible] = useInView();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const submitWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // TODO: replace with real n8n webhook URL
      await fetch("https://YOUR_N8N.COM/webhook/smartstock-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  };

  return (
    <section ref={ref} id="products" className="py-20 lg:py-28" style={{ background: "var(--deep)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="section-label mx-auto mb-5">{tx.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">{tx.h2}</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">{tx.sub}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {/* Nusoos */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="card p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <Scale size={22} className="text-cyan" />
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-live/10 text-live border border-live/20">
                <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" />{tx.live}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2">{tx.nusoos.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{tx.nusoos.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {tx.nusoos.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-gray-300">{tag}</span>
                ))}
              </div>
              <a
                href={tx.nusoos.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-sm py-2.5"
              >
                {tx.visit} <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>

          {/* SmartStock */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="card p-6 flex flex-col gap-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.25)" }}>
                <Package size={22} className="text-gold" />
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
                {tx.soon}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2">{tx.smartstock.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{tx.smartstock.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {tx.smartstock.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-gray-300">{tag}</span>
                ))}
              </div>
              <button
                onClick={() => setModal(true)}
                className="btn-ghost w-full justify-center text-sm py-2.5"
                style={{ borderColor: "rgba(212,168,67,0.3)", color: "#D4A843" }}
              >
                {tx.interest}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Custom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 border"
          style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.06),rgba(123,47,255,0.06))", borderColor: "rgba(0,212,255,0.15)" }}
        >
          <div className="flex items-center gap-4">
            <Sparkles size={28} className="text-cyan shrink-0" />
            <div>
              <h3 className="font-bold text-white text-lg">{tx.custom.h3}</h3>
              <p className="text-gray-400 text-sm">{tx.custom.sub}</p>
            </div>
          </div>
          <button
            onClick={openCal}
            className="btn-primary shrink-0 text-sm"
          >
            {tx.custom.cta}
          </button>
        </motion.div>
      </div>

      {/* SmartStock modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(8,11,20,0.85)", backdropFilter: "blur(12px)" }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md rounded-2xl border border-white/10 p-6"
            style={{ background: "var(--surf1)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-white text-lg">{lang === "ar" ? "سجّل اهتمامك بـ SmartStock" : "Register Interest in SmartStock"}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white transition-colors">✕</button>
            </div>
            {status === "ok" ? (
              <div className="text-center py-6">
                <div className="text-live text-4xl mb-3">✓</div>
                <p className="text-white font-semibold">{lang === "ar" ? "تم التسجيل بنجاح!" : "Registered successfully!"}</p>
              </div>
            ) : (
              <form onSubmit={submitWaitlist} className="space-y-4">
                <input required placeholder={lang === "ar" ? "الاسم" : "Name"} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan/50 placeholder-gray-500" />
                <input required type="email" placeholder={lang === "ar" ? "البريد الإلكتروني" : "Email"} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan/50 placeholder-gray-500" />
                <input placeholder={lang === "ar" ? "الشركة (اختياري)" : "Company (optional)"} value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan/50 placeholder-gray-500" />
                <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center py-3">
                  {status === "loading" ? (lang === "ar" ? "جاري التسجيل..." : "Registering...") : (lang === "ar" ? "سجّل الاهتمام" : "Register Interest")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
