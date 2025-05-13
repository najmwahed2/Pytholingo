
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { progress } = useUserProgress();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-brand-purple text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
          P
        </div>
        <h1 className="text-xl font-bold ml-3">{t('app.title')}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center">
          <div className="flex items-center mr-4">
            <div className="xp-badge w-8 h-8">XP</div>
            <span className="ml-2 font-semibold">{progress.xp}</span>
          </div>
          
          <div className="flex items-center mr-4">
            <div className="flex">
              {Array(progress.hearts).fill(0).map((_, i) => (
                <Heart key={i} className="w-5 h-5 text-brand-red fill-brand-red" />
              ))}
              {Array(5 - progress.hearts).fill(0).map((_, i) => (
                <Heart key={i + progress.hearts} className="w-5 h-5 text-gray-300" />
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-brand-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              {progress.streak}
            </div>
            <span className="ml-2 text-sm">{t('profile.streak')}</span>
          </div>
        </div>
        
        <Button 
          variant="outline"
          onClick={toggleLanguage}
          className="text-sm"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </Button>
      </div>
    </header>
  );
};

export default Header;
