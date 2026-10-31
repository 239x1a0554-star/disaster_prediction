import { User, Bell, Key, Moon, LogOut, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Profile & Settings</h1>
        <p className="text-white/60 text-sm">Manage your account, API keys, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-2.5 bg-skyBlue-500/10 text-skyBlue-400 border border-skyBlue-500/20 rounded-lg font-medium flex items-center gap-3">
            <User size={18} /> Personal Info
          </button>
          <button className="w-full text-left px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-3">
            <Key size={18} /> API Configuration
          </button>
          <button className="w-full text-left px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-3">
            <Bell size={18} /> Notifications
          </button>
          <button className="w-full text-left px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-3">
            <Moon size={18} /> Appearance
          </button>
          
          <div className="h-px bg-white/10 my-4"></div>
          
          <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-3">
            <LogOut size={18} /> Log Out
          </button>
        </div>

        <div className="md:col-span-3 glass-panel p-8">
          <h2 className="text-xl font-bold mb-6">Personal Information</h2>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-darkBlue-700 border-2 border-skyBlue-500 flex items-center justify-center relative group cursor-pointer">
                <User size={32} className="text-skyBlue-400" />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-medium">Edit</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Jane Doe</h3>
                <p className="text-white/50 text-sm">Lead Researcher</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">First Name</label>
                <input type="text" className="input-field" defaultValue="Jane" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Last Name</label>
                <input type="text" className="input-field" defaultValue="Doe" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-1.5">Email Address</label>
                <input type="email" className="input-field" defaultValue="jane.doe@geodamage.ai" disabled />
                <p className="text-xs text-white/40 mt-1">Email cannot be changed.</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-1.5">Role / Department</label>
                <input type="text" className="input-field" defaultValue="Disaster Response Analytics" />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}