// مكون Updates Section
// يعرض سجل التحديثات والميزات الجديدة
// التصميم: قائمة رأسية بسيطة مع فواصل دقيقة

import { UPDATES_LOG, BRAND_COLORS } from '@/config';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface UpdateItemProps {
  id: number;
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
}

function UpdateItem({ id, version, date, title, description, features }: UpdateItemProps) {
  const [isExpanded, setIsExpanded] = useState(id === 1); // الإصدار الأول مفتوح افتراضيًا

  const updateDate = new Date(date);
  const formattedDate = updateDate.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 px-4 md:px-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex-1 text-right">
          <div className="flex items-center justify-end gap-3 mb-1">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <span
              className="px-3 py-1 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND_COLORS.secondary }}
            >
              v{version}
            </span>
          </div>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <ChevronDown
          size={20}
          className="text-gray-600 transition-transform duration-300"
          style={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* محتوى التفاصيل */}
      {isExpanded && (
        <div className="px-4 md:px-6 pb-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 mb-4">{description}</p>
          
          {/* قائمة الميزات */}
          {features.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">الميزات الجديدة:</p>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span
                      className="inline-block w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: BRAND_COLORS.primary }}
                    ></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function UpdatesSection() {
  return (
    <section className="w-full py-12 md:py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        {/* العنوان */}
        <div className="mb-8">
          <h2
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: BRAND_COLORS.primary }}
          >
            آخر التحديثات
          </h2>
          <p className="text-gray-600">
            تابع أحدث التحديثات والميزات الجديدة في التطبيق
          </p>
        </div>

        {/* قائمة التحديثات */}
        <div
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          style={{
            boxShadow: '0 2px 8px rgba(15, 58, 125, 0.05)',
          }}
        >
          {UPDATES_LOG.map((update) => (
            <UpdateItem key={update.id} {...update} />
          ))}
        </div>
      </div>
    </section>
  );
}
