
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProgress {
  xp: number;
  streak: number;
  level: string;
  completedLessons: string[];
  hearts: number;
}

type UserProgressContextType = {
  progress: UserProgress;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  incrementStreak: () => void;
  resetHearts: () => void;
  useHeart: () => boolean;
};

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>({
    xp: 0,
    streak: 0,
    level: 'beginner',
    completedLessons: [],
    hearts: 5,
  });

  const addXp = (amount: number) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  const completeLesson = (lessonId: string) => {
    if (!progress.completedLessons.includes(lessonId)) {
      setProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      }));
    }
  };

  const incrementStreak = () => {
    setProgress(prev => ({
      ...prev,
      streak: prev.streak + 1
    }));
  };

  const resetHearts = () => {
    setProgress(prev => ({
      ...prev,
      hearts: 5
    }));
  };

  const useHeart = () => {
    if (progress.hearts > 0) {
      setProgress(prev => ({
        ...prev,
        hearts: prev.hearts - 1
      }));
      return true;
    }
    return false;
  };

  return (
    <UserProgressContext.Provider 
      value={{ 
        progress, 
        addXp, 
        completeLesson, 
        incrementStreak, 
        resetHearts,
        useHeart
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = (): UserProgressContextType => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};
