# ذكاء فلو — ThakaaFlow

## الهوية
- **المشروع**: موقع ذكاء فلو التسويقي (Landing Page)
- **المالك**: Faisalsafar
- **GitHub**: https://github.com/Faisalsafar/ThakaaFlow (private)
- **النشر**: Vercel — تلقائي عند كل push إلى `main`

## هيكل الملفات
```
thakaaflow/
├── deploy/
│   ├── index.html      ← الصفحة الرئيسية (الملف الأساسي للتعديل)
│   └── vercel.json     ← إعدادات Vercel والتوجيه
├── index.html          ← نسخة الإنتاج على الـ root (مرتبطة بـ Vercel)
├── terms.html          ← صفحة الشروط والأحكام (لا تحذف)
├── vercel.json         ← إعدادات Vercel على الـ root
├── ملفات الموقع الخام/ ← أرشيف وملفات تطويرية
└── CLAUDE.md
```

## التقنيات
- HTML5 / CSS3 / JavaScript خالص (بدون framework)
- RTL عربي بالكامل
- الألوان: `#0a0a0a` خلفية، `#00d4ff` سيان، `#7b2fff` بنفسجي
- الخط: Tajawal (Google Fonts)

## الصلاحيات الممنوحة — نفّذ مباشرةً بدون إذن
- ✅ قراءة وتعديل أي ملف في هذا المشروع
- ✅ تشغيل أوامر git (add, commit, push)
- ✅ رفع التعديلات إلى GitHub (يطلق Vercel تلقائياً)
- ✅ تثبيت أدوات تطوير محلية إذا لزم
- ✅ إنشاء ملفات وصفحات جديدة

## سير العمل — بعد كل تعديل
```bash
git add .
git commit -m "وصف التعديل"
git push origin main
```
Vercel يلتقط الـ push ويعيد النشر تلقائياً خلال ~30 ثانية.

## ملاحظات مهمة
- الملف الذي يراه الزوار: `index.html` في الـ root
- `terms.html` موجود — لا تحذفه ولا تعدّل روابطه
- `vercel.json` يتحكم في التوجيه — استشر قبل تعديله
- المستخدم: `faisal.safar@gmail.com` | GitHub: `Faisalsafar`
