
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: SettingsData) => void;
  currentSettings?: SettingsData;
}

export interface SettingsData {
  stunServers: string[];
  connectivitySites: string[];
}

const SettingsModal = ({ isOpen, onClose, onSave, currentSettings }: SettingsModalProps) => {
  const [stunServers, setStunServers] = useState(
    currentSettings?.stunServers?.join('\n') || 
    'stun:stun.l.google.com:19302\nstun:stun1.l.google.com:19302'
  );
  const [connectivitySites, setConnectivitySites] = useState(
    currentSettings?.connectivitySites?.join('\n') || 
    'https://www.google.com\nhttps://www.cloudflare.com\nhttps://www.microsoft.com'
  );
  const { toast } = useToast();

  const handleSave = () => {
    const stunList = stunServers.split('\n').filter(s => s.trim());
    const sitesList = connectivitySites.split('\n').filter(s => s.trim());

    if (stunList.length === 0 || sitesList.length === 0) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, forneça pelo menos um servidor STUN e um site de conectividade.",
        variant: "destructive",
      });
      return;
    }

    onSave({
      stunServers: stunList,
      connectivitySites: sitesList,
    });

    toast({
      title: "Configurações Salvas",
      description: "As configurações foram atualizadas com sucesso.",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Configurações Avançadas</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label htmlFor="stun-servers" className="text-white">
              Servidores STUN (um por linha)
            </Label>
            <Textarea
              id="stun-servers"
              value={stunServers}
              onChange={(e) => setStunServers(e.target.value)}
              placeholder="stun:stun.l.google.com:19302"
              className="min-h-[120px] bg-white/10 border-white/20 text-white"
            />
            <p className="text-sm text-gray-400">
              Servidores STUN são usados para detecção de NAT e obtenção do IP público via WebRTC
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="connectivity-sites" className="text-white">
              Sites para Teste de Conectividade (um por linha)
            </Label>
            <Textarea
              id="connectivity-sites"
              value={connectivitySites}
              onChange={(e) => setConnectivitySites(e.target.value)}
              placeholder="https://www.google.com"
              className="min-h-[120px] bg-white/10 border-white/20 text-white"
            />
            <p className="text-sm text-gray-400">
              Sites usados para testar a conectividade e velocidade da rede
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose} className="border-white/20 text-white">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
