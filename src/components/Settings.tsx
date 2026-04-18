import React from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { Sun, Moon, Edit3, Globe, Shield, Bell } from 'lucide-react';
import { cn } from '../lib/utils';

const SettingsPanel: React.FC = () => {
  const { theme, setTheme, lang, setLang, user, setUser, t } = useApp() as any;

  const languages: { id: Language, name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'hi', name: 'Hindi (हिन्दी)' },
    { id: 'mr', name: 'Marathi (मराठी)' },
    { id: 'bn', name: 'Bengali (বাংলা)' },
    { id: 'te', name: 'Telugu (తెలుగు)' },
    { id: 'ta', name: 'Tamil (தமிழ்)' },
    { id: 'gu', name: 'Gujarati (ગુજરાતી)' },
    { id: 'ur', name: 'Urdu (اردو)' },
    { id: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
    { id: 'or', name: 'Odia (ଓଡ଼ିଆ)' },
    { id: 'ml', name: 'Malayalam (മലയാളം)' },
    { id: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
    { id: 'bho', name: 'Bhojpuri (भोजपुरी)' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-5 duration-500">
      <h2 className="font-retro text-2xl border-b-4 border-[var(--border-app)] pb-2">{t('settings')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="retro-border p-8 space-y-6 bg-[var(--bg-app)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-retro text-lg flex items-center gap-3 tracking-tighter"><Edit3 size={24} className="text-[var(--accent-app)]" /> {t('edit_profile')}</h3>
            <button className="retro-button py-2 px-4 text-[8px] bg-[var(--accent-app)] text-white border-white">{t('save')}</button>
          </div>
          <div className="space-y-6">
            <div className="grid gap-2">
              <label className="text-[10px] font-retro opacity-60 tracking-widest">{t('full_name')}</label>
              <input 
                type="text" 
                defaultValue={user?.name} 
                className="bg-transparent border-4 border-[var(--border-app)] p-4 font-display font-black text-xl outline-none focus:border-[var(--accent-app)] transition-all"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-[10px] font-retro opacity-60 tracking-widest">{t('email_address')}</label>
              <input 
                type="email" 
                defaultValue={user?.email} 
                className="bg-transparent border-4 border-[var(--border-app)] p-4 font-display font-black text-xl outline-none focus:border-[var(--accent-app)] transition-all uppercase opacity-40 cursor-not-allowed"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-8">
          <div className="retro-border p-8 flex items-center justify-between group bg-[var(--bg-app)]">
            <div className="space-y-2">
              <h3 className="font-retro text-lg tracking-tighter">{t('visual_theme')}</h3>
              <p className="font-display font-black text-xs opacity-60 tracking-widest">{t('theme_switch_desc')}</p>
            </div>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-16 h-16 border-6 border-[var(--border-app)] flex items-center justify-center text-[var(--accent-app)] hover:rotate-12 transition-transform bg-[var(--bg-app)] shadow-[6px_6px_0px_0px_var(--border-app)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              {theme === 'dark' ? <Sun size={32} /> : <Moon size={32} />}
            </button>
          </div>

          <div className="retro-border p-8 bg-[var(--bg-app)]">
            <div className="flex items-center gap-3 mb-8 border-b-4 border-[var(--border-app)] pb-4">
              <Globe size={28} className="text-[var(--accent-app)]" />
              <h3 className="font-retro text-lg tracking-tighter">{t('language_settings')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-4 custom-scrollbar">
              {languages.map(l => (
                <button 
                  key={l.id}
                  onClick={() => setLang(l.id)}
                  className={cn(
                    "p-4 text-left font-display font-black text-xs border-4 transition-all",
                    lang === l.id 
                      ? "border-[var(--accent-app)] bg-[var(--accent-app)] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                      : "border-[var(--border-app)] border-opacity-20 hover:border-opacity-100"
                  )}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="retro-border p-4 flex items-center gap-3 font-retro text-[10px] hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell size={18} /> {t('notifications')}
        </button>
        <button className="retro-border p-4 flex items-center gap-3 font-retro text-[10px] hover:bg-gray-100 dark:hover:bg-gray-800">
          <Shield size={18} /> {t('privacy_policy')}
        </button>
        <button className="retro-border p-4 flex items-center gap-3 font-retro text-[10px] hover:bg-gray-100 dark:hover:bg-gray-800">
          <Edit3 size={18} /> {t('account_verification')}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
