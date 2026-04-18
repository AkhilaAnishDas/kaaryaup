import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MapPin, Star, User, SearchIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockFreelancers } from '../data/mockData';
import { cn } from '../lib/utils';

const HirerDashboard: React.FC = () => {
  const { t } = useApp() as any;
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* Search Header - Redesigned */}
      <div className="retro-border border-dashed p-8 bg-gradient-to-b from-[var(--bg-app)] to-[var(--accent-app)]/5 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-app)] to-transparent"></div>
        <h2 className="font-retro text-2xl mb-4 text-[var(--accent-app)] tracking-tighter italic">
          {t('find_dream_team')}
        </h2>
        <p className="font-sans font-bold opacity-60 mb-8 max-w-2xl text-xs tracking-widest border-y-2 border-[var(--border-app)] border-opacity-10 py-3">
          {t('browse_talent_desc')}
        </p>
        <div className="w-full max-w-2xl relative group">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:text-[var(--accent-app)] transition-all" size={24} />
          <input 
            type="text" 
            placeholder={t('search_skills_placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-4 border-[var(--border-app)] bg-[var(--bg-app)] p-6 pl-16 outline-none font-sans font-bold text-lg focus:border-[var(--accent-app)] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]"
          />
        </div>
      </div>

      {/* Filters Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="retro-border p-6 bg-[var(--bg-app)] sticky top-8">
            <h3 className="font-retro text-sm mb-6 border-b-2 border-[var(--border-app)] pb-3 flex justify-between items-center tracking-tighter">
              {t('all_filters')} <Filter size={18} />
            </h3>
            
            <div className="space-y-8 text-xs font-sans font-bold">
              <div>
                <h4 className="uppercase mb-4 opacity-50 tracking-widest border-l-3 border-[var(--accent-app)] pl-2">
                  {t('work_mode')}
                </h4>
                <div className="space-y-3 uppercase">
                  {['Work from office', 'Remote', 'Hybrid'].map(m => (
                    <label key={m} className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent-app)] transition-colors group">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--accent-app)] border-2 border-[var(--border-app)] rounded-none" /> 
                      <span className="group-hover:translate-x-1 transition-transform">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="uppercase mb-4 opacity-50 tracking-widest border-l-3 border-[var(--accent-app)] pl-2">
                  {t('department')}
                </h4>
                <div className="space-y-3 uppercase">
                  {['Engineering', 'Design', 'Marketing', 'IT'].map(m => (
                    <label key={m} className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent-app)] transition-colors group">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--accent-app)]" /> 
                      <span className="group-hover:translate-x-1 transition-transform">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[var(--border-app)] border-opacity-10">
                <button className="w-full retro-button text-[8px]">{t('reset_filters')}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Freelancers List */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockFreelancers.map((fl, idx) => (
            <motion.div 
              key={fl.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="retro-border p-6 flex flex-col gap-6 bg-[var(--bg-app)] relative group hover:border-[var(--accent-app)] hover:shadow-[6px_6px_0px_0px_var(--accent-app)] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 border-3 border-[var(--border-app)] flex items-center justify-center bg-[var(--accent-app)] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <User size={36} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-retro text-lg group-hover:text-[var(--accent-app)] transition-colors">{fl.name}</h3>
                  <div className="font-sans font-bold opacity-60 text-[10px] flex flex-col gap-1 tracking-widest">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {fl.location}</span>
                    <span className="flex items-center gap-1">AGE: {fl.age}</span>
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-center gap-0">
                  <div className="font-retro text-xl text-[var(--accent-app)] drop-shadow-sm">{fl.level}</div>
                  <div className="font-retro text-[6px] opacity-40">LEVEL</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {fl.skills.map((s) => (
                  <span key={s} className="category-tag opacity-70 group-hover:opacity-100 transition-opacity border-[var(--border-app)]">
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t-2 border-[var(--border-app)] border-dashed flex gap-4">
                <button className="flex-1 retro-button p-2 text-[8px]">{t('view_profile')}</button>
                <button className="flex-1 retro-button p-2 text-[8px] bg-[var(--accent-app)] text-white">{t('hire_me')}</button>
              </div>

              {/* Badges Hover */}
              <div className="absolute -top-3 -right-3 flex gap-1">
                {fl.badges.map(b => (
                  <motion.div 
                    key={b} 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-8 h-8 bg-yellow-400 border-2 border-black flex items-center justify-center shadow-md" 
                    title={b}
                  >
                    <Star size={14} fill="currentColor" className="text-black" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HirerDashboard;
