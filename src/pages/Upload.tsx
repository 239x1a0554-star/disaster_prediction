import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, X, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type ImageType = 'pre' | 'post';

export default function Upload() {
  const navigate = useNavigate();
  const [preImage, setPreImage] = useState<File | null>(null);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<ImageType | null>(null);

  const preInputRef = useRef<HTMLInputElement | null>(null);
  const postInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent, type: ImageType) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(null);
  };

  const handleDrop = (e: React.DragEvent, type: ImageType) => {
    e.preventDefault();
    setIsDragging(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelection(file, type);
    }
  };

  const handleFileSelection = (file: File, type: ImageType) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG, JPEG)');
      return;
    }
    
    if (type === 'pre') setPreImage(file);
    else setPostImage(file);
  };

  const handleAnalyze = () => {
    if (!preImage || !postImage) {
      toast.error('Please upload both pre and post disaster images.');
      return;
    }
    
    // In a real application, we would upload to S3/Backend here.
    // We navigate to the processing page to simulate the AI analysis pipeline.
    navigate('/processing');
  };

  const renderUploadZone = (type: ImageType, file: File | null, title: string, inputRef: React.RefObject<HTMLInputElement | null>) => {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-6 flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          {file && (
            <button 
              onClick={() => type === 'pre' ? setPreImage(null) : setPostImage(null)}
              className="text-red-400 hover:text-red-300 transition-colors p-1 rounded-full hover:bg-red-400/10"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div 
          className={`flex-1 min-h-[300px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-colors duration-300 relative overflow-hidden cursor-pointer ${
            isDragging === type ? 'border-skyBlue-500 bg-skyBlue-500/10' : 
            file ? 'border-skyBlue-500/50 bg-white/5' : 'border-white/20 bg-darkBlue-900/50 hover:bg-white/5 hover:border-white/40'
          }`}
          onDragOver={(e) => handleDragOver(e, type)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, type)}
          onClick={() => !file && inputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={inputRef} 
            className="hidden" 
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileSelection(e.target.files[0], type);
              }
            }}
          />

          <AnimatePresence mode="wait">
            {file ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full p-2"
                onClick={(e) => e.stopPropagation()} // Prevent clicking preview from opening file dialog again
              >
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`${type} disaster preview`} 
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-darkBlue-900/90 to-transparent">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-white/60">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center pointer-events-none"
              >
                <div className="w-16 h-16 rounded-full bg-skyBlue-500/10 flex items-center justify-center mb-4 text-skyBlue-400">
                  <UploadCloud size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2">Drag & Drop Image Here</h3>
                <p className="text-white/50 text-sm mb-4">or click to browse from your computer</p>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <ImageIcon size={14} />
                  <span>Supports PNG, JPG, JPEG</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">New Assessment</h1>
        <p className="text-white/60 text-sm">Upload satellite imagery to detect building damage using YOLOv8 & ResNet50.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderUploadZone('pre', preImage, 'Pre-Disaster Image', preInputRef)}
        {renderUploadZone('post', postImage, 'Post-Disaster Image', postInputRef)}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 text-skyBlue-400">
          <AlertCircle size={24} />
          <p className="text-sm">For best results, ensure both images are aligned and have similar resolution.</p>
        </div>
        
        <button 
          onClick={handleAnalyze}
          disabled={!preImage || !postImage}
          className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all duration-300 ${
            preImage && postImage 
              ? 'bg-skyBlue-500 hover:bg-skyBlue-400 text-darkBlue-900 shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] cursor-pointer' 
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          Run AI Analysis <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  );
}