import { useState } from 'react';
import { UPDATES_LOG } from '@/config';
import { ChevronDown, Search, History, Sparkles, CheckCircle, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UpdateItemProps {
  id: number;
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
  isLatest?: boolean;
}

function UpdateTimelineItem({ id, version, date, title, description, features, isLatest }: UpdateItemProps) {
  const [isExpanded, setIsExpanded] = useState(isLatest);

  const updateDate = new Date(date);
  const formattedDate = updateDate.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative pr-8 md:pr-10 pb-8 last:pb-0">
      
      {/* عقدة الخط الزمني Muted / Glowing Node */}
      <div
        className={`absolute right-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center -translate-x-[11px] md:-translate-x-[15px] z-10 transition-colors ${
          isLatest
            ? 'bg-cyan-500 text-slate-950 glow-accent ring-4 ring-cyan-500/20'
            : 'bg-slate-800 text-slate-400 border border-slate-700'
        }`}
      >
        <span className={`w-2 h-2 rounded-full ${isLatest ? 'bg-slate-950 animate-pulse' : 'bg-slate-400'}`} />
      </div>

      {/* بطاقة التحديث الزجاجية */}
      <div className="glass-panel rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden shadow-lg">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-5 flex items-center justify-between gap-4 text-right cursor-pointer hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                v{version}
              </span>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              {isLatest && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  أحدث إطلاق
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium">{formattedDate}</p>
          </div>

          <div className="p-2 rounded-xl bg-slate-900 text-slate-400">
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-400' : ''}`}
            />
          </div>
        </button>

        {/* محتوى تفاصيل التحديث */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
              className="border-t border-slate-800/80 bg-slate-950/40 p-5 md:p-6 space-y-4"
            >
              <p className="text-sm text-slate-300 leading-relaxed">
                {description}
              </p>

              {features.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs font-bold text-cyan-300 mb-2.5 flex items-center gap-1.5">
                    <Tag size={14} />
                    <span>الميزات والتحسينات المضافة:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200"
                      >
                        <CheckCircle size={15} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default function UpdatesSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUpdates = UPDATES_LOG.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full py-16 md:py-24 px-4 relative z-10">
      <div className="container mx-auto max-w-4xl">
        
        {/* عنوان القسم ومربع البحث */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold mb-2">
              <History size={14} className="text-cyan-400" />
              <span>سجل الإصدارات المعتمدة</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              جدول <span className="text-gradient-gold">التحديثات والإطلاقات</span>
            </h2>
          </div>

          {/* شريط البحث في السجل */}
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث في الإصدارات..."
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* الخط الزمني للتحديثات */}
        <div className="relative border-r-2 border-slate-800/80 mr-3 md:mr-4">
          {filteredUpdates.length > 0 ? (
            filteredUpdates.map((update, index) => (
              <UpdateTimelineItem
                key={update.id}
                {...update}
                isLatest={index === 0}
              />
            ))
          ) : (
            <div className="pr-8 py-10 text-center text-slate-400 text-sm">
              لم يتم العثور على تحديثات تطابق بحثك.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
