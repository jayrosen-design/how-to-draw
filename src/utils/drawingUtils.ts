
export type DrawingHistoryEntry = {
  dataUrl: string;
  timestamp: number;
};

export const saveCanvasToLocalStorage = (
  canvasId: string, 
  dataUrl: string,
  category: string
) => {
  try {
    const key = `doodle-dreams-${category}-${canvasId}`;
    localStorage.setItem(key, dataUrl);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getCanvasFromLocalStorage = (
  canvasId: string,
  category: string
): string | null => {
  try {
    const key = `doodle-dreams-${category}-${canvasId}`;
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const getToolSettings = (
  tool: string,
  hardness: string,
  color: string
) => {
  // Map tool settings to canvas properties
  const settings = {
    lineWidth: 2,
    strokeStyle: '#000000',
    globalAlpha: 1.0,
  };
  
  // Set line width based on hardness
  switch (hardness) {
    case 'HB':
      settings.lineWidth = 2;
      break;
    case 'B2':
      settings.lineWidth = 4;
      break;
    case 'B6':
      settings.lineWidth = 6;
      break;
    default:
      settings.lineWidth = 2;
  }
  
  // Set color and alpha based on tool
  switch (tool) {
    case 'pencil':
      settings.strokeStyle = '#333333';
      settings.globalAlpha = 0.8;
      break;
    case 'bluePencil':
      settings.strokeStyle = '#61DAFB';
      settings.globalAlpha = 0.7;
      break;
    case 'eraser':
      settings.strokeStyle = '#FFFFFF';
      settings.lineWidth = 20;
      settings.globalAlpha = 1;
      break;
    case 'ink':
      settings.strokeStyle = color;
      settings.lineWidth = 3;
      settings.globalAlpha = 1;
      break;
    case 'color':
      settings.strokeStyle = color;
      settings.lineWidth = 15;
      settings.globalAlpha = 0.8;
      break;
    default:
      settings.strokeStyle = '#000000';
  }
  
  return settings;
};

export const drawGuideLines = (
  ctx: CanvasRenderingContext2D,
  category: string,
  width: number,
  height: number
) => {
  // Save the current context state
  ctx.save();
  
  // Set the style for guide lines
  ctx.strokeStyle = '#61DAFB';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.globalAlpha = 0.3;
  
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Draw different guide lines based on the category
  switch (category) {
    case 'person':
      // Draw a vertical line for the body center line
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();
      
      // Draw horizontal lines for shoulders and hips
      ctx.beginPath();
      ctx.moveTo(0, centerY * 0.7);
      ctx.lineTo(width, centerY * 0.7);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, centerY * 1.3);
      ctx.lineTo(width, centerY * 1.3);
      ctx.stroke();
      break;
      
    case 'face':
      // Draw oval face guide
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, width * 0.25, height * 0.35, 0, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw horizontal lines for eyes and mouth
      ctx.beginPath();
      ctx.moveTo(0, centerY * 0.8);
      ctx.lineTo(width, centerY * 0.8);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, centerY * 1.2);
      ctx.lineTo(width, centerY * 1.2);
      ctx.stroke();
      
      // Draw vertical center line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY * 0.4);
      ctx.lineTo(centerX, centerY * 1.6);
      ctx.stroke();
      break;
      
    case 'animal':
      // Draw a circle for the body
      ctx.beginPath();
      ctx.ellipse(centerX, centerY * 1.1, width * 0.25, height * 0.25, 0, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw a circle for the head
      ctx.beginPath();
      ctx.ellipse(centerX, centerY * 0.6, width * 0.15, height * 0.15, 0, 0, 2 * Math.PI);
      ctx.stroke();
      break;
      
    case 'landscape':
      // Draw horizon line
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      
      // Draw perspective guide lines
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(0, 0);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(width, 0);
      ctx.stroke();
      break;
      
    case 'cartoon':
      // Draw circle for cartoon character head
      ctx.beginPath();
      ctx.ellipse(centerX, centerY * 0.7, width * 0.2, height * 0.2, 0, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw rectangle for body
      ctx.beginPath();
      ctx.rect(centerX - width * 0.15, centerY * 0.9, width * 0.3, height * 0.35);
      ctx.stroke();
      break;
      
    default:
      // Draw a basic grid
      for (let i = 0; i < width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      
      for (let i = 0; i < height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
  }
  
  // Restore the original context
  ctx.restore();
};
