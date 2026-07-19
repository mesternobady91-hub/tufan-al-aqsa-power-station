// مكون Hero Section
// القسم الرئيسي الذي يعرض عنوان التحميل والزر الرئيسي
// التصميم: عنوان كبير مع تدرج لطيف وزر بارز

import { APP_CONFIG, BRAND_COLORS } from '@/config';
import { Smartphone, Monitor } from 'lucide-react';

export default function HeroSection() {
  const handleAndroidDownload = () => {
    window.open(APP_CONFIG.androidDownloadLink, '_blank');
  };

  const handleDesktopDownload = () => {
    window.open(APP_CONFIG.desktopDownloadLink, '_blank');
  };

  return (
    <section className="w-full py-16 md:py-24 px-4 bg-gradient-to-b from-blue-50/20 to-white">
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
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            يمكنكم تحميل أحدث إصدار من التطبيق مباشرة للأجهزة المحمولة أو أجهزة الكمبيوتر
          </p>
          
          {/* أزرار التحميل */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-2xl mx-auto">
            {/* زر الأندرويد */}
            <button
              onClick={handleAndroidDownload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              style={{
                backgroundColor: BRAND_COLORS.primary,
                boxShadow: `0 4px 14px ${BRAND_COLORS.primary}40`,
              }}
            >
              <Smartphone size={24} />
              <span>تحميل للأندرويد (APK)</span>
            </button>
            
            {/* زر الديسك توب */}
            <button
              onClick={handleDesktopDownload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              style={{
                backgroundColor: BRAND_COLORS.secondary,
                boxShadow: `0 4px 14px ${BRAND_COLORS.secondary}40`,
              }}
            >
              <Monitor size={24} />
              <span>تحميل للكمبيوتر (Windows)</span>
            </button>
          </div>
          
          {/* نص إضافي صغير */}
          <p className="text-sm text-gray-500 mt-8">
            آخر تحديث للموقع: {new Date(APP_CONFIG.lastUpdateDate).toLocaleDateString('ar-SA')}
          </p>
        </div>
      </div>
    </section>
  );
}
