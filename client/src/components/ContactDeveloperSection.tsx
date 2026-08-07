import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, Instagram, Facebook, Copy, Check, Send, Sparkles, Code2, UserCheck } from 'lucide-react';
import TiltCard from './TiltCard';

export default function ContactDeveloperSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [msgName, setMsgName] = useState('');
  const [msgText, setMsgText] = useState('');

  const phoneNum = '+967774998429';
  const emailAddr = 'ayman.alzhabi.dev@gmail.com';
  const whatsappUrl = `https://wa.me/967774998429`;
  const instagramUrl = `https://instagram.com/eng_ayman_al_zahabi`;
  const facebookUrl = `https://www.facebook.com/share/1HJ56XhRjn/`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendCustomWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    const formattedText = `السلام عليكم م. أيمن الذاهبي،%0Aأنا: ${msgName || 'زائر للموقع'}%0A%0Aالرسالة:%0A${encodeURIComponent(msgText)}`;
    window.open(`https://wa.me/967774998429?text=${formattedText}`, '_blank');
  };

  return (
    <section id="developer" className="w-full py-16 md:py-24 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        
        {/* عنوان القسم البارز */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Code2 size={16} className="text-cyan-400" />
            <span>الدعم الفني ومطور النظام</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            مطور النظام و <span className="text-gradient-electric">وسائل التواصل المباشر</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
            يسعدنا تواصلكم المباشر مع المهندس مطور نظام محطة طوفان الأقصى للكهرباء للدعم الفني، التحديثات، والتطويرات الخاصة.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* بطاقة تعريف البروفايل ثلاثية الأبعاد للمطور */}
          <div className="lg:col-span-5">
            <TiltCard maxTilt={5} glareOpacity={0.12}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl relative overflow-hidden bg-slate-950/90 text-center space-y-6">
                
                {/* الأيقونة الرمزية للمطور */}
                <div className="relative w-24 h-24 mx-auto">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 p-1 shadow-lg shadow-cyan-950/50">
                    <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-cyan-300">
                      <UserCheck size={42} />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-slate-950 text-xs font-bold" title="متاح للتواصل">
                    ✓
                  </span>
                </div>

                {/* تفاصيل الاسم واللقب */}
                <div>
                  <h3 className="text-2xl font-black text-white">م. أيمن الذاهبي</h3>
                  <p className="text-xs text-cyan-400 font-semibold mt-1">مهندس ومطور أنظمة محطة طوفان الأقصى</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    متخصص في برمجة وتطوير أنظمة المحاسبة، إدارة شبكات الكهرباء، والتطبيقات المعتمدة للكمبيوتر والأندرويد.
                  </p>
                </div>

                {/* روابط التواصل الاجتماعي الرسمية */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-3">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-pink-950/60 hover:text-pink-400 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
                  >
                    <Instagram size={16} />
                    <span>Instagram</span>
                  </a>

                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-950/60 hover:text-blue-400 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
                  >
                    <Facebook size={16} />
                    <span>Facebook</span>
                  </a>
                </div>

              </div>
            </TiltCard>
          </div>

          {/* أزرار الاتصال والواتساب ونموذج الرسائل السريع */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* أزرار التواصل المباشر */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* زر الاتصال الهاتفي المباشر مع تنسيق LTR الصريح */}
              <TiltCard maxTilt={5} glareOpacity={0.1}>
                <a
                  href={`tel:${phoneNum}`}
                  className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 flex items-center gap-4 text-right transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={22} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">اتصال هاتفي مباشر</div>
                    <div className="text-base font-black text-white mt-0.5">
                      <span dir="ltr" style={{ direction: 'ltr', display: 'inline-block' }} className="font-mono">
                        +967 774 998 429
                      </span>
                    </div>
                  </div>
                </a>
              </TiltCard>

              {/* زر الواتساب المباشر مع تنسيق LTR الصريح */}
              <TiltCard maxTilt={5} glareOpacity={0.1}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 flex items-center gap-4 text-right transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">مراسلة عبر الواتساب</div>
                    <div className="text-base font-black text-emerald-400 mt-0.5">
                      <span dir="ltr" style={{ direction: 'ltr', display: 'inline-block' }} className="font-mono">
                        +967 774 998 429
                      </span>
                    </div>
                  </div>
                </a>
              </TiltCard>

            </div>

            {/* بطاقة البريد الإلكتروني مع زر النسخ */}
            <TiltCard maxTilt={3} glareOpacity={0.08}>
              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-right">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">البريد الإلكتروني المباشر</div>
                    <a href={`mailto:${emailAddr}`} className="text-sm font-bold text-white hover:text-cyan-300 transition-colors font-mono dir-ltr">
                      {emailAddr}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  <span>{copiedEmail ? 'تم نسخ الإيميل!' : 'نسخ الإيميل'}</span>
                </button>
              </div>
            </TiltCard>

            {/* نموذج إرسال رسالة مباشرة للمطور عبر الواتساب */}
            <TiltCard maxTilt={3} glareOpacity={0.06}>
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Send size={18} className="text-cyan-400" />
                  <span className="text-sm font-bold text-white">إرسال استفسار أو طلب دعم للمطور</span>
                </div>

                <form onSubmit={handleSendCustomWhatsapp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">الاسم / اسم المنشأة (اختياري)</label>
                    <input
                      type="text"
                      value={msgName}
                      onChange={(e) => setMsgName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
                      placeholder="مثال: مشترك محطة الكهرباء / إدارة المحطة"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">تفاصيل الاستفسار أو الطلب</label>
                    <textarea
                      value={msgText}
                      onChange={(e) => setMsgText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400 h-24"
                      placeholder="اكتب رسالتك للمهندس أيمن الذاهبي وسيقوم بالرد عليك مباشرة..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 rounded-xl font-bold text-xs shadow-lg shadow-emerald-950/40 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>إرسال الرسالة عبر الواتساب مباشرة</span>
                  </button>
                </form>
              </div>
            </TiltCard>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
