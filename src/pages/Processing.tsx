import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, LocateFixed, Layers, BrainCircuit, CheckCircle } from 'lucide-react';

const steps = [
  { id: 1, title: 'Uploading Images', icon: UploadCloud, description: 'Transferring high-res imagery to GPU cluster' },
  { id: 2, title: 'Detecting Buildings', icon: LocateFixed, description: 'Running YOLOv8 for building footprint extraction' },
  { id: 3, title: 'Extracting Patches', icon: Layers, description: 'Generating individual building crops for analysis' },
  { id: 4, title: 'Running ResNet50', icon: BrainCircuit, description: 'Classifying damage severity per building' },
  { id: 5, title: 'Finalizing Report', icon: CheckCircle, description: 'Generating polygons and interactive map overlays' },
];

export default function Processing() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate the AI processing pipeline
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/result/demo-id-123');
        }, 1000);
      } else if (currentProgress > 80) {
        setCurrentStep(5);
      } else if (currentProgress > 60) {
        setCurrentStep(4);
      } else if (currentProgress > 40) {
        setCurrentStep(3);
      } else if (currentProgress > 20) {
        setCurrentStep(2);
      }
    }, 100); // 10 seconds total simulation

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="max-w-xl w-full">
        
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="w-24 h-24 rounded-full border-4 border-white/5 border-t-skyBlue-500 border-r-skyBlue-500 mx-auto mb-8 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <BrainCircuit size={32} className="text-skyBlue-400" />
            </motion.div>
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-2">Analyzing Satellite Data</h2>
          <p className="text-white/50">Please wait while our models process your request.</p>
        </div>

        {/* Circular Progress text */}
        <div className="flex justify-between items-end mb-4 px-2">
          <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-skyBlue-400 to-blue-600">
            {progress}%
          </span>
          <span className="text-sm font-medium text-white/50 mb-1">
            Estimated time: {Math.ceil((100 - progress) / 10)}s
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-darkBlue-900/50 rounded-full overflow-hidden mb-12 border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-skyBlue-500 to-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-4 relative">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-white/10"></div>
          
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.id * 0.1 }}
                className={`relative flex items-center gap-6 p-4 rounded-xl transition-colors ${
                  isActive ? 'bg-skyBlue-500/10 border border-skyBlue-500/20' : 'opacity-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors ${
                  isActive ? 'bg-skyBlue-500 text-darkBlue-900 shadow-[0_0_15px_rgba(56,189,248,0.5)]' :
                  isCompleted ? 'bg-green-500 text-darkBlue-900' : 'bg-darkBlue-800 border border-white/20'
                }`}>
                  {isCompleted ? <CheckCircle size={24} /> : <Icon size={24} />}
                </div>
                
                <div>
                  <h4 className={`text-lg font-bold ${isActive ? 'text-skyBlue-400' : 'text-white'}`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-white/60">{step.description}</p>
                </div>
                
                {isActive && (
                  <motion.div className="ml-auto flex gap-1">
                    <motion.span animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-skyBlue-500"></motion.span>
                    <motion.span animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-skyBlue-500"></motion.span>
                    <motion.span animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-skyBlue-500"></motion.span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}