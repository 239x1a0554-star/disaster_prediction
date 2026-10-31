import { Download, Share2, Printer, FileText, FileJson, Table } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Reports() {
  const handleDownload = (format: string) => {
    toast.success(`Generating ${format} report...`);
    setTimeout(() => {
      toast.success(`Report downloaded successfully!`);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Generate Reports</h1>
        <p className="text-white/60 text-sm">Export analysis data in various formats for offline use.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 flex flex-col items-center text-center gap-4 cursor-pointer"
          onClick={() => handleDownload('PDF')}
        >
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center">
            <FileText size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">PDF Report</h3>
            <p className="text-sm text-white/50">Comprehensive document with images, charts, and tables.</p>
          </div>
          <button className="btn-secondary w-full mt-4 flex items-center justify-center gap-2">
            <Download size={18} /> Download
          </button>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 flex flex-col items-center text-center gap-4 cursor-pointer"
          onClick={() => handleDownload('CSV')}
        >
          <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center">
            <Table size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">CSV Data</h3>
            <p className="text-sm text-white/50">Raw building coordinates and damage classifications.</p>
          </div>
          <button className="btn-secondary w-full mt-4 flex items-center justify-center gap-2">
            <Download size={18} /> Download
          </button>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-6 flex flex-col items-center text-center gap-4 cursor-pointer"
          onClick={() => handleDownload('JSON')}
        >
          <div className="w-16 h-16 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
            <FileJson size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">JSON API</h3>
            <p className="text-sm text-white/50">Structured data for integration with GIS tools.</p>
          </div>
          <button className="btn-secondary w-full mt-4 flex items-center justify-center gap-2">
            <Download size={18} /> Download
          </button>
        </motion.div>
      </div>

      <div className="mt-12 glass-panel p-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold mb-1">Need to share externally?</h3>
          <p className="text-sm text-white/50">Generate a secure, time-limited link to share the interactive dashboard.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary flex items-center gap-2" onClick={() => window.print()}>
            <Printer size={18} /> Print
          </button>
          <button className="btn-primary flex items-center gap-2" onClick={() => toast.success('Link copied to clipboard!')}>
            <Share2 size={18} /> Generate Link
          </button>
        </div>
      </div>
    </div>
  );
}