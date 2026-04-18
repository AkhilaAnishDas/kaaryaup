import React from 'react';
import { useApp } from '../context/AppContext';

const AboutApp: React.FC = () => {
  const { t } = useApp() as any;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="retro-border border-dashed p-10 bg-[var(--accent-app)] text-white text-center">
        <h1 className="font-retro text-5xl mb-6 tracking-tighter shadow-sm">{t('about_title')}</h1>
        <div className="w-20 h-2 bg-white mx-auto mb-6"></div>
        <p className="font-display text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
          "{t('mission_quote')}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-xl font-display leading-relaxed">
        <div className="space-y-6 font-black tracking-tight opacity-70">
          <p>
            KaaryaUp is a youth-powered freelancing and skill-building platform built for India’s next generation of creators, doers, and independent earners (ages 11–25).
          </p>
          <p>
            In a world where traditional jobs aren’t the only path to success, KaaryaUp helps young people turn their skills into real income, real experience, and real confidence.
          </p>
        </div>
        <div className="space-y-6 font-black tracking-tight opacity-70">
          <p>
            Powered by YuvaAI, your personal smart assistant, the app guides users to discover opportunities, improve their skills, build a portfolio, and connect with freelance work that matches their talent.
          </p>
          <p>
            Whether it’s design, writing, editing, coding, marketing, or creative work — KaaryaUp helps you start where you are and grow at your own pace.
          </p>
        </div>
      </div>

      <div className="retro-border p-10 border-6 border-dashed border-[var(--border-app)] flex flex-col md:flex-row items-center gap-10 bg-[var(--accent-app)] bg-opacity-5">
        <div className="flex-1 space-y-6">
          <h3 className="font-retro text-2xl italic tracking-tighter decoration-4 decoration-[var(--accent-app)] underline underline-offset-8 transition-all">{t('vision_title')}</h3>
          <p className="font-display font-black opacity-80 leading-relaxed text-sm">
            {t('vision_desc')}
          </p>
        </div>
        <div className="w-full md:w-1/3 aspect-square bg-black flex items-center justify-center retro-border rotate-3 hover:rotate-0 transition-transform">
          <span className="font-retro text-[var(--accent-app)] animate-bounce text-[10px] text-center p-4 leading-loose">{t('community_mission')}</span>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;
