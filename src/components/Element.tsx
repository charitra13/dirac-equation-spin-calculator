
import React from 'react';
import { cn } from '@/lib/utils';

interface ElementProps {
  symbol: string;
  number: number;
  name: string;
  mass: string;
  category: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Element = ({ symbol, number, name, mass, category, onClick, style }: ElementProps) => {
  // Get color for the category
  const getCategoryColor = () => {
    switch (category) {
      case 'alkali': return 'var(--neon-red, #FF0055)';
      case 'alkaline': return 'var(--neon-orange, #FF7700)';
      case 'transition': return 'var(--neon-yellow, #FFDD00)';
      case 'poor': return 'var(--neon-green, #00FF66)';
      case 'nonmetal': return 'var(--neon-blue, #00DDFF)';
      case 'noble': return 'var(--neon-purple, #BC00FF)';
      case 'lanthanoid': return 'var(--neon-blue, #00DDFF)';
      case 'actinoid': return 'var(--neon-pink, #FF00AA)';
      default: return 'var(--neon-blue, #00DDFF)';
    }
  };

  const borderColor = getCategoryColor();
  
  return (
    <div 
      className={cn(
        "element-card relative rounded border-2 p-1 cursor-pointer transition-all duration-300",
        `shadow-${category}`,
        category
      )}
      onClick={onClick}
      style={{
        ...style,
        borderColor,
        boxShadow: `0 0 5px ${borderColor}, 0 0 10px ${borderColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 10px ${borderColor}, 0 0 20px ${borderColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 5px ${borderColor}, 0 0 10px ${borderColor}`;
      }}
    >
      <div className="element-number text-xs opacity-80">{number}</div>
      <div className="element-symbol font-bold text-center">{symbol}</div>
      <div className="element-name truncate text-xs">{name}</div>
      <div className="element-mass truncate text-xs opacity-70">{mass}</div>
    </div>
  );
};

export default Element;
