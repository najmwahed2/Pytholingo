
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

type TranslationDictionary = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: TranslationDictionary = {
  en: {
    'app.title': 'Pytholingo',
    'app.subtitle': 'Learn Python like a game',
    'app.start': 'Start Learning',
    'app.continue': 'Continue',
    'app.languages': 'Languages',
    'levels.beginner': 'Beginner',
    'levels.intermediate': 'Intermediate',
    'levels.advanced': 'Advanced',
    'profile.xp': 'XP',
    'profile.streak': 'Day Streak',
    'nav.home': 'Home',
    'nav.lessons': 'Lessons',
    'nav.profile': 'Profile',
    'lessons.variables': 'Variables',
    'lessons.loops': 'Loops',
    'lessons.functions': 'Functions',
    'lessons.start': 'Start Lesson',
    'lesson.xp': 'XP',
    'lesson.difficulty': 'Difficulty',
    'welcome.message': 'Welcome to Pytholingo!',
    'welcome.subtitle': 'The fun way to master Python programming',
    // Lesson content translations
    'lesson.variables.title': 'Python Variables',
    'lesson.variables.explanation1': 'Variables in Python are like containers that store data. You can name them and use them later in your code.',
    'lesson.variables.question1': 'How would you create a variable called "score" with a value of 100?',
    'lesson.variables.coding1': 'Create a variable called "greeting" with the value "Hello, Python!"',
    'lesson.loops.title': 'Python Loops',
    'lesson.loops.explanation1': 'Loops in Python allow you to repeat actions multiple times. The two main types are "for" and "while" loops.',
    'lesson.loops.question1': 'Which of these is a correct for loop in Python?',
    'lesson.functions.title': 'Python Functions',
    'lesson.functions.explanation1': 'Functions in Python are reusable blocks of code that perform a specific task. They help organize and modularize your code.',
    'lesson.functions.question1': 'How do you define a function in Python?',
    'lesson.continue': 'Continue',
    'lesson.complete': 'Complete Lesson',
  },
  ar: {
    'app.title': 'بايثولينجو',
    'app.subtitle': 'تعلم بايثون مثل اللعبة',
    'app.start': 'ابدأ التعلم',
    'app.continue': 'استمر',
    'app.languages': 'اللغات',
    'levels.beginner': 'مبتدئ',
    'levels.intermediate': 'متوسط',
    'levels.advanced': 'متقدم',
    'profile.xp': 'نقاط الخبرة',
    'profile.streak': 'أيام متتالية',
    'nav.home': 'الرئيسية',
    'nav.lessons': 'الدروس',
    'nav.profile': 'الملف الشخصي',
    'lessons.variables': 'المتغيرات',
    'lessons.loops': 'الحلقات',
    'lessons.functions': 'الدوال',
    'lessons.start': 'ابدأ الدرس',
    'lesson.xp': 'نقاط الخبرة',
    'lesson.difficulty': 'الصعوبة',
    'welcome.message': 'مرحباً بك في بايثولينجو!',
    'welcome.subtitle': 'الطريقة الممتعة لإتقان برمجة بايثون',
    // Lesson content translations in Arabic
    'lesson.variables.title': 'متغيرات بايثون',
    'lesson.variables.explanation1': 'المتغيرات في بايثون هي مثل حاويات تخزن البيانات. يمكنك تسميتها واستخدامها لاحقاً في الكود الخاص بك.',
    'lesson.variables.question1': 'كيف تنشئ متغيراً يسمى "score" بقيمة 100؟',
    'lesson.variables.coding1': 'أنشئ متغيراً يسمى "greeting" بقيمة "Hello, Python!"',
    'lesson.loops.title': 'حلقات بايثون',
    'lesson.loops.explanation1': 'تسمح الحلقات في بايثون بتكرار الإجراءات عدة مرات. النوعان الرئيسيان هما حلقات "for" و "while".',
    'lesson.loops.question1': 'أي من هذه هي حلقة for صحيحة في بايثون؟',
    'lesson.functions.title': 'دوال بايثون',
    'lesson.functions.explanation1': 'الدوال في بايثون هي كتل من الكود قابلة لإعادة الاستخدام وتؤدي مهمة محددة. تساعد في تنظيم وتقسيم الكود الخاص بك.',
    'lesson.functions.question1': 'كيف تعرّف دالة في بايثون؟',
    'lesson.continue': 'استمر',
    'lesson.complete': 'أكمل الدرس',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div className={isRTL ? 'rtl' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
