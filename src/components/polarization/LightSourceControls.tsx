
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { LightSourceType, WAVELENGTH_RANGE, wavelengthToColor } from '@/lib/polarizationUtils';

interface LightSourceControlsProps {
  sourceType: LightSourceType;
  wavelength: number;
  intensity: number;
  onSourceTypeChange: (type: LightSourceType) => void;
  onWavelengthChange: (wavelength: number) => void;
  onIntensityChange: (intensity: number) => void;
}

const LightSourceControls: React.FC<LightSourceControlsProps> = ({
  sourceType,
  wavelength,
  intensity,
  onSourceTypeChange,
  onWavelengthChange,
  onIntensityChange
}) => {
  const lightColor = wavelengthToColor(wavelength);
  const isVisible = wavelength >= WAVELENGTH_RANGE.visible.min && wavelength <= WAVELENGTH_RANGE.visible.max;
  const spectrumType = wavelength < WAVELENGTH_RANGE.visible.min ? 'UV' : 
                      wavelength > WAVELENGTH_RANGE.visible.max ? 'IR' : 'Visible';
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="h-4 w-4 rounded-full mr-2" style={{ backgroundColor: lightColor }}></div>
          Light Source
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="source-type">Source Type</Label>
          <Select value={sourceType} onValueChange={(value) => onSourceTypeChange(value as LightSourceType)}>
            <SelectTrigger id="source-type">
              <SelectValue placeholder="Select light source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="natural">Natural Light</SelectItem>
              <SelectItem value="laser">Laser</SelectItem>
              <SelectItem value="led">LED</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="wavelength">Wavelength ({wavelength} nm)</Label>
            <span className="text-sm text-muted-foreground">{spectrumType}</span>
          </div>
          <Slider
            id="wavelength"
            min={WAVELENGTH_RANGE.min}
            max={WAVELENGTH_RANGE.max}
            step={1}
            value={[wavelength]}
            onValueChange={(values) => onWavelengthChange(values[0])}
            className="py-4"
          />
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-purple-600 via-blue-500 via-green-500 via-yellow-500 to-red-600"></div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="intensity">Intensity ({intensity}%)</Label>
          <Slider
            id="intensity"
            min={0}
            max={100}
            step={1}
            value={[intensity]}
            onValueChange={(values) => onIntensityChange(values[0])}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LightSourceControls;
