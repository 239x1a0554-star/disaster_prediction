import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Globe, Map, BarChart3, Layers } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Satellite Imagery',
    description: 'Process high-resolution pre and post-disaster satellite images with ease.'
  },
  {
    icon: Layers,
    title: 'YOLOv8 Detection',
    description: 'State-of-the-art building extraction ensuring no structure is missed.'
  },
  {
    icon: Zap,
    title: 'ResNet50 Classification',
    description: 'Deep learning classification into No Damage, Minor, Major, and Destroyed.'
  },
  {
    icon: Map,
    title: 'Interactive Mapping',
    description: 'Custom canvas-based viewer with polygon overlays and bounding boxes.'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Generate comprehensive reports and visual data distributions.'
  },
  {
    icon: Shield,
    title: 'Enterprise Grade',
    description: 'Secure, scalable, and ready for deployment in production environments.'
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-darkBlue-900 text-white overflow-hidden selection:bg-skyBlue-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0 rounded-none px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-skyBlue-500 flex items-center justify-center font-bold text-darkBlue-900">
            AI
          </div>
          <span className="text-xl font-bold tracking-tight">GeoDamage AI</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-white/70 hover:text-white transition-colors font-medium">Log in</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-skyBlue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="text-center max-w-4xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-skyBlue-500/10 border border-skyBlue-500/20 text-skyBlue-400 text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-skyBlue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-skyBlue-500"></span>
            </span>
            Deep Learning Powered Assessment
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            Assess Disaster Damage <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-skyBlue-400 to-blue-600">
              with Autonomous AI
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Upload satellite imagery and instantly detect building damage using YOLOv8 and ResNet50. Built for scale, precision, and rapid disaster response.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <Link to="/register" className="btn-primary px-8 py-4 text-lg flex items-center gap-2">
              Start Analyzing <ArrowRight size={20} />
            </Link>
            <Link to="/dashboard" className="btn-secondary px-8 py-4 text-lg">
              View Demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 bg-darkBlue-800/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Infrastructure</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Our platform combines cutting-edge computer vision models with a highly responsive user interface.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-skyBlue-500/10 border border-skyBlue-500/20 flex items-center justify-center mb-6 text-skyBlue-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-darkBlue-900 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-skyBlue-500/20 flex items-center justify-center text-skyBlue-500 font-bold text-[10px]">
              AI
            </div>
            <span>© 2026 GeoDamage AI. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}