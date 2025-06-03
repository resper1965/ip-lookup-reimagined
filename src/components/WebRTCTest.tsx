
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
  latency: number | null;
  isLoading: boolean;
}

const WebRTCTest = () => {
  const { t } = useLanguage();
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

  const measureLatencyToSTUN = async (stunUrl: string): Promise<number | null> => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      let resolved = false;
      
      try {
        console.log(`Iniciando teste de latência para: ${stunUrl}`);
        
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: stunUrl }],
          iceCandidatePoolSize: 10
        });

        // Timeout mais agressivo
        const timeout = setTimeout(() => {
          if (!resolved) {
            resolved = true;
            console.log(`Timeout para ${stunUrl} após 5 segundos`);
            pc.close();
            resolve(null);
          }
        }, 5000);

        let candidateFound = false;

        pc.onicecandidate = (event) => {
          if (event.candidate && !resolved) {
            const candidate = event.candidate.candidate;
            console.log(`Candidato recebido para ${stunUrl}:`, candidate);
            
            // Qualquer candidato que não seja host é válido para medir latência
            if (candidate.includes('srflx') || candidate.includes('relay') || candidate.includes('prflx')) {
              candidateFound = true;
              resolved = true;
              clearTimeout(timeout);
              const latency = Date.now() - startTime;
              console.log(`Latência medida para ${stunUrl}: ${latency}ms`);
              pc.close();
              resolve(latency);
            }
          }
        };

        pc.onicegatheringstatechange = () => {
          console.log(`Estado de coleta ICE para ${stunUrl}: ${pc.iceGatheringState}`);
          
          if (pc.iceGatheringState === 'complete' && !resolved) {
            resolved = true;
            clearTimeout(timeout);
            const latency = candidateFound ? Date.now() - startTime : null;
            console.log(`Coleta completa para ${stunUrl}, latência: ${latency}ms`);
            pc.close();
            resolve(latency);
          }
        };

        pc.oniceconnectionstatechange = () => {
          console.log(`Estado de conexão ICE para ${stunUrl}: ${pc.iceConnectionState}`);
        };

        // Criar canal de dados para forçar a coleta de candidatos
        const dataChannel = pc.createDataChannel('test');
        
        // Criar oferta
        pc.createOffer({ offerToReceiveAudio: false, offerToReceiveVideo: false })
          .then(offer => {
            console.log(`Oferta criada para ${stunUrl}`);
            return pc.setLocalDescription(offer);
          })
          .then(() => {
            console.log(`Descrição local definida para ${stunUrl}`);
          })
          .catch(error => {
            console.error(`Erro ao criar oferta para ${stunUrl}:`, error);
            if (!resolved) {
              resolved = true;
              clearTimeout(timeout);
              pc.close();
              resolve(null);
            }
          });

      } catch (error) {
        console.error(`Erro geral ao medir latência para ${stunUrl}:`, error);
        resolve(null);
      }
    });
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
        region: 'Brazil 🇧🇷',
        latency: null,
        isLoading: false
      };
    });
    setServers(mappedServers);
  }, [settings.stunServers]);

  const runTest = async () => {
    setIsLoading(true);
    console.log('Iniciando testes de latência WebRTC');
    
    // Marcar todos os servidores como carregando
    setServers(prev => prev.map(server => ({ ...server, isLoading: true, latency: null })));

    // Testar cada servidor
    for (let i = 0; i < servers.length; i++) {
      const server = servers[i];
      console.log(`Testando servidor ${i + 1}/${servers.length}: ${server.name} (${server.server})`);
      
      const latency = await measureLatencyToSTUN(server.server);
      
      setServers(prev => prev.map((s, index) => {
        if (index === i) {
          return { ...s, latency, isLoading: false };
        }
        return s;
      }));

      // Pausa menor entre testes
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log('Todos os testes de latência concluídos');
    setIsLoading(false);
  };

  const getLatencyColor = (latency: number | null) => {
    if (latency === null) return 'text-gray-400';
    if (latency < 100) return 'text-green-400';
    if (latency < 300) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getLatencyStatus = (latency: number | null) => {
    if (latency === null) return 'TIMEOUT';
    if (latency < 100) return 'EXCELENTE';
    if (latency < 300) return 'BOM';
    return 'LENTO';
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Network className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300" strokeWidth={1} />
          <h1 className="text-2xl sm:text-4xl font-bold text-white">{t('webrtc.title')}</h1>
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
        <p className="text-gray-300 max-w-4xl mx-auto text-sm sm:text-base px-4">
          {t('webrtc.description')}
        </p>
      </div>

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
              
              {/* Informações de Latência */}
              <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg space-y-2">
                <div className="text-blue-400 font-medium text-xs sm:text-sm">
                  Latência: {server.isLoading ? (
                    <span className="text-gray-400">Testando...</span>
                  ) : (
                    <span className={getLatencyColor(server.latency)}>
                      {server.latency !== null ? `${server.latency} ms` : 'Timeout'}
                    </span>
                  )}
                </div>
                <div className={`text-xs sm:text-sm font-bold ${getLatencyColor(server.latency)}`}>
                  {server.isLoading ? 'TESTANDO...' : getLatencyStatus(server.latency)}
                </div>
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
    </div>
  );
};

export default WebRTCTest;
