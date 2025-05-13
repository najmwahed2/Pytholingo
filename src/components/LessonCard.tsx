
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { Check, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  xp: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageSrc?: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
  id,
  title,
  description,
  xp,
  difficulty,
  imageSrc
}) => {
  const { t } = useLanguage();
  const { progress } = useUserProgress();
  const isCompleted = progress.completedLessons.includes(id);
  
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="lesson-card hover:border-brand-purple relative">
      {isCompleted && (
        <div className="absolute -top-2 -right-2 bg-brand-green text-white rounded-full p-1">
          <Check className="h-4 w-4" />
        </div>
      )}
      
      <div className="flex items-center mb-3">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-12 h-12 rounded-md object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-md bg-brand-purple/20 flex items-center justify-center">
            <code className="text-brand-purple font-mono">py</code>
          </div>
        )}
        <div className="ml-3">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor()}`}>
              {t(`levels.${difficulty}`)}
            </span>
            <span className="text-xs text-gray-500 ml-2 flex items-center">
              <span className="font-medium text-brand-yellow mr-1">{xp}</span> {t('lesson.xp')}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <Link 
        to={`/lessons/${id}`}
        className={`${isCompleted ? 'button-secondary' : 'button-primary'} text-center block w-full`}
      >
        <span className="flex items-center justify-center">
          {isCompleted ? t('app.continue') : t('lessons.start')}
          <Play className="h-4 w-4 ml-2" />
        </span>
      </Link>
    </div>
  );
};

export default LessonCard;
