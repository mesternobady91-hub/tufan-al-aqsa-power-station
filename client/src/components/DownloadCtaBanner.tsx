import { motion } from 'framer-motion';
import { Smartphone, Monitor, Download, ShieldCheck, Zap } from 'lucide-react';
import { APP_CONFIG } from '@/config';
import TiltCard from './TiltCard';

export default function DownloadCtaBanner() {
  return (
    <section className="w-full py-16 md:py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <TiltCard maxTilt={3} glareOpacity={0.1}>
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/40 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/80 text-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-950/50">
                <Zap size={16} className="text-amber-400" />
                <span>جاهز للبدء والتثبيت؟</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
                احصل على التطبيق الرسمي لـ <span className="text-gradient-electric">محطة الكهرباء الآن</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
                سواء كنت تستخدم الهاتف الذكي أو حاسوب المكتب، حمل النسخة الرسمية المعتمدة v1.0.1 بضغطة زر واستفد من سرعة الحسابات والمتابعة اللحظية.
              </p>

              {/* أزرار التحميل الختامية الفاخرة */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 max-w-xl mx-auto">
                
                {/* زر للأندرويد */}
                <a
                  href={APP_CONFIG.androidDownloadLink}
                  download
                  className="w-full sm:w-1/2 flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-slate-950 font-black shadow-xl shadow-cyan-950/60 hover:shadow-cyan-500/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone size={22} />
                    <div className="text-right">
                      <div className="text-[11px] opacity-80 font-bold">تحميل للأندرويد</div>
                      <div className="text-sm font-black">ملف APK المعتمد</div>
                    </div>
                  </div>
                  <Download size={18} className="group-hover:scale-110 transition-transform" />
                </a>

                {/* زر للكمبيوتر */}
                <a
                  href={APP_CONFIG.desktopDownloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black shadow-xl shadow-amber-950/60 hover:shadow-amber-400/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Monitor size={22} />
                    <div className="text-right">
                      <div className="text-[11px] opacity-80 font-bold">تحميل للكمبيوتر</div>
                      <div className="text-sm font-black">نسخة (Windows)</div>
                    </div>
                  </div>
                  <Download size={18} className="group-hover:scale-110 transition-transform" />
                </a>

              </div>

            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
