
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, MapPin, Globe, Shield } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DNSTest {
  id: number;
  endpoint: string;
  isp: string;
  region: string;
}

const DNSLeakTest = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [tests] = useState<DNSTest[]>([
    {
      id: 1,
      endpoint: '172.217.35.20',
      isp: 'Google LLC',
      region: 'Brazil 🇧🇷'
    },
    {
      id: 2,
      endpoint: '172.69.10.90',
      isp: 'Cloudflare, Inc.',
      region: 'Brazil 🇧🇷'
    },
    {
      id: 3,
      endpoint: '172.253.233.20',
      isp: 'Google LLC',
      region: 'Brazil 🇧🇷'
    },
    {
      id: 4,
      endpoint: '172.69.10.212',
      isp: 'CloudFlare Inc.',
      region: 'Brazil 🇧🇷'
    }
  ]);

  const runTest = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300" strokeWidth={1} />
          <h1 className="text-2xl sm:text-4xl font-bold text-white">{t('dns.title')}</h1>
          <Button 
            onClick={runTest}
            disabled={isLoading}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} strokeWidth={1} />
          </Button>
        </div>
        <div className="text-gray-300 max-w-4xl mx-auto space-y-4 text-sm sm:text-base px-4">
          <p>{t('dns.description1')}</p>
          <p>{t('dns.description2')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
        {tests.map((test) => (
          <Card key={test.id} className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-3 text-base sm:text-lg">
                <div className="text-xl sm:text-2xl">🌐</div>
                {t('dns.test')} {test.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-green-400 text-sm break-all">
                {t('dns.endpoint')}: {test.endpoint}
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-green-300">
                  <Globe className="w-4 h-4 text-gray-300 flex-shrink-0" strokeWidth={1} />
                  <span className="text-xs sm:text-sm">{t('dns.isp')}: {test.isp}</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <MapPin className="w-4 h-4 text-gray-300 flex-shrink-0" strokeWidth={1} />
                  <span className="text-xs sm:text-sm">{t('dns.region')}: {test.region}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DNSLeakTest;
