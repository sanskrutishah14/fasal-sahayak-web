import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Language Selection
    'selectLanguage': 'Select Your Language',
    'english': 'English',
    'hindi': 'हिंदी',
    'marathi': 'मराठी',
    'continue': 'Continue',
    
    // Welcome Page
    'welcome': 'Welcome to AgriSaathi',
    'tagline': 'Smart Crop Recommendations for Modern Farmers',
    'whyChoose': 'Why Choose AgriSaathi?',
    'feature1Title': 'AI-Powered Recommendations',
    'feature1Desc': 'Get personalized crop suggestions based on soil, weather, and market data',
    'feature2Title': 'Increase Your Yield',
    'feature2Desc': 'Optimize your farming decisions with data-driven insights',
    'feature3Title': 'Expert Support',
    'feature3Desc': '24/7 agricultural expert assistance through our smart chatbot',
    'login': 'Login to Continue',
    'getStarted': 'Get Started Today',
  },
  hi: {
    // Language Selection
    'selectLanguage': 'अपनी भाषा चुनें',
    'english': 'English',
    'hindi': 'हिंदी',
    'marathi': 'मराठी',
    'continue': 'जारी रखें',
    
    // Welcome Page
    'welcome': 'AgriSaathi में आपका स्वागत है',
    'tagline': 'आधुनिक किसानों के लिए स्मार्ट फसल सुझाव',
    'whyChoose': 'AgriSaathi क्यों चुनें?',
    'feature1Title': 'AI-संचालित सुझाव',
    'feature1Desc': 'मिट्टी, मौसम और बाजार डेटा के आधार पर व्यक्तिगत फसल सुझाव प्राप्त करें',
    'feature2Title': 'अपनी उपज बढ़ाएं',
    'feature2Desc': 'डेटा-संचालित अंतर्दृष्टि के साथ अपने खेती के निर्णयों को अनुकूलित करें',
    'feature3Title': 'विशेषज्ञ सहायता',
    'feature3Desc': 'हमारे स्मार्ट चैटबॉट के माध्यम से 24/7 कृषि विशेषज्ञ सहायता',
    'login': 'जारी रखने के लिए लॉगिन करें',
    'getStarted': 'आज ही शुरुआत करें',
  },
  mr: {
    // Language Selection
    'selectLanguage': 'तुमची भाषा निवडा',
    'english': 'English',
    'hindi': 'हिंदी',
    'marathi': 'मराठी',
    'continue': 'सुरू ठेवा',
    
    // Welcome Page
    'welcome': 'AgriSaathi मध्ये आपले स्वागत आहे',
    'tagline': 'आधुनिक शेतकऱ्यांसाठी हुशार पीक शिफारसी',
    'whyChoose': 'AgriSaathi का निवडायचे?',
    'feature1Title': 'AI-चालित शिफारसी',
    'feature1Desc': 'माती, हवामान आणि बाजार डेटावर आधारित वैयक्तिक पीक सूचना मिळवा',
    'feature2Title': 'तुमचे उत्पादन वाढवा',
    'feature2Desc': 'डेटा-चालित अंतर्दृष्टीसह तुमचे शेती निर्णय अनुकूल करा',
    'feature3Title': 'तज्ञ सहाय्य',
    'feature3Desc': 'आमच्या स्मार्ट चॅटबॉटद्वारे 24/7 कृषी तज्ञ सहाय्य',
    'login': 'सुरू ठेवण्यासाठी लॉगिन करा',
    'getStarted': 'आजच सुरुवात करा',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};