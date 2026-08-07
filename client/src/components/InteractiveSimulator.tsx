import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Zap, Printer, RefreshCw, CheckCircle2, DollarSign, Calendar, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

export default function InteractiveSimulator() {
  const [prevReading, setPrevReading] = useState<number>(1250);
  const [currReading, setCurrReading] = useState<number>(1480);
  const [cycle, setCycle] = useState<'first' | 'second'>('first');
  const [tariff, setTariff] = useState<'residential' | 'commercial'>('residential');
  const [subscriberName, setSubscriberName] = useState('أحمد محمد العلي');
  const [meterNumber, setMeterNumber] = useState('TF-88421');
  const [isCalculated, setIsCalculated] = useState(true);

  // معادلات احتساب التعرفة الكهربائية المحاكية
  const consumption = Math.max(0, currReading - prevReading);
  const unitRate = tariff === 'residential' ? 1.2 : 1.5; // سعر الكيلوواط
  const energyCost = consumption * unitRate;
  const fixedServiceFee = 10; // رسوم خدمة ثابتة
  const totalAmount = energyCost + fixedServiceFee;

  const handleReset = () => {
    setPrevReading(1000);
    setCurrReading(1200);
    setSubscriberName('مشترك تجريبي');
  };

  return (
    <section className="w-full py-16 md:py-24 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        
        {/* عنوان القسم البارز */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-3 shadow-lg shadow-cyan-950/50">
            <Sparkles size={16} className="text-amber-400 animate-spin-slow" />
            <span>محاكي النظام المباشر</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            جرب احتساب الفاتورة <span className="text-gradient-electric">تفاعلياً الآن</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-xl mx-auto">
            قم بإدخال القراءات التجريبية أدناه لترى كيف يقوم نظام محطة طوفان الأقصى بإحساب الاستهلاك والدورة المالية فوراً ودون أي تأخير.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* مدخلات المحاكي التفاعلي */}
          <div className="lg:col-span-7 space-y-6">
            <TiltCard maxTilt={4} glareOpacity={0.08}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                      <Calculator size={22} />
                    </div>
                    <span className="font-bold text-white text-base">مدخلات القراءة والاشتراك</span>
                  </div>

                  <button
                    onClick={handleReset}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors border border-slate-800 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    <span>إعادة ضبط</span>
                  </button>
                </div>

                {/* حقول الاسم والعداد */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">اسم المشترك التجريبي</label>
                    <input
                      type="text"
                      value={subscriberName}
                      onChange={(e) => setSubscriberName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">رقم العداد</label>
                    <input
                      type="text"
                      value={meterNumber}
                      onChange={(e) => setMeterNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* اختيار الدورة النصف شهرية */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">الدورة النصف شهرية (تحديث v1.0.1)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCycle('first')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        cycle === 'first'
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/40'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Calendar size={14} />
                      <span>الدورة 1 (1 - 15 الشهر)</span>
                    </button>
                    <button
                      onClick={() => setCycle('second')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        cycle === 'second'
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/40'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Calendar size={14} />
                      <span>الدورة 2 (16 - 30 الشهر)</span>
                    </button>
                  </div>
                </div>

                {/* القراءات والمحصلة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">القراءة السابقة (KWh)</label>
                    <input
                      type="number"
                      value={prevReading}
                      onChange={(e) => setPrevReading(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">القراءة الحالية (KWh)</label>
                    <input
                      type="number"
                      value={currReading}
                      onChange={(e) => setCurrReading(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* نوع الاشتراك */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">نوع التعرفة والتعامل</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTariff('residential')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        tariff === 'residential'
                          ? 'bg-blue-950/80 border-blue-400 text-blue-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      منزلي / سكني (1.20 ر.س / KWh)
                    </button>
                    <button
                      onClick={() => setTariff('commercial')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        tariff === 'commercial'
                          ? 'bg-amber-950/80 border-amber-400 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      تجاري / صناعي (1.50 ر.س / KWh)
                    </button>
                  </div>
                </div>

              </div>
            </TiltCard>
          </div>

          {/* مخرجات ومعاينة الفاتورة المحاكاة */}
          <div className="lg:col-span-5">
            <TiltCard maxTilt={4} glareOpacity={0.12}>
              <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 shadow-2xl relative overflow-hidden bg-slate-950/90 space-y-5">
                
                {/* رأس الفاتورة */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-900 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold">
                      ⚡
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">فاتورة محطة طوفان الأقصى</div>
                      <div className="text-[10px] text-cyan-300">معاينة النظام المحاكي المباشر</div>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    مكتملة الحساب
                  </span>
                </div>

                {/* التفاصيل الحية */}
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">المشترك:</span>
                    <span className="font-bold text-white">{subscriberName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">رقم العداد:</span>
                    <span className="font-mono text-cyan-300">{meterNumber}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">الدورة النصف شهرية:</span>
                    <span className="font-bold text-amber-400">
                      {cycle === 'first' ? 'الدورة الأولى (1 - 15)' : 'الدورة الثانية (16 - 30)'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">كمية الاستهلاك (KWh):</span>
                    <span className="font-black text-cyan-400 text-sm">{consumption} KWh</span>
                  </div>
                </div>

                {/* المبلغ الإجمالي المضيء */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 border border-cyan-500/30 text-center space-y-1">
                  <div className="text-[11px] text-slate-400 font-medium">المبلغ الإجمالي المستحق</div>
                  <div className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-1">
                    <span className="text-gradient-electric">{totalAmount.toFixed(2)}</span>
                    <span className="text-xs text-cyan-300 font-normal">ر.س</span>
                  </div>
                </div>

                {/* زر طباعة وهمي */}
                <button
                  onClick={() => alert('هذه محاكاة تفاعلية لاختبار سرعة ودقة النظام!')}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white rounded-xl font-bold text-xs border border-cyan-500/30 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer size={16} />
                  <span>محاكاة طباعة الفاتورة الفورية</span>
                </button>

              </div>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
