
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Wifi, Shield } from "lucide-react";

interface IPCardProps {
  ip: string;
  location: string;
  isp: string;
  type: string;
}

const IPCard = ({ ip, location, isp, type }: IPCardProps) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Seu IP</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-blue-200 mb-2">
            {ip}
          </div>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-400/30">
            {type}
          </Badge>
        </div>
        
        <div className="space-y-3 pt-4">
          <div className="flex items-center space-x-3 text-gray-200">
            <MapPin className="w-5 h-5 text-blue-400" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-200">
            <Wifi className="w-5 h-5 text-purple-400" />
            <span className="text-sm">{isp}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-200">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm">Conexão Segura</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPCard;
