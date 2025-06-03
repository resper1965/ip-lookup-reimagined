
import { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt-br', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

interface LanguageSelectorProps {
  isMobile?: boolean;
}

const LanguageSelector = ({ isMobile = false }: LanguageSelectorProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-300 hover:bg-white/10 hover:text-white w-full"
        >
          <Globe className="w-4 h-4" strokeWidth={1} />
          <span>{t('nav.language')}</span>
          <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1} />
        </button>
        
        {isOpen && (
          <div className="mt-2 bg-gray-800/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center space-x-3 px-4 py-2 w-full text-left text-sm transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  language === lang.code 
                    ? 'bg-brand-cyan/20 text-brand-cyan' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all duration-200"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium hidden sm:block">{currentLanguage?.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg z-50 min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center space-x-3 px-4 py-2 w-full text-left text-sm transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                language === lang.code 
                  ? 'bg-brand-cyan/20 text-brand-cyan' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
