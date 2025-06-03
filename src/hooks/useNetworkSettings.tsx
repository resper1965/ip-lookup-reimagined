
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
    'https://www.youtube.com',
    'https://ionic.health',
    'https://ncommand-lite.ionichealthusa.com'
  ],
  stunServers: [
    'stun:stun.ionichealthusa.com:5349',
    'stun:stun.ionichealth.eu:5349',
    'stun:stun.ionic.health:5349',
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302',
    'stun:stun.cloudflare.com:3478',
    'stun:stun.nextcloud.com:443',
    'stun:relay.webwormhole.io:3478'
  ]
};

export const useNetworkSettings = () => {
  const [settings, setSettings] = useState<NetworkSettings>(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage on initialization
    const savedSettings = localStorage.getItem('networkSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        console.log('Loaded settings from localStorage:', parsed);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'networkSettings' && e.newValue) {
        try {
          const newSettings = JSON.parse(e.newValue);
          setSettings(newSettings);
          console.log('Settings updated from storage event:', newSettings);
        } catch (error) {
          console.error('Error parsing storage change:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateSettings = (newSettings: NetworkSettings) => {
    setSettings(newSettings);
    localStorage.setItem('networkSettings', JSON.stringify(newSettings));
    console.log('Settings updated and saved:', newSettings);
  };

  return {
    settings,
    updateSettings
  };
};
