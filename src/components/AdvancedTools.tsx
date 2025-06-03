
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Activity, Shield, Search, Network, Eye, Lock, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdvancedTool {
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}

const AdvancedTools = () => {
  const { t } = useLanguage();
  
  const tools: AdvancedTool[] = [
    {
      titleKey: "advanced.global-latency",
      descriptionKey: "advanced.global-latency-desc",
      icon: <Activity className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1} />
    },
    {
      titleKey: "advanced.mtr",
      descriptionKey: "advanced.mtr-desc",
      icon: <Network className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1} />
    },
    {
      titleKey: "advanced.rule",
      descriptionKey: "advanced.rule-desc",
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1} />
    },
    {
      titleKey: "advanced.dns-resolution",
      descriptionKey: "advanced.dns-resolution-desc",
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1} />
    },
    {
      titleKey: "advanced.censorship",
      descriptionKey: "advanced.censorship-desc",
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1} />
    },
    {
      titleKey: "advanced.whois",
      descriptionKey: "advanced.whois-desc",
      icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1} />
    },
    {
      titleKey: "advanced.mac",
      descriptionKey: "advanced.mac-desc",
      icon: <Network className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1} />
    },
    {
      titleKey: "advanced.browser",
      descriptionKey: "advanced.browser-desc",
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1} />
    },
    {
      titleKey: "advanced.security",
      descriptionKey: "advanced.security-desc",
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1} />
    },
    {
      titleKey: "advanced.invisibility",
      descriptionKey: "advanced.invisibility-desc",
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1} />
    }
  ];

  const handleToolClick = (toolTitleKey: string) => {
    console.log(`Opening tool: ${t(toolTitleKey)}`);
    // Here you would implement the specific tool functionality
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Settings className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300" strokeWidth={1} />
          <h1 className="text-2xl sm:text-4xl font-bold text-white">{t('advanced.title')}</h1>
        </div>
        <p className="text-gray-300 max-w-4xl mx-auto text-sm sm:text-base px-4">
          {t('advanced.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
        {tools.map((tool, index) => (
          <Card 
            key={index} 
            className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            onClick={() => handleToolClick(tool.titleKey)}
          >
            <CardHeader className="text-center pb-3">
              <div className="text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300 flex justify-center mb-3">
                {tool.icon}
              </div>
              <CardTitle className="text-white text-sm sm:text-lg group-hover:text-blue-300 transition-colors leading-tight">
                {t(tool.titleKey)}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t(tool.descriptionKey)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdvancedTools;
