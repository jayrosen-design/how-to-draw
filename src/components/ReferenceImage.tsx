
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DrawingStage } from './StageIndicator';
import { DrawingCategory } from './CategoryMenu';

// Mapping of reference images for each category and stage
const referenceImages: Record<DrawingCategory, Record<DrawingStage, string>> = {
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
  cartoon: {
    sketch: 'https://i.imgur.com/GO3X7FX.png',
    refine: 'https://i.imgur.com/GO3X7FX.png',
    ink: 'https://i.imgur.com/GO3X7FX.png',
    color: 'https://i.imgur.com/GO3X7FX.png'
  },
  animal: {
    sketch: 'https://i.imgur.com/zzPBKCL.png',
    refine: 'https://i.imgur.com/zzPBKCL.png',
    ink: 'https://i.imgur.com/zzPBKCL.png',
    color: 'https://i.imgur.com/zzPBKCL.png'
  },
  landscape: {
    sketch: '/references/landscape-sketch.png',
    refine: '/references/landscape-refine.png',
    ink: '/references/landscape-ink.png',
    color: '/references/landscape-color.png'
  }
};

// Fallback images if specific ones aren't available
const fallbackImages: Record<DrawingStage, string> = {
  sketch: '/references/generic-sketch.png',
  refine: '/references/generic-refine.png',
  ink: '/references/generic-ink.png',
  color: '/references/generic-color.png'
};

interface ReferenceImageProps {
  category: DrawingCategory;
  stage: DrawingStage;
  onToggleTrace: (isTracing: boolean) => void;
  isTracing: boolean;
}

const ReferenceImage: React.FC<ReferenceImageProps> = ({ 
  category, 
  stage, 
  onToggleTrace,
  isTracing
}) => {
  // Get the appropriate image path
  const getImagePath = () => {
    try {
      // Try to get the specific image for this category and stage
      return referenceImages[category][stage];
    } catch {
      // If not available, use the fallback for this stage
      return fallbackImages[stage];
    }
  };

  const imagePath = getImagePath();

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white rounded-lg shadow-md p-2 border border-gray-200">
        <img 
          src={imagePath} 
          alt={`${category} ${stage} reference`} 
          className="w-full h-auto object-contain"
          onError={(e) => {
            // If the image fails to load, use a placeholder
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      <Button 
        variant={isTracing ? "default" : "outline"} 
        className="w-full flex items-center justify-center gap-2"
        onClick={() => onToggleTrace(!isTracing)}
      >
        {isTracing ? (
          <>
            <EyeOff size={16} />
            <span>Hide Trace</span>
          </>
        ) : (
          <>
            <Eye size={16} />
            <span>Show Trace</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ReferenceImage;
