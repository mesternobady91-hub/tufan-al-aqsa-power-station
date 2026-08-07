import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Users, CalendarCheck, BarChart3, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import TiltCard from './TiltCard';

const FEATURES_DATA = [
  {
    id: 'billing',
    title: 'نظام المحاسبة والفواتير',
    icon: CreditCard,
    badge: 'ميزة أساسية',
    description: 'إدارة متكاملة للمحتسبات والدفع الإلكتروني وطباعة الفواتير دقيقة الحسابات.',
    highlights: [
      'احتساب تلقائي لقيمة الاستهلاك بالكيلوواط بحساب شريحة دقيقة.',
      'طباعة فورية للفواتير والقيود المحاسبية عبر الطابعات المحمولة والحرارية.',
      'دعم كامل للعملات والتسويات الفورية والحركات المالية.',
    ],
    stats: { label: 'دقة الحسابات', value: '100%', extra: 'سرعة الإصدار: فوري' },
  },
  {
    id: 'subscribers',
    title: 'إدارة المشتركين والعدادات',
    icon: Users,
    badge: 'تحديث هائل',
    description: 'سجل شامل لجميع عدادات المحطة وإمكانية البحث والفلترة السريعة.',
    highlights: [
      'البحث الفوري برقم العداد، اسم المشترك، أو المنطقة.',
      'تسجيل قراءات العدادات المحمولة أوفلاين مع المزامنة التلقائية.',
      'تتبع تاريخ الاستهلاك لكل مشترك مع رسوم بيانية ومؤشرات.',
    ],
    stats: { label: 'سرعة الاستعلام', value: '0.2s', extra: 'سعة قاعدة البيانات: غير محدودة' },
  },
  {
    id: 'cycles',
    title: 'احتساب الدورات النصف شهرية',
    icon: CalendarCheck,
    badge: 'تعديل الإصدار v1.0.1',
    description: 'إصلاح وضبط طريقة احتساب الدورة الأولى والدورة الثانية من كل شهر بدقة تامة.',
    highlights: [
      'فصل دقيق بين استهلاك الدورة الأولى (1-15) والدورة الثانية (16-30).',
      'إلغاء التداخل في قراءات المنتصف وحساب فروقات العدادات.',
      'استخراج تقارير ختامية لكل دورة نصف شهرية على حدة.',
    ],
    stats: { label: 'استقرار الدورة', value: '100%', extra: 'حالة التعديل: معتمد ومجرب' },
  },
  {
    id: 'analytics',
    title: 'التقارير والإحصائيات اللحظية',
    icon: BarChart3,
    badge: 'ذكاء الأعمال',
    description: 'تقارير مالية وفنية تفصيلية تساعد في اتخاذ القرارات الإدارية للمحطة.',
    highlights: [
      'تقرير الإيرادات اليومية والشهرية وتكاليف تشغيل المولدات.',
      'مراقبة الفاقد الكهربائي وفروقات القراءات بين المولد والعدادات.',
      'تصدير التقارير بصيغة PDF و Excel بضغطة زر واحدة.',
    ],
    stats: { label: 'أنواع التقارير', value: '+15', extra: 'تحديث البيانات: لحظي' },
  },
];

export default function FeatureShowcase() {
  const [activeId, setActiveId] = useState('billing');
  const activeFeature = FEATURES_DATA.find((f) => f.id === activeId) || FEATURES_DATA[0];

  return (
    <section className="w-full py-16 md:py-24 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        
        {/* عنوان القسم */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Zap size={14} className="text-amber-400" />
            <span>قدرات وإمكانيات النظام</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            مميزات تطبيق <span className="text-gradient-electric">محطة الكهرباء</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
            تم تصميم وتطوير التطبيق ليلبي احتياجات محطة طوفان الأقصى للكهرباء مع سرعة واستقرار عالي لنظامي الأندرويد والكمبيوتر.
          </p>
        </div>

        {/* أزرار التبويب */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {FEATURES_DATA.map((feature) => {
            const Icon = feature.icon;
            const isActive = feature.id === activeId;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveId(feature.id)}
                className={`p-4 rounded-2xl border text-right transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400 text-white shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/50'
                    : 'glass-panel border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </div>
                <div className="font-bold text-sm sm:text-base">{feature.title}</div>
              </button>
            );
          })}
        </div>

        {/* المحتوى المعروض للتبويب المحدد بطابع 3D Tilt */}
        <TiltCard maxTilt={3} glareOpacity={0.08}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-700/60 shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* التفاصيل والشرح */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
                    <ShieldCheck size={14} />
                    <span>{activeFeature.badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {activeFeature.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {activeFeature.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {activeFeature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* لوحة الإحصائيات الجانبية للميزة */}
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 text-center">
                    <div className="text-xs text-slate-400 font-semibold">{activeFeature.stats.label}</div>
                    <div className="text-4xl font-black text-cyan-400 tracking-tight">
                      {activeFeature.stats.value}
                    </div>
                    <div className="text-xs text-slate-300 pt-2 border-t border-slate-900 flex items-center justify-center gap-1">
                      <Zap size={14} className="text-amber-400" />
                      <span>{activeFeature.stats.extra}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </TiltCard>

      </div>
    </section>
  );
}
