import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MapPin, Clock, BarChart3, Star, CheckCircle2, ChevronRight, Award, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockJobs } from '../data/mockData';
import { cn } from '../lib/utils';

const FreelancerDashboard: React.FC = () => {
  const { user, t } = useApp() as any;
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const freelancerskills = user?.skills || [];
  
  const filteredJobs = mockJobs.filter(j => {
    const searchMatch = j.title.toLowerCase().includes(search.toLowerCase()) || 
                       j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return searchMatch;
  });

  // Pro Level Recommendations: Sort by skill match count
  const recommendedMissions = [...filteredJobs].sort((a, b) => {
    const aMatch = a.skills.filter(s => freelancerskills.includes(s)).length;
    const bMatch = b.skills.filter(s => freelancerskills.includes(s)).length;
    return bMatch - aMatch;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* Welcome & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="md:col-span-2 retro-border bg-gradient-to-r from-[var(--accent-app)] via-[var(--line,var(--wine))] to-[var(--accent-app)] p-6 text-white overflow-hidden relative group"
        >
          <div className="relative z-10">
            <h2 className="font-retro text-2xl mb-2 drop-shadow-md">
               {t('welcome_back')}, <span className="underline decoration-2 underline-offset-4 decoration-white">{user?.name}!</span>
            </h2>
            <p className="font-sans font-bold mb-6 opacity-90 tracking-widest text-xs bg-black bg-opacity-20 inline-block px-3 py-1">
              {t('level_up_career')}
            </p>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 w-full bg-black bg-opacity-30 h-10 border-4 border-white overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(user?.xp % 100)}%` }}
                  className="h-full bg-gradient-to-r from-[var(--neon-red)] to-[var(--neon-orange)] transition-all duration-1000"
                ></motion.div>
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-retro text-white mix-blend-difference">
                  XP PROGRESS: {user?.xp % 100}%
                </span>
              </div>
              <div className="font-retro text-2xl text-[var(--accent-app)] px-6 py-3 border-4 border-[var(--border-app)] hover:rotate-2 transition-transform cursor-default">
                LVL {user?.level}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-all duration-700 text-[var(--neon-red)]">
            <Star size={300} fill="currentColor" />
          </div>
        </motion.div>
        
        <div className="retro-border border-dashed p-6 flex flex-col justify-center items-center text-center relative group">
          <div className="absolute inset-0 bg-[var(--accent-app)] opacity-0 group-hover:opacity-5 transition-opacity"></div>
          <h3 className="font-retro text-[9px] mb-4 underline opacity-60 tracking-widest font-black text-[var(--accent-app)]">{t('badges')}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {user?.badges?.map((b: string) => (
              <motion.div 
                key={b} 
                whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.1 }}
                className="p-4 border-4 border-[var(--border-app)] text-[var(--neon-orange)]" 
                title={b}
              >
                <Award size={32} fill="currentColor" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className="relative flex-1 group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:text-[var(--accent-app)] group-focus-within:opacity-100 transition-all" size={28} />
          <input 
            type="text" 
            placeholder={t('search_jobs')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[var(--bg-app)] border-4 border-[var(--border-app)] p-8 pl-20 font-display font-black text-2xl outline-none focus:ring-4 focus:ring-[var(--accent-app)] focus:ring-opacity-20 transition-all placeholder:opacity-20"
          />
        </div>
        <button className="retro-button whitespace-nowrap flex items-center gap-3 p-8 bg-[var(--bg-app)] hover:scale-105 active:scale-95 transition-transform">
          <Filter size={28} /> <span className="text-2xl font-black">{t('all_filters').toUpperCase()}</span>
        </button>
      </div>

      {/* Recommendations Heading */}
      <div className="flex items-center gap-6 py-6 border-b-6 border-[var(--border-app)] border-dashed">
        <BarChart3 className="text-[var(--accent-app)]" size={32} />
        <h3 className="font-retro text-2xl tracking-tighter italic">RECOMMENDED MISSIONS FOR YOU</h3>
        <div className="flex-1 h-1 bg-[var(--border-app)] opacity-10"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendedMissions.map((job, idx) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5 }}
            className={cn(
              "retro-border bg-[var(--bg-app)] p-6 group cursor-pointer transition-all relative overflow-hidden",
              "hover:shadow-[6px_6px_0px_0px_var(--accent-app)]",
              "hover:border-[var(--accent-app)]"
            )}
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex-1 space-y-2">
                <span className="category-tag mb-2 border-[var(--accent-app)] text-[var(--accent-app)]">
                  {job.companyType}
                </span>
                <h3 className="font-retro text-xl tracking-tight leading-tight group-hover:translate-x-1 transition-transform">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 font-sans font-bold opacity-70 text-sm tracking-wider">
                  {job.company}
                </div>
              </div>
              <div className="text-right">
                <div className="font-retro text-xl text-[var(--accent-app)] mb-1 drop-shadow-sm">{job.stipend}</div>
                <div className="font-sans text-[10px] font-bold tracking-wider bg-[var(--border-app)] text-white px-2 py-0.5">
                  {job.duration}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8 relative z-10">
              {job.skills.map((s) => (
                <span 
                  key={s} 
                  className="category-tag bg-opacity-5 border-[var(--border-app)] opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-[var(--border-app)] border-dashed relative z-10">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 font-sans font-bold text-[10px] uppercase opacity-60">
                   <MapPin size={16} className="text-[var(--accent-app)]" /> {job.location}
                </div>
                <div className="flex items-center gap-2 font-sans font-bold text-[10px] uppercase opacity-60">
                   <Clock size={16} className="text-[var(--accent-app)]" /> {job.workMode}
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, x: 2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (job.url) window.open(job.url, '_blank');
                }}
                className="font-retro text-xs text-[var(--accent-app)] font-black flex items-center gap-1"
              >
                DEPLOY <ChevronRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Job Details Modal - simplified */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
          <motion.div 
            layoutId={selectedJob.id}
            className="w-full max-w-2xl bg-[var(--bg-app)] border-8 border-[var(--border-app)] p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="font-retro text-2xl">{selectedJob.title}</h2>
              <button onClick={() => setSelectedJob(null)} className="retro-button">{t('close')}</button>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 text-sm font-display font-bold">
                <div className="p-3 border-2 border-[var(--border-app)] rounded-lg">{t('stipend')}: <span className="text-[var(--accent-app)]">{selectedJob.stipend}</span></div>
                <div className="p-3 border-2 border-[var(--border-app)] rounded-lg">{t('duration')}: {selectedJob.duration}</div>
                <div className="p-3 border-2 border-[var(--border-app)] rounded-lg text-green-500">{t('work_mode')}: {selectedJob.workMode}</div>
              </div>

              <div>
                <h4 className="font-retro text-sm mb-2 text-[var(--accent-app)] underline">{t('job_description')}</h4>
                <p className="font-display opacity-80 leading-relaxed">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-retro text-sm mb-2 text-[var(--accent-app)] underline">{t('required_skills')}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((s: string) => (
                    <span key={s} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-[var(--border-app)] font-display font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  onClick={() => {
                    if (selectedJob.url) window.open(selectedJob.url, '_blank');
                  }}
                  className="flex-1 retro-button bg-[var(--accent-app)] text-white border-white py-4 text-xl"
                >
                  {t('start_gig')}
                </button>
                <button className="retro-button flex items-center gap-2">
                  <Star size={20} /> {t('save')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FreelancerDashboard;
