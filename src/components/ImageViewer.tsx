import { useEffect, useRef, useState } from 'react';
import { Maximize, ZoomIn, ZoomOut, MousePointer2, Move } from 'lucide-react';

interface Polygon {
  id: string;
  points: { x: number; y: number }[];
  damageType: 'none' | 'minor' | 'major' | 'destroyed';
  confidence: number;
  area: number;
}

interface ImageViewerProps {
  imageUrl: string;
  polygons: Polygon[];
  onPolygonClick: (polygon: Polygon) => void;
}

const colors = {
  none: { fill: 'rgba(74, 222, 128, 0.3)', stroke: 'rgb(74, 222, 128)' },
  minor: { fill: 'rgba(250, 204, 21, 0.3)', stroke: 'rgb(250, 204, 21)' },
  major: { fill: 'rgba(251, 146, 60, 0.3)', stroke: 'rgb(251, 146, 60)' },
  destroyed: { fill: 'rgba(248, 113, 113, 0.3)', stroke: 'rgb(248, 113, 113)' }
};

export default function ImageViewer({ imageUrl, polygons, onPolygonClick }: ImageViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredPoly, setHoveredPoly] = useState<string | null>(null);
  const [mode, setMode] = useState<'pan' | 'select'>('select');

  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load Image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imgRef.current = img;
      draw();
    };
  }, [imageUrl]);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imgRef.current;
    
    if (!canvas || !ctx || !img) return;

    // Clear and setup
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Setup transform
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    // Draw Image
    ctx.drawImage(img, 0, 0);

    // Draw Polygons
    polygons.forEach(poly => {
      ctx.beginPath();
      ctx.moveTo(poly.points[0].x, poly.points[0].y);
      for (let i = 1; i < poly.points.length; i++) {
        ctx.lineTo(poly.points[i].x, poly.points[i].y);
      }
      ctx.closePath();

      const color = colors[poly.damageType];
      
      // Hover effect
      if (hoveredPoly === poly.id) {
        ctx.fillStyle = color.fill.replace('0.3', '0.6'); // Make more opaque
        ctx.lineWidth = 3;
      } else {
        ctx.fillStyle = color.fill;
        ctx.lineWidth = 2;
      }
      
      ctx.strokeStyle = color.stroke;
      ctx.fill();
      ctx.stroke();
    });

    ctx.restore();
  };

  useEffect(() => {
    draw();
  }, [scale, offset, hoveredPoly, polygons]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
        draw();
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTransformedPoint = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    
    return {
      x: (mouseX - offset.x) / scale,
      y: (mouseY - offset.y) / scale
    };
  };

  const isPointInPolygon = (point: {x: number, y: number}, vs: {x: number, y: number}[]) => {
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i].x, yi = vs[i].y;
        let xj = vs[j].x, yj = vs[j].y;
        let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (mode === 'pan' || (mode === 'select' && !hoveredPoly)) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      return;
    }

    if (mode === 'select') {
      const pt = getTransformedPoint(e.clientX, e.clientY);
      let found = null;
      for (const poly of polygons) {
        if (isPointInPolygon(pt, poly.points)) {
          found = poly.id;
          break; // Since we found one, break (could handle overlaps later)
        }
      }
      setHoveredPoly(found);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = found ? 'pointer' : 'default';
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (mode === 'select' && hoveredPoly && !isDragging) {
      const poly = polygons.find(p => p.id === hoveredPoly);
      if (poly) onPolygonClick(poly);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    const wheel = e.deltaY < 0 ? 1 : -1;
    let zoom = Math.exp(wheel * zoomIntensity);
    
    // Limit scale
    const newScale = scale * zoom;
    if (newScale < 0.1 || newScale > 10) return;

    // Zoom to mouse position
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setOffset(prev => ({
      x: mouseX - (mouseX - prev.x) * zoom,
      y: mouseY - (mouseY - prev.y) * zoom
    }));
    setScale(newScale);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative w-full h-full bg-darkBlue-900 rounded-xl overflow-hidden border border-white/10" ref={containerRef}>
      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-darkBlue-800/80 backdrop-blur border border-white/10 p-2 rounded-lg">
        <button onClick={() => setMode('select')} className={`p-2 rounded hover:bg-white/10 transition-colors ${mode === 'select' ? 'text-skyBlue-500 bg-white/5' : 'text-white'}`} title="Select">
          <MousePointer2 size={20} />
        </button>
        <button onClick={() => setMode('pan')} className={`p-2 rounded hover:bg-white/10 transition-colors ${mode === 'pan' ? 'text-skyBlue-500 bg-white/5' : 'text-white'}`} title="Pan">
          <Move size={20} />
        </button>
        <div className="w-full h-px bg-white/10 my-1"></div>
        <button onClick={() => setScale(s => s * 1.2)} className="p-2 rounded hover:bg-white/10 transition-colors text-white" title="Zoom In">
          <ZoomIn size={20} />
        </button>
        <button onClick={() => setScale(s => s / 1.2)} className="p-2 rounded hover:bg-white/10 transition-colors text-white" title="Zoom Out">
          <ZoomOut size={20} />
        </button>
        <button onClick={toggleFullscreen} className="p-2 rounded hover:bg-white/10 transition-colors text-white" title="Fullscreen">
          <Maximize size={20} />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        onWheel={handleWheel}
        className="w-full h-full"
      />
    </div>
  );
}
