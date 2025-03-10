
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Canvas from '@/components/Canvas';
import StageIndicator, { DrawingStage } from '@/components/StageIndicator';
import DrawingTools, { DrawingTool, PencilHardness } from '@/components/DrawingTools';
import ReferenceImage from '@/components/ReferenceImage';
import { saveCanvasToLocalStorage } from '@/utils/drawingUtils';
import type { DrawingCategory } from '@/components/CategoryMenu';

interface DrawingInstructions {
  [key: string]: {
    [key in DrawingStage]?: string;
  };
}

const drawingInstructions: DrawingInstructions = {
  person: {
    sketch: "Start by drawing a simple stick figure to establish the pose and proportions.",
    refine: "Add more detail to the body outline. Remember, bodies are made of simple shapes!",
    ink: "Trace over your refined sketch with a clean ink outline.",
    color: "Fill in with colors to bring your person to life!"
  },
  face: {
    sketch: "Begin with an oval shape for the face and light lines for features.",
    refine: "Add more detail to the eyes, nose, mouth, and other facial features.",
    ink: "Trace over your refined sketch with bold, clean lines.",
    color: "Add colors to complete your face drawing!"
  },
  animal: {
    sketch: "Begin with basic shapes for the animal's body, head, and limbs.",
    refine: "Add details like fur, eyes, and distinctive animal features.",
    ink: "Create a clean outline of your animal drawing.",
    color: "Add realistic or fun colors to your animal!"
  }
};

const DrawingCanvas: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const validCategory = (category || 'person') as DrawingCategory;
  
  const [currentStage, setCurrentStage] = useState<DrawingStage>('sketch');
  const [currentTool, setCurrentTool] = useState<DrawingTool>('bluePencil'); // Default to blue pencil
  const [pencilHardness, setPencilHardness] = useState<PencilHardness>('HB');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [historyCount, setHistoryCount] = useState(0);
  const [isTracing, setIsTracing] = useState(false);
  
  const getReferenceImagePath = () => {
    try {
      const imageMap = {
        person: {
          sketch: 'https://i.imgur.com/1ID8bSb.jpeg',
          refine: 'https://i.imgur.com/1ID8bSb.jpeg',
          ink: 'https://i.imgur.com/1ID8bSb.jpeg',
          color: 'https://i.imgur.com/1ID8bSb.jpeg'
        },
        face: {
          sketch: 'https://i.imgur.com/EiJqtF1.png',
          refine: 'https://i.imgur.com/EiJqtF1.png',
          ink: 'https://i.imgur.com/EiJqtF1.png',
          color: 'https://i.imgur.com/EiJqtF1.png'
        },
        animal: {
          sketch: 'https://imgur.com/GO3X7FX.png',
          refine: 'https://imgur.com/GO3X7FX.png',
          ink: 'https://imgur.com/GO3X7FX.png',
          color: 'https://imgur.com/GO3X7FX.png'
        }
      };
      
      return imageMap[validCategory]?.[currentStage] || `/references/${validCategory}-${currentStage}.png`;
    } catch {
      return `/references/generic-${currentStage}.png`;
    }
  };
  
  const traceImagePath = getReferenceImagePath();
  
  useEffect(() => {
    switch (currentStage) {
      case 'sketch':
        setCurrentTool('bluePencil'); // Set blue pencil as default for sketch stage
        break;
      case 'refine':
        setCurrentTool('pencil');
        break;
      case 'ink':
        setCurrentTool('ink');
        setCurrentColor('#000000');
        break;
      case 'color':
        setCurrentTool('color');
        setCurrentColor('#FF6B6B');
        break;
    }
  }, [currentStage]);
  
  const handleStageChange = (stage: DrawingStage) => {
    setCurrentStage(stage);
    toast.info(`Switched to ${stage} mode!`);
    setIsTracing(false);
  };
  
  const handleSave = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL();
    
    const success = saveCanvasToLocalStorage(
      Date.now().toString(),
      dataUrl,
      validCategory
    );
    
    if (success) {
      toast.success('Your drawing has been saved!');
    } else {
      toast.error('Failed to save your drawing.');
    }
  };
  
  const handleUndo = () => {
    if (window.undoCanvas) {
      window.undoCanvas();
    } else {
      toast.error('Undo functionality not available');
    }
  };
  
  const handleNewHistoryEntry = () => {
    setHistoryCount(prev => prev + 1);
  };
  
  const handleToggleTrace = (tracingState: boolean) => {
    setIsTracing(tracingState);
    if (tracingState) {
      toast.info("Tracing enabled. Draw over the reference!");
    }
  };
  
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 hover:bg-gray-100" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} />
          <span>Back to Menu</span>
        </Button>
        
        <h1 className="text-2xl font-bold capitalize">
          {validCategory} Drawing
        </h1>
      </div>
      
      <StageIndicator 
        currentStage={currentStage} 
        onStageChange={handleStageChange} 
      />
      
      <div className="mt-4 bg-app-blue/10 border border-app-blue/20 p-4 rounded-lg mb-6 animate-fade-in">
        <p className="text-center font-medium text-gray-700">
          {drawingInstructions[validCategory]?.[currentStage] || 
           "Let's get creative! Draw following the guide lines."}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="md:order-0 md:w-64 flex flex-col gap-6">
          <ReferenceImage 
            category={validCategory}
            stage={currentStage}
            onToggleTrace={handleToggleTrace}
            isTracing={isTracing}
          />
          
          <div className="flex md:flex-col justify-center md:justify-start items-center gap-4 p-2">
            <DrawingTools 
              stage={currentStage}
              currentTool={currentTool}
              pencilHardness={pencilHardness}
              currentColor={currentColor}
              onToolChange={setCurrentTool}
              onPencilHardnessChange={setPencilHardness}
              onColorChange={setCurrentColor}
              onUndo={handleUndo}
              onSave={handleSave}
            />
          </div>
        </div>
        
        <div className="flex-1 canvas-container">
          <Canvas 
            width={800} 
            height={600}
            category={validCategory}
            stage={currentStage}
            tool={currentTool}
            pencilHardness={pencilHardness}
            color={currentColor}
            onNewHistoryEntry={handleNewHistoryEntry}
            traceImageUrl={traceImagePath}
            isTracing={isTracing}
          />
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
