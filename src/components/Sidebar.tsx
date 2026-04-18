import React from 'react';
import { 
  Users, 
  Briefcase, 
  Settings as SettingsIcon, 
  ChevronLeft, 
  ChevronRight, 
  Trophy, 
  LayoutDashboard,
  LogOut,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeView: string;
  setActiveView: (view: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeView, setActiveView }) => {
  const { user, setUser, t, role } = useApp() as any;

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'jobs', label: user?.role === 'freelancer' ? t('find_gigs') : t('post_gigs'), icon: Briefcase },
    { id: 'profile', label: t('my_profile'), icon: Users },
    { id: 'rewards', label: t('rewards'), icon: Trophy },
    { id: 'about', label: t('about'), icon: Info },
    { id: 'settings', label: t('settings'), icon: SettingsIcon },
  ];

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full z-40 transition-all duration-300 border-r-3 border-[var(--border-app)] bg-[var(--bg-app)]",
        isOpen ? "w-60" : "w-16"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-4 top-8 bg-[var(--border-app)] text-white p-1 rounded-full border-2 border-[var(--bg-app)] z-50"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="relative w-10 h-10 bg-[var(--accent-app)] border-3 border-[var(--border-app)] flex items-center justify-center font-retro text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] transition-transform hover:scale-110">
            <span className="relative z-10 text-xl font-black italic -skew-x-6">K</span>
            <div className="absolute inset-x-0 top-0 h-0.5 bg-white opacity-40"></div>
            {/* Arrow effect */}
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white"></div>
          </div>
          {isOpen && <h1 className="font-retro text-lg tracking-tighter italic">{t('app_name')}</h1>}
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 transition-all relative group",
                activeView === item.id 
                  ? "bg-[var(--accent-app)] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-3 border-black -translate-x-0.5 -translate-y-0.5" 
                  : "hover:bg-[var(--accent-app)] hover:bg-opacity-5 opacity-70 hover:opacity-100"
              )}
            >
              <item.icon size={isOpen ? 22 : 26} className={cn(activeView === item.id ? "animate-pulse" : "group-hover:scale-110 transition-transform")} />
              {isOpen && <span className="font-retro text-[8px] tracking-widest font-black whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
              {activeView === item.id && (
                <div className="absolute left-0 top-0 w-1 h-full bg-white opacity-20"></div>
              )}
            </button>
          ))}
        </nav>

        {user && (
          <div className="p-4 border-t-2 border-[var(--border-app)] border-dashed bg-black bg-opacity-5">
            <button 
              onClick={() => setUser(null)}
              className="w-full flex items-center justify-center gap-3 p-3 text-red-500 border-2 border-transparent hover:border-red-500 hover:bg-red-500 hover:bg-opacity-10 transition-all font-retro text-[8px] tracking-widest font-black"
            >
              <LogOut size={22} />
              {isOpen && <span>{t('logout')}</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
