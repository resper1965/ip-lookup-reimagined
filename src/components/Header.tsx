
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const Header = ({ onRefresh, isLoading }: HeaderProps) => {
  return (
    <div className="text-center space-y-6 mb-12">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          MyIP
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Descubra informações detalhadas sobre seu endereço IP, localização e conexão de internet
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button 
          onClick={onRefresh}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar Informações
        </Button>
        
        <Button 
          variant="outline" 
          className="border-white/20 text-white hover:bg-white/10 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Dados
        </Button>
      </div>
    </div>
  );
};

export default Header;
