
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import IPCard from "@/components/IPCard";
import InfoGrid from "@/components/InfoGrid";

const Index = () => {
  const [ipData, setIpData] = useState({
    ip: "192.168.1.1",
    location: "São Paulo, Brasil",
    isp: "Vivo Telecomunicações",
    type: "IPv4"
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchIPData = async () => {
    setIsLoading(true);
    try {
      // Simulating API call - in real app, you would call an IP geolocation service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data - replace with actual API call
      const mockData = {
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        location: "São Paulo, Brasil",
        isp: "Vivo Telecomunicações",
        type: "IPv4"
      };
      
      setIpData(mockData);
      
      toast({
        title: "Informações atualizadas!",
        description: "Dados do IP foram carregados com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível obter as informações do IP.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIPData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Header onRefresh={fetchIPData} isLoading={isLoading} />
        
        <div className="space-y-12">
          <div className="flex justify-center">
            <IPCard {...ipData} />
          </div>
          
          <InfoGrid />
        </div>
        
        <footer className="text-center mt-16 text-gray-400 text-sm">
          <p>© 2024 MyIP - Informações de rede em tempo real</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
