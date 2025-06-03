
import { Button } from '@/components/ui/button';
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from './LanguageSelector';
import { Settings, Shield } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSettingsClick: () => void;
  onAdminClick: () => void;
}

const Navigation = ({ activeTab, onTabChange, onSettingsClick, onAdminClick }: NavigationProps) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'ip-infos', label: t('nav.ip-infos'), icon: '🌐' },
    { id: 'connectivity', label: t('nav.connectivity'), icon: '🔗' },
    { id: 'webrtc', label: t('nav.webrtc'), icon: '📹' },
    { id: 'dns-leak', label: t('nav.dns-leak'), icon: '🔍' },
    { id: 'speed-test', label: t('nav.speed-test'), icon: '⚡' },
    { id: 'advanced', label: t('nav.advanced'), icon: '🛠️' }
  ];

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-white">n.Network</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsClick}
              className="text-gray-300 hover:text-white hover:bg-slate-700"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="text-gray-300 hover:text-white hover:bg-slate-700"
            >
              <Shield className="w-4 h-4 mr-1" />
              Admin
            </Button>
          </div>
        </div>
        
        {/* Menu below the header */}
        <div className="pb-4">
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-sm ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </Button>
            ))}
          </div>
          
          {/* Mobile navigation */}
          <div className="md:hidden">
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
                  <span className="mr-1">{tab.icon}</span>
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
