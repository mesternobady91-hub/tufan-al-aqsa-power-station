import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, Smartphone, CheckCircle, ShieldCheck, Zap, ArrowDown, Activity, Users, Clock } from 'lucide-react';
import { APP_CONFIG } from '@/config';
import TiltCard from './TiltCard';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'android' | 'desktop'>('android');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="w-full relative z-10 pt-12 pb-20 md:pt-20 md:pb-28 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center space-y-8 md:space-y-12"
        >
          {/* شارة الإصدار الرسمية المضيئة المريحة للعين */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs md:text-sm font-semibold shadow-lg shadow-cyan-950/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{APP_CONFIG.projectDescription} • {APP_CONFIG.androidVersion} الرسمية</span>
            <ShieldCheck size={16} className="text-emerald-400 mr-1" />
          </motion.div>

          {/* العنوان الرئيسي بأبعاد ونصوص مريحة للعين */}
          <motion.div variants={itemVariants} className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] tracking-tight">
              نظام إدارة محطة الكهرباء
              <span className="block mt-2 text-gradient-electric">منصة التحميل الرسمية المعتمدة</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto pt-2">
              حمل أحدث إصدار من التطبيق المعتمد لمتابعة وإدارة خدمات محطة طوفان الأقصى للكهرباء بكل سهولة وسرعة على الأندرويد وأجهزة الكمبيوتر.
            </p>
          </motion.div>

          {/* أزرار التحميل الرئيسية الفاخرة مع 3D Tilt */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-xl">
            
            {/* زر تحميل الأندرويد */}
            <TiltCard className="w-full sm:w-1/2" maxTilt={6} glareOpacity={0.12}>
              <a
                href={APP_CONFIG.androidDownloadLink}
                download
                className="group relative w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-slate-950 font-black shadow-xl shadow-cyan-950/60 hover:shadow-cyan-500/40 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-slate-950/10 border border-slate-950/20 flex items-center justify-center text-slate-950">
                    <Smartphone size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-900 font-bold opacity-80">تحميل للأندرويد</div>
                    <div className="text-base font-black">تحميل ملف (APK)</div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-cyan-300 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                  <Download size={20} />
                </div>
              </a>
            </TiltCard>

            {/* زر تحميل الكمبيوتر */}
            <TiltCard className="w-full sm:w-1/2" maxTilt={6} glareOpacity={0.12}>
              <a
                href={APP_CONFIG.desktopDownloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black shadow-xl shadow-amber-950/60 hover:shadow-amber-400/40 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-slate-950/10 border border-slate-950/20 flex items-center justify-center text-slate-950">
                    <Monitor size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-900 font-bold opacity-80">تحميل للكمبيوتر</div>
                    <div className="text-base font-black">نسخة (Windows)</div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-300 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                  <Download size={20} />
                </div>
              </a>
            </TiltCard>

          </motion.div>

          {/* لوحة الإحصائيات الحية المريحة للعين */}
          <motion.div variants={itemVariants} className="w-full pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              
              <TiltCard maxTilt={4} glareOpacity={0.06}>
                <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4 text-right">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <Activity size={22} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">99.9%</div>
                    <div className="text-xs text-slate-400">نسبة الجاهزية والتشغيل</div>
                  </div>
                </div>
              </TiltCard>

              <TiltCard maxTilt={4} glareOpacity={0.06}>
                <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4 text-right">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <Users size={22} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">50,000+</div>
                    <div className="text-xs text-slate-400">إدارة العدادات والمواطنين</div>
                  </div>
                </div>
              </TiltCard>

              <TiltCard maxTilt={4} glareOpacity={0.06}>
                <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4 text-right">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <Clock size={22} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">15ms &gt;</div>
                    <div className="text-xs text-slate-400">زمن استجابة النظام</div>
                  </div>
                </div>
              </TiltCard>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
