// مكون Header الرئيسي
// يعرض شعار المشروع والعنوان والوصف
// التصميم: حديث واحترافي مع خط أفقي فاصل

import { APP_CONFIG, BRAND_COLORS } from '@/config';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-start gap-4 mb-4">
          {/* الشعار - مكان مخصص للشعار */}
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: BRAND_COLORS.primary }}
          >
            ⚡
          </div>
          
          {/* العنوان والوصف */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ color: BRAND_COLORS.primary }}>
              {APP_CONFIG.projectName}
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              {APP_CONFIG.projectDescription}
            </p>
          </div>
        </div>
        
        {/* خط فاصل زخرفي */}
        <div className="h-1 w-16 rounded-full" style={{ backgroundColor: BRAND_COLORS.secondary }}></div>
      </div>
    </header>
  );
}
