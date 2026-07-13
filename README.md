# محطة طوفان الأقصى للكهرباء

موقع ويب احترافي لعرض وتحميل تطبيق محطة طوفان الأقصى للكهرباء. مبني باستخدام React + Vite وجاهز للنشر على Vercel.

## المميزات

- ✅ تصميم حديث واحترافي
- ✅ دعم كامل للغة العربية مع اتجاه RTL
- ✅ متجاوب (Responsive) على جميع الأجهزة
- ✅ أداء عالي مع Vite
- ✅ سهل التخصيص والتعديل
- ✅ جاهز للنشر على Vercel

## البنية الأساسية

```
tufan-al-aqsa-power-station/
├── client/
│   ├── public/          # ملفات ثابتة (favicon, robots.txt)
│   ├── src/
│   │   ├── components/  # مكونات React
│   │   ├── pages/       # الصفحات
│   │   ├── config.ts    # إعدادات التطبيق (متغيرات قابلة للتعديل)
│   │   ├── App.tsx      # مكون التطبيق الرئيسي
│   │   ├── main.tsx     # نقطة الدخول
│   │   └── index.css    # الأنماط العامة
│   └── index.html       # ملف HTML الرئيسي
├── server/              # كود الخادم (للإنتاج)
├── package.json         # تبعيات المشروع
├── vite.config.ts       # إعدادات Vite
├── vercel.json          # إعدادات Vercel
└── README.md            # هذا الملف
```

## البدء السريع

### المتطلبات

- Node.js 18+ و npm أو pnpm

### التثبيت والتشغيل

1. **تثبيت التبعيات:**
   ```bash
   npm install
   ```

2. **تشغيل خادم التطوير:**
   ```bash
   npm run dev
   ```
   سيفتح الموقع على `http://localhost:3000`

3. **بناء للإنتاج:**
   ```bash
   npm run build
   ```

4. **معاينة البناء:**
   ```bash
   npm run preview
   ```

## تخصيص المشروع

### تعديل معلومات التطبيق

جميع المتغيرات القابلة للتعديل موجودة في ملف واحد: **`client/src/config.ts`**

#### 1. تغيير رابط تحميل التطبيق (APK)

افتح `client/src/config.ts` وعدّل السطر:

```typescript
downloadLink: 'https://example.com/app.apk',
```

ضع رابط ملف APK الخاص بك:

```typescript
downloadLink: 'https://your-domain.com/your-app.apk',
```

#### 2. تغيير رقم الإصدار

في نفس الملف، عدّل:

```typescript
version: '1.0.0',
```

إلى الإصدار الجديد:

```typescript
version: '1.2.0',
```

#### 3. تغيير تاريخ آخر تحديث

عدّل:

```typescript
lastUpdateDate: '2026-07-08',
```

إلى التاريخ الحالي:

```typescript
lastUpdateDate: '2026-07-15',
```

#### 4. تعديل سجل التحديثات

في نفس الملف `config.ts`، عدّل مصفوفة `UPDATES_LOG`:

```typescript
export const UPDATES_LOG = [
  {
    id: 1,
    version: '1.0.0',
    date: '2026-07-08',
    title: 'الإصدار الأول',
    description: 'وصف الإصدار',
    features: [
      'ميزة 1',
      'ميزة 2',
      'ميزة 3',
    ],
  },
  // أضف إصدارات جديدة هنا
];
```

#### 5. تغيير الشعار

افتح `client/src/components/Header.tsx` وعدّل:

```tsx
<div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
  style={{ backgroundColor: BRAND_COLORS.primary }}
>
  ⚡  {/* غيّر هذا الرمز أو ضع صورة */}
</div>
```

### تخصيص الألوان

في `client/src/config.ts`، عدّل `BRAND_COLORS`:

```typescript
export const BRAND_COLORS = {
  primary: '#0F3A7D',      // اللون الأساسي (أزرق داكن)
  secondary: '#F59E0B',    // اللون الثانوي (ذهبي)
  accent: '#3B82F6',       // لون التركيز (أزرق فاتح)
  // ... باقي الألوان
};
```

### تخصيص النصوص الثابتة

في `client/src/config.ts`:

```typescript
export const APP_CONFIG = {
  projectName: 'محطة طوفان الأقصى للكهرباء',
  projectDescription: 'نظام إدارة محطة الكهرباء',
  copyrightText: 'جميع الحقوق محفوظة © محطة طوفان الأقصى للكهرباء',
  // ... باقي الإعدادات
};
```

## النشر على Vercel

### الطريقة الأولى: من خلال واجهة Vercel

1. انتقل إلى [vercel.com](https://vercel.com)
2. سجل الدخول أو أنشئ حسابًا جديدًا
3. اضغط على "New Project"
4. اختر المستودع من GitHub (أو رفع الملفات مباشرة)
5. اختر الإعدادات التالية:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
6. اضغط "Deploy"

### الطريقة الثانية: من خلال Vercel CLI

```bash
# تثبيت Vercel CLI
npm install -g vercel

# النشر
vercel

# النشر مباشرة للإنتاج
vercel --prod
```

### الطريقة الثالثة: من خلال GitHub

1. ارفع المشروع إلى GitHub
2. انتقل إلى [vercel.com/new](https://vercel.com/new)
3. اختر المستودع
4. اترك الإعدادات الافتراضية (Vercel سيكتشفها تلقائيًا)
5. اضغط "Deploy"

## اختبار المشروع

### اختبار التطوير المحلي

```bash
npm run dev
```

ثم افتح المتصفح على `http://localhost:3000`

### اختبار البناء

```bash
npm run build
npm run preview
```

### التحقق من الأخطاء

```bash
npm run check
```

## الملفات المهمة

| الملف | الوصف |
|------|-------|
| `client/src/config.ts` | جميع الإعدادات والمتغيرات القابلة للتعديل |
| `client/src/pages/Home.tsx` | الصفحة الرئيسية |
| `client/src/components/Header.tsx` | مكون رأس الصفحة |
| `client/src/components/HeroSection.tsx` | القسم الرئيسي |
| `client/src/components/VersionInfo.tsx` | معلومات الإصدار |
| `client/src/components/UpdatesSection.tsx` | سجل التحديثات |
| `client/src/components/Footer.tsx` | تذييل الصفحة |
| `client/src/index.css` | الأنماط العامة والألوان |
| `vercel.json` | إعدادات Vercel |

## نصائح مهمة

### عند تحديث الموقع

1. عدّل الملفات المطلوبة في `client/src/config.ts`
2. شغّل `npm run dev` للتحقق من التغييرات محليًا
3. بعد التأكد، ارفع التغييرات إلى GitHub
4. Vercel سيعيد النشر تلقائيًا

### الحفاظ على الأداء

- تجنب إضافة صور كبيرة الحجم
- استخدم تنسيقات الصور الحديثة (WebP)
- لا تضف مكتبات ثقيلة غير ضرورية

### الأمان

- لا تضع بيانات حساسة في الكود
- استخدم متغيرات البيئة للبيانات السرية
- تحقق من الروابط قبل النشر

## استكشاف الأخطاء

### الموقع لا يعمل بعد النشر

1. تحقق من أن `vercel.json` موجود
2. تأكد من أن `outputDirectory` صحيح: `dist/public`
3. افتح لوحة تحكم Vercel وتحقق من السجلات

### الأسلوب لا يظهر بشكل صحيح

1. امسح ذاكرة التخزين المؤقت: `Ctrl+Shift+Delete`
2. أعد تحميل الصفحة: `Ctrl+F5`
3. تحقق من أن `index.css` يحتوي على جميع الأنماط

### الخطوط العربية لا تظهر

1. تأكد من أن `client/index.html` يحتوي على:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
   ```
2. تحقق من أن `dir="rtl"` موجود في `<body>`

## الدعم والمساعدة

للمزيد من المعلومات:

- [توثيق React](https://react.dev)
- [توثيق Vite](https://vitejs.dev)
- [توثيق Vercel](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

## الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الحر.

---

**آخر تحديث:** 2026-07-08
