
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EnergyMode, energyModeOptions } from './ParticleReferenceData';
import ParticleSlider from './ParticleSlider';

interface SimulationControlsProps {
  mass: number;
  setMass: (value: number) => void;
  speed: number;
  setSpeed: (value: number) => void;
  amplitude: number;
  setAmplitude: (value: number) => void;
  is3DMode: boolean;
  setIs3DMode: (value: boolean) => void;
  energyMode: EnergyMode;
  setEnergyMode: (value: EnergyMode) => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  mass,
  setMass,
  speed,
  setSpeed,
  amplitude,
  setAmplitude,
  is3DMode,
  setIs3DMode,
  energyMode,
  setEnergyMode
}) => {
  return (
    <div className="grid gap-6">
      <ParticleSlider value={mass} onChange={setMass} />

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="speed" className="text-gray-300">Simulation Speed</Label>
          <span className="text-gray-400">{speed}%</span>
        </div>
        <Slider
          id="speed"
          min={10}
          max={100}
          step={1}
          value={[speed]}
          onValueChange={(value) => setSpeed(value[0])}
          className="[&>.bg-primary]:bg-neon-purple"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="amplitude" className="text-gray-300">Oscillation Amplitude</Label>
          <span className="text-gray-400">{amplitude}%</span>
        </div>
        <Slider
          id="amplitude"
          min={10}
          max={100}
          step={1}
          value={[amplitude]}
          onValueChange={(value) => setAmplitude(value[0])}
          className="[&>.bg-primary]:bg-neon-pink"
        />
      </div>

      <div className="flex items-center justify-between bg-gray-900 p-3 rounded-md">
        <div>
          <Label htmlFor="3d-mode" className="text-gray-300 font-medium">3D View</Label>
          <p className="text-gray-500 text-xs mt-1">Visualize helical trajectory</p>
        </div>
        <Switch 
          id="3d-mode"
          checked={is3DMode}
          onCheckedChange={setIs3DMode}
          className="data-[state=checked]:bg-neon-green"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="energy-mode" className="text-gray-300">Electron Energy Mode</Label>
        <Select 
          value={energyMode} 
          onValueChange={(value) => setEnergyMode(value as EnergyMode)}
        >
          <SelectTrigger id="energy-mode" className="bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Select energy mode" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700 text-white">
            {energyModeOptions.map(option => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="text-white hover:text-neon-blue hover:bg-gray-800"
              >
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  <span className="text-xs text-gray-400">{option.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SimulationControls;
