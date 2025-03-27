
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialInteraction, MaterialType, ScatteringType, calculateBrewstersAngle } from '@/lib/polarizationUtils';

interface MaterialInteractionsProps {
  materialInteraction: MaterialInteraction;
  onMaterialChange: (material: MaterialType) => void;
  onScatteringTypeChange: (type: ScatteringType) => void;
  onScatteringIntensityChange: (intensity: number) => void;
}

const MaterialInteractions: React.FC<MaterialInteractionsProps> = ({
  materialInteraction,
  onMaterialChange,
  onScatteringTypeChange,
  onScatteringIntensityChange
}) => {
  const brewsterAngle = calculateBrewstersAngle(materialInteraction.material);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Material Interactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="material-type">Material</Label>
          <Select 
            value={materialInteraction.material} 
            onValueChange={(value) => onMaterialChange(value as MaterialType)}
          >
            <SelectTrigger id="material-type">
              <SelectValue placeholder="Select material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="glass">Glass</SelectItem>
              <SelectItem value="water">Water</SelectItem>
              <SelectItem value="metal">Metal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="p-3 bg-muted rounded-md">
          <div className="font-medium">Brewster's Angle</div>
          <div className="text-sm">
            {materialInteraction.material === 'metal' 
              ? "Metals don't have a traditional Brewster's angle" 
              : `${brewsterAngle.toFixed(1)}°`}
          </div>
        </div>
        
        <Tabs defaultValue="rayleigh">
          <div className="flex justify-between items-center mb-2">
            <Label>Scattering Effects</Label>
            <TabsList>
              <TabsTrigger 
                value="rayleigh" 
                onClick={() => onScatteringTypeChange('rayleigh')}
              >
                Rayleigh
              </TabsTrigger>
              <TabsTrigger 
                value="mie" 
                onClick={() => onScatteringTypeChange('mie')}
              >
                Mie
              </TabsTrigger>
              <TabsTrigger 
                value="tyndall" 
                onClick={() => onScatteringTypeChange('tyndall')}
              >
                Tyndall
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="rayleigh" className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Rayleigh scattering occurs when light interacts with particles much smaller than its wavelength.
              Responsible for the blue color of the sky.
            </p>
            <Label htmlFor="rayleigh-intensity">
              Intensity: {materialInteraction.scatteringIntensity || 0}%
            </Label>
            <Slider
              id="rayleigh-intensity"
              min={0}
              max={100}
              step={1}
              value={[materialInteraction.scatteringIntensity || 0]}
              onValueChange={(values) => onScatteringIntensityChange(values[0])}
            />
          </TabsContent>
          
          <TabsContent value="mie" className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Mie scattering occurs with particles of similar size to the wavelength of light.
              Causes the white appearance of clouds.
            </p>
            <Label htmlFor="mie-intensity">
              Intensity: {materialInteraction.scatteringIntensity || 0}%
            </Label>
            <Slider
              id="mie-intensity"
              min={0}
              max={100}
              step={1}
              value={[materialInteraction.scatteringIntensity || 0]}
              onValueChange={(values) => onScatteringIntensityChange(values[0])}
            />
          </TabsContent>
          
          <TabsContent value="tyndall" className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Tyndall effect is the scattering of light by colloidal particles.
              Makes light beams visible in foggy or dusty conditions.
            </p>
            <Label htmlFor="tyndall-intensity">
              Intensity: {materialInteraction.scatteringIntensity || 0}%
            </Label>
            <Slider
              id="tyndall-intensity"
              min={0}
              max={100}
              step={1}
              value={[materialInteraction.scatteringIntensity || 0]}
              onValueChange={(values) => onScatteringIntensityChange(values[0])}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MaterialInteractions;
