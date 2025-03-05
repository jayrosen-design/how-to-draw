
import React from 'react';
import { cn } from '@/lib/utils';
import { Pencil, Eraser, Paintbrush, Save, RotateCcw } from 'lucide-react';
import { DrawingStage } from './StageIndicator';

export type DrawingTool = 'pencil' | 'bluePencil' | 'eraser' | 'ink' | 'color';
export type PencilHardness = 'HB' | 'B2' | 'B6';

interface ToolButtonProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ToolButton: React.FC<ToolButtonProps> = ({ active, onClick, children, className }) => (
  <button 
    className={cn("tool-button", active && "active", className)} 
    onClick={onClick}
  >
    {children}
  </button>
);

interface DrawingToolsProps {
  stage: DrawingStage;
  currentTool: DrawingTool;
  pencilHardness: PencilHardness;
  currentColor: string;
  onToolChange: (tool: DrawingTool) => void;
  onPencilHardnessChange: (hardness: PencilHardness) => void;
  onColorChange: (color: string) => void;
  onUndo: () => void;
  onSave: () => void;
}

const DrawingTools: React.FC<DrawingToolsProps> = ({
  stage,
  currentTool,
  pencilHardness,
  currentColor,
  onToolChange,
  onPencilHardnessChange,
  onColorChange,
  onUndo,
  onSave
}) => {
  const hardnessOptions: PencilHardness[] = ['HB', 'B2', 'B6'];
  
  // Color palette - different colors based on the stage
  const colorPalette = stage === 'color' 
    ? ['#000000', '#FF6B6B', '#4CAF7C', '#61DAFB', '#FFA26B', '#9D8DF1', '#FFD56B', '#FF6B99'] 
    : ['#000000'];
  
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main tools */}
      <div className="flex flex-col items-center gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md">
        {/* Sketch tools */}
        {(stage === 'sketch' || stage === 'refine') && (
          <>
            <ToolButton 
              active={currentTool === 'pencil'} 
              onClick={() => onToolChange('pencil')}
            >
              <Pencil size={20} className="text-gray-700" />
            </ToolButton>
            
            <ToolButton 
              active={currentTool === 'bluePencil'} 
              onClick={() => onToolChange('bluePencil')}
              className="text-app-blue"
            >
              <Pencil size={20} className="text-app-blue" />
            </ToolButton>
            
            {/* Pencil hardness selector (only visible when pencil tool is active) */}
            {(currentTool === 'pencil' || currentTool === 'bluePencil') && (
              <div className="flex flex-col gap-1 mt-1">
                {hardnessOptions.map(hardness => (
                  <button
                    key={hardness}
                    className={cn(
                      "px-2 py-1 text-xs rounded",
                      pencilHardness === hardness 
                        ? "bg-gray-800 text-white" 
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    )}
                    onClick={() => onPencilHardnessChange(hardness)}
                  >
                    {hardness}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Ink tools */}
        {stage === 'ink' && (
          <ToolButton 
            active={currentTool === 'ink'} 
            onClick={() => onToolChange('ink')}
          >
            <Paintbrush size={20} className="text-gray-800" />
          </ToolButton>
        )}
        
        {/* Color tools */}
        {stage === 'color' && (
          <ToolButton 
            active={currentTool === 'color'} 
            onClick={() => onToolChange('color')}
          >
            <Paintbrush size={20} style={{ color: currentColor }} />
          </ToolButton>
        )}
        
        {/* Eraser (available in all stages) */}
        <ToolButton 
          active={currentTool === 'eraser'} 
          onClick={() => onToolChange('eraser')}
        >
          <Eraser size={20} className="text-gray-700" />
        </ToolButton>
      </div>
      
      {/* Color palette (only visible in color stage or when ink tool is selected) */}
      {(stage === 'color' || (stage === 'ink' && currentTool === 'ink')) && (
        <div className="flex flex-wrap justify-center gap-2 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md w-full max-w-[60px]">
          {colorPalette.map(color => (
            <button
              key={color}
              className={cn(
                "w-6 h-6 rounded-full transition-transform",
                currentColor === color ? "ring-2 ring-gray-400 scale-110" : "hover:scale-110"
              )}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      )}
      
      {/* Utility tools */}
      <div className="flex flex-col items-center gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md">
        <ToolButton onClick={onUndo}>
          <RotateCcw size={20} className="text-gray-700" />
        </ToolButton>
        <ToolButton onClick={onSave}>
          <Save size={20} className="text-gray-700" />
        </ToolButton>
      </div>
    </div>
  );
};

export default DrawingTools;
