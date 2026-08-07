import { APP_CONFIG } from '@/config';
import { Zap, ShieldCheck, Code2, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="w-full relative z-10 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md text-slate-400 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* العلامة التجارية */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap size={20} />
            </div>
            <div className="text-right">
              <div className="text-base font-bold text-white">{APP_CONFIG.projectName}</div>
              <div className="text-xs text-slate-400">{APP_CONFIG.projectDescription}</div>
            </div>
          </div>

          {/* تطوير ومبرمج النظام */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Code2 size={16} className="text-cyan-400" />
              <span>تطوير وإشراف: <strong className="text-white">م. أيمن الذاهبي</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <a href="tel:+967774998429" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                <Phone size={13} />
                <span dir="ltr" style={{ direction: 'ltr', display: 'inline-block' }} className="font-mono">
                  +967 774 998 429
                </span>
              </a>
              <a href="https://wa.me/967774998429" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-400">
                <MessageCircle size={13} />
                <span>واتساب</span>
              </a>
            </div>
          </div>

          {/* روابط سريعة وحالة الأمان */}
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/">
              <span className="hover:text-cyan-300 transition-colors cursor-pointer">الرئيسية</span>
            </Link>
            <a href="#developer">
              <span className="hover:text-cyan-300 transition-colors cursor-pointer">المطور والتواصل</span>
            </a>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck size={14} />
              <span>نظام معتمد ومشفر</span>
            </div>
          </div>

        </div>

        {/* الحقوق */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-right">
          <div>{APP_CONFIG.copyrightText} • تم التطوير بواسطة م. أيمن الذاهبي</div>
          <div>جميع الحقوق محفوظة © {APP_CONFIG.copyrightYear}</div>
        </div>

      </div>
    </footer>
  );
}
