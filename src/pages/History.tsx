import { Search, Filter, Trash2, Eye, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const mockHistory = [
  { id: 'PRJ-1029', date: '2026-08-03', location: 'California Coast', status: 'Completed', buildings: 1240, damage: 'High' },
  { id: 'PRJ-1028', date: '2026-08-02', location: 'Florida Keys', status: 'Completed', buildings: 850, damage: 'Minor' },
  { id: 'PRJ-1027', date: '2026-07-28', location: 'Tokyo Bay', status: 'Failed', buildings: 0, damage: 'N/A' },
  { id: 'PRJ-1026', date: '2026-07-25', location: 'Texas Region', status: 'Completed', buildings: 3420, damage: 'Critical' },
  { id: 'PRJ-1025', date: '2026-07-20', location: 'Northern Italy', status: 'Completed', buildings: 560, damage: 'Minor' },
];

export default function History() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Assessment History</h1>
          <p className="text-white/60 text-sm">View, filter, and manage your past AI predictions.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID or Location..." 
              className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-skyBlue-500 min-w-[250px]"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="text-xs uppercase bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Project ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Buildings Detected</th>
                <th className="px-6 py-4 font-medium">Overall Damage</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-skyBlue-400">{item.id}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.buildings}</td>
                  <td className="px-6 py-4">{item.damage}</td>
                  <td className="px-6 py-4 flex items-center justify-end gap-3">
                    <button className="text-white/40 hover:text-skyBlue-400 transition-colors" title="Re-analyze">
                      <RefreshCw size={18} />
                    </button>
                    <Link to={`/result/${item.id}`} className="text-white/40 hover:text-skyBlue-400 transition-colors" title="View Details">
                      <Eye size={18} />
                    </Link>
                    <button className="text-white/40 hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-sm text-white/50">
          <div>Showing 1 to 5 of 24 entries</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-skyBlue-500/20 text-skyBlue-400 border border-skyBlue-500/20 rounded">1</button>
            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors">2</button>
            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors">3</button>
            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}