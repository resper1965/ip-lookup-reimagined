
import { useState } from "react";
import { Globe, Wifi, Activity, Shield, Zap, Settings, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSettingsClick: () => void;
}

const Navigation = ({ activeTab, onTabChange, onSettingsClick }: NavigationProps) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: 'ip-infos',
      label: t('nav.ip-infos'),
      icon: Globe
    }, 
    {
      id: 'connectivity',
      label: t('nav.connectivity'),
      icon: Wifi
    }, 
    {
      id: 'webrtc',
      label: t('nav.webrtc'),
      icon: Activity
    }, 
    {
      id: 'dns-leak',
      label: t('nav.dns-leak'),
      icon: Shield
    }, 
    {
      id: 'speed-test',
      label: t('nav.speed-test'),
      icon: Zap
    }, 
    {
      id: 'advanced',
      label: t('nav.advanced'),
      icon: Settings
    }
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50 font-montserrat">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between py-3">
          <div className="flex items-center justify-center space-x-1 flex-1">
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
          <div className="flex items-center space-x-3 ml-4">
            <LanguageSelector />
            <button
              onClick={onSettingsClick}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <Settings className="w-4 h-4" strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between py-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1} />
              )}
              <span className="text-sm font-medium">Menu</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <LanguageSelector />
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="pb-4 border-t border-white/10 mt-3 pt-3">
              <div className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button 
                      key={tab.id} 
                      onClick={() => handleTabClick(tab.id)} 
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left font-montserrat ${
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
                
                {/* Settings Button in Mobile Menu */}
                <div className="border-t border-white/10 pt-2 mt-2">
                  <button
                    onClick={() => {
                      onSettingsClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left text-gray-300 hover:bg-white/10 hover:text-white font-montserrat"
                  >
                    <Settings className="w-4 h-4" strokeWidth={1} />
                    <span>Configurações</span>
                  </button>
                  
                  <div className="mt-2 px-4">
                    <LanguageSelector isMobile={true} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
