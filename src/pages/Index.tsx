
import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import CategoryMenu from '@/components/CategoryMenu';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Title with animation */}
      <div 
        className={`mb-12 text-center transform transition-all duration-700 ease-out ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Palette 
            size={40} 
            className="text-app-blue animate-float"
          />
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-app-blue via-app-purple to-app-orange">
            How to Draw Tutorials
          </h1>
        </div>
      </div>

      {/* Welcome message with animation */}
      <div 
        className={`mb-8 max-w-2xl text-center transform transition-all duration-700 delay-300 ease-out ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Choose What You Want to Draw
        </h2>
      </div>

      {/* Category selection grid */}
      <div 
        className={`w-full transform transition-all duration-700 delay-500 ease-out ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <CategoryMenu />
      </div>
    </div>
  );
};

export default Index;
