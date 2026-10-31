import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Target, AlertTriangle, Layers } from 'lucide-react';
import ImageViewer from '../components/ImageViewer';

// Mock data
const mockPolygons = [
  { id: 'b1', damageType: 'none' as const, confidence: 0.98, area: 120, points: [{x: 100, y: 100}, {x: 200, y: 100}, {x: 200, y: 200}, {x: 100, y: 200}] },
  { id: 'b2', damageType: 'major' as const, confidence: 0.85, area: 150, points: [{x: 300, y: 150}, {x: 400, y: 150}, {x: 380, y: 250}, {x: 280, y: 220}] },
  { id: 'b3', damageType: 'destroyed' as const, confidence: 0.92, area: 90, points: [{x: 500, y: 300}, {x: 600, y: 320}, {x: 580, y: 400}, {x: 490, y: 380}] },
  { id: 'b4', damageType: 'minor' as const, confidence: 0.77, area: 210, points: [{x: 150, y: 400}, {x: 250, y: 400}, {x: 300, y: 500}, {x: 150, y: 500}] },
];

// We use a solid color placeholder image for demo since we don't have a real satellite image
const DEMO_IMAGE = 'https://images.unsplash.com/photo-1584877797746-d249f3e46c7f?auto=format&fit=crop&q=80&w=2000';

export default function PredictionResult() {
  const [selectedPoly, setSelectedPoly] = useState<any | null>(null);

  const getDamageColor = (type: string) => {
    switch(type) {
      case 'none': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'minor': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'major': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'destroyed': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-white bg-white/10';
    }
  };

  const getDamageLabel = (type: string) => {
    switch(type) {
      case 'none': return 'No Damage';
      case 'minor': return 'Minor Damage';
      case 'major': return 'Major Damage';
      case 'destroyed': return 'Destroyed';
      default: return 'Unknown';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Prediction Results</h1>
          <p className="text-white/60 text-sm">Interactive map showing YOLOv8 footprints and ResNet50 classifications.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-green-400"></span> No Damage</div>
          <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> Minor</div>
          <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-orange-400"></span> Major</div>
          <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-red-400"></span> Destroyed</div>
        </div>
      </div>

      <div className="flex-1 flex relative overflow-hidden gap-6">
        {/* Main Viewer */}
        <div className={`flex-1 transition-all duration-300 ${selectedPoly ? 'mr-[350px]' : ''}`}>
          <ImageViewer 
            imageUrl={DEMO_IMAGE} 
            polygons={mockPolygons}
            onPolygonClick={(poly) => setSelectedPoly(poly)}
          />
        </div>

        {/* Side Drawer */}
        <AnimatePresence>
          {selectedPoly && (
            <motion.div
              initial={{ x: 350, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 350, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[350px] glass-panel border-r-0 border-y-0 rounded-l-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold">Building Details</h2>
                <button 
                  onClick={() => setSelectedPoly(null)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-sm text-white/50 mb-1">Building ID</div>
                  <div className="text-lg font-mono">{selectedPoly.id.toUpperCase()}</div>
                </div>

                <div className={`border rounded-xl p-4 ${getDamageColor(selectedPoly.damageType)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={18} />
                    <span className="font-bold">Damage Assessment</span>
                  </div>
                  <div className="text-xl font-bold uppercase tracking-wider">
                    {getDamageLabel(selectedPoly.damageType)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
                      <Target size={16} /> Confidence
                    </div>
                    <div className="text-xl font-bold text-skyBlue-400">
                      {(selectedPoly.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
                      <Layers size={16} /> Est. Area
                    </div>
                    <div className="text-xl font-bold">
                      {selectedPoly.area} m²
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
                    <MapPin size={16} /> Coordinates (Polygon)
                  </div>
                  <div className="font-mono text-xs text-white/70 space-y-1">
                    {selectedPoly.points.map((pt: any, i: number) => (
                      <div key={i}>P{i+1}: [{pt.x.toFixed(1)}, {pt.y.toFixed(1)}]</div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <button className="btn-secondary w-full">Flag for Manual Review</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}