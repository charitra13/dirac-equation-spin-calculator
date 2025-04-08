
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PrecessionControlsProps {
  speed: number;
  setSpeed: (value: number) => void;
  is3DMode: boolean;
  setIs3DMode: (value: boolean) => void;
  larmorFrequency: number;
  setLarmorFrequency: (value: number) => void;
}

interface PresetVelocity {
  name: string;
  speed: number;
  description: string;
}

const velocityPresets: PresetVelocity[] = [
  {
    name: "Electron in Hydrogen Atom",
    speed: 0.007,
    description: "~0.007c - typical orbital velocity"
  },
  {
    name: "Muon in Muonic Atom",
    speed: 0.1,
    description: "~0.1c - higher mass means higher velocity"
  },
  {
    name: "High-Speed Electron",
    speed: 0.9,
    description: "~0.9c - strongly relativistic regime"
  }
];

const PrecessionControls: React.FC<PrecessionControlsProps> = ({
  speed,
  setSpeed,
  is3DMode,
  setIs3DMode,
  larmorFrequency,
  setLarmorFrequency
}) => {
  // Helper to format speed values
  const formatSpeed = (value: number): string => {
    return `${(value * 100).toFixed(1)}% of c`;
  };
  
  // Handle preset selection
  const handlePresetChange = (value: string) => {
    const preset = velocityPresets.find(p => p.name === value);
    if (preset) {
      setSpeed(preset.speed);
    }
  };

  // Determine speed range color
  const getSpeedRangeClass = (speed: number): string => {
    if (speed < 0.3) return "[&>.bg-primary]:bg-neon-blue";
    if (speed < 0.8) return "[&>.bg-primary]:bg-neon-purple";
    return "[&>.bg-primary]:bg-red-500";
  };
  
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="speed" className="text-gray-300">Precession Speed (Relative to c)</Label>
          <span className="text-gray-400">{formatSpeed(speed)}</span>
        </div>
        <Slider
          id="speed"
          min={0.01}
          max={0.99}
          step={0.01}
          value={[speed]}
          onValueChange={(value) => setSpeed(value[0])}
          className={getSpeedRangeClass(speed)}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>0.01c</span>
          <span>0.5c</span>
          <span>0.99c</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preset-velocities" className="text-gray-300">Reference Particle Speeds</Label>
        <Select onValueChange={handlePresetChange}>
          <SelectTrigger id="preset-velocities" className="bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Select a reference velocity" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700 text-white">
            {velocityPresets.map(preset => (
              <SelectItem 
                key={preset.name} 
                value={preset.name}
                className="text-white hover:text-neon-blue hover:bg-gray-800"
              >
                <div className="flex flex-col">
                  <span>{preset.name}</span>
                  <span className="text-xs text-gray-400">{preset.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Collapsible className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="larmor" className="text-gray-300">Larmor Frequency (Advanced)</Label>
          <CollapsibleTrigger className="flex items-center text-xs text-gray-400 hover:text-neon-blue">
            <span className="mr-1">Options</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="space-y-2 mt-2 p-3 bg-gray-900 rounded-md border border-gray-800">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Larmor Frequency:</span>
              <span className="text-gray-400">{larmorFrequency.toFixed(2)} rad/s</span>
            </div>
            <Slider
              id="larmor"
              min={0.1}
              max={2}
              step={0.1}
              value={[larmorFrequency]}
              onValueChange={(value) => setLarmorFrequency(value[0])}
              className="[&>.bg-primary]:bg-neon-green"
            />
            <div className="text-xs text-gray-500 mt-1">
              The Larmor frequency affects the base precession rate before Thomas correction.
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex items-center justify-between bg-gray-900 p-3 rounded-md">
        <div>
          <Label htmlFor="3d-mode" className="text-gray-300 font-medium">3D Bloch Sphere</Label>
          <p className="text-gray-500 text-xs mt-1">Visualize in three dimensions</p>
        </div>
        <Switch 
          id="3d-mode"
          checked={is3DMode}
          onCheckedChange={setIs3DMode}
          className="data-[state=checked]:bg-neon-green"
        />
      </div>
    </div>
  );
};

export default PrecessionControls;
