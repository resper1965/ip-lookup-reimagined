
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="text-slate-300 space-y-2">
          <p className="text-sm">
            {t('footer.copyright')}
          </p>
          <p className="text-xs text-slate-400">
            {t('footer.description')}
          </p>
          <p className="text-xs text-slate-500 font-montserrat">
            {t('footer.powered')} <span className="text-white">ness</span><span className="font-bold" style={{ color: '#00ade0' }}>.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
