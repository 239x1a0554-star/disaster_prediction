import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="h-16 glass-panel rounded-none border-t-0 border-x-0 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
        <input 
          type="text" 
          placeholder="Search locations, models, or reports..." 
          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-skyBlue-500 transition-colors"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-white/70 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-skyBlue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
        </button>
        
        <div className="h-8 w-px bg-white/10"></div>
        
        <Link to="/profile" className="flex items-center gap-3 hover:bg-white/5 px-2 py-1 rounded-lg transition-colors cursor-pointer">
          <div className="text-right">
            <div className="text-sm font-medium text-white">Researcher</div>
            <div className="text-xs text-white/50">Admin</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-darkBlue-700 border border-white/20 flex items-center justify-center">
            <User size={18} className="text-white/70" />
          </div>
        </Link>
      </div>
    </header>
  );
}
