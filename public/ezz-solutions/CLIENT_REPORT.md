# تقرير المشروع — مساعد شركة عز سلوشين الذكي

> **العميل:** شركة عز سلوشين (Ezz Solutions)
> **مقدم الخدمة:** ذكاء فلو (ThakaaFlow) — tfco.sa
> **تاريخ البناء:** 2026-05-04
> **الحالة:** مُنشر على الإنتاج

---

## 1. الرابط الحي

**الديمو:** [tfco.sa/ezz-solutions](https://tfco.sa/ezz-solutions)

---

## 2. المكوّنات المُنتَجة

داخل `web/ezz-solutions/`:

```
ezz-solutions/
├── index.html                 الصفحة الرئيسية (شات + صوت)
├── logo.svg                   الشعار
├── favicon.svg                أيقونة التبويب
├── SYSTEM_PROMPT_TEXT.md      برومبت الشات (للصق في n8n)
├── SYSTEM_PROMPT_VOICE.md     برومبت الصوت
└── CLIENT_REPORT.md           هذا التقرير
```

---

## 3. البنية التقنية

| المكوّن | التقنية |
|---|---|
| الشات النصي | n8n webhook + RAG Agent |
| الشات الصوتي | Gemini 2.5 Flash Native Audio (WebSocket) |
| الاستضافة | Vercel (نشر تلقائي) |
| المستودع | GitHub — ThakaaFlow |

### الويب هوكات
- **الشات النصي:** `https://faisalsafar.app.n8n.cloud/webhook/ezz-solutions`
- **الصوت:** مباشر إلى Gemini Live (لا يمر عبر n8n لضمان الجودة)

---

## 4. خطوات الربط في n8n

1. افتح الـ workflow المرتبط بالويب هوك أعلاه في n8n
2. اذهب لعقدة الـ RAG Agent / AI Agent
3. في حقل **System Message** الصق محتوى `SYSTEM_PROMPT_TEXT.md` كاملاً
4. تأكد أن عقدة الـ input تمرر `{{ $json.body.message }}` كـ Prompt
5. احفظ الـ workflow وفعّله
6. اختبر من خلال الديمو على `tfco.sa/ezz-solutions`



---

## 5. ما يمكن تطويره لاحقاً

- [ ] ربط الطلبات بمنظومة شركة عز سلوشين (حالياً توجيه للهاتف)
- [ ] تسجيل المحادثات في CRM
- [ ] إشعارات لفريق المبيعات عند طلبات الأسعار
- [ ] توسعة لغات إضافية
- [ ] لوحة تحليلات (عدد المحادثات، الأسئلة الشائعة)
- [ ] تقييد مفتاح Gemini API بـ HTTP referrer في Google Cloud Console

---

## 6. الصيانة

**تحديث البرومبت:**
1. عدّل `SYSTEM_PROMPT_TEXT.md` محلياً
2. الصق المحدّث في n8n System Message
3. لتحديث الصوت: نفّذ `generate_demo.py --refresh-prompt-only --client-slug ezz-solutions`

**تحديث كتالوج المنتجات:**
```bash
python ~/.claude/skills/ai-demo/scripts/scrape_catalog.py \
  --store-url "" \
  --out-dir "/Users/mac/Documents/ThakaaFlow/web/ezz-solutions"
```

**النشر:**
```bash
cd /Users/mac/Documents/ThakaaFlow/web
git add ezz-solutions/ vercel.json
git commit -m "update(ezz-solutions): وصف التعديل"
git push origin main
# Vercel ينشر تلقائياً خلال ~30 ثانية
```

---

## 7. التواصل والدعم

- **مطور المشروع:** ذكاء فلو (ThakaaFlow) — tfco.sa
- **الهاتف الموحد (شركة عز سلوشين):** 966590551100
- **البريد (شركة عز سلوشين):** info@ezz-solutions.com

---

*تم إنتاجه آلياً بواسطة skill ذكاء فلو "ai-demo"*
