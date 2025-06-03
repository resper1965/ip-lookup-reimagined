
import { useLanguage } from "@/contexts/LanguageContext";
import Logo from "./Logo";

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
          <div className="flex justify-center items-center text-xs text-slate-500">
            <span className="mr-1">{t('footer.powered')}</span>
            <div className="flex items-center space-x-1 font-montserrat">
              <span className="text-white">ness</span>
              <span className="text-[#00ade0] font-bold">.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
