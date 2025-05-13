
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: 'nav.home', path: '/' },
    { icon: Book, label: 'nav.lessons', path: '/lessons' },
    { icon: User, label: 'nav.profile', path: '/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-up border-t border-gray-200 px-6 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <Link 
              key={index} 
              to={item.path} 
              className={`flex flex-col items-center pt-2 pb-1 ${active ? 'text-brand-purple' : 'text-gray-500'}`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{t(item.label)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
