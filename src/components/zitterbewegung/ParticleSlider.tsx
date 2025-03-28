
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { particleReferenceData, findClosestParticle, formatMass } from './ParticleReferenceData';

interface ParticleSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ParticleSlider: React.FC<ParticleSliderProps> = ({ value, onChange }) => {
  const closestParticle = findClosestParticle(value);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="mass" className="text-gray-300">Particle Mass</Label>
        <div className="flex items-center space-x-2">
          <Badge 
            variant="outline" 
            className="bg-gray-800 border-gray-700 text-gray-300"
          >
            {closestParticle.name} ({closestParticle.symbol})
          </Badge>
          <span className="text-gray-400">{formatMass(closestParticle.mass)}</span>
        </div>
      </div>
      
      <div className="relative mt-6 pt-2">
        <Slider
          id="mass"
          min={10}
          max={100}
          step={1}
          value={[value]} 
          onValueChange={(values) => onChange(values[0])}
          className="[&>.bg-primary]:bg-neon-blue"
        />
        
        <div className="mt-2 text-xs text-gray-500 italic">
          Slide to compare different elementary particles
        </div>
      </div>
    </div>
  );
};

export default ParticleSlider;
