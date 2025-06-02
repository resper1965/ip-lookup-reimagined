
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(username, password);
    
    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
    } else {
      toast({
        title: "Erro de autenticação",
        description: "Usuário ou senha incorretos.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center font-montserrat">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Language selector */}
      <div className="absolute top-6 right-6">
        <select className="bg-brand-cyan text-gray-900 px-4 py-2 rounded-lg text-sm font-medium font-montserrat">
          <option value="pt">Português</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 font-montserrat">
              nCommand<span className="text-brand-cyan text-sm align-super">+</span>
            </h1>
            <p className="text-gray-400 text-sm font-montserrat">Lite</p>
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="pentestAdmin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-200 border-0 text-gray-900 placeholder-gray-600 rounded-lg px-4 py-3 text-base font-montserrat"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-200 border-0 text-gray-900 placeholder-gray-600 rounded-lg px-4 py-3 text-base font-montserrat"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-cyan hover:bg-brand-cyan/90 text-gray-900 font-medium py-3 rounded-lg text-base transition-colors font-montserrat"
            >
              {isLoading ? 'Entrando...' : 'Login'}
            </Button>

            <div className="text-center">
              <a href="#" className="text-brand-cyan hover:text-brand-cyan/80 text-sm transition-colors font-montserrat">
                Esqueceu sua senha?
              </a>
            </div>
          </form>
        </div>

        {/* Hint */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p className="font-montserrat">Usuário: pentestAdmin | Senha: admin123</p>
        </div>

        {/* Developer credit */}
        <div className="text-center mt-8 text-gray-500 text-xs">
          <p className="font-montserrat">
            Desenvolvido por{' '}
            <span className="font-montserrat">
              ness<span className="font-bold text-brand-cyan">.</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
