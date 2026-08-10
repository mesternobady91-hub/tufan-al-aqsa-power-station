import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Zap, Printer, RefreshCw, Calendar, Sparkles, Archive } from 'lucide-react';
import TiltCard from './TiltCard';

export default function InteractiveSimulator() {
  const [prevReading, setPrevReading] = useState<number>(1250);
  const [currReading, setCurrReading] = useState<number>(1480);
  const [cycle, setCycle] = useState<'monthly' | 'semi_first' | 'semi_second'>('semi_first');
  const [tariff, setTariff] = useState<'residential' | 'commercial'>('residential');
  const [subscriberName, setSubscriberName] = useState('أحمد محمد العلي');
  const [meterNumber, setMeterNumber] = useState('TF-88421');
  const [isArchived, setIsArchived] = useState<boolean>(true);

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

  const getCycleLabel = () => {
    switch (cycle) {
      case 'monthly':
        return 'دورة شهرية كاملة (1 - 30)';
      case 'semi_first':
        return 'دورة نصف شهرية (1 - 15)';
      case 'semi_second':
        return 'دورة نصف شهرية (16 - 30)';
    }
  };

  return (
    <section className="w-full py-16 md:py-24 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        
        {/* عنوان القسم البارز */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-3 shadow-lg shadow-cyan-950/50">
            <Sparkles size={16} className="text-amber-400 animate-spin-slow" />
            <span>محاكي النظام المباشر (إصدار v1.1.0)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            جرب احتساب الفاتورة والأرشفة <span className="text-gradient-electric">تفاعلياً الآن</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-xl mx-auto">
            اختبار تفاعلي لحسابات الاستهلاك والدورات الشهرية والنصف شهرية ونظام الأرشفة المتقدم للإصدار الرسمى الجديد v1.1.0.
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
                    <span className="font-bold text-white text-base">مدخلات القراءة والدورة السجلية</span>
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

                {/* اختيار نوع الدورة المالية (شهرية / نصف شهرية) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">نوع الدورة المحاسبية (جديد v1.1.0)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => setCycle('monthly')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        cycle === 'monthly'
                          ? 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-md shadow-amber-950/40'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Calendar size={14} />
                      <span>دورة شهرية</span>
                    </button>
                    <button
                      onClick={() => setCycle('semi_first')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        cycle === 'semi_first'
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/40'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Calendar size={14} />
                      <span>نصف شهرية (1 - 15)</span>
                    </button>
                    <button
                      onClick={() => setCycle('semi_second')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        cycle === 'semi_second'
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/40'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Calendar size={14} />
                      <span>نصف شهرية (16 - 30)</span>
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

                {/* نوع الاشتراك والأرشفة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">نوع التعرفة</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTariff('residential')}
                        className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                          tariff === 'residential'
                            ? 'bg-blue-950/80 border-blue-400 text-blue-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        سكني (1.20)
                      </button>
                      <button
                        onClick={() => setTariff('commercial')}
                        className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                          tariff === 'commercial'
                            ? 'bg-amber-950/80 border-amber-400 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        تجاري (1.50)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">حالة الأرشفة الآلية (v1.1.0)</label>
                    <div
                      onClick={() => setIsArchived(!isArchived)}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-cyan-500/40 transition"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                        <Archive size={16} />
                        <span>أرشفة فورية للسجلات</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isArchived ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'}`}>
                        {isArchived ? 'مفعّل ✓' : 'معطل'}
                      </span>
                    </div>
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
                      <div className="text-[10px] text-cyan-300">إصدار التحديث v1.1.0</div>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    مكتمل ومؤرشف
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
                    <span className="text-slate-400">نوع الدورة المحاسبية:</span>
                    <span className="font-bold text-amber-400">{getCycleLabel()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">حالة الأرشفة السجلية:</span>
                    <span className="font-bold text-emerald-400">تم حفظ الأرشيف بنجاح ✓</span>
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
                  onClick={() => alert('محاكاة طباعة الفاتورة والأرشفة بنجاح ضمن الإصدار v1.1.0!')}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white rounded-xl font-bold text-xs border border-cyan-500/30 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer size={16} />
                  <span>طباعة وأرشفة الفاتورة فورياً</span>
                </button>

              </div>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
