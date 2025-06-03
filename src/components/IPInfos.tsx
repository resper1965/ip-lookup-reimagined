
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, Wifi, Shield, Copy, CheckCircle, RefreshCw, Activity } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface IPSource {
  name: string;
  ip: string;
  region: string;
  state: string;
  city: string;
  isp: string;
  type: string;
  proxy: string;
  quality: number;
  asn: string;
  failed?: boolean;
}

const IPInfos = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [ipSources] = useState<IPSource[]>([
    {
      name: "IPIP.net",
      ip: "191.241.242.89",
      region: "Brazil 🇧🇷",
      state: "São Paulo",
      city: "São Paulo",
      isp: "America-NET Ltda.",
      type: "Business",
      proxy: "Not a proxy or VPN",
      quality: 100,
      asn: "AS28669"
    },
    {
      name: "Cloudflare IPv4",
      ip: "191.241.242.89",
      region: "Brazil 🇧🇷", 
      state: "São Paulo",
      city: "São Paulo",
      isp: "America-NET Ltda.",
      type: "Business",
      proxy: "Not a proxy or VPN",
      quality: 100,
      asn: "AS28669"
    },
    {
      name: "Cloudflare IPv6",
      ip: "",
      region: "",
      state: "",
      city: "",
      isp: "",
      type: "",
      proxy: "",
      quality: 0,
      asn: "",
      failed: true
    }
  ]);

  const copyToClipboard = async (ip: string, sourceName: string) => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(ip);
      toast({
        title: t('ip.copied'),
        description: t('ip.copy-description').replace('{source}', sourceName),
      });
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      toast({
        title: t('ip.copy-failed'),
        description: t('ip.copy-failed-description'),
        variant: "destructive",
      });
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast({
      title: t('ip.info-updated'),
      description: t('ip.info-updated-description'),
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-white">{t('ip.title')}</h1>
        <p className="text-gray-300 max-w-4xl mx-auto text-sm sm:text-base px-4">
          {t('ip.description')}
        </p>
        <Button 
          onClick={handleRefresh}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} strokeWidth={1} />
          {isLoading ? t('ip.refreshing') : t('ip.refresh')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
        {ipSources.map((source, index) => (
          <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2 text-sm sm:text-base">
                  <div className={`w-3 h-3 rounded-full ${source.failed ? 'bg-red-500' : 'bg-green-500'}`} />
                  {t('ip.source')}: {source.name}
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={handleRefresh}>
                  <RefreshCw className="w-4 h-4" strokeWidth={1} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {source.failed ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-sm sm:text-lg">{t('ip.fetch-failed')}</div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                    <span className="text-blue-200 font-mono text-sm sm:text-lg break-all">{source.ip}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(source.ip, source.name)}
                      className="text-white hover:bg-white/10 flex-shrink-0 ml-2"
                    >
                      {copied === source.ip ? (
                        <CheckCircle className="w-4 h-4 text-green-400" strokeWidth={1} />
                      ) : (
                        <Copy className="w-4 h-4" strokeWidth={1} />
                      )}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-200">
                      <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" strokeWidth={1} />
                      <span className="text-xs sm:text-sm">{t('ip.region')}: {source.region}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-200">
                      <Globe className="w-4 h-4 text-green-400 flex-shrink-0" strokeWidth={1} />
                      <span className="text-xs sm:text-sm">{t('ip.state')}: {source.state}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-200">
                      <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" strokeWidth={1} />
                      <span className="text-xs sm:text-sm">{t('ip.city')}: {source.city}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-200">
                      <Wifi className="w-4 h-4 text-orange-400 flex-shrink-0" strokeWidth={1} />
                      <span className="text-xs sm:text-sm">{t('ip.isp')}: {source.isp}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-200">
                      <Activity className="w-4 h-4 text-cyan-400 flex-shrink-0" strokeWidth={1} />
                      <span className="text-xs sm:text-sm">{t('ip.type')}: {source.type}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-200">
                      <Shield className="w-4 h-4 text-green-400 flex-shrink-0" strokeWidth={1} />
                      <span className="text-xs sm:text-sm">{t('ip.proxy')}: {source.proxy}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-200">{t('ip.quality')}:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${source.quality}%` }}
                          />
                        </div>
                        <span className="text-white font-bold text-xs sm:text-sm">{source.quality}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-200">
                      <Activity className="w-4 h-4 text-pink-400 flex-shrink-0" strokeWidth={1} />
                      <span className="text-xs sm:text-sm">{t('ip.asn')}: {source.asn}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IPInfos;
