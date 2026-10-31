import { motion } from 'framer-motion';
import { 
  Building2, 
  AlertTriangle, 
  XOctagon, 
  CheckCircle2, 
  Activity 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const stats = [
  { label: 'Total Buildings', value: '14,234', icon: Building2, color: 'text-skyBlue-400', bg: 'bg-skyBlue-500/10' },
  { label: 'No Damage', value: '8,432', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10' },
  { label: 'Minor Damage', value: '3,102', icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { label: 'Major Damage', value: '1,845', icon: Activity, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { label: 'Destroyed', value: '855', icon: XOctagon, color: 'text-red-400', bg: 'bg-red-500/10' }
];

const barData = [
  { name: 'Region A', none: 4000, minor: 2400, major: 2400, destroyed: 800 },
  { name: 'Region B', none: 3000, minor: 1398, major: 2210, destroyed: 600 },
  { name: 'Region C', none: 2000, minor: 9800, major: 2290, destroyed: 400 },
  { name: 'Region D', none: 2780, minor: 3908, major: 2000, destroyed: 900 },
];

const pieData = [
  { name: 'No Damage', value: 8432, color: '#4ade80' },
  { name: 'Minor', value: 3102, color: '#facc15' },
  { name: 'Major', value: 1845, color: '#fb923c' },
  { name: 'Destroyed', value: 855, color: '#f87171' },
];

const timelineData = [
  { time: '00:00', accuracy: 82 },
  { time: '04:00', accuracy: 84 },
  { time: '08:00', accuracy: 87 },
  { time: '12:00', accuracy: 89 },
  { time: '16:00', accuracy: 91 },
  { time: '20:00', accuracy: 94 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
          <p className="text-white/60 text-sm">Real-time statistics of satellite damage assessments.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-5 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/60 text-sm font-medium">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Damage Distribution Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-bold mb-6">Regional Damage Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1F3A', borderColor: 'rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="none" stackId="a" fill="#4ade80" radius={[0, 0, 4, 4]} />
                <Bar dataKey="minor" stackId="a" fill="#facc15" />
                <Bar dataKey="major" stackId="a" fill="#fb923c" />
                <Bar dataKey="destroyed" stackId="a" fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Overall Breakdown Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6"
        >
          <h3 className="text-lg font-bold mb-6">Overall Severity Breakdown</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1F3A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Model Accuracy Timeline Area Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6 lg:col-span-3"
        >
          <h3 className="text-lg font-bold mb-6">Model Confidence Timeline (ResNet50)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" tick={{fill: 'rgba(255,255,255,0.4)'}} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{fill: 'rgba(255,255,255,0.4)'}} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1F3A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#38BDF8" strokeWidth={3} fillOpacity={1} fill="url(#colorAccuracy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}