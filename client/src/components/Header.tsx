import { useState, useEffect } from 'react';
import { APP_CONFIG } from '@/config';
import { Zap, ShieldCheck, Settings, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const GLITCH_CHARS = "⚡⚡⚡#%&*+=-_/\\<>{}[]";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [glitchTitle, setGlitchTitle] = useState(APP_CONFIG.projectName);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerGlitchEffect = () => {
    const originalText = APP_CONFIG.projectName;
    let iteration = 0;
    const interval = setInterval(() => {
      setGlitchTitle(
        originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return originalText[index];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
        setGlitchTitle(originalText);
      }
      iteration += 1 / 2;
    }, 40);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-xl shadow-cyan-950/20' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          
          {/* الشعار المضيء والعنوان مع الشريحة الحركية */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group"
            onMouseEnter={() => {
              setIsHovered(true);
              triggerGlitchEffect();
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* الشعار المضيء */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 opacity-75 blur-sm group-hover:opacity-100 transition duration-300 animate-electric-pulse" />
              <div className="relative w-11 h-11 rounded-xl bg-slate-900 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
                <Zap size={24} className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            {/* عنوان المشروع والوصف */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                  {glitchTitle}
                </span>
              </h1>
              <p className="text-xs md:text-sm text-cyan-300/70 font-medium">
                {APP_CONFIG.projectDescription}
              </p>
            </div>
          </div>

          {/* الجزء الأيسر: شارة التشغيل المباشر وزر لوحة التحكم */}
          <div className="flex items-center gap-3">
            
            {/* شارة حالة النظام ورابط المطور */}
            <a
              href="#developer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-300 text-xs font-semibold transition"
            >
              <span>مطور النظام والتواصل</span>
            </a>
          </div>

        </div>
      </div>
    </motion.header>
  );
}
