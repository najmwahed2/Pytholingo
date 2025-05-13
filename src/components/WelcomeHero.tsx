
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WelcomeHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-brand-purple to-purple-700 text-white rounded-lg p-6 mb-8">
      <h1 className="text-2xl font-bold mb-2 animate-fade-in">{t('welcome.message')}</h1>
      <p className="mb-4 opacity-90 animate-slide-in">{t('welcome.subtitle')}</p>
      
      <div className="flex flex-wrap gap-3 mt-4">
        <Button asChild className="button-primary bg-white text-brand-purple hover:bg-white/90">
          <Link to="/lessons">{t('app.start')}</Link>
        </Button>
      </div>
      
      <div className="mt-5 flex justify-end">
        <div className="w-20 h-20 relative">
          <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse-scale"></div>
          <div className="absolute inset-2 bg-white rounded-full opacity-30 animate-pulse-scale animation-delay-150"></div>
          <div className="absolute inset-4 bg-white rounded-full opacity-40 animate-pulse-scale animation-delay-300"></div>
          <div className="absolute inset-5 bg-white/90 rounded-full flex items-center justify-center">
            <code className="font-bold text-brand-purple">{'>'}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
