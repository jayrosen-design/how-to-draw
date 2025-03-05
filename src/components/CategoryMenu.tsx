
import React from 'react';
import { useNavigate } from 'react-router-dom';

export type DrawingCategory = 'person' | 'face' | 'cartoon' | 'animal' | 'landscape';

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
    <div className="category-icon">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-10 h-10 object-contain"
      />
    </div>
    <h3 className="text-lg font-medium">{title}</h3>
  </div>
);

const CategoryMenu: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCategorySelect = (category: DrawingCategory) => {
    navigate(`/draw/${category}`);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
          imageUrl="https://i.imgur.com/zzPBKCL.png" 
          onSelect={handleCategorySelect}
          delay={300}
        />
      </div>
    </div>
  );
};

export default CategoryMenu;
