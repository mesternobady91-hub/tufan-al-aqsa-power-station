// مكون Hero Section
// القسم الرئيسي الذي يعرض عنوان التحميل والزر الرئيسي
// التصميم: عنوان كبير مع تدرج لطيف وزر بارز

import { APP_CONFIG, BRAND_COLORS } from '@/config';
import { Download } from 'lucide-react';

export default function HeroSection() {
  const handleDownload = () => {
    // فتح رابط التحميل في نافذة جديدة
    window.open(APP_CONFIG.downloadLink, '_blank');
  };

  return (
    <section className="w-full py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          {/* العنوان الرئيسي */}
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: BRAND_COLORS.primary }}
          >
            تحميل التطبيق
          </h2>
          
          {/* الوصف */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            يمكنكم تحميل أحدث إصدار من التطبيق مباشرة من خلال الزر التالي
          </p>
          
          {/* زر التحميل الرئيسي */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            style={{
              backgroundColor: BRAND_COLORS.primary,
              boxShadow: `0 4px 12px ${BRAND_COLORS.primary}40`,
            }}
          >
            <Download size={24} />
            <span>تحميل الآن</span>
          </button>
          
          {/* نص إضافي صغير */}
          <p className="text-sm text-gray-500 mt-6">
            آخر تحديث: {new Date(APP_CONFIG.lastUpdateDate).toLocaleDateString('ar-SA')}
          </p>
        </div>
      </div>
    </section>
  );
}
