
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePWA } from "@/hooks/usePWA";
import { useState } from "react";

const PWAInstallPrompt = () => {
  const { isInstallable, installPWA } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-gradient-to-r from-brand-cyan/10 to-blue-600/10 border border-brand-cyan/20 backdrop-blur-sm z-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-5 h-5 text-brand-cyan" />
              <h3 className="text-white font-semibold text-sm">Instalar n.Network</h3>
            </div>
            <p className="text-gray-300 text-xs mb-3">
              Instale nossa app para acesso rápido e funcionalidades offline.
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={installPWA}
                size="sm" 
                className="bg-brand-cyan hover:bg-brand-cyan/80 text-white text-xs px-3 py-1 h-7"
              >
                Instalar
              </Button>
              <Button 
                onClick={() => setIsDismissed(true)}
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:text-white text-xs px-3 py-1 h-7"
              >
                Mais tarde
              </Button>
            </div>
          </div>
          <Button
            onClick={() => setIsDismissed(true)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white p-1 h-6 w-6"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PWAInstallPrompt;
