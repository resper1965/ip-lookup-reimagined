
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Network, LogOut, Save, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNetworkSettings } from '@/hooks/useNetworkSettings';
import LoginPage from './LoginPage';

interface AdminPanelProps {
  onBackToApp?: () => void;
}

const AdminPanel = ({ onBackToApp }: AdminPanelProps) => {
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const { settings, updateSettings } = useNetworkSettings();
  
  const [connectivityText, setConnectivityText] = useState('');
  const [stunText, setStunText] = useState('');

  // Update text areas when settings change
  useEffect(() => {
    setConnectivityText(settings.connectivitySites.join('\n'));
    setStunText(settings.stunServers.join('\n'));
    console.log('AdminPanel: Settings loaded:', settings);
  }, [settings]);

  const handleSaveNetworkSettings = () => {
    const newConnectivitySites = connectivityText
      .split('\n')
      .filter(site => site.trim())
      .map(site => site.trim());
    
    const newStunServers = stunText
      .split('\n')
      .filter(server => server.trim())
      .map(server => server.trim());

    const newSettings = {
      connectivitySites: newConnectivitySites,
      stunServers: newStunServers
    };

    updateSettings(newSettings);
    console.log('AdminPanel: Saving settings:', newSettings);

    toast({
      title: "Configurações salvas!",
      description: "As configurações de rede foram atualizadas com sucesso.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema.",
    });
  };

  const handleBackToApp = () => {
    if (onBackToApp) {
      onBackToApp();
    } else {
      // Recarregar a página para voltar à aplicação principal
      window.location.reload();
    }
  };

  // Se não estiver autenticado, mostrar a página de login
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-700/5 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-brand-cyan" />
            <h1 className="text-2xl font-bold text-white">n.Network - Painel Administrativo</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleBackToApp}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Aplicação
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Tabs defaultValue="network" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="network" className="data-[state=active]:bg-white/20">
              <Network className="w-4 h-4 mr-2" />
              Configurações de Rede
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-white/20">
              <Settings className="w-4 h-4 mr-2" />
              Ferramentas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Network className="w-5 h-5 text-brand-cyan" />
                  Configurações de Conectividade e WebRTC
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="connectivity-sites" className="text-white">
                    Sites para Teste de Conectividade (um por linha)
                  </Label>
                  <Textarea
                    id="connectivity-sites"
                    value={connectivityText}
                    onChange={(e) => setConnectivityText(e.target.value)}
                    placeholder="https://www.google.com"
                    className="min-h-[120px] bg-white/10 border-white/20 text-white"
                  />
                  <p className="text-sm text-gray-400">
                    Sites usados para testar conectividade de rede
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="stun-servers" className="text-white">
                    Servidores STUN para WebRTC (um por linha)
                  </Label>
                  <Textarea
                    id="stun-servers"
                    value={stunText}
                    onChange={(e) => setStunText(e.target.value)}
                    placeholder="stun:stun.l.google.com:19302"
                    className="min-h-[120px] bg-white/10 border-white/20 text-white"
                  />
                  <p className="text-sm text-gray-400">
                    Servidores STUN são usados para detecção de NAT e obtenção de IP público via WebRTC
                  </p>
                </div>

                <Button
                  onClick={handleSaveNetworkSettings}
                  className="bg-brand-cyan hover:bg-brand-cyan/90 text-gray-900"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Status do Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-300">
                    <p>Sites Configurados: {settings.connectivitySites.length}</p>
                    <p>Servidores STUN: {settings.stunServers.length}</p>
                    <p>Status: <span className="text-green-400">Online</span></p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Configurações Ativas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>Última atualização: Agora</p>
                    <p>Modo de teste: Ativo</p>
                    <p>Logs: Habilitados</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full text-white border-white/20">
                      Reiniciar Testes
                    </Button>
                    <Button size="sm" variant="outline" className="w-full text-white border-white/20">
                      Limpar Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
