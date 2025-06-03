
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, MapPin, Network } from "lucide-react";
import { useState, useEffect } from "react";
import { useNetworkSettings } from "@/hooks/useNetworkSettings";
import { useLanguage } from "@/contexts/LanguageContext";

interface WebRTCServer {
  name: string;
  icon: string;
  server: string;
  ip: string;
  natType: string;
  region: string;
}

const WebRTCTest = () => {
  const { t } = useLanguage();
  const [servers, setServers] = useState<WebRTCServer[]>([]);
  const { settings } = useNetworkSettings();

  console.log('WebRTCTest - Current settings:', settings);
  console.log('WebRTCTest - STUN servers:', settings.stunServers);

  const getServerName = (server: string): string => {
    if (server.includes('ionichealthusa.com')) return 'Ionic Health USA';
    if (server.includes('ionichealth.eu')) return 'Ionic Health EU';
    if (server.includes('ionic.health')) return 'Ionic Health BR';
    if (server.includes('google.com')) return 'Google';
    if (server.includes('cloudflare.com')) return 'Cloudflare';
    if (server.includes('nextcloud.com')) return 'Nextcloud';
    if (server.includes('webwormhole.io')) return 'WebWormhole';
    
    const hostname = server.split(':')[1]?.split('.')[0] || 'Unknown';
    return hostname.charAt(0).toUpperCase() + hostname.slice(1);
  };

  const getServerIcon = (server: string): string => {
    if (server.includes('ionichealthusa.com') || server.includes('ionichealth.eu') || server.includes('ionic.health')) {
      return '🏥';
    }
    if (server.includes('google.com')) return '🔍';
    if (server.includes('cloudflare.com')) return '☁️';
    if (server.includes('nextcloud.com')) return '📁';
    if (server.includes('webwormhole.io')) return '🪱';
    return '🌐';
  };

  const sortServersByPriority = (servers: string[]): string[] => {
    const ionicServers = servers.filter(server => 
      server.includes('ionic.health') || 
      server.includes('ionichealthusa.com') || 
      server.includes('ionichealth.eu')
    );
    
    const otherServers = servers.filter(server => 
      !server.includes('ionic.health') && 
      !server.includes('ionichealthusa.com') && 
      !server.includes('ionichealth.eu')
    );

    return [...ionicServers, ...otherServers];
  };

  useEffect(() => {
    console.log('WebRTCTest - useEffect triggered with stunServers:', settings.stunServers);
    
    if (!settings.stunServers || settings.stunServers.length === 0) {
      console.log('WebRTCTest - No STUN servers found');
      setServers([]);
      return;
    }

    // Sort servers to prioritize Ionic Health servers
    const sortedServers = sortServersByPriority(settings.stunServers);
    console.log('WebRTCTest - Sorted servers:', sortedServers);
    
    const mappedServers = sortedServers.map((server, index) => {
      const serverData = {
        name: getServerName(server),
        icon: getServerIcon(server),
        server: server,
        ip: '191.241.242.89', // IP simulado
        natType: 'Port Restricted Cone or Symmetric',
        region: 'Brazil 🇧🇷'
      };
      console.log(`WebRTCTest - Mapped server ${index}:`, serverData);
      return serverData;
    });
    
    console.log('WebRTCTest - Final mapped servers:', mappedServers);
    setServers(mappedServers);
  }, [settings.stunServers]);

  console.log('WebRTCTest - Rendering with servers:', servers);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Network className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300" strokeWidth={1} />
          <h1 className="text-2xl sm:text-4xl font-bold text-white">{t('webrtc.title')}</h1>
        </div>
        <p className="text-gray-300 max-w-4xl mx-auto text-sm sm:text-base px-4">
          {t('webrtc.description')}
        </p>
        <div className="text-white text-sm">
          Debug: {servers.length} servidores carregados
        </div>
      </div>

      {servers.length === 0 ? (
        <div className="text-center text-white">
          <p>Nenhum servidor STUN encontrado. Carregando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
          {servers.map((server, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-3 text-sm sm:text-lg">
                  <span className="text-xl sm:text-2xl">{server.icon}</span>
                  {server.name}
                </CardTitle>
                <div className="text-xs text-gray-400 font-mono break-all">{server.server}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-black/20 p-3 rounded-lg">
                  <div className="text-blue-200 font-mono text-sm sm:text-lg break-all">{server.ip}</div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg space-y-2">
                  <div className="text-green-400 font-medium text-xs sm:text-sm">{t('webrtc.nat')}: {server.natType}</div>
                  <div className="flex items-center gap-2 text-green-300">
                    <MapPin className="w-4 h-4 flex-shrink-0" strokeWidth={1} />
                    <span className="text-xs sm:text-sm">{t('webrtc.region')}: {server.region}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebRTCTest;
