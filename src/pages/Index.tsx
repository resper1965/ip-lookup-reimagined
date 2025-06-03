import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import IPInfo from "@/components/IPInfo";
import Connectivity from "@/components/Connectivity";
import WebRTCTest from "@/components/WebRTCTest";
import DNSLeakTest from "@/components/DNSLeakTest";
import SpeedTest from "@/components/SpeedTest";
import Advanced from "@/components/Advanced";
import LoginPage from "@/components/LoginPage";
import SettingsModal from "@/components/SettingsModal";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('ip-infos');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {isAuthenticated ? (
          <>
            <Navigation 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              onSettingsClick={() => setIsSettingsOpen(true)}
            />
            
            <main className="container mx-auto px-4 py-8">
              {activeTab === 'ip-infos' && <IPInfo />}
              {activeTab === 'connectivity' && <Connectivity />}
              {activeTab === 'webrtc' && <WebRTCTest />}
              {activeTab === 'dns-leak' && <DNSLeakTest />}
              {activeTab === 'speed-test' && <SpeedTest />}
              {activeTab === 'advanced' && <Advanced />}
            </main>

            {isSettingsOpen && (
              <SettingsModal onClose={() => setIsSettingsOpen(false)} />
            )}

            <PWAInstallPrompt />
          </>
        ) : (
          <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
        )}
      </div>
    </LanguageProvider>
  );
};

export default Index;
