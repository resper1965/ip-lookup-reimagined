
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(username, password);
    
    if (success) {
      toast({
        title: "Login successful!",
        description: "Welcome to the administrative panel.",
      });
    } else {
      toast({
        title: "Authentication error",
        description: "Incorrect username or password.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleBackToApp = () => {
    // Recarregar a página para voltar à aplicação principal
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 relative overflow-hidden flex items-center justify-center font-montserrat">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-700/5 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Back button */}
      <Button
        onClick={handleBackToApp}
        variant="ghost"
        className="absolute top-6 left-6 text-white hover:bg-white/10 z-50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1} />
        Back to Application
      </Button>

      {/* Language selector */}
      <div className="absolute top-6 right-6">
        <select className="bg-brand-cyan text-gray-900 px-4 py-2 rounded-lg text-sm font-medium font-montserrat">
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 font-montserrat">
              n.Network
            </h1>
            <p className="text-gray-400 text-sm font-montserrat">Administrative Access</p>
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
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center">
              <a href="#" className="text-brand-cyan hover:text-brand-cyan/80 text-sm transition-colors font-montserrat">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>

        {/* Hint */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p className="font-montserrat">Username: pentestAdmin | Password: admin123</p>
        </div>

        {/* Developer credit */}
        <div className="text-center mt-8 text-gray-500 text-xs">
          <p className="font-montserrat">
            powered by{' '}
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
