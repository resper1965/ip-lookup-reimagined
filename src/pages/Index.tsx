
import { useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import IPInfos from "@/components/IPInfos";
import ConnectivityTest from "@/components/ConnectivityTest";
import WebRTCTest from "@/components/WebRTCTest";
import DNSLeakTest from "@/components/DNSLeakTest";
import SpeedTest from "@/components/SpeedTest";
import AdvancedToolsImplemented from "@/components/AdvancedToolsImplemented";
import LoginPage from "@/components/LoginPage";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('ip-infos');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Se o painel administrativo for solicitado mas o usuário não estiver autenticado, mostrar login
  if (showAdminPanel && !isAuthenticated) {
    return <LoginPage />;
  }

  // Se autenticado e painel administrativo solicitado, mostrar painel
  if (showAdminPanel && isAuthenticated) {
    return <AdminPanel />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'ip-infos':
        return <IPInfos />;
      case 'connectivity':
        return <ConnectivityTest />;
      case 'webrtc':
        return <WebRTCTest />;
      case 'dns-leak':
        return <DNSLeakTest />;
      case 'speed-test':
        return <SpeedTest />;
      case 'advanced':
        return <AdvancedToolsImplemented />;
      default:
        return <IPInfos />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 relative overflow-hidden font-montserrat">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-700/5 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <Button
            onClick={() => setShowAdminPanel(true)}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white hover:bg-white/10 z-50"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {renderContent()}
        </div>
        
        <footer className="text-center py-8 text-gray-400 text-sm space-y-2 border-t border-white/10">
          <p>© 2025 n.Network - Real-time network analysis</p>
          <p className="text-xs">Tool for detailed connectivity and network information analysis</p>
          <p className="text-xs mt-4">
            powered by{' '}
            <span className="font-montserrat">
              ness<span className="font-bold text-brand-cyan">.</span>
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
