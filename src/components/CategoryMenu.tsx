
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Smile, Palette, Cat, Mountain } from 'lucide-react';

export type DrawingCategory = 'person' | 'face' | 'cartoon' | 'animal' | 'landscape';

interface CategoryCardProps {
  category: DrawingCategory;
  title: string;
  icon: React.ReactNode;
  onSelect: (category: DrawingCategory) => void;
  delay: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, title, icon, onSelect, delay }) => (
  <div 
    className={`category-card category-card-${category} animate-slide-up`} 
    style={{ animationDelay: `${delay}ms` }}
    onClick={() => onSelect(category)}
  >
    <div className="category-icon">{icon}</div>
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
          icon={<User className="text-app-blue" />} 
          onSelect={handleCategorySelect}
          delay={100}
        />
        <CategoryCard 
          category="face" 
          title="Face" 
          icon={<Smile className="text-app-purple" />} 
          onSelect={handleCategorySelect}
          delay={200}
        />
        <CategoryCard 
          category="cartoon" 
          title="Cartoon Character" 
          icon={<Palette className="text-app-orange" />} 
          onSelect={handleCategorySelect}
          delay={300}
        />
        <CategoryCard 
          category="animal" 
          title="Animal" 
          icon={<Cat className="text-app-green" />} 
          onSelect={handleCategorySelect}
          delay={400}
        />
        <CategoryCard 
          category="landscape" 
          title="Landscape" 
          icon={<Mountain className="text-app-blue" />} 
          onSelect={handleCategorySelect}
          delay={500}
        />
      </div>
    </div>
  );
};

export default CategoryMenu;
