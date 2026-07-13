// صفحة الرئيسية
// تجميع جميع مكونات الصفحة الرئيسية

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import VersionInfo from '@/components/VersionInfo';
import UpdatesSection from '@/components/UpdatesSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* المحتوى الرئيسي */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Version Info */}
        <VersionInfo />

        {/* Updates Section */}
        <UpdatesSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
