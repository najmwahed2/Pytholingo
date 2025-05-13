
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import LessonCard from '@/components/LessonCard';

const Lessons = () => {
  const { t } = useLanguage();
  
  const allLessons = {
    beginner: [
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
    ],
    intermediate: [
      // Add intermediate lessons here
    ],
    advanced: [
      // Add advanced lessons here
    ]
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-xl font-bold mt-4 mb-4">{t('levels.beginner')}</h2>
        <div className="grid grid-cols-1 gap-4 mb-8">
          {allLessons.beginner.map((lesson) => (
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
        
        <h2 className="text-xl font-bold mt-8 mb-4">{t('levels.intermediate')}</h2>
        <div className="flex justify-center items-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">Coming soon</p>
        </div>
        
        <h2 className="text-xl font-bold mt-8 mb-4">{t('levels.advanced')}</h2>
        <div className="flex justify-center items-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">Coming soon</p>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Lessons;
