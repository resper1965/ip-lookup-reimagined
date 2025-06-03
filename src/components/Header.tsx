
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Settings, Globe } from "lucide-react";

interface HeaderProps {
  onRefresh: () => void;
  onSettings?: () => void;
  isLoading: boolean;
}

const Header = ({ onRefresh, onSettings, isLoading }: HeaderProps) => {
  return (
    <div className="text-center space-y-8 mb-16">
      <div className="space-y-6">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Globe className="w-8 h-8 text-white" strokeWidth={1} />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            NetworkInfo
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Descubra informações detalhadas sobre seu endereço IP, localização, velocidade de conexão e configurações de rede em tempo real
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button 
          onClick={onRefresh}
          disabled={isLoading}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} strokeWidth={1} />
          {isLoading ? 'Atualizando...' : 'Atualizar Informações'}
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <Download className="w-5 h-5 mr-2" strokeWidth={1} />
          Exportar Relatório
        </Button>

        {onSettings && (
          <Button 
            onClick={onSettings}
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            <Settings className="w-5 h-5 mr-2" strokeWidth={1} />
            Configurações
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
