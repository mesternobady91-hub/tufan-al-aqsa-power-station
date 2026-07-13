// مكون Version Info
// يعرض معلومات الإصدار وتاريخ آخر تحديث
// التصميم: بطاقة مرتفعة مع ظل ناعم

import { APP_CONFIG, BRAND_COLORS } from '@/config';
import { Package, Calendar } from 'lucide-react';

export default function VersionInfo() {
  const lastUpdate = new Date(APP_CONFIG.lastUpdateDate);
  const formattedDate = lastUpdate.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="w-full py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 rounded-lg bg-white border border-gray-200"
          style={{
            boxShadow: '0 4px 12px rgba(15, 58, 125, 0.08)',
          }}
        >
          {/* بطاقة رقم الإصدار */}
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: BRAND_COLORS.secondary }}
            >
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">رقم الإصدار</p>
              <p className="text-2xl font-bold" style={{ color: BRAND_COLORS.primary }}>
                {APP_CONFIG.version}
              </p>
            </div>
          </div>

          {/* بطاقة تاريخ آخر تحديث */}
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: BRAND_COLORS.accent }}
            >
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">آخر تحديث</p>
              <p className="text-lg font-bold text-gray-900">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
