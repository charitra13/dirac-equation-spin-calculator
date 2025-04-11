
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Beaker } from 'lucide-react';
import { EnergyMode } from '@/components/zitterbewegung/ParticleReferenceData';
import ZitterbewegungCanvas from '@/components/zitterbewegung/ZitterbewegungCanvas';
import SimulationControls from '@/components/zitterbewegung/SimulationControls';
import EquationDisplay from '@/components/zitterbewegung/EquationDisplay';
import HistoricalContext from '@/components/zitterbewegung/HistoricalContext';
import SEO from '@/components/SEO';

const ZitterbewegungSimulation: React.FC = () => {
  // Simulation state
  const [mass, setMass] = useState<number>(50);
  const [speed, setSpeed] = useState<number>(50);
  const [amplitude, setAmplitude] = useState<number>(50);
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [energyMode, setEnergyMode] = useState<EnergyMode>(EnergyMode.POSITIVE);
  const [resetKey, setResetKey] = useState<number>(0);
  
  // Force simulation reset when parameters change
  useEffect(() => {
    setResetKey(prevKey => prevKey + 1);
  }, [is3DMode, energyMode]);
  
  return (
    <>
      <SEO 
        title="Zitterbewegung Simulation | Quantum Visualizer"
        description="Explore the fascinating quantum phenomenon of Zitterbewegung (jitter motion) with our interactive simulation. Visualize how relativistic electrons combine drift motion and rapid oscillations."
        keywords="zitterbewegung, jitter motion, quantum physics, dirac equation, electron oscillations, quantum visualization, relativistic electrons"
        canonicalPath="/zitterbewegung"
        ogImage="/images/zitterbewegung-preview.png"
      />
    
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-baseline mb-8 gap-3">
          <Beaker className="w-8 h-8 text-neon-purple animate-pulse-glow" />
          <h1 className="text-2xl md:text-3xl text-center md:text-left bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent font-bold">
            Zitterbewegung Simulation
          </h1>
          <Beaker className="w-8 h-8 text-neon-pink animate-pulse-glow md:block hidden" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#1a1a1a] border-gray-800 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">What is Zitterbewegung?</CardTitle>
              <CardDescription>
                The rapid oscillatory motion of electrons
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">
                Zitterbewegung (German for "jitter motion") is a theoretical rapid oscillation of elementary particles, especially electrons, that obey the Dirac equation.
              </p>
              <p className="mb-4">
                The Dirac equation predicts oscillations with a frequency of approximately 10²¹ Hz at the Compton wavelength scale.
              </p>
              <p>
                This simulation slows down the motion significantly to visualize the concept, showing how a relativistic electron combines both drift motion and rapid oscillations.
              </p>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Card className="bg-[#1a1a1a] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Simulation</CardTitle>
                <CardDescription>
                  {is3DMode ? '3D helical visualization' : 'Electron jitter motion visualization'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 rounded-md border border-gray-800 bg-black overflow-hidden">
                  <ZitterbewegungCanvas 
                    key={resetKey} // Force re-initialization when parameters change
                    mass={mass}
                    speed={speed}
                    amplitude={amplitude}
                    is3DMode={is3DMode}
                    energyMode={energyMode}
                  />
                </div>

                <SimulationControls 
                  mass={mass}
                  setMass={setMass}
                  speed={speed}
                  setSpeed={setSpeed}
                  amplitude={amplitude}
                  setAmplitude={setAmplitude}
                  is3DMode={is3DMode}
                  setIs3DMode={setIs3DMode}
                  energyMode={energyMode}
                  setEnergyMode={setEnergyMode}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <EquationDisplay 
            mass={mass}
            amplitude={amplitude}
            frequency={mass * speed / 50}
          />
          <HistoricalContext />
        </div>
      </div>
    </>
  );
};

export default ZitterbewegungSimulation;
