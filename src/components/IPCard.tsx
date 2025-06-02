
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Wifi, Shield, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface IPCardProps {
  ip: string;
  location: string;
  isp: string;
  type: string;
  country?: string;
  region?: string;
  city?: string;
}

const IPCard = ({ ip, location, isp, type, country, region, city }: IPCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      toast({
        title: "IP Copiado!",
        description: "Endereço IP copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o IP.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500 hover:scale-105">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <Globe className="w-10 h-10 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Seu Endereço IP</CardTitle>
        <p className="text-gray-300 text-sm">Informações da sua conexão</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="text-3xl font-mono font-bold text-blue-200 bg-black/20 px-4 py-2 rounded-lg">
              {ip}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
              className="text-white hover:bg-white/10"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-400/30">
            {type}
          </Badge>
        </div>
        
        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-3 text-gray-200 bg-white/5 p-3 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium">{location}</div>
              {city && region && (
                <div className="text-xs text-gray-400">{city}, {region}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-200 bg-white/5 p-3 rounded-lg">
            <Wifi className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium">Provedor</div>
              <div className="text-xs text-gray-400">{isp}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-200 bg-white/5 p-3 rounded-lg">
            <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium">Status de Segurança</div>
              <div className="text-xs text-gray-400">Conexão Protegida</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPCard;
