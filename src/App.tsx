import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import YuvaAI from './components/YuvaAI';
import Login from './components/Login';
import StarBackground from './components/StarBackground';
import FreelancerDashboard from './components/FreelancerDashboard';
import HirerDashboard from './components/HirerDashboard';
import SettingsPanel from './components/Settings.tsx';
import AboutApp from './components/AboutApp.tsx';
import MemoryGame, { MotivationModal } from './components/Games.tsx';
import CertificateModal from './components/Certificate';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'motion/react';
import { Award, Gamepad2, X } from 'lucide-react';

const MainApp = () => {
  const { user, setUser, t } = useApp() as any;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [showGame, setShowGame] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  if (!user) {
    return (
      <>
        <StarBackground />
        <Login />
      </>
    );
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return user.role === 'freelancer' ? <FreelancerDashboard /> : <HirerDashboard />;
      case 'jobs':
        // For hackathon, if they are already on dashboard which shows jobs, we can show a "Featured Gigs" view
        return user.role === 'freelancer' ? <FreelancerDashboard /> : <HirerDashboard />;
      case 'profile':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="retro-border p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-app)] opacity-5 rotate-45 transform translate-x-10 -translate-y-10 group-hover:bg-opacity-10 transition-all"></div>
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-24 h-24 retro-border flex items-center justify-center text-2xl font-retro text-[var(--accent-app)]">
                  {user.name.charAt(0)}
                </div>
                <div className="text-center md:text-left space-y-1">
                  <h2 className="font-retro text-2xl text-[var(--accent-app)]">{user.name}</h2>
                  <p className="font-sans font-bold text-xs opacity-60 tracking-widest">{user.role}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {user.skills.map((s: string) => (
                      <span key={s} className="category-tag border-[var(--border-app)]">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="retro-border p-6 space-y-4">
                <h3 className="font-retro text-sm border-b-2 border-[var(--border-app)] pb-2">{t('achievements')}</h3>
                <div className="grid grid-cols-4 gap-3">
                  {user.badges.map((b: string) => (
                    <div key={b} className="aspect-square retro-border flex items-center justify-center text-[var(--accent-app)]" title={b}>
                      <Award size={24} fill="currentColor" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="retro-border p-6 space-y-4">
                <h3 className="font-retro text-sm border-b-2 border-[var(--border-app)] pb-2">Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-retro text-[8px] opacity-60">Level</span>
                    <span className="font-retro text-xl">{user.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-retro text-[8px] opacity-60">Total XP</span>
                    <span className="font-retro text-xl">{user.xp}</span>
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="font-retro text-[8px] opacity-60">Missions Completed</span>
                    <span className="font-retro text-xl">12</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'settings':
        return <SettingsPanel />;
      case 'about':
        return <AboutApp />;
      case 'rewards':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8 animate-in zoom-in duration-500">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Award size={120} className="text-[var(--accent-app)] drop-shadow-[0_0_15px_var(--accent-app)]" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="font-retro text-2xl tracking-tighter">{t('achievements')}</h2>
              <p className="font-sans font-bold opacity-60 tracking-widest text-[10px]">
                {t('certificate_desc')}
              </p>
            </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {user.badges.map((b: string) => (
                  <motion.div 
                    key={b} 
                    whileHover={{ y: -5, rotate: 2 }}
                    className="retro-border p-6 text-[var(--accent-app)] font-retro text-[8px] flex flex-col items-center gap-3 border-dashed"
                  >
                    <Award size={40} fill="currentColor" />
                    {b}
                  </motion.div>
                ))}
              </div>
            <button 
              onClick={() => {
                confetti({
                  particleCount: 150,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ['#450a0a', '#ffffff', '#ff0000']
                });
                setShowCertificate(true);
              }}
              className="retro-button mt-10 bg-[var(--accent-app)] text-white text-xl px-10"
            >
              Claim Exclusive Rewards
            </button>
          </div>
        );
      default:
        return <div className="p-10 text-center font-retro text-4xl animate-pulse">{t('mission_under_construction')}</div>;
    }
  };

  const handleLevelUp = () => {
    setUser({
      ...user,
      xp: user.xp + 100,
      level: user.level + 1
    });
    setShowMotivation(true);
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg-app)]">
      <div className="scanline" />
      <StarBackground />
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
        {/* Top Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="font-retro text-[9px] opacity-60">{t('mission')}: {activeView}</span>
            <h2 className="font-retro text-xl text-[var(--accent-app)]">{t('app_name')}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {user.role === 'freelancer' && (
              <button 
                onClick={() => setShowGame(true)}
                className="retro-button flex items-center gap-2 bg-yellow-500 bg-opacity-10 border-yellow-500 text-yellow-600 dark:text-yellow-400"
              >
                <Gamepad2 size={20} /> {t('mini_game_btn')}
              </button>
            )}
            <div className="flex items-center gap-3 retro-border px-3 py-1.5 bg-[var(--bg-app)]">
              <div className="w-7 h-7 bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-retro text-[10px] border-2 border-[var(--border-app)]">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <div className="font-sans font-bold text-[10px]">{user.name}</div>
                <div className="font-retro text-[7px] opacity-60">{t('level')} {user.level}</div>
              </div>
            </div>
          </div>
        </div>

        {renderView()}

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t-2 border-[var(--border-app)] border-opacity-20 text-center">
          <p className="font-display text-[10px] opacity-40 font-bold tracking-widest pb-8">
            {t('footer_copyright')}
          </p>
        </footer>
      </main>

      <YuvaAI />
      <Toaster position="top-right" />

      {/* Game Overlay */}
      <AnimatePresence>
        {showGame && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-90">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-[var(--bg-app)] border-8 border-[var(--border-app)] p-8 relative"
            >
              <button onClick={() => setShowGame(false)} className="absolute top-4 right-4 text-[var(--text-app)]"><X size={24} /></button>
              <div className="text-center mb-6">
                <h3 className="font-retro text-xl mb-1 text-yellow-500">{t('memory_game')}</h3>
                <p className="font-display font-bold text-xs opacity-60">{t('win_game_hint')}</p>
              </div>
              <MemoryGame 
                onComplete={() => {
                  setShowGame(false);
                  handleLevelUp();
                }} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <MotivationModal 
        isOpen={showMotivation} 
        onClose={() => setShowMotivation(false)} 
      />
      <CertificateModal 
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
