import { Cpu, HardDrive, Database, Activity, FileWarning } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const metrics = [
    { label: 'GPU Utilization', value: '78%', icon: Cpu, color: 'text-skyBlue-400', progress: 78 },
    { label: 'RAM Usage', value: '42GB / 64GB', icon: Database, color: 'text-yellow-400', progress: 65 },
    { label: 'Storage', value: '1.2TB / 2TB', icon: HardDrive, color: 'text-green-400', progress: 60 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">System Administration</h1>
        <p className="text-white/60 text-sm">Monitor system health, ML models, and infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${metric.color}`}>
                  <Icon size={24} />
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-sm">{metric.label}</p>
                  <h3 className="text-xl font-bold">{metric.value}</h3>
                </div>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${metric.color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`}
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2"><Activity size={20} className="text-skyBlue-400" /> Model Status</h3>
            <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/20">HEALTHY</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
              <div>
                <div className="font-medium">YOLOv8_Building_Extraction</div>
                <div className="text-xs text-white/50">Version: v2.4.1 (Deployed 2 days ago)</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-400">99.8% Uptime</div>
                <div className="text-xs text-white/50">Avg Latency: 124ms</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
              <div>
                <div className="font-medium">ResNet50_Damage_Classifier</div>
                <div className="text-xs text-white/50">Version: v1.8.0 (Deployed 1 week ago)</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-400">100% Uptime</div>
                <div className="text-xs text-white/50">Avg Latency: 85ms</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2"><FileWarning size={20} className="text-orange-400" /> System Logs</h3>
            <button className="text-xs text-skyBlue-400 hover:underline">View All</button>
          </div>
          
          <div className="space-y-3 font-mono text-xs">
            <div className="flex gap-4 p-2 rounded hover:bg-white/5">
              <span className="text-white/40">10:42:15</span>
              <span className="text-blue-400">[INFO]</span>
              <span className="text-white/70">Model inference completed for request PRJ-1029</span>
            </div>
            <div className="flex gap-4 p-2 rounded hover:bg-white/5">
              <span className="text-white/40">10:40:02</span>
              <span className="text-green-400">[SUCCESS]</span>
              <span className="text-white/70">Database backup generated successfully</span>
            </div>
            <div className="flex gap-4 p-2 rounded hover:bg-white/5">
              <span className="text-white/40">09:15:22</span>
              <span className="text-yellow-400">[WARN]</span>
              <span className="text-white/70">High memory usage detected on Node Worker #4</span>
            </div>
            <div className="flex gap-4 p-2 rounded hover:bg-white/5">
              <span className="text-white/40">08:00:00</span>
              <span className="text-blue-400">[INFO]</span>
              <span className="text-white/70">Scheduled cron job executed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}