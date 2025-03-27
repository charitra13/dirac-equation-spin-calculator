
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
  return (
    <div 
      className={cn("element-card", category)}
      onClick={onClick}
      style={style}
    >
      <div className="element-number">{number}</div>
      <div className="element-symbol">{symbol}</div>
      <div className="element-name truncate">{name}</div>
      <div className="element-mass truncate">{mass}</div>
    </div>
  );
};

export default Element;
