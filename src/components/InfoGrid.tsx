
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Zap, Eye, Lock, Server, Activity } from "lucide-react";

interface InfoItem {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

interface InfoGridProps {
  networkData?: {
    timezone?: string;
    speed?: string;
    privacy?: string;
    security?: string;
    server?: string;
    latency?: string;
  };
}

const InfoGrid = ({ networkData }: InfoGridProps) => {
  const infoItems: InfoItem[] = [
    {
      icon: <Clock className="w-6 h-6" strokeWidth={1} />,
      title: "Fuso Horário",
      value: networkData?.timezone || "UTC-3",
      description: "Brasília, São Paulo"
    },
    {
      icon: <Zap className="w-6 h-6" strokeWidth={1} />,
      title: "Velocidade",
      value: networkData?.speed || "Calculando...",
      description: "Download estimado"
    },
    {
      icon: <Eye className="w-6 h-6" strokeWidth={1} />,
      title: "Privacidade",
      value: networkData?.privacy || "Médio",
      description: "Nível de exposição"
    },
    {
      icon: <Lock className="w-6 h-6" strokeWidth={1} />,
      title: "Segurança",
      value: networkData?.security || "Alta",
      description: "Protocolo HTTPS"
    },
    {
      icon: <Server className="w-6 h-6" strokeWidth={1} />,
      title: "Servidor",
      value: networkData?.server || "Detectando...",
      description: "Servidor mais próximo"
    },
    {
      icon: <Activity className="w-6 h-6" strokeWidth={1} />,
      title: "Latência",
      value: networkData?.latency || "Medindo...",
      description: "Tempo de resposta"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
      {infoItems.map((item, index) => (
        <Card 
          key={index} 
          className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>
              <CardTitle className="text-sm font-medium text-gray-200">
                {item.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {item.value}
            </div>
            <div className="text-xs text-gray-400">
              {item.description}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InfoGrid;
