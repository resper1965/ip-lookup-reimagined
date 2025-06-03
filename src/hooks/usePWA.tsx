
import { useState, useEffect } from 'react';

interface PWAPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  const [promptEvent, setPromptEvent] = useState<PWAPromptEvent | null>(null);

  useEffect(() => {
    // Verificar se está rodando como PWA
    const checkPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      setIsPWA(isStandalone || isIOSStandalone);
    };

    checkPWA();

    // Listener para o evento de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setIsInstallable(true);
      setPromptEvent(e as PWAPromptEvent);
    };

    // Listener para quando a app é instalada
    const handleAppInstalled = () => {
      setIsInstallable(false);
      setPromptEvent(null);
      setIsPWA(true);
      console.log('PWA foi instalada');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    if (!promptEvent) return;

    try {
      await promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou instalar a PWA');
      } else {
        console.log('Usuário recusou instalar a PWA');
      }
      
      setPromptEvent(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('Erro ao instalar PWA:', error);
    }
  };

  return {
    isInstallable,
    isPWA,
    installPWA
  };
};
