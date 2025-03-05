
import React from 'react';
import { cn } from '@/lib/utils';

export type DrawingStage = 'sketch' | 'refine' | 'ink' | 'color';

interface StageIndicatorProps {
  currentStage: DrawingStage;
  onStageChange: (stage: DrawingStage) => void;
}

const stages: Array<{ id: DrawingStage; label: string }> = [
  { id: 'sketch', label: 'Sketch' },
  { id: 'refine', label: 'Refine' },
  { id: 'ink', label: 'Ink' },
  { id: 'color', label: 'Color' }
];

const StageIndicator: React.FC<StageIndicatorProps> = ({ currentStage, onStageChange }) => {
  const currentIndex = stages.findIndex(stage => stage.id === currentStage);
  
  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto mb-8">
      {stages.map((stage, index) => {
        // Determine if this stage is active, completed, or upcoming
        const isActive = stage.id === currentStage;
        const isCompleted = index < currentIndex;
        const isUpcoming = index > currentIndex;
        
        return (
          <React.Fragment key={stage.id}>
            {/* Stage circle */}
            <button
              onClick={() => onStageChange(stage.id)}
              className={cn(
                "relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                isActive && "bg-app-blue text-black scale-110 shadow-md",
                isCompleted && "bg-app-green text-black",
                isUpcoming && "bg-gray-200 text-gray-500"
              )}
            >
              {index + 1}
              <span className="absolute -bottom-7 whitespace-nowrap text-xs">
                {stage.label}
              </span>
            </button>
            
            {/* Connector line between circles (except after the last one) */}
            {index < stages.length - 1 && (
              <div 
                className={cn(
                  "h-1 flex-grow mx-1",
                  index < currentIndex ? "bg-app-green" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StageIndicator;
