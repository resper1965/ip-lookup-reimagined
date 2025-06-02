
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import IPCard from "@/components/IPCard";
import InfoGrid from "@/components/InfoGrid";
import NetworkStats from "@/components/NetworkStats";
import SettingsModal, { SettingsData } from "@/components/SettingsModal";

const Index = () => {
  const [ipData, setIpData] = useState({
    ip: "192.168.1.1",
    location: "São Paulo, Brasil",
    isp: "Provedor de Internet",
    type: "IPv4",
    country: "Brasil",
    region: "São Paulo",
    city: "São Paulo"
  });
  
  const [networkData, setNetworkData] = useState({
    timezone: "UTC-3",
    speed: "Calculando...",
    privacy: "Médio",
    security: "Alta",
    server: "Detectando...",
    latency: "Medindo..."
  });

  const [networkStats, setNetworkStats] = useState({
    downloadSpeed: 0,
    uploadSpeed: 0,
    ping: 0,
    signalStrength: 85
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    stunServers: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
    connectivitySites: ['https://www.google.com', 'https://www.cloudflare.com', 'https://www.microsoft.com']
  });

  const { toast } = useToast();

  const simulateNetworkTest = async () => {
    // Simular teste de velocidade
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      setNetworkStats(prev => ({
        ...prev,
        downloadSpeed: progress * (Math.random() * 100 + 50),
        uploadSpeed: progress * (Math.random() * 50 + 20),
        ping: Math.max(5, 50 - progress * 45 + Math.random() * 10)
      }));
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  const fetchIPData = async () => {
    setIsLoading(true);
    try {
      // Simular chamada de API - substituir por implementação real
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dados simulados - substituir por chamada real de API
      const mockData = {
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        location: "São Paulo, Brasil",
        isp: "Provedor de Internet Brasileiro",
        type: "IPv4",
        country: "Brasil",
        region: "São Paulo", 
        city: "São Paulo"
      };
      
      setIpData(mockData);
      
      // Atualizar dados de rede
      setNetworkData({
        timezone: "UTC-3 (Brasília)",
        speed: "Testando...",
        privacy: "Médio",
        security: "Alta",
        server: "São Paulo, BR",
        latency: "Calculando..."
      });

      // Simular teste de rede
      await simulateNetworkTest();
      
      setNetworkData(prev => ({
        ...prev,
        speed: `${networkStats.downloadSpeed.toFixed(0)} Mbps`,
        latency: `${networkStats.ping.toFixed(0)} ms`
      }));
      
      toast({
        title: "Informações Atualizadas!",
        description: "Dados de rede e IP foram carregados com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao Carregar Dados",
        description: "Não foi possível obter as informações de rede.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsSave = (newSettings: SettingsData) => {
    setSettings(newSettings);
    console.log("Novas configurações:", newSettings);
    // Aqui você implementaria a lógica para usar os novos servidores STUN e sites
  };

  useEffect(() => {
    fetchIPData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Padrão de grid sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Header 
          onRefresh={fetchIPData} 
          onSettings={() => setShowSettings(true)}
          isLoading={isLoading} 
        />
        
        <div className="space-y-16">
          <div className="flex justify-center">
            <IPCard {...ipData} />
          </div>
          
          <InfoGrid networkData={networkData} />
          
          <NetworkStats stats={networkStats} />
        </div>
        
        <footer className="text-center mt-20 text-gray-400 text-sm space-y-2">
          <p>© 2024 NetworkInfo - Análise de rede em tempo real</p>
          <p className="text-xs">Ferramenta para análise detalhada de conectividade e informações de rede</p>
        </footer>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSettingsSave}
        currentSettings={settings}
      />
    </div>
  );
};

export default Index;
