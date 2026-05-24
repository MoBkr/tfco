"use client";
import Image from "next/image";
import { Linkedin, Twitter, Youtube } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

const WA_NUMBER = "TODO_WA_NUMBER"; // TODO: replace with real WhatsApp number

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06]" style={{ background: "var(--surf1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl overflow-hidden" style={{ background: "white", animation: "iconGlow 4s ease-in-out infinite" }}>
                <Image src="/icon.png" alt="ذكاء فلو" width={36} height={36} style={{ display: "block", objectFit: "contain" }} />
              </div>
              <span className="font-black text-lg text-white"><span className="grad-text">ذكاء</span> فلو</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">{tx.desc}</p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Linkedin size={16} />, href: "https://linkedin.com/company/thakaaflow" },
                { icon: <Twitter size={16} />,  href: "https://twitter.com/ThakaaFlow" },
                { icon: <Youtube size={16} />,  href: "https://youtube.com/@ThakaaFlow" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 border border-white/8 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">{tx.solutions}</h4>
            <ul className="space-y-2.5">
              {tx.solutions_links.map((l, i) => (
                <li key={i}>
                  <a href="#solutions" className="text-sm text-gray-400 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">{tx.company}</h4>
            <ul className="space-y-2.5">
              {[
                { label: tx.about,   href: "#about" },
                { label: tx.blog,    href: "#" },
                { label: tx.careers, href: "#" },
              ].map((l, i) => (
                <li key={i}>
                  <a href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">{tx.contact}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="mailto:info@tfco.sa" className="hover:text-white transition-colors">
                  info@tfco.sa
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-gray-500 text-xs leading-relaxed">
                {lang === "ar"
                  ? "6249 طريق الملك عبدالعزيز، 2858، حي العارض، 13342، الرياض، المملكة العربية السعودية"
                  : "6249, King Abdul Aziz, 2858, Al Arid Dist., 13342, Riyadh, KSA"}
              </li>
            </ul>
          </div>
        </div>

        {/* Year of AI — full-width prominent banner */}
        <div
          className="mb-8 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center gap-5"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(123,47,255,0.07) 100%)",
            border: "1px solid rgba(0,212,255,0.22)",
            boxShadow: "0 0 40px rgba(0,212,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <Image
            src="/year-of-ai.jpeg"
            alt={lang === "ar" ? "عام الذكاء الاصطناعي" : "Year of AI"}
            width={64}
            height={64}
            style={{ borderRadius: "12px", objectFit: "contain", flexShrink: 0 }}
          />
          <div className="flex-1 text-center sm:text-start">
            <p className="text-base sm:text-lg font-bold text-white leading-snug">
              {lang === "ar"
                ? "تنطلق ذكاء فلو في العام الذي أعلنته المملكة عاماً للذكاء الاصطناعي"
                : "ThakaaFlow launches in Saudi Arabia's Year of Artificial Intelligence"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {lang === "ar" ? "شركة سعودية · الرياض · 2026" : "Saudi Company · Riyadh · 2026"}
            </p>
          </div>
          <div
            className="shrink-0 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,47,255,0.15))",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00D4FF",
            }}
          >
            {lang === "ar" ? "عام الذكاء الاصطناعي" : "Year of AI"}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col items-center gap-2.5 text-center">
          <div className="flex items-center gap-4">
            <a href="/terms"   className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{tx.terms}</a>
            <span className="text-gray-700">·</span>
            <a href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{tx.privacy}</a>
          </div>
          <p className="text-xs text-gray-500">
            © {year} شركة ذكاء فلو للتقنية · {tx.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-gray-600">
            <span>{lang === "ar" ? "السجل التجاري:" : "CR:"} 7053238635</span>
            <span>{lang === "ar" ? "الرقم الوطني الموحد:" : "Unified National Number:"} 7053238635</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
