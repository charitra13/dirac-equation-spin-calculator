
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import ThomasPrecessionCanvas from '@/components/thomasPrecession/ThomasPrecessionCanvas';
import PrecessionControls from '@/components/thomasPrecession/PrecessionControls';
import PrecessionEquationDisplay from '@/components/thomasPrecession/PrecessionEquationDisplay';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const ThomasPrecessionSimulation: React.FC = () => {
  // Simulation state
  const [speed, setSpeed] = useState<number>(0.3); // Default to 0.3c
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [larmorFrequency, setLarmorFrequency] = useState<number>(1.0); // Default larmor frequency
  
  // Calculate relativistic factors
  const gamma = 1 / Math.sqrt(1 - speed * speed);
  const thomasPrecessionFactor = (gamma - 1) / gamma;
  const precessionFrequency = thomasPrecessionFactor * larmorFrequency;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent md:text-3xl font-bold">
          Thomas Precession Simulation
        </h1>
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="ml-2 p-1 rounded-full hover:bg-gray-800">
              <Info className="w-5 h-5 text-neon-blue" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="bg-gray-900 border-gray-700 text-white w-80">
            <h4 className="text-neon-blue font-medium mb-2">What is Thomas Precession?</h4>
            <p className="text-sm text-gray-300">
              Thomas Precession is a relativistic correction that describes how an electron's 
              spin axis precesses due to its curved motion in an electric field. It's essential in 
              understanding spin-orbit coupling in atoms.
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1a1a1a] border-gray-800 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Thomas Precession Overview</CardTitle>
            <CardDescription>
              Relativistic effect on electron spin
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p className="mb-4">
              Thomas precession is a relativistic effect that causes the spin axis of an electron 
              to precess when it moves in a curved path through spacetime.
            </p>
            <p className="mb-4">
              This effect becomes more pronounced as the electron's velocity approaches the speed of light.
              It's a crucial correction in the fine structure of atomic spectra.
            </p>
            <p>
              Use the controls to adjust the electron's velocity relative to the speed of light (c) 
              and observe how the precession changes at different relativistic speeds.
            </p>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Simulation</CardTitle>
              <CardDescription>
                {is3DMode ? '3D Bloch sphere representation' : 'Spin precession visualization'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 rounded-md border border-gray-800 bg-black overflow-hidden">
                <ThomasPrecessionCanvas 
                  speed={speed}
                  is3DMode={is3DMode}
                  precessionFrequency={precessionFrequency}
                  larmorFrequency={larmorFrequency}
                />
              </div>

              <PrecessionControls 
                speed={speed}
                setSpeed={setSpeed}
                is3DMode={is3DMode}
                setIs3DMode={setIs3DMode}
                larmorFrequency={larmorFrequency}
                setLarmorFrequency={setLarmorFrequency}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <PrecessionEquationDisplay 
          speed={speed}
          gamma={gamma}
          thomasFactor={thomasPrecessionFactor}
          larmorFrequency={larmorFrequency}
          precessionFrequency={precessionFrequency}
        />
      </div>
    </div>
  );
};

export default ThomasPrecessionSimulation;
