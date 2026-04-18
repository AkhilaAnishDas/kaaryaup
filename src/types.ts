export type UserRole = 'freelancer' | 'hirer' | null;

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  skills: string[];
  role: UserRole;
  xp: number;
  level: number;
  badges: string[];
  location: string;
  experience?: string;
  department?: string;
  companyType?: string;
  stipend?: string;
  workMode?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  duration: string;
  stipend: string;
  location: string;
  workMode: 'Remote' | 'Office' | 'Hybrid';
  department: string;
  experience: string;
  postedBy: 'Company' | 'Consultant';
  companyType: 'Startup' | 'MNC' | 'Indian MNC' | 'Foreign MNC' | 'Corporate';
  salaryRange: string;
  progress?: number;
  tags: string[];
  url?: string;
}

export type Language = 
  | 'en' | 'hi' | 'mr' | 'bn' | 'te' | 'ta' 
  | 'gu' | 'ur' | 'kn' | 'or' | 'ml' | 'pa' | 'bho';

export interface Translation {
  [key: string]: Partial<Record<Language, string>> & { en: string };
}
