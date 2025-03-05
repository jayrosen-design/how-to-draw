
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
        className={`mb-8 text-center transform transition-all duration-700 ease-out ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Palette 
            size={40} 
            className="text-app-blue animate-float"
          />
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-app-blue via-app-purple to-app-orange">
            Doodle Dreams
          </h1>
        </div>
        <p className="text-xl text-gray-600 mt-2 max-w-xl">
          Learn to draw amazing cartoon characters in just a few simple steps!
        </p>
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
        <p className="text-gray-600">
          Select a category below to start your artistic journey! Our step-by-step guide will help you create amazing drawings in minutes.
        </p>
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
