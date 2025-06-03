
import { useState } from "react";
import { Globe, Wifi, Activity, Shield, Zap, Settings } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    {
      id: 'ip-infos',
      label: 'IP Infos',
      icon: Globe
    }, 
    {
      id: 'connectivity',
      label: 'Connectivity',
      icon: Wifi
    }, 
    {
      id: 'webrtc',
      label: 'WebRTC Test',
      icon: Activity
    }, 
    {
      id: 'dns-leak',
      label: 'DNS Leak Test',
      icon: Shield
    }, 
    {
      id: 'speed-test',
      label: 'Speed Test',
      icon: Zap
    }, 
    {
      id: 'advanced',
      label: 'Advanced Tools',
      icon: Settings
    }
  ];

  return (
    <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50 font-montserrat">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-1 py-3 overflow-x-auto rounded">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button 
                key={tab.id} 
                onClick={() => onTabChange(tab.id)} 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap font-montserrat ${
                  activeTab === tab.id 
                    ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
