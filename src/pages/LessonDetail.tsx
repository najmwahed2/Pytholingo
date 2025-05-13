
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProgress } from '@/contexts/UserProgressContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { progress, addXp, completeLesson, useHeart } = useUserProgress();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  
  // Sample lesson content using translation keys
  const lessons = {
    variables: {
      title: `lesson.variables.title`,
      steps: [
        {
          type: 'explanation',
          content: `lesson.variables.explanation1`,
          code: 'name = "Python"\nage = 30\nis_fun = True'
        },
        {
          type: 'question',
          content: `lesson.variables.question1`,
          options: ['score = 100', 'score == 100', 'let score = 100', 'score -> 100'],
          correctAnswer: 'score = 100'
        },
        {
          type: 'coding',
          content: `lesson.variables.coding1`,
          starterCode: '# Write your code below\n\n',
          correctCode: 'greeting = "Hello, Python!"'
        }
      ],
      xp: 10
    },
    loops: {
      title: `lesson.loops.title`,
      steps: [
        {
          type: 'explanation',
          content: `lesson.loops.explanation1`,
          code: 'for i in range(5):\n    print(i)\n\nwhile count > 0:\n    print(count)\n    count -= 1'
        },
        {
          type: 'question',
          content: `lesson.loops.question1`,
          options: [
            'for (i = 0; i < 5; i++) { }', 
            'for i in range(5):', 
            'for (i in 5) { }', 
            'foreach (i in range(5)) { }'
          ],
          correctAnswer: 'for i in range(5):'
        }
      ],
      xp: 15
    },
    functions: {
      title: `lesson.functions.title`,
      steps: [
        {
          type: 'explanation',
          content: `lesson.functions.explanation1`,
          code: 'def greet(name):\n    return f"Hello, {name}!"\n\nmessage = greet("Python")\nprint(message)'
        },
        {
          type: 'question',
          content: `lesson.functions.question1`,
          options: [
            'function myFunc() { }', 
            'def myFunc():', 
            'function myFunc():', 
            'func myFunc() { }'
          ],
          correctAnswer: 'def myFunc():'
        }
      ],
      xp: 20
    }
  };
  
  // @ts-ignore - Type safety would be handled in a real app
  const lesson = lessonId && lessons[lessonId];
  
  if (!lesson) {
    return <div>Lesson not found</div>;
  }
  
  const currentStepData = lesson.steps[currentStep];
  const isLastStep = currentStep === lesson.steps.length - 1;
  
  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
  };
  
  const checkAnswer = () => {
    if (currentStepData.type === 'question' || currentStepData.type === 'coding') {
      const isCorrect = userAnswer === currentStepData.correctAnswer || 
                       (currentStepData.type === 'coding' && userAnswer.includes(currentStepData.correctAnswer));
      
      if (isCorrect) {
        toast.success("Correct answer!");
        if (isLastStep) {
          completeLesson(lessonId || '');
          addXp(lesson.xp);
          toast.success(`Lesson completed! +${lesson.xp} XP`);
          setTimeout(() => navigate('/lessons'), 2000);
        } else {
          setCurrentStep(prev => prev + 1);
          setUserAnswer('');
        }
      } else {
        const hasHeart = useHeart();
        if (hasHeart) {
          toast.error("Incorrect answer. Try again!");
        } else {
          toast.error("You've run out of hearts!");
          setTimeout(() => navigate('/profile'), 2000);
        }
      }
    } else {
      // For explanation steps, just move forward
      if (isLastStep) {
        completeLesson(lessonId || '');
        addXp(lesson.xp);
        toast.success(`Lesson completed! +${lesson.xp} XP`);
        setTimeout(() => navigate('/lessons'), 2000);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };
  
  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setUserAnswer('');
    } else {
      navigate('/lessons');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-lg mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-sm">
            Step {currentStep + 1} of {lesson.steps.length}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{t(lesson.title)}</h2>
          
          <div className="mb-6">
            <p className="mb-4">{t(currentStepData.content)}</p>
            
            {currentStepData.type === 'explanation' && currentStepData.code && (
              <div className="bg-gray-900 text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{currentStepData.code}</pre>
              </div>
            )}
            
            {currentStepData.type === 'question' && (
              <div className="mt-4 space-y-2">
                {currentStepData.options.map((option, index) => (
                  <div 
                    key={index}
                    className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                      userAnswer === option ? 'border-brand-purple bg-brand-purple/10' : 'border-gray-200'
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            
            {currentStepData.type === 'coding' && (
              <div className="mt-4">
                <div className="bg-gray-900 text-white p-4 rounded-md font-mono text-sm mb-3">
                  <pre>{currentStepData.starterCode}</pre>
                </div>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-md font-mono"
                  placeholder="Write your code here..."
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button onClick={checkAnswer}>
              {isLastStep ? t('lesson.complete') : t('lesson.continue')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
