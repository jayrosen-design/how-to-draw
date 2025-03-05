
import React from 'react';
import { useNavigate } from 'react-router-dom';

export type DrawingCategory = 'person' | 'face' | 'animal';

interface CategoryCardProps {
  category: DrawingCategory;
  title: string;
  imageUrl: string;
  onSelect: (category: DrawingCategory) => void;
  delay: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, title, imageUrl, onSelect, delay }) => (
  <div 
    className={`category-card category-card-${category} animate-slide-up`} 
    style={{ animationDelay: `${delay}ms` }}
    onClick={() => onSelect(category)}
  >
    <div className="flex flex-col items-center justify-center w-full">
      <div className="category-icon mb-4">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-64 h-64 object-contain"
        />
      </div>
      <h3 className="text-2xl font-medium text-center">{title}</h3>
    </div>
  </div>
);

const CategoryMenu: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCategorySelect = (category: DrawingCategory) => {
    navigate(`/draw/${category}`);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryCard 
          category="person" 
          title="Person" 
          imageUrl="https://i.imgur.com/1ID8bSb.jpeg" 
          onSelect={handleCategorySelect}
          delay={100}
        />
        <CategoryCard 
          category="face" 
          title="Face" 
          imageUrl="https://i.imgur.com/EiJqtF1.png" 
          onSelect={handleCategorySelect}
          delay={200}
        />
        <CategoryCard 
          category="animal" 
          title="Animal" 
          imageUrl="https://imgur.com/GO3X7FX.png" 
          onSelect={handleCategorySelect}
          delay={300}
        />
      </div>
    </div>
  );
};

export default CategoryMenu;
