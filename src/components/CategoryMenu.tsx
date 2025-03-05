
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
    <div className="flex items-center w-full">
      <div className="category-icon flex-shrink-0 mr-6">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-40 h-40 object-contain"
        />
      </div>
      <h3 className="text-2xl font-medium">{title}</h3>
    </div>
  </div>
);

const CategoryMenu: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCategorySelect = (category: DrawingCategory) => {
    navigate(`/draw/${category}`);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
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
