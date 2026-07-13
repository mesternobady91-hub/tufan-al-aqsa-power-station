/**
 * ملف الإعدادات المركزي للتطبيق
 * يحتوي على جميع المتغيرات القابلة للتعديل بسهولة
 * لا تحتاج لتعديل أي ملفات أخرى عند تغيير هذه القيم
 */

import configData from './config.json';

// معلومات التطبيق الأساسية
export const APP_CONFIG = {
  projectName: configData.projectName,
  projectDescription: configData.projectDescription,
  version: configData.version,
  lastUpdateDate: configData.lastUpdateDate,
  downloadLink: configData.downloadLink,
  copyrightYear: configData.copyrightYear,
  copyrightText: configData.copyrightText,
};

// سجل التحديثات
export const UPDATES_LOG = configData.updatesLog;

// ألوان العلامة التجارية
export const BRAND_COLORS = {
  primary: '#0F3A7D', // الأزرق الداكن
  secondary: '#F59E0B', // الذهبي
  accent: '#3B82F6', // الأزرق الفاتح
  dark: '#1F2937', // الرمادي الداكن
  light: '#F3F4F6', // الرمادي الفاتح
  white: '#FFFFFF',
  text: '#111827', // النص الأساسي
  textLight: '#6B7280', // النص الفاتح
};

// إعدادات الحركات والانتقالات
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
    easeInOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
  },
};
