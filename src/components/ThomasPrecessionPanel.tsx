
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  calculateLarmorFrequency, 
  calculateLorentzFactor, 
  calculateThomasFrequency,
  calculateSpinPrecessionFrequency,
  isRelativisticSignificant,
  formatScientificNotation
} from "@/utils/thomasPrecessionCalculations";

interface ThomasPrecessionPanelProps {
  atomicNumber: number;
  element: {
    name: string;
    symbol: string;
  };
  quantumNumbers: {
    n: number;
    l: number;
    m: number;
    s: number;
  };
  magneticField: number;
  onMagneticFieldChange: (value: number) => void;
  precessionMode: 'larmor' | 'thomas';
  onPrecessionModeChange: (mode: 'larmor' | 'thomas') => void;
}

const ThomasPrecessionPanel: React.FC<ThomasPrecessionPanelProps> = ({
  atomicNumber,
  element,
  quantumNumbers,
  magneticField,
  onMagneticFieldChange,
  precessionMode,
  onPrecessionModeChange
}) => {
  // Calculate the physics values
  const gamma = calculateLorentzFactor(atomicNumber);
  const larmorFrequency = calculateLarmorFrequency(magneticField);
  const thomasFrequency = calculateThomasFrequency(larmorFrequency, gamma);
  
  // Calculate the spin precession frequency with quantum corrections
  const spinFrequencyLarmor = calculateSpinPrecessionFrequency(
    atomicNumber, 
    magneticField, 
    quantumNumbers, 
    false
  );
  
  const spinFrequencyThomas = calculateSpinPrecessionFrequency(
    atomicNumber, 
    magneticField, 
    quantumNumbers, 
    true
  );
  
  // Current frequency based on mode
  const currentFrequency = precessionMode === 'larmor' ? spinFrequencyLarmor : spinFrequencyThomas;
  
  // Spin direction based on frequency sign
  const spinDirection = currentFrequency > 0 ? "Clockwise" : "Counterclockwise";
  
  // Check if relativistic effects are significant
  const isRelativistic = isRelativisticSignificant(atomicNumber);
  
  // Handle magnetic field adjustments
  const decreaseMagneticField = () => {
    if (magneticField > 0.1) {
      onMagneticFieldChange(parseFloat((magneticField - 0.1).toFixed(1)));
    }
  };
  
  const increaseMagneticField = () => {
    onMagneticFieldChange(parseFloat((magneticField + 0.1).toFixed(1)));
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Thomas Precession</span>
          <Tabs defaultValue={precessionMode} className="w-auto" onValueChange={(v) => onPrecessionModeChange(v as 'larmor' | 'thomas')}>
            <TabsList className="bg-gray-800">
              <TabsTrigger value="larmor">Larmor Only</TabsTrigger>
              <TabsTrigger value="thomas">Thomas Corrected</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Magnetic Field Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Magnetic Field (T)</label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6 rounded-full" 
                  onClick={decreaseMagneticField}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="mx-2 text-sm font-mono">{magneticField.toFixed(1)}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6 rounded-full" 
                  onClick={increaseMagneticField}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Slider
              value={[magneticField]}
              min={0.1}
              max={10}
              step={0.1}
              onValueChange={(values) => onMagneticFieldChange(values[0])}
            />
          </div>
          
          {/* Precession Data */}
          <div className="space-y-1 pt-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div className="text-gray-400">Element:</div>
              <div className="font-mono">{element.name} ({element.symbol})</div>
              
              <div className="text-gray-400">Atomic Number (Z):</div>
              <div className="font-mono">{atomicNumber}</div>
              
              <div className="text-gray-400">Lorentz Factor (γ):</div>
              <div className="font-mono">{gamma.toFixed(4)}</div>
              
              <div className="text-gray-400">Larmor Frequency (ω<sub>L</sub>):</div>
              <div className="font-mono">{formatScientificNotation(larmorFrequency)}</div>
              
              {precessionMode === 'thomas' && (
                <>
                  <div className="text-gray-400">Thomas Frequency (ω<sub>T</sub>):</div>
                  <div className="font-mono">{formatScientificNotation(thomasFrequency)}</div>
                </>
              )}
              
              <div className="text-gray-400">Quantum Numbers:</div>
              <div className="font-mono">
                n={quantumNumbers.n}, l={quantumNumbers.l}, 
                m={quantumNumbers.m}, s={quantumNumbers.s}
              </div>
              
              <div className="text-gray-400">Spin Precession:</div>
              <div className="font-mono">{formatScientificNotation(currentFrequency)}</div>
              
              <div className="text-gray-400">Spin Direction:</div>
              <div className="font-mono">{spinDirection}</div>
              
              <div className="text-gray-400">Relativistic Effects:</div>
              <div className="font-mono flex items-center">
                {isRelativistic ? "Significant" : "Negligible"}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 ml-1 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {isRelativistic 
                          ? `For ${element.name} (Z=${atomicNumber}), relativistic effects are significant because γ > 1.05.` 
                          : `For ${element.name} (Z=${atomicNumber}), relativistic effects are negligible because γ ≈ 1.`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          
          {/* Formula Display */}
          <div className="bg-gray-800 p-2 rounded text-xs">
            <p className="mb-1">Thomas precession formula:</p>
            <p className="font-mono">ω<sub>T</sub> = ω<sub>L</sub> × (1 - 1/γ)</p>
            <p className="mt-2 mb-1">Where Larmor frequency:</p>
            <p className="font-mono">ω<sub>L</sub> = (eB/m<sub>e</sub>) × (g/2)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThomasPrecessionPanel;
