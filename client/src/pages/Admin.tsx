import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Save, Plus, Trash2, Upload, CheckCircle, AlertCircle, RefreshCw, Key, Smartphone, Monitor, Shield, Sparkles } from 'lucide-react';
import initialConfigData from '../config.json';

interface UpdateItem {
  id: number;
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Config States
  const [projectName, setProjectName] = useState(initialConfigData.projectName);
  const [projectDescription, setProjectDescription] = useState(initialConfigData.projectDescription);
  const [androidVersion, setAndroidVersion] = useState(initialConfigData.androidVersion);
  const [desktopVersion, setDesktopVersion] = useState(initialConfigData.desktopVersion);
  const [lastUpdateDate, setLastUpdateDate] = useState(initialConfigData.lastUpdateDate);
  const [androidDownloadLink, setAndroidDownloadLink] = useState(initialConfigData.androidDownloadLink);
  const [desktopDownloadLink, setDesktopDownloadLink] = useState(initialConfigData.desktopDownloadLink);
  const [copyrightText, setCopyrightText] = useState(initialConfigData.copyrightText);
  const [updatesLog, setUpdatesLog] = useState<UpdateItem[]>(initialConfigData.updatesLog);

  // UI States
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Android Upload State
  const [apkFile, setApkFile] = useState<File | null>(null);
  const [isUploadingApk, setIsUploadingApk] = useState(false);
  const [uploadProgressApk, setUploadProgressApk] = useState(0);

  // Desktop Upload State
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [isUploadingDesktop, setIsUploadingDesktop] = useState(false);
  const [uploadProgressDesktop, setUploadProgressDesktop] = useState(0);

  // New Update Log State
  const [newLog, setNewLog] = useState({
    version: '',
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: '',
    featuresText: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('كلمة المرور غير صحيحة!');
    }
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.version || !newLog.title || !newLog.description) {
      alert('يرجى ملء جميع الحقول المطلوبة للتحديث!');
      return;
    }

    const features = newLog.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const logItem: UpdateItem = {
      id: Date.now(),
      version: newLog.version,
      date: newLog.date,
      title: newLog.title,
      description: newLog.description,
      features,
    };

    setUpdatesLog([logItem, ...updatesLog]);
    setNewLog({
      version: '',
      date: new Date().toISOString().split('T')[0],
      title: '',
      description: '',
      featuresText: '',
    });
  };

  const handleDeleteLog = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا التحديث من السجل؟')) {
      setUpdatesLog(updatesLog.filter((log) => log.id !== id));
    }
  };

  const handleUploadApk = async () => {
    if (!apkFile) return;

    setIsUploadingApk(true);
    setUploadProgressApk(10);
    setMessage({ type: '', text: '' });

    try {
      const filename = apkFile.name;
      
      const progressInterval = setInterval(() => {
        setUploadProgressApk((prev) => (prev < 90 ? prev + 15 : prev));
      }, 300);

      const response = await fetch(`/api/admin/upload-apk?filename=${encodeURIComponent(filename)}`, {
        method: 'POST',
        body: apkFile,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      clearInterval(progressInterval);
      setUploadProgressApk(100);

      const result = await response.json();

      if (result.success) {
        setAndroidDownloadLink(result.path);
        setMessage({ type: 'success', text: `تم رفع ملف الأندرويد APK بنجاح باسم: ${filename}` });
      } else {
        throw new Error(result.error || 'فشل الرفع');
      }
    } catch (e: any) {
      setMessage({ type: 'error', text: `حدث خطأ أثناء رفع ملف APK: ${e.message}` });
    } finally {
      setIsUploadingApk(false);
      setApkFile(null);
    }
  };

  const handleUploadDesktop = async () => {
    if (!desktopFile) return;

    setIsUploadingDesktop(true);
    setUploadProgressDesktop(10);
    setMessage({ type: '', text: '' });

    try {
      const filename = desktopFile.name;
      
      const progressInterval = setInterval(() => {
        setUploadProgressDesktop((prev) => (prev < 90 ? prev + 15 : prev));
      }, 300);

      const response = await fetch(`/api/admin/upload-apk?filename=${encodeURIComponent(filename)}`, {
        method: 'POST',
        body: desktopFile,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      clearInterval(progressInterval);
      setUploadProgressDesktop(100);

      const result = await response.json();

      if (result.success) {
        setDesktopDownloadLink(result.path);
        setMessage({ type: 'success', text: `تم رفع ملف الكمبيوتر بنجاح باسم: ${filename}` });
      } else {
        throw new Error(result.error || 'فشل الرفع');
      }
    } catch (e: any) {
      setMessage({ type: 'error', text: `حدث خطأ أثناء رفع ملف الكمبيوتر: ${e.message}` });
    } finally {
      setIsUploadingDesktop(false);
      setDesktopFile(null);
    }
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    const newConfig = {
      projectName,
      projectDescription,
      androidVersion,
      desktopVersion,
      lastUpdateDate,
      androidDownloadLink,
      desktopDownloadLink,
      copyrightYear: new Date().getFullYear(),
      copyrightText,
      updatesLog,
    };

    try {
      const response = await fetch('/api/admin/save-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfig),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'تم حفظ جميع التعديلات بنجاح في كود المشروع!' });
      } else {
        throw new Error(result.error || 'فشل الحفظ');
      }
    } catch (e: any) {
      setMessage({ type: 'error', text: `حدث خطأ أثناء حفظ الإعدادات: ${e.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 text-slate-100 font-sans">
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 border border-slate-800 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-900 border border-cyan-500/40 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Key size={32} />
            </div>
            <h2 className="text-2xl font-extrabold text-white">لوحة التحكم والأمان</h2>
            <p className="text-xs text-slate-400 mt-2">يرجى إدخال كلمة المرور للوصول إلى مركز الإعدادات</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">كلمة المرور (الافتراضية: admin123)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 outline-none text-right text-white text-sm"
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-xs flex items-center gap-1.5 bg-red-950/60 p-3 rounded-lg border border-red-800">
                <AlertCircle size={16} /> {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-bold shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>لوحة التحكم وتعديل التطبيق</span>
              <Sparkles size={20} className="text-cyan-400" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">إدارة بيانات الموقع ورفع الملفات والتطبيقات المعتمدة</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocation('/')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-semibold border border-slate-700 text-xs sm:text-sm transition cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>عرض الموقع</span>
            </button>
            <button
              onClick={handleSaveConfig}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-cyan-950/40 transition cursor-pointer"
            >
              {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              <span>حفظ جميع التغييرات</span>
            </button>
          </div>
        </div>

        {/* Banner Message */}
        {message.text && (
          <div className={`p-4 rounded-2xl flex items-start gap-3 border ${
            message.type === 'success' ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200' : 'bg-red-950/70 border-red-500/40 text-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" /> : <AlertCircle size={20} className="text-red-400 flex-shrink-0" />}
            <div>
              <p className="font-bold text-sm">{message.type === 'success' ? 'عملية ناجحة!' : 'خطأ!'}</p>
              <p className="text-xs mt-0.5">{message.text}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* App Settings Card */}
            <div className="glass-panel rounded-3xl border border-slate-800 p-6 space-y-6">
              <h2 className="text-lg font-bold text-white border-b pb-3 border-slate-800 flex items-center gap-2">
                <Shield size={18} className="text-cyan-400" />
                <span>إعدادات الموقع الأساسية</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">اسم المشروع</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">وصف المشروع</label>
                  <input
                    type="text"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">إصدار الأندرويد الحالي</label>
                  <input
                    type="text"
                    value={androidVersion}
                    onChange={(e) => setAndroidVersion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">إصدار الكمبيوتر الحالي</label>
                  <input
                    type="text"
                    value={desktopVersion}
                    onChange={(e) => setDesktopVersion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">تاريخ آخر تحديث</label>
                  <input
                    type="date"
                    value={lastUpdateDate}
                    onChange={(e) => setLastUpdateDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">نص حقوق الملكية (Copyright)</label>
                <input
                  type="text"
                  value={copyrightText}
                  onChange={(e) => setCopyrightText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">رابط تحميل تطبيق الأندرويد</label>
                  <input
                    type="text"
                    value={androidDownloadLink}
                    onChange={(e) => setAndroidDownloadLink(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs outline-none"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">رابط تحميل نسخة الكمبيوتر</label>
                  <input
                    type="text"
                    value={desktopDownloadLink}
                    onChange={(e) => setDesktopDownloadLink(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs outline-none"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Android APK Upload Card */}
            <div className="glass-panel rounded-3xl border border-slate-800 p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Smartphone size={20} className="text-cyan-400" />
                <h2 className="text-lg font-bold text-white">رفع ملف الأندرويد (APK) جديد</h2>
              </div>
              
              <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 text-center space-y-4 bg-slate-900/50 transition-colors">
                <div className="w-12 h-12 bg-cyan-950 text-cyan-400 rounded-xl border border-cyan-500/30 flex items-center justify-center mx-auto">
                  <Upload size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-300">اضغط لتحديد الملف أو اسحبه هنا</p>
                  <p className="text-[11px] text-slate-500">ملفات APK فقط</p>
                </div>
                <input
                  type="file"
                  accept=".apk"
                  onChange={(e) => setApkFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="apk-upload-input"
                />
                <label
                  htmlFor="apk-upload-input"
                  className="inline-flex px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-semibold text-slate-200 cursor-pointer transition"
                >
                  اختر ملف APK
                </label>

                {apkFile && (
                  <div className="text-xs font-semibold text-cyan-300 bg-cyan-950/60 p-2.5 rounded-xl border border-cyan-500/30">
                    ملف محدد: {apkFile.name} ({(apkFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
              </div>

              {isUploadingApk && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>جاري رفع الملف...</span>
                    <span>{uploadProgressApk}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${uploadProgressApk}%` }}></div>
                  </div>
                </div>
              )}

              <button
                onClick={handleUploadApk}
                disabled={!apkFile || isUploadingApk}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-slate-950 rounded-xl font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                <Upload size={16} />
                <span>ابدأ رفع ملف APK للأندرويد</span>
              </button>
            </div>

            {/* Desktop File Upload Card */}
            <div className="glass-panel rounded-3xl border border-slate-800 p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Monitor size={20} className="text-amber-400" />
                <h2 className="text-lg font-bold text-white">رفع ملف نسخة الكمبيوتر (Windows) جديد</h2>
              </div>
              
              <div className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 text-center space-y-4 bg-slate-900/50 transition-colors">
                <div className="w-12 h-12 bg-amber-950 text-amber-400 rounded-xl border border-amber-500/30 flex items-center justify-center mx-auto">
                  <Upload size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-300">اضغط لتحديد الملف أو اسحبه هنا</p>
                  <p className="text-[11px] text-slate-500">ملفات EXE أو ZIP للكمبيوتر</p>
                </div>
                <input
                  type="file"
                  accept=".exe,.zip"
                  onChange={(e) => setDesktopFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="desktop-upload-input"
                />
                <label
                  htmlFor="desktop-upload-input"
                  className="inline-flex px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-semibold text-slate-200 cursor-pointer transition"
                >
                  اختر ملف الكمبيوتر
                </label>

                {desktopFile && (
                  <div className="text-xs font-semibold text-amber-300 bg-amber-950/60 p-2.5 rounded-xl border border-amber-500/30">
                    ملف محدد: {desktopFile.name} ({(desktopFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
              </div>

              {isUploadingDesktop && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>جاري رفع الملف...</span>
                    <span>{uploadProgressDesktop}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${uploadProgressDesktop}%` }}></div>
                  </div>
                </div>
              )}

              <button
                onClick={handleUploadDesktop}
                disabled={!desktopFile || isUploadingDesktop}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 rounded-xl font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                <Upload size={16} />
                <span>ابدأ رفع ملف نسخة الكمبيوتر</span>
              </button>
            </div>

          </div>

          {/* Right Column: Update log editor */}
          <div className="space-y-8">
            
            {/* Add New Update Log Card */}
            <div className="glass-panel rounded-3xl border border-slate-800 p-6 space-y-5">
              <h2 className="text-lg font-bold text-white border-b pb-3 border-slate-800">إضافة تحديث جديد للعملاء</h2>
              
              <form onSubmit={handleAddLog} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الإصدار (e.g. 1.1.0)</label>
                  <input
                    type="text"
                    value={newLog.version}
                    onChange={(e) => setNewLog({ ...newLog, version: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
                    placeholder="1.1.0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">العنوان الرئيسي</label>
                  <input
                    type="text"
                    value={newLog.title}
                    onChange={(e) => setNewLog({ ...newLog, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
                    placeholder="تحديث الميزات والسرعة"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الوصف العام للتحديث</label>
                  <textarea
                    value={newLog.description}
                    onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none h-20"
                    placeholder="وصف مختصر لمزايا هذا التحديث..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الميزات الجديدة (سطر لكل ميزة)</label>
                  <textarea
                    value={newLog.featuresText}
                    onChange={(e) => setNewLog({ ...newLog, featuresText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none h-24"
                    placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">التاريخ</label>
                  <input
                    type="date"
                    value={newLog.date}
                    onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus size={16} />
                  <span>إضافة للسجل المؤقت</span>
                </button>
              </form>
            </div>

            {/* Current Update Log List */}
            <div className="glass-panel rounded-3xl border border-slate-800 p-6 space-y-4">
              <h2 className="text-lg font-bold text-white border-b pb-3 border-slate-800">سجل التحديثات الحالي ({updatesLog.length})</h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {updatesLog.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs truncate">{log.title}</span>
                        <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 text-[10px] font-bold rounded-md border border-cyan-500/30">v{log.version}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 truncate">{log.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="text-red-400 hover:text-red-300 p-1 hover:bg-red-950/60 rounded transition flex-shrink-0"
                      title="حذف من السجل"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
