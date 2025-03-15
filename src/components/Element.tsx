
import React from 'react';
import { cn } from '@/lib/utils';

interface ElementProps {
  symbol: string;
  number: number;
  name: string;
  mass: string;
  category: string;
  onClick?: () => void;
}

const Element = ({ symbol, number, name, mass, category, onClick }: ElementProps) => {
  return (
    <div 
      className={cn("element-card", category)}
      onClick={onClick}
    >
      <div className="element-number">{number}</div>
      <div className="element-symbol">{symbol}</div>
      <div className="element-name">{name}</div>
      <div className="element-mass">{mass}</div>
    </div>
  );
};

export default Element;
