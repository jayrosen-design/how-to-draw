
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Canvas from '@/components/Canvas';
import StageIndicator, { DrawingStage } from '@/components/StageIndicator';
import DrawingTools, { DrawingTool, PencilHardness } from '@/components/DrawingTools';
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
  cartoon: {
    sketch: "Start with simple shapes to build your cartoon character's structure.",
    refine: "Add character-defining features and exaggerate proportions for a cartoon feel.",
    ink: "Outline your character with smooth, bold lines.",
    color: "Use bright colors to make your cartoon character pop!"
  },
  animal: {
    sketch: "Begin with basic shapes for the animal's body, head, and limbs.",
    refine: "Add details like fur, eyes, and distinctive animal features.",
    ink: "Create a clean outline of your animal drawing.",
    color: "Add realistic or fun colors to your animal!"
  },
  landscape: {
    sketch: "Start with the horizon line and basic shapes for main landscape elements.",
    refine: "Add more detail to trees, mountains, buildings, or other features.",
    ink: "Create clean outlines of your landscape elements.",
    color: "Add colors to bring your landscape to life!"
  }
};

const DrawingCanvas: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Validate the category parameter
  const validCategory = (category || 'person') as DrawingCategory;
  
  // State for current stage, tool, and other settings
  const [currentStage, setCurrentStage] = useState<DrawingStage>('sketch');
  const [currentTool, setCurrentTool] = useState<DrawingTool>('pencil');
  const [pencilHardness, setPencilHardness] = useState<PencilHardness>('HB');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [historyCount, setHistoryCount] = useState(0);
  
  // Set the initial tool based on the stage
  useEffect(() => {
    switch (currentStage) {
      case 'sketch':
        setCurrentTool('pencil');
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
        setCurrentColor('#FF6B6B'); // Set an initial color
        break;
    }
  }, [currentStage]);
  
  // Handle stage change
  const handleStageChange = (stage: DrawingStage) => {
    setCurrentStage(stage);
    toast.info(`Switched to ${stage} mode!`);
  };
  
  // Handle saving the drawing
  const handleSave = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL();
    
    // Save to local storage
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
  
  // Handle undo
  const handleUndo = () => {
    // This will be handled by the Canvas component
    toast.info('Undo last action');
  };
  
  // Update history count
  const handleNewHistoryEntry = () => {
    setHistoryCount(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-6 flex flex-col">
      {/* Header */}
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
      
      {/* Stage Indicator */}
      <StageIndicator 
        currentStage={currentStage} 
        onStageChange={handleStageChange} 
      />
      
      {/* Instruction Box */}
      <div className="bg-app-blue/10 border border-app-blue/20 p-4 rounded-lg mb-6 animate-fade-in">
        <p className="text-center font-medium text-gray-700">
          {drawingInstructions[validCategory]?.[currentStage] || 
           "Let's get creative! Draw following the guide lines."}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Drawing Tools */}
        <div className="md:order-1 flex md:flex-col justify-center md:justify-start items-center gap-4 p-2">
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
        
        {/* Canvas Container */}
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
          />
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
