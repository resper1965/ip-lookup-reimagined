
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import IPInfos from "@/components/IPInfos";
import ConnectivityTest from "@/components/ConnectivityTest";
import WebRTCTest from "@/components/WebRTCTest";
import DNSLeakTest from "@/components/DNSLeakTest";
import SpeedTest from "@/components/SpeedTest";
import AdvancedTools from "@/components/AdvancedTools";
import SettingsModal from "@/components/SettingsModal";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import Footer from "@/components/Footer";
import AdminPanel from "@/components/AdminPanel";
import { SettingsData } from "@/components/SettingsModal";
import { useState } from "react";

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('ip-infos');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    stunServers: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
    connectivitySites: ['https://www.google.com', 'https://www.cloudflare.com', 'https://www.microsoft.com']
  });

  const handleSettingsSave = (newSettings: SettingsData) => {
    setSettings(newSettings);
  };

  const handleAdminAccess = () => {
    setShowAdminPanel(true);
  };

  const handleBackToApp = () => {
    setShowAdminPanel(false);
  };

  if (showAdminPanel) {
    return <AdminPanel onBackToApp={handleBackToApp} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onAdminClick={handleAdminAccess}
      />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        {activeTab === 'ip-infos' && <IPInfos />}
        {activeTab === 'connectivity' && <ConnectivityTest />}
        {activeTab === 'webrtc' && <WebRTCTest />}
        {activeTab === 'dns-leak' && <DNSLeakTest />}
        {activeTab === 'speed-test' && <SpeedTest />}
        {activeTab === 'advanced' && <AdvancedTools />}
      </main>

      <Footer />

      {isSettingsOpen && (
        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onSave={handleSettingsSave}
          currentSettings={settings}
        />
      )}

      <PWAInstallPrompt />
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
