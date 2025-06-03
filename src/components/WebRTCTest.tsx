
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, MapPin, Network } from "lucide-react";
import { useState, useEffect } from "react";
import { useNetworkSettings } from "@/hooks/useNetworkSettings";

interface WebRTCServer {
  name: string;
  icon: string;
  server: string;
  ip: string;
  natType: string;
  region: string;
}

const WebRTCTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [servers, setServers] = useState<WebRTCServer[]>([]);
  const { settings } = useNetworkSettings();

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

  useEffect(() => {
    // Mapear os servidores STUN configurados para o formato do componente
    const mappedServers = settings.stunServers.map((server, index) => {
      return {
        name: getServerName(server),
        icon: '🌐',
        server: server,
        ip: '191.241.242.89', // IP simulado
        natType: 'Port Restricted Cone or Symmetric',
        region: 'Brazil 🇧🇷'
      };
    });
    setServers(mappedServers);
  }, [settings.stunServers]);

  const runTest = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Network className="w-12 h-12 text-gray-300" strokeWidth={1} />
          <h1 className="text-4xl font-bold text-white">WebRTC Test</h1>
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
        <p className="text-gray-300 max-w-4xl mx-auto">
          WebRTC often establishes connections directly via UDP. If the test returns your real IP, 
          it means your proxy settings do not cover these connections. In addition to detecting the IP 
          you use when connecting to WebRTC, we also detect your NAT type. However, NAT type detection 
          is not 100% accurate and is for reference only.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servers.map((server, index) => (
          <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-3">
                <span className="text-2xl">{server.icon}</span>
                {server.name}
              </CardTitle>
              <div className="text-xs text-gray-400 font-mono">{server.server}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-blue-200 font-mono text-lg">{server.ip}</div>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg space-y-2">
                <div className="text-green-400 font-medium">NAT: {server.natType}</div>
                <div className="flex items-center gap-2 text-green-300">
                  <MapPin className="w-4 h-4" strokeWidth={1} />
                  <span className="text-sm">Region: {server.region}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WebRTCTest;
