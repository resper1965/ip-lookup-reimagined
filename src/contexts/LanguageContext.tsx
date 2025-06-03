
import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'pt-br' | 'es' | 'de' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.ip-infos': 'IP Infos',
    'nav.connectivity': 'Connectivity',
    'nav.webrtc': 'WebRTC Test',
    'nav.dns-leak': 'DNS Leak Test',
    'nav.speed-test': 'Speed Test',
    'nav.advanced': 'Advanced Tools',
    'nav.language': 'Language',
    'footer.copyright': '© 2025 n.Network - Real-time network analysis',
    'footer.description': 'Tool for detailed connectivity and network information analysis',
    'footer.powered': 'powered by',
    'dns.title': 'DNS Leak Test',
    'dns.description1': 'A DNS leak means that when you are connected to a VPN/proxy, your domain name resolutions are still done through your local ISP, thus posing a risk of DNS leaks.',
    'dns.description2': 'The method to test for DNS leaks involves accessing a newly generated domain name to detect which regional DNS exit you are resolving through. If the endpoint region returned matches your local service provider\'s region, there is a risk of DNS leakage. In this case, you may need to modify your VPN/proxy settings.',
    'dns.endpoint': 'DNS Endpoint',
    'dns.isp': 'ISP',
    'dns.region': 'Region',
    'dns.test': 'Test',
    'advanced.title': 'Advanced Tools',
    'advanced.description': 'Tools that are used relatively infrequently, but are very useful when performing network testing.',
    'advanced.global-latency': 'Global Latency Test',
    'advanced.global-latency-desc': 'Global Ping value test',
    'advanced.mtr': 'MTR Test',
    'advanced.mtr-desc': 'Global MTR route test',
    'advanced.rule': 'Rule Test',
    'advanced.rule-desc': 'Check the rule settings of proxy software',
    'advanced.dns-resolution': 'DNS Resolution',
    'advanced.dns-resolution-desc': 'Real-time multi-channel DNS resolution',
    'advanced.censorship': 'Censorship Check',
    'advanced.censorship-desc': 'Check if a website is blocked in some countries',
    'advanced.whois': 'Whois Search',
    'advanced.whois-desc': 'Search for domain/IP registration information',
    'advanced.mac': 'MAC Lookup',
    'advanced.mac-desc': 'Query information of a physical address',
    'advanced.browser': 'Browser Information',
    'advanced.browser-desc': 'Check browser information and fingerprint',
    'advanced.security': 'Security Checklist',
    'advanced.security-desc': 'Guide to securing your digital life',
    'advanced.invisibility': 'Invisibility Test',
    'advanced.invisibility-desc': 'Check if you are using a proxy or VPN'
  },
  'pt-br': {
    'nav.ip-infos': 'Informações IP',
    'nav.connectivity': 'Conectividade',
    'nav.webrtc': 'Teste WebRTC',
    'nav.dns-leak': 'Teste DNS Leak',
    'nav.speed-test': 'Teste de Velocidade',
    'nav.advanced': 'Ferramentas Avançadas',
    'nav.language': 'Idioma',
    'footer.copyright': '© 2025 n.Network - Análise de rede em tempo real',
    'footer.description': 'Ferramenta para análise detalhada de conectividade e informações de rede',
    'footer.powered': 'desenvolvido por',
    'dns.title': 'Teste de Vazamento DNS',
    'dns.description1': 'Um vazamento DNS significa que quando você está conectado a uma VPN/proxy, suas resoluções de nome de domínio ainda são feitas através do seu ISP local, representando um risco de vazamentos DNS.',
    'dns.description2': 'O método para testar vazamentos DNS envolve acessar um nome de domínio recém-gerado para detectar através de qual saída DNS regional você está resolvendo. Se a região do endpoint retornada corresponder à região do seu provedor de serviços local, há risco de vazamento DNS. Neste caso, você pode precisar modificar suas configurações de VPN/proxy.',
    'dns.endpoint': 'Endpoint DNS',
    'dns.isp': 'ISP',
    'dns.region': 'Região',
    'dns.test': 'Teste',
    'advanced.title': 'Ferramentas Avançadas',
    'advanced.description': 'Ferramentas que são usadas com pouca frequência, mas são muito úteis ao realizar testes de rede.',
    'advanced.global-latency': 'Teste de Latência Global',
    'advanced.global-latency-desc': 'Teste de valor de Ping global',
    'advanced.mtr': 'Teste MTR',
    'advanced.mtr-desc': 'Teste de rota MTR global',
    'advanced.rule': 'Teste de Regras',
    'advanced.rule-desc': 'Verificar as configurações de regras do software proxy',
    'advanced.dns-resolution': 'Resolução DNS',
    'advanced.dns-resolution-desc': 'Resolução DNS multi-canal em tempo real',
    'advanced.censorship': 'Verificação de Censura',
    'advanced.censorship-desc': 'Verificar se um site está bloqueado em alguns países',
    'advanced.whois': 'Pesquisa Whois',
    'advanced.whois-desc': 'Pesquisar informações de registro de domínio/IP',
    'advanced.mac': 'Consulta MAC',
    'advanced.mac-desc': 'Consultar informações de um endereço físico',
    'advanced.browser': 'Informações do Navegador',
    'advanced.browser-desc': 'Verificar informações e impressão digital do navegador',
    'advanced.security': 'Lista de Verificação de Segurança',
    'advanced.security-desc': 'Guia para proteger sua vida digital',
    'advanced.invisibility': 'Teste de Invisibilidade',
    'advanced.invisibility-desc': 'Verificar se você está usando proxy ou VPN'
  },
  es: {
    'nav.ip-infos': 'Información IP',
    'nav.connectivity': 'Conectividad',
    'nav.webrtc': 'Prueba WebRTC',
    'nav.dns-leak': 'Prueba Fuga DNS',
    'nav.speed-test': 'Prueba de Velocidad',
    'nav.advanced': 'Herramientas Avanzadas',
    'nav.language': 'Idioma',
    'footer.copyright': '© 2025 n.Network - Análisis de red en tiempo real',
    'footer.description': 'Herramienta para análisis detallado de conectividad e información de red',
    'footer.powered': 'desarrollado por',
    'dns.title': 'Prueba de Fuga DNS',
    'dns.description1': 'Una fuga DNS significa que cuando estás conectado a una VPN/proxy, tus resoluciones de nombres de dominio aún se realizan a través de tu ISP local, representando un riesgo de fugas DNS.',
    'dns.description2': 'El método para probar fugas DNS implica acceder a un nombre de dominio recién generado para detectar a través de qué salida DNS regional estás resolviendo. Si la región del endpoint devuelta coincide con la región de tu proveedor de servicios local, existe riesgo de fuga DNS. En este caso, es posible que necesites modificar tu configuración de VPN/proxy.',
    'dns.endpoint': 'Endpoint DNS',
    'dns.isp': 'ISP',
    'dns.region': 'Región',
    'dns.test': 'Prueba',
    'advanced.title': 'Herramientas Avanzadas',
    'advanced.description': 'Herramientas que se usan con poca frecuencia, pero son muy útiles al realizar pruebas de red.',
    'advanced.global-latency': 'Prueba de Latencia Global',
    'advanced.global-latency-desc': 'Prueba de valor de Ping global',
    'advanced.mtr': 'Prueba MTR',
    'advanced.mtr-desc': 'Prueba de ruta MTR global',
    'advanced.rule': 'Prueba de Reglas',
    'advanced.rule-desc': 'Verificar la configuración de reglas del software proxy',
    'advanced.dns-resolution': 'Resolución DNS',
    'advanced.dns-resolution-desc': 'Resolución DNS multicanal en tiempo real',
    'advanced.censorship': 'Verificación de Censura',
    'advanced.censorship-desc': 'Verificar si un sitio web está bloqueado en algunos países',
    'advanced.whois': 'Búsqueda Whois',
    'advanced.whois-desc': 'Buscar información de registro de dominio/IP',
    'advanced.mac': 'Consulta MAC',
    'advanced.mac-desc': 'Consultar información de una dirección física',
    'advanced.browser': 'Información del Navegador',
    'advanced.browser-desc': 'Verificar información y huella digital del navegador',
    'advanced.security': 'Lista de Verificación de Seguridad',
    'advanced.security-desc': 'Guía para asegurar tu vida digital',
    'advanced.invisibility': 'Prueba de Invisibilidad',
    'advanced.invisibility-desc': 'Verificar si estás usando proxy o VPN'
  },
  de: {
    'nav.ip-infos': 'IP-Informationen',
    'nav.connectivity': 'Konnektivität',
    'nav.webrtc': 'WebRTC-Test',
    'nav.dns-leak': 'DNS-Leak-Test',
    'nav.speed-test': 'Geschwindigkeitstest',
    'nav.advanced': 'Erweiterte Tools',
    'nav.language': 'Sprache',
    'footer.copyright': '© 2025 n.Network - Echtzeit-Netzwerkanalyse',
    'footer.description': 'Tool für detaillierte Konnektivitäts- und Netzwerkinformationsanalyse',
    'footer.powered': 'powered by',
    'dns.title': 'DNS-Leak-Test',
    'dns.description1': 'Ein DNS-Leak bedeutet, dass wenn Sie mit einem VPN/Proxy verbunden sind, Ihre Domain-Namen-Auflösungen immer noch über Ihren lokalen ISP durchgeführt werden, was ein Risiko für DNS-Leaks darstellt.',
    'dns.description2': 'Die Methode zum Testen von DNS-Leaks beinhaltet den Zugriff auf einen neu generierten Domain-Namen, um zu erkennen, über welchen regionalen DNS-Ausgang Sie auflösen. Wenn die zurückgegebene Endpoint-Region mit der Region Ihres lokalen Service-Providers übereinstimmt, besteht ein Risiko für DNS-Leakage. In diesem Fall müssen Sie möglicherweise Ihre VPN/Proxy-Einstellungen ändern.',
    'dns.endpoint': 'DNS-Endpoint',
    'dns.isp': 'ISP',
    'dns.region': 'Region',
    'dns.test': 'Test',
    'advanced.title': 'Erweiterte Tools',
    'advanced.description': 'Tools, die relativ selten verwendet werden, aber sehr nützlich sind, wenn Netzwerktests durchgeführt werden.',
    'advanced.global-latency': 'Globaler Latenz-Test',
    'advanced.global-latency-desc': 'Globaler Ping-Wert-Test',
    'advanced.mtr': 'MTR-Test',
    'advanced.mtr-desc': 'Globaler MTR-Routen-Test',
    'advanced.rule': 'Regel-Test',
    'advanced.rule-desc': 'Überprüfen Sie die Regeleinstellungen der Proxy-Software',
    'advanced.dns-resolution': 'DNS-Auflösung',
    'advanced.dns-resolution-desc': 'Echtzeit-Multi-Channel-DNS-Auflösung',
    'advanced.censorship': 'Zensur-Check',
    'advanced.censorship-desc': 'Überprüfen Sie, ob eine Website in einigen Ländern blockiert ist',
    'advanced.whois': 'Whois-Suche',
    'advanced.whois-desc': 'Suche nach Domain/IP-Registrierungsinformationen',
    'advanced.mac': 'MAC-Lookup',
    'advanced.mac-desc': 'Informationen einer physischen Adresse abfragen',
    'advanced.browser': 'Browser-Informationen',
    'advanced.browser-desc': 'Browser-Informationen und Fingerprint überprüfen',
    'advanced.security': 'Sicherheits-Checkliste',
    'advanced.security-desc': 'Leitfaden zur Sicherung Ihres digitalen Lebens',
    'advanced.invisibility': 'Unsichtbarkeits-Test',
    'advanced.invisibility-desc': 'Überprüfen Sie, ob Sie einen Proxy oder VPN verwenden'
  },
  fr: {
    'nav.ip-infos': 'Infos IP',
    'nav.connectivity': 'Connectivité',
    'nav.webrtc': 'Test WebRTC',
    'nav.dns-leak': 'Test Fuite DNS',
    'nav.speed-test': 'Test de Vitesse',
    'nav.advanced': 'Outils Avancés',
    'nav.language': 'Langue',
    'footer.copyright': '© 2025 n.Network - Analyse réseau en temps réel',
    'footer.description': 'Outil pour l\'analyse détaillée de la connectivité et des informations réseau',
    'footer.powered': 'développé par',
    'dns.title': 'Test de Fuite DNS',
    'dns.description1': 'Une fuite DNS signifie que lorsque vous êtes connecté à un VPN/proxy, vos résolutions de noms de domaine sont toujours effectuées via votre FAI local, posant ainsi un risque de fuites DNS.',
    'dns.description2': 'La méthode pour tester les fuites DNS implique d\'accéder à un nom de domaine nouvellement généré pour détecter par quelle sortie DNS régionale vous résolvez. Si la région de l\'endpoint retournée correspond à la région de votre fournisseur de services local, il y a un risque de fuite DNS. Dans ce cas, vous devrez peut-être modifier vos paramètres VPN/proxy.',
    'dns.endpoint': 'Endpoint DNS',
    'dns.isp': 'FAI',
    'dns.region': 'Région',
    'dns.test': 'Test',
    'advanced.title': 'Outils Avancés',
    'advanced.description': 'Outils qui sont utilisés relativement rarement, mais qui sont très utiles lors de tests réseau.',
    'advanced.global-latency': 'Test de Latence Globale',
    'advanced.global-latency-desc': 'Test de valeur de Ping global',
    'advanced.mtr': 'Test MTR',
    'advanced.mtr-desc': 'Test de route MTR global',
    'advanced.rule': 'Test de Règles',
    'advanced.rule-desc': 'Vérifier les paramètres de règles du logiciel proxy',
    'advanced.dns-resolution': 'Résolution DNS',
    'advanced.dns-resolution-desc': 'Résolution DNS multi-canal en temps réel',
    'advanced.censorship': 'Vérification de Censure',
    'advanced.censorship-desc': 'Vérifier si un site web est bloqué dans certains pays',
    'advanced.whois': 'Recherche Whois',
    'advanced.whois-desc': 'Rechercher des informations d\'enregistrement de domaine/IP',
    'advanced.mac': 'Recherche MAC',
    'advanced.mac-desc': 'Interroger les informations d\'une adresse physique',
    'advanced.browser': 'Informations du Navigateur',
    'advanced.browser-desc': 'Vérifier les informations et l\'empreinte du navigateur',
    'advanced.security': 'Liste de Vérification Sécurité',
    'advanced.security-desc': 'Guide pour sécuriser votre vie numérique',
    'advanced.invisibility': 'Test d\'Invisibilité',
    'advanced.invisibility-desc': 'Vérifier si vous utilisez un proxy ou VPN'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
