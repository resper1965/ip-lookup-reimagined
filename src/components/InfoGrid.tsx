
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Zap, Eye, Lock } from "lucide-react";

interface InfoItem {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const InfoGrid = () => {
  const infoItems: InfoItem[] = [
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      title: "Timezone",
      value: "UTC-3",
      description: "Brasília, São Paulo"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Velocidade",
      value: "100 Mbps",
      description: "Download estimado"
    },
    {
      icon: <Eye className="w-6 h-6 text-purple-400" />,
      title: "Privacidade",
      value: "Médio",
      description: "Nível de exposição"
    },
    {
      icon: <Lock className="w-6 h-6 text-green-400" />,
      title: "Segurança",
      value: "Alta",
      description: "Protocolo HTTPS"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto">
      {infoItems.map((item, index) => (
        <Card 
          key={index} 
          className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              {item.icon}
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
