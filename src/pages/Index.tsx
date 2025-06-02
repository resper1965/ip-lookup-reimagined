
import { useState } from "react";
import Navigation from "@/components/Navigation";
import IPInfos from "@/components/IPInfos";
import ConnectivityTest from "@/components/ConnectivityTest";
import WebRTCTest from "@/components/WebRTCTest";
import DNSLeakTest from "@/components/DNSLeakTest";
import SpeedTest from "@/components/SpeedTest";
import AdvancedTools from "@/components/AdvancedTools";

const Index = () => {
  const [activeTab, setActiveTab] = useState('ip-infos');

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
        return <AdvancedTools />;
      default:
        return <IPInfos />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      <div className="relative z-10">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="container mx-auto px-4 py-12">
          {renderContent()}
        </div>
        
        <footer className="text-center py-8 text-gray-400 text-sm space-y-2 border-t border-white/10">
          <p>© 2024 NetworkInfo - Real-time network analysis</p>
          <p className="text-xs">Tool for detailed connectivity and network information analysis</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
