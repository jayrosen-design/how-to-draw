
import React, { useRef, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { 
  drawGuideLines, 
  getToolSettings, 
  saveCanvasToLocalStorage,
  getCanvasFromLocalStorage,
  DrawingHistoryEntry
} from '@/utils/drawingUtils';
import { DrawingTool, PencilHardness } from './DrawingTools';
import { DrawingStage } from './StageIndicator';

interface CanvasProps {
  width: number;
  height: number;
  category: string;
  stage: DrawingStage;
  tool: DrawingTool;
  pencilHardness: PencilHardness;
  color: string;
  onNewHistoryEntry: () => void;
}

const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  category,
  stage,
  tool,
  pencilHardness,
  color,
  onNewHistoryEntry
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const historyRef = useRef<DrawingHistoryEntry[]>([]);
  const canvasIdRef = useRef<string>(Date.now().toString());
  
  // Initialize canvas and try to load saved drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set the correct canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas to white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    
    // Draw guide lines
    drawGuideLines(ctx, category, width, height);
    
    // Try to load existing drawing
    const savedCanvas = getCanvasFromLocalStorage(canvasIdRef.current, category);
    if (savedCanvas) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        
        // Add to history
        if (historyRef.current.length === 0) {
          saveToHistory();
        }
      };
      img.src = savedCanvas;
    } else {
      // Save initial state to history
      saveToHistory();
    }
  }, [width, height, category]);
  
  // Function to save current canvas state to history
  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL();
    historyRef.current.push({
      dataUrl,
      timestamp: Date.now()
    });
    
    // Limit history to 20 entries
    if (historyRef.current.length > 20) {
      historyRef.current.shift();
    }
    
    onNewHistoryEntry();
  };
  
  // Apply drawing settings from the currently selected tool
  const applyToolSettings = (ctx: CanvasRenderingContext2D) => {
    const settings = getToolSettings(tool, pencilHardness, color);
    ctx.lineWidth = settings.lineWidth;
    ctx.strokeStyle = settings.strokeStyle;
    ctx.globalAlpha = settings.globalAlpha;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };
  
  // Start drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let clientX, clientY;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      
      // Prevent scrolling while drawing
      e.preventDefault();
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };
  
  // Draw on the canvas
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let clientX, clientY;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      
      // Prevent scrolling while drawing
      e.preventDefault();
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Apply tool settings
    applyToolSettings(ctx);
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastX(x);
    setLastY(y);
  };
  
  // Stop drawing
  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };
  
  // Return the canvas element
  return (
    <canvas
      ref={canvasRef}
      className="touch-none"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    />
  );
};

export default Canvas;
