import { useState } from 'react';
import { APP_CONFIG } from '@/config';
import { Calendar, Monitor, Smartphone, QrCode, Download, ExternalLink, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VersionInfo() {
  const [showQR, setShowQR] = useState(false);

  const lastUpdate = new Date(APP_CONFIG.lastUpdateDate);
  const formattedDate = lastUpdate.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // توليد رابط الـ QR المباشر لصفحة التحميل أو الملف
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const androidDownloadUrl = currentOrigin
    ? `${currentOrigin}${APP_CONFIG.androidDownloadLink}`
    : APP_CONFIG.androidDownloadLink;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(androidDownloadUrl)}&color=0F3A7D&bgcolor=FFFFFF`;

  return (
    <section className="w-full py-12 md:py-16 px-4 relative z-10">
      <div className="container mx-auto max-w-5xl">
        
        {/* العناوين والبطاقات الزجاجية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* بطاقة رقم إصدار الأندرويد */}
          <motion.div
            whileHover={{ y: -4 }}
            className="glass-panel-interactive p-6 rounded-2xl border border-slate-700/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-400">
                  <Smartphone size={26} />
                </div>
                <button
                  onClick={() => setShowQR(true)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer"
                  title="مسح رمز QR للتحميل المباشر عبر الهاتف"
                >
                  <QrCode size={16} />
                  <span>رمز QR</span>
                </button>
              </div>

              <div className="text-xs text-slate-400 mb-1 font-medium">إصدار نظام الأندرويد</div>
              <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
                <span>{APP_CONFIG.androidVersion}</span>
                <span className="text-xs font-semibold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                  رسمي معتمد
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>الملف: APK</span>
              <a
                href={APP_CONFIG.androidDownloadLink}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                تحميل المباشر <Download size={12} />
              </a>
            </div>
          </motion.div>

          {/* بطاقة رقم إصدار الكمبيوتر */}
          <motion.div
            whileHover={{ y: -4 }}
            className="glass-panel-interactive p-6 rounded-2xl border border-slate-700/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400">
                  <Monitor size={26} />
                </div>
                <span className="text-xs font-semibold text-amber-300 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30">
                  Windows EXE
                </span>
              </div>

              <div className="text-xs text-slate-400 mb-1 font-medium">إصدار نظام الكمبيوتر</div>
              <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
                <span>{APP_CONFIG.desktopVersion}</span>
                <span className="text-xs font-semibold text-amber-400 px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30">
                  رسمي معتمد
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>الاستضافة: Drive</span>
              <a
                href={APP_CONFIG.desktopDownloadLink}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                تحميل للكمبيوتر <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>

          {/* بطاقة تاريخ آخر تحديث */}
          <motion.div
            whileHover={{ y: -4 }}
            className="glass-panel-interactive p-6 rounded-2xl border border-slate-700/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                  <Calendar size={26} />
                </div>
                <span className="text-xs font-semibold text-cyan-300 px-2 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 flex items-center gap-1">
                  <Check size={12} /> محدث
                </span>
              </div>

              <div className="text-xs text-slate-400 mb-1 font-medium">تاريخ الاعتماد والرفع</div>
              <div className="text-xl font-bold text-white tracking-tight leading-snug">
                {formattedDate}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              حالة الخادم: متصل بكفاءة عالية
            </div>
          </motion.div>

        </div>

      </div>

      {/* نافذة QR Code Popup للتحميل عبر الجوال */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel max-w-sm w-full p-6 rounded-3xl border border-slate-700 shadow-2xl relative text-center"
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-4">
                <QrCode size={26} />
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">مسح الكود للتحميل المباشر</h3>
              <p className="text-xs text-slate-300 mb-5">
                وجه كاميرا هاتفك المحمول نحو الرمز أدناه لبدء تحميل تطبيق الأندرويد مباشرة:
              </p>

              <div className="p-4 rounded-2xl bg-white inline-block shadow-inner mb-4">
                <img
                  src={qrImageUrl}
                  alt="QR Code APK Download"
                  className="w-48 h-48 mx-auto"
                />
              </div>

              <div className="text-xs text-slate-400">
                إصدار الأندرويد المعتمد v{APP_CONFIG.androidVersion}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
