
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { OpticalElement, OpticalElementType, PolarizerType, WavePlateType, BeamSplitterType } from '@/lib/polarizationUtils';

interface OpticalElementsProps {
  elements: OpticalElement[];
  onElementAdd: (element: OpticalElement) => void;
  onElementUpdate: (element: OpticalElement) => void;
  onElementRemove: (id: string) => void;
}

const OpticalElements: React.FC<OpticalElementsProps> = ({
  elements,
  onElementAdd,
  onElementUpdate,
  onElementRemove
}) => {
  const [selectedType, setSelectedType] = useState<OpticalElementType>('polarizer');
  const [selectedSubtype, setSelectedSubtype] = useState<string>('linear');
  const [elementAngle, setElementAngle] = useState(0);
  const nextId = useRef(elements.length + 1);
  
  const handleAddElement = () => {
    const newElement: OpticalElement = {
      id: `element-${nextId.current}`,
      type: selectedType,
      position: { x: 50, y: 50 }, // Center of the canvas, will be adjusted by drag & drop
      angle: elementAngle,
      subtype: selectedSubtype as any
    };
    
    onElementAdd(newElement);
    nextId.current += 1;
  };
  
  const renderSubtypeSelector = () => {
    if (selectedType === 'polarizer') {
      return (
        <Select value={selectedSubtype} onValueChange={setSelectedSubtype}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="circular">Circular</SelectItem>
          </SelectContent>
        </Select>
      );
    } else if (selectedType === 'waveplate') {
      return (
        <Select value={selectedSubtype} onValueChange={setSelectedSubtype}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quarter">Quarter-Wave (λ/4)</SelectItem>
            <SelectItem value="half">Half-Wave (λ/2)</SelectItem>
          </SelectContent>
        </Select>
      );
    } else if (selectedType === 'beamsplitter') {
      return (
        <Select value={selectedSubtype} onValueChange={setSelectedSubtype}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="polarizing">Polarizing</SelectItem>
            <SelectItem value="non-polarizing">Non-Polarizing</SelectItem>
          </SelectContent>
        </Select>
      );
    }
    return null;
  };
  
  const getElementName = (element: OpticalElement): string => {
    let name = '';
    
    switch(element.type) {
      case 'polarizer':
        name = `${element.subtype === 'linear' ? 'Linear' : 'Circular'} Polarizer`;
        break;
      case 'waveplate':
        name = `${element.subtype === 'quarter' ? 'Quarter' : 'Half'}-Wave Plate`;
        break;
      case 'birefringent':
        name = 'Birefringent Material';
        break;
      case 'beamsplitter':
        name = `${element.subtype === 'polarizing' ? 'Polarizing' : 'Non-Polarizing'} Beam Splitter`;
        break;
    }
    
    return name;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Optical Elements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Add New Element</Label>
          <div className="grid grid-cols-2 gap-2">
            <Select value={selectedType} onValueChange={(value) => {
              setSelectedType(value as OpticalElementType);
              // Reset subtype when changing element type
              if (value === 'polarizer') setSelectedSubtype('linear');
              else if (value === 'waveplate') setSelectedSubtype('quarter');
              else if (value === 'beamsplitter') setSelectedSubtype('polarizing');
              else setSelectedSubtype('');
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Element Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="polarizer">Polarizer</SelectItem>
                <SelectItem value="waveplate">Wave Plate</SelectItem>
                <SelectItem value="birefringent">Birefringent Material</SelectItem>
                <SelectItem value="beamsplitter">Beam Splitter</SelectItem>
              </SelectContent>
            </Select>
            
            {renderSubtypeSelector()}
          </div>
          
          <div className="space-y-2 pt-2">
            <Label htmlFor="element-angle">Angle: {elementAngle}°</Label>
            <Slider
              id="element-angle"
              min={0}
              max={360}
              step={1}
              value={[elementAngle]}
              onValueChange={(values) => setElementAngle(values[0])}
            />
          </div>
          
          <Button onClick={handleAddElement} className="w-full mt-4">
            Add Element
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label>Current Elements</Label>
          <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-md">
            {elements.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                No elements added yet
              </div>
            ) : (
              elements.map((element) => (
                <div key={element.id} className="flex items-center justify-between p-2 border rounded hover:bg-accent">
                  <div>
                    <div className="font-medium">{getElementName(element)}</div>
                    <div className="text-sm text-muted-foreground">Angle: {element.angle}°</div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => onElementRemove(element.id)}>
                    Remove
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpticalElements;
