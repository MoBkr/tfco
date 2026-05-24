import type { Metadata } from "next";
import { Tajawal, Inter } from "next/font/google";
import { LangProvider } from "@/lib/LangContext";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ذكاء فلو | مستقبل الأعمال يبدأ بذكاء فلو",
  description: "نبني وكلاء AI ومنصات أتمتة للشركات السعودية — Voice Agents، OCR، CRM، وأنظمة ذكية تعمل 24/7.",
  keywords: "ذكاء اصطناعي السعودية, أتمتة الأعمال, وكيل ذكاء اصطناعي, AI Saudi Arabia, automation Riyadh",
  metadataBase: new URL("https://tfco.sa"),
  openGraph: {
    type: "website",
    url: "https://tfco.sa/",
    title: "ذكاء فلو | مستقبل الأعمال يبدأ بذكاء فلو",
    description: "نبني وكلاء AI ومنصات أتمتة للشركات السعودية.",
    locale: "ar_SA",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ThakaaFlow",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${inter.variable}`}
      style={{ backgroundColor: "#080B14" }}
    >
      <head>
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "جلسة-استشارية", {origin:"https://app.cal.com"});
Cal.ns["جلسة-استشارية"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});

(function(){
  function fixEL(){
    var el = document.querySelector('elevenlabs-convai');
    if(!el) return;
    if(el.shadowRoot){
      var s = el.shadowRoot.getElementById('tf-fix');
      if(s) return;
      var st = document.createElement('style');
      st.id = 'tf-fix';
      st.textContent = '[style*="right"]{right:auto!important;left:24px!important;}[style*="bottom"]{left:24px!important;right:auto!important;}';
      el.shadowRoot.appendChild(st);
    } else {
      setTimeout(fixEL, 400);
    }
  }
  setTimeout(fixEL, 1500);
})();`,
          }}
        />
      </head>
      <body
        className="font-tajawal antialiased"
        style={{ backgroundColor: "#080B14", color: "#F8FAFF", overflowX: "hidden" }}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
