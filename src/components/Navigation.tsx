
import { Button } from '@/components/ui/button';
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import { Settings, Globe, Link, Video, Search, Zap, Wrench } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSettingsClick: () => void;
  onAdminClick: () => void;
}

const Navigation = ({ activeTab, onTabChange, onSettingsClick }: NavigationProps) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'ip-infos', label: t('nav.ip-infos'), Icon: Globe },
    { id: 'connectivity', label: t('nav.connectivity'), Icon: Link },
    { id: 'webrtc', label: t('nav.webrtc'), Icon: Video },
    { id: 'dns-leak', label: t('nav.dns-leak'), Icon: Search },
    { id: 'speed-test', label: t('nav.speed-test'), Icon: Zap },
    { id: 'advanced', label: t('nav.advanced'), Icon: Wrench }
  ];

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Menu centralizado - desktop */}
          <div className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-xs ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <tab.Icon className="w-4 h-4 mr-1" strokeWidth={1} />
                {tab.label}
              </Button>
            ))}
          </div>
          
          {/* Botões da direita */}
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsClick}
              className="text-gray-300 hover:text-white hover:bg-slate-700"
            >
              <Settings className="w-4 h-4" strokeWidth={1} />
            </Button>
          </div>
        </div>
        
        {/* Menu mobile */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-3 gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={`px-2 py-2 text-xs ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <tab.Icon className="w-4 h-4 mr-0.5" strokeWidth={1} />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
