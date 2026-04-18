import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Language, UserRole } from '../types';
import { translations } from '../translations';

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const t = (key: string) => {
    const translation = (translations as any)[key];
    if (!translation) return key;
    return translation[lang] || translation['en'] || key;
  };

  useEffect(() => {
    // Sync theme with document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ user, setUser, lang, setLang, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
