
import { useState, useEffect } from 'react';

interface NetworkSettings {
  connectivitySites: string[];
  stunServers: string[];
}

const defaultSettings: NetworkSettings = {
  connectivitySites: [
    'https://www.google.com',
    'https://www.cloudflare.com',
    'https://www.microsoft.com',
    'https://github.com',
    'https://www.youtube.com'
  ],
  stunServers: [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun.cloudflare.com:3478'
  ]
};

export const useNetworkSettings = () => {
  const [settings, setSettings] = useState<NetworkSettings>(defaultSettings);

  useEffect(() => {
    // Carregar configurações do localStorage ao inicializar
    const savedSettings = localStorage.getItem('networkSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: NetworkSettings) => {
    setSettings(newSettings);
    localStorage.setItem('networkSettings', JSON.stringify(newSettings));
  };

  return {
    settings,
    updateSettings
  };
};
