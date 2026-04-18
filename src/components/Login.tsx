import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Smartphone, Mail, Globe, Apple, Gamepad2 } from 'lucide-react';

const Login: React.FC = () => {
  const { setUser, t } = useApp();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'freelancer' | 'hirer'>('freelancer');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    skills: ''
  });

  const handleQuickLogin = (method: string) => {
    // Simulate login
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'New Yuva',
      age: parseInt(formData.age) || 18,
      phone: formData.phone || '9999999999',
      email: 'yuva@kaaryaup.com',
      skills: formData.skills.split(',').map(s => s.trim()),
      role: role,
      xp: 0,
      level: 1,
      badges: ['New Joiner'],
      location: 'India'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-app)] relative overflow-hidden">
      {/* Background Retro Elements */}
      <div className="absolute top-10 left-10 text-[var(--accent-app)] opacity-10 animate-bounce">
        <Gamepad2 size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-[var(--accent-app)] opacity-10 animate-pulse">
        <Smartphone size={120} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md retro-border bg-[var(--bg-app)] p-8 relative z-10"
      >
        <div className="text-center mb-8 relative">
          <h1 className="font-retro text-4xl mb-3 text-[var(--accent-app)] group-hover:scale-110 transition-transform">{t('app_name')}</h1>
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="h-1 flex-1 bg-[var(--border-app)] opacity-20"></div>
             <p className="font-retro text-[8px] text-[var(--accent-app)] tracking-[0.3em] whitespace-nowrap px-2">
               {t('level_up_career')}
             </p>
             <div className="h-1 flex-1 bg-[var(--border-app)] opacity-20"></div>
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setRole('freelancer')}
                className={`flex-1 p-4 retro-border transition-all ${role === 'freelancer' ? 'bg-[var(--accent-app)] text-white' : 'opacity-60'}`}
              >
                <div className="font-retro text-xs mb-1 uppercase">{t('role')}</div>
                <div className="font-display font-bold">{t('freelancer_role')}</div>
              </button>
              <button 
                onClick={() => setRole('hirer')}
                className={`flex-1 p-4 retro-border transition-all ${role === 'hirer' ? 'bg-[var(--accent-app)] text-white' : 'opacity-60'}`}
              >
                <div className="font-retro text-xs mb-1 uppercase">{t('role')}</div>
                <div className="font-display font-bold">{t('hirer_role')}</div>
              </button>
            </div>

            <div className="space-y-4">
              <button onClick={() => handleQuickLogin('google')} className="w-full retro-button flex items-center justify-center gap-3">
                <Globe size={20} /> {role === 'freelancer' ? t('login_freelancer') : t('login_hirer')} Google
              </button>
              <button onClick={() => handleQuickLogin('apple')} className="w-full retro-button flex items-center justify-center gap-3">
                <Apple size={20} /> {role === 'freelancer' ? t('login_freelancer') : t('login_hirer')} Apple
              </button>
              <div className="relative flex items-center justify-center">
                <div className="border-t-2 border-[var(--border-app)] w-full"></div>
                <span className="absolute px-2 bg-[var(--bg-app)] font-retro text-[10px]">{t('or_divider')}</span>
              </div>
              <button onClick={() => setStep(2)} className="w-full retro-button flex items-center justify-center gap-3 bg-[var(--accent-app)] text-white border-white">
                <Smartphone size={20} /> {t('phone_otp_login')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-retro text-[10px]">{t('your_name')}</label>
              <input 
                required
                type="text" 
                placeholder={t('name_placeholder')} 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-4 border-[var(--border-app)] p-3 outline-none font-display font-bold"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="font-retro text-[10px]">{t('age')}</label>
                <input 
                  required
                  type="number" 
                  placeholder="20" 
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-transparent border-4 border-[var(--border-app)] p-3 outline-none font-display font-bold"
                />
              </div>
              <div className="flex-[2] space-y-1">
                <label className="font-retro text-[10px]">{t('phone_number')}</label>
                <input 
                  required
                  type="text" 
                  placeholder="98XXXXXX" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-4 border-[var(--border-app)] p-3 outline-none font-display font-bold"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-retro text-[10px]">{t('skills')}</label>
              <input 
                required
                type="text" 
                placeholder={t('skills_placeholder')} 
                value={formData.skills}
                onChange={e => setFormData({...formData, skills: e.target.value})}
                className="w-full bg-transparent border-4 border-[var(--border-app)] p-3 outline-none font-display font-bold"
              />
            </div>
            <button type="submit" className="w-full retro-button bg-[var(--accent-app)] text-white mt-4 py-4 text-xl">
              {t('start_mission')}
            </button>
            <button type="button" onClick={() => setStep(1)} className="w-full font-retro text-xs opacity-60">
              {t('go_back')}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
