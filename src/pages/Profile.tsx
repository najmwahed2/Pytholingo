
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProgress } from '@/contexts/UserProgressContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Heart, Award, Star, Book } from 'lucide-react';

const Profile = () => {
  const { t } = useLanguage();
  const { progress, resetHearts } = useUserProgress();

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <div className="max-w-lg mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="bg-brand-purple text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
              P
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">Python Learner</h2>
              <p className="text-gray-500">{t(`levels.${progress.level}`)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <Star className="text-brand-yellow h-8 w-8 mr-3" />
              <div>
                <p className="text-sm text-gray-500">{t('profile.xp')}</p>
                <p className="text-xl font-bold">{progress.xp}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <Award className="text-brand-blue h-8 w-8 mr-3" />
              <div>
                <p className="text-sm text-gray-500">{t('profile.streak')}</p>
                <p className="text-xl font-bold">{progress.streak}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">Hearts</p>
            <div className="flex items-center justify-between">
              <div className="flex">
                {Array(progress.hearts).fill(0).map((_, i) => (
                  <Heart key={i} className="w-6 h-6 text-brand-red fill-brand-red" />
                ))}
                {Array(5 - progress.hearts).fill(0).map((_, i) => (
                  <Heart key={i + progress.hearts} className="w-6 h-6 text-gray-300" />
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetHearts} 
                disabled={progress.hearts === 5}
              >
                Refill
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-2">Completed Lessons</p>
            <div className="flex items-center">
              <Book className="text-brand-purple h-6 w-6 mr-2" />
              <p className="text-xl font-bold">{progress.completedLessons.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Achievements</h3>
          <div className="grid grid-cols-3 gap-4">
            {['Beginner', 'First Lesson', 'Streak 3'].map((achievement, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center bg-gray-50 rounded-lg p-3"
              >
                <div className="bg-brand-purple/10 p-2 rounded-full mb-2">
                  <Award className="h-6 w-6 text-brand-purple" />
                </div>
                <p className="text-sm text-center">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
