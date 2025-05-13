
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProgress } from '@/contexts/UserProgressContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import WelcomeHero from '@/components/WelcomeHero';
import LessonCard from '@/components/LessonCard';

const Index = () => {
  const { t } = useLanguage();
  const { progress, incrementStreak } = useUserProgress();
  const navigate = useNavigate();
  
  // Simulate checking if it's a new day for streak
  useEffect(() => {
    const lastLogin = localStorage.getItem('lastLogin');
    const today = new Date().toDateString();
    
    if (lastLogin !== today) {
      incrementStreak();
      localStorage.setItem('lastLogin', today);
    }
  }, [incrementStreak]);
  
  const beginnerLessons = [
    {
      id: 'variables',
      title: t('lessons.variables'),
      description: 'Learn how to store and use data in Python with variables.',
      xp: 10,
      difficulty: 'beginner' as const
    },
    {
      id: 'loops',
      title: t('lessons.loops'),
      description: 'Master the art of repetition with for and while loops.',
      xp: 15,
      difficulty: 'beginner' as const
    },
    {
      id: 'functions',
      title: t('lessons.functions'),
      description: 'Create reusable blocks of code with Python functions.',
      xp: 20,
      difficulty: 'beginner' as const
    }
  ];

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <div className="max-w-lg mx-auto p-4">
        <WelcomeHero />
        
        <h2 className="text-xl font-bold mt-8 mb-4">{t('levels.beginner')}</h2>
        <div className="grid grid-cols-1 gap-4">
          {beginnerLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              description={lesson.description}
              xp={lesson.xp}
              difficulty={lesson.difficulty}
            />
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
