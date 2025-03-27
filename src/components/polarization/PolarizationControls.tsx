
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CircularPolarizationDirection, PolarizationState, PolarizationType } from '@/lib/polarizationUtils';

interface PolarizationControlsProps {
  polarizationState: PolarizationState;
  onPolarizationChange: (state: PolarizationState) => void;
}

const PolarizationControls: React.FC<PolarizationControlsProps> = ({
  polarizationState,
  onPolarizationChange
}) => {
  const handleTypeChange = (type: PolarizationType) => {
    let newState: PolarizationState = { ...polarizationState, type };
    
    // Initialize default values based on type
    if (type === 'linear' && !newState.linearAngle) {
      newState.linearAngle = 0;
    } else if (type === 'circular' && !newState.circularDirection) {
      newState.circularDirection = 'right';
    } else if (type === 'elliptical') {
      if (!newState.ellipticalRatio) newState.ellipticalRatio = 0.5;
      if (!newState.ellipticalOrientation) newState.ellipticalOrientation = 0;
    }
    
    onPolarizationChange(newState);
  };
  
  const handleCircularDirectionChange = (direction: CircularPolarizationDirection) => {
    onPolarizationChange({
      ...polarizationState,
      circularDirection: direction
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Polarization State</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue={polarizationState.type} 
          value={polarizationState.type}
          onValueChange={(value) => handleTypeChange(value as PolarizationType)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="linear">Linear</TabsTrigger>
            <TabsTrigger value="circular">Circular</TabsTrigger>
            <TabsTrigger value="elliptical">Elliptical</TabsTrigger>
          </TabsList>
          
          <TabsContent value="linear" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linear-angle">Angle: {polarizationState.linearAngle || 0}°</Label>
              <Slider
                id="linear-angle"
                min={0}
                max={180}
                step={1}
                value={[polarizationState.linearAngle || 0]}
                onValueChange={(values) => onPolarizationChange({
                  ...polarizationState,
                  linearAngle: values[0]
                })}
              />
            </div>
            <div className="w-full h-20 flex items-center justify-center">
              <div 
                className="h-2 w-16 bg-blue-500 rounded-full transform transition-transform"
                style={{ transform: `rotate(${polarizationState.linearAngle || 0}deg)` }}
              ></div>
            </div>
          </TabsContent>
          
          <TabsContent value="circular" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="circular-direction">Direction</Label>
              <div className="flex items-center space-x-2">
                <span className={polarizationState.circularDirection === 'left' ? 'font-bold' : ''}>Left</span>
                <Switch
                  id="circular-direction"
                  checked={polarizationState.circularDirection === 'right'}
                  onCheckedChange={(checked) => handleCircularDirectionChange(checked ? 'right' : 'left')}
                />
                <span className={polarizationState.circularDirection === 'right' ? 'font-bold' : ''}>Right</span>
              </div>
            </div>
            <div className="w-full h-24 flex items-center justify-center">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-2 border-blue-500 rounded-full"></div>
                <div 
                  className="absolute w-3 h-3 bg-blue-500 rounded-full"
                  style={{ 
                    animation: `circle-${polarizationState.circularDirection === 'right' ? 'right' : 'left'} 2s linear infinite`,
                    top: '0',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                ></div>
                <style>
                  {`
                  @keyframes circle-right {
                    from { transform: translateX(-50%) rotate(0deg) translateY(-24px); }
                    to { transform: translateX(-50%) rotate(360deg) translateY(-24px); }
                  }
                  @keyframes circle-left {
                    from { transform: translateX(-50%) rotate(0deg) translateY(-24px); }
                    to { transform: translateX(-50%) rotate(-360deg) translateY(-24px); }
                  }
                  `}
                </style>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="elliptical" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="elliptical-ratio">Axis Ratio: {polarizationState.ellipticalRatio || 0.5}</Label>
              <Slider
                id="elliptical-ratio"
                min={0.1}
                max={1}
                step={0.01}
                value={[polarizationState.ellipticalRatio || 0.5]}
                onValueChange={(values) => onPolarizationChange({
                  ...polarizationState,
                  ellipticalRatio: values[0]
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="elliptical-orientation">Orientation: {polarizationState.ellipticalOrientation || 0}°</Label>
              <Slider
                id="elliptical-orientation"
                min={0}
                max={180}
                step={1}
                value={[polarizationState.ellipticalOrientation || 0]}
                onValueChange={(values) => onPolarizationChange({
                  ...polarizationState,
                  ellipticalOrientation: values[0]
                })}
              />
            </div>
            <div className="w-full h-24 flex items-center justify-center">
              <div 
                className="bg-blue-500 rounded-full transition-all"
                style={{ 
                  width: '64px',
                  height: `${32 * (polarizationState.ellipticalRatio || 0.5)}px`,
                  transform: `rotate(${polarizationState.ellipticalOrientation || 0}deg)`
                }}
              ></div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PolarizationControls;
