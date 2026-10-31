import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  History, 
  BarChart2, 
  FileText, 
  Settings, 
  Shield 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/upload', label: 'Upload Images', icon: UploadCloud },
  { path: '/history', label: 'History', icon: History },
  { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/reports', label: 'Reports', icon: FileText },
];

const bottomItems = [
  { path: '/profile', label: 'Profile', icon: Settings },
  { path: '/admin', label: 'Admin', icon: Shield },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen glass-panel fixed left-0 top-0 rounded-none border-y-0 border-l-0 flex flex-col z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-skyBlue-500 flex items-center justify-center font-bold text-darkBlue-900">
          AI
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">GeoDamage AI</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-2">Menu</div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300",
                isActive 
                  ? "bg-skyBlue-500/10 text-skyBlue-500 font-medium" 
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={20} className={cn(isActive ? "text-skyBlue-500" : "text-white/50")} />
              {item.label}
            </Link>
          );
        })}

        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 mt-8 px-2">Settings</div>
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300",
                isActive 
                  ? "bg-skyBlue-500/10 text-skyBlue-500 font-medium" 
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={20} className={cn(isActive ? "text-skyBlue-500" : "text-white/50")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
