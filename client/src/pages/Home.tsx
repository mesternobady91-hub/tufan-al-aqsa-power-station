import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeatureShowcase from '@/components/FeatureShowcase';
import InteractiveSimulator from '@/components/InteractiveSimulator';
import VersionInfo from '@/components/VersionInfo';
import UpdatesSection from '@/components/UpdatesSection';
import DownloadCtaBanner from '@/components/DownloadCtaBanner';
import ContactDeveloperSection from '@/components/ContactDeveloperSection';
import Footer from '@/components/Footer';
import ElectricBackground from '@/components/ElectricBackground';
import ScrollMotionEngine from '@/components/ScrollMotionEngine';

export default function Home() {
  return (
    <ScrollMotionEngine>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden font-sans">
        {/* خلفية الطاقة الكهربائية التفاعلية */}
        <ElectricBackground />

        {/* Header */}
        <Header />

        {/* المحتوى الرئيسي */}
        <main className="flex-1 relative z-10">
          {/* Hero Section */}
          <HeroSection />

          {/* Interactive Live Simulator */}
          <InteractiveSimulator />

          {/* Feature Showcase */}
          <FeatureShowcase />

          {/* Version Info */}
          <VersionInfo />

          {/* Updates Section */}
          <UpdatesSection />

          {/* Bottom Download CTA Banner */}
          <DownloadCtaBanner />

          {/* Contact Developer Section */}
          <ContactDeveloperSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ScrollMotionEngine>
  );
}
