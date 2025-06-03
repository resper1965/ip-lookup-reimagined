
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wifi, Signal, Router, Gauge } from "lucide-react";

interface NetworkStatsProps {
  stats?: {
    downloadSpeed?: number;
    uploadSpeed?: number;
    ping?: number;
    jitter?: number;
    packetLoss?: number;
    signalStrength?: number;
  };
}

const NetworkStats = ({ stats }: NetworkStatsProps) => {
  const downloadSpeed = stats?.downloadSpeed || 0;
  const uploadSpeed = stats?.uploadSpeed || 0;
  const ping = stats?.ping || 0;
  const signalStrength = stats?.signalStrength || 85;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gauge className="w-6 h-6 text-gray-300" strokeWidth={1} />
            Estatísticas de Rede
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Download</span>
                <span className="text-white font-bold">{downloadSpeed.toFixed(1)} Mbps</span>
              </div>
              <Progress value={(downloadSpeed / 100) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Upload</span>
                <span className="text-white font-bold">{uploadSpeed.toFixed(1)} Mbps</span>
              </div>
              <Progress value={(uploadSpeed / 50) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Ping</span>
                <span className="text-white font-bold">{ping} ms</span>
              </div>
              <Progress value={Math.max(0, 100 - ping)} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Sinal</span>
                <span className="text-white font-bold">{signalStrength}%</span>
              </div>
              <Progress value={signalStrength} className="h-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center space-x-3 text-gray-200">
              <Wifi className="w-5 h-5 text-gray-300" strokeWidth={1} />
              <div>
                <div className="text-sm">Tipo de Conexão</div>
                <div className="text-xs text-gray-400">Banda Larga</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-gray-200">
              <Signal className="w-5 h-5 text-gray-300" strokeWidth={1} />
              <div>
                <div className="text-sm">Qualidade</div>
                <div className="text-xs text-gray-400">Excelente</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-gray-200">
              <Router className="w-5 h-5 text-gray-300" strokeWidth={1} />
              <div>
                <div className="text-sm">Protocolo</div>
                <div className="text-xs text-gray-400">IPv4 / IPv6</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkStats;
