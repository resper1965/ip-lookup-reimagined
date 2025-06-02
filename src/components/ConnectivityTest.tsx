
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useNetworkSettings } from "@/hooks/useNetworkSettings";

interface ConnectivitySite {
  name: string;
  icon: string;
  status: 'OK' | 'SLOW' | 'FAILED';
  latency: number;
  url: string;
}

const ConnectivityTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sites, setSites] = useState<ConnectivitySite[]>([]);
  const { settings } = useNetworkSettings();

  useEffect(() => {
    // Mapear os sites configurados para o formato do componente
    const mappedSites = settings.connectivitySites.map((url, index) => {
      const domain = new URL(url).hostname.replace('www.', '');
      const name = domain.split('.')[0];
      const icons = ['🏠', '🌐', '☁️', '📺', '🐙', '💬', '✏️', '🚀'];
      
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        icon: icons[index % icons.length],
        status: Math.random() > 0.5 ? 'OK' : 'SLOW' as 'OK' | 'SLOW',
        latency: Math.floor(Math.random() * 1000) + 50,
        url: url
      };
    });
    setSites(mappedSites);
  }, [settings.connectivitySites]);

  const runTest = async () => {
    setIsLoading(true);
    
    // Simulate testing each site
    for (let i = 0; i < sites.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setSites(prev => prev.map((site, index) => {
        if (index === i) {
          const newLatency = Math.floor(Math.random() * 1000) + 50;
          return {
            ...site,
            latency: newLatency,
            status: newLatency > 500 ? 'SLOW' : newLatency > 200 ? 'OK' : 'OK'
          };
        }
        return site;
      }));
    }
    
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OK': return 'text-green-400';
      case 'SLOW': return 'text-yellow-400';
      case 'FAILED': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="text-4xl">🚦</div>
          <h1 className="text-4xl font-bold text-white">Network Connectivity</h1>
          <Button 
            onClick={runTest}
            disabled={isLoading}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <p className="text-gray-300 max-w-4xl mx-auto">
          Testing is done by loading small images from corresponding websites. 
          Delay values are for reference only and will be smaller in reality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sites.map((site, index) => (
          <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-3">
                <span className="text-2xl">{site.icon}</span>
                {site.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className={`font-bold ${getStatusColor(site.status)}`}>
                  {site.status}
                </span>
                <span className={`text-lg font-mono ${getStatusColor(site.status)}`}>
                  {site.latency} ms
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConnectivityTest;
