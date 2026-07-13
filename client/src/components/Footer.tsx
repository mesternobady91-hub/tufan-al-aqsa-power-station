// مكون Footer
// الشريط السفلي يحتوي على معلومات الحقوق
// التصميم: بسيط واحترافي

import { APP_CONFIG, BRAND_COLORS } from '@/config';

export default function Footer() {
  return (
    <footer
      className="w-full py-8 md:py-12 px-4 border-t border-gray-200"
      style={{ backgroundColor: BRAND_COLORS.primary }}
    >
      <div className="container mx-auto text-center">
        <p className="text-white text-sm md:text-base">
          {APP_CONFIG.copyrightText}
        </p>
        <p className="text-gray-300 text-xs md:text-sm mt-2">
          © {APP_CONFIG.copyrightYear}
        </p>
      </div>
    </footer>
  );
}
