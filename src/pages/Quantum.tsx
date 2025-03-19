
import React, { useState } from 'react';
import { Atom, Zap, Activity, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AtomicStructure, { ElectronData } from '@/components/AtomicStructure';
import ElectronSpinVisualization from '@/components/ElectronSpinVisualization';

const Quantum = () => {
  const [selectedElement, setSelectedElement] = useState('hydrogen');
  const [activeSimulation, setActiveSimulation] = useState('atomic');
  const [selectedElectron, setSelectedElectron] = useState<ElectronData | null>(null);
  const [magneticField, setMagneticField] = useState(2.0); // Default magnetic field in Tesla

  const elements = [
    { id: 'hydrogen', name: 'Hydrogen', symbol: 'H', protons: 1, neutrons: 0, electrons: 1 },
    { id: 'helium', name: 'Helium', symbol: 'He', protons: 2, neutrons: 2, electrons: 2 },
    { id: 'lithium', name: 'Lithium', symbol: 'Li', protons: 3, neutrons: 4, electrons: 3 },
    { id: 'carbon', name: 'Carbon', symbol: 'C', protons: 6, neutrons: 6, electrons: 6 },
    { id: 'oxygen', name: 'Oxygen', symbol: 'O', protons: 8, neutrons: 8, electrons: 8 }
  ];

  const currentElement = elements.find(el => el.id === selectedElement) || elements[0];

  const handleElectronSelect = (electronData: ElectronData) => {
    setSelectedElectron(electronData);
    setActiveSimulation('spin');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <main className="flex-1 flex flex-col container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-3 text-center">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Quantum Simulation Lab
            </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1 bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Atom className="text-blue-500" />
                Element Selection
              </h2>
              <div className="space-y-2">
                {elements.map(element => (
                  <Button
                    key={element.id}
                    variant={selectedElement === element.id ? "default" : "outline"}
                    className={`w-full justify-start ${selectedElement === element.id ? 'bg-blue-500/20 border-blue-500 text-white' : 'hover:border-blue-500'}`}
                    onClick={() => setSelectedElement(element.id)}
                  >
                    <span className="font-bold mr-2">{element.symbol}</span>
                    <span>{element.name}</span>
                  </Button>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Properties</h3>
                <div className="bg-[#252525] rounded p-4 space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-400">Element:</span>
                    <span>{currentElement.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Symbol:</span>
                    <span>{currentElement.symbol}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Protons:</span>
                    <span>{currentElement.protons}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Neutrons:</span>
                    <span>{currentElement.neutrons}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Electrons:</span>
                    <span>{currentElement.electrons}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
              <div className="flex space-x-4 mb-6">
                <Button
                  variant={activeSimulation === 'atomic' ? "default" : "outline"}
                  className={activeSimulation === 'atomic' ? 'bg-green-500/20 border-green-500' : 'hover:border-green-500'}
                  onClick={() => setActiveSimulation('atomic')}
                >
                  <Atom className="mr-2" />
                  Atomic Structure
                </Button>
                <Button
                  variant={activeSimulation === 'spin' ? "default" : "outline"}
                  className={activeSimulation === 'spin' ? 'bg-purple-500/20 border-purple-500' : 'hover:border-purple-500'}
                  onClick={() => setActiveSimulation('spin')}
                >
                  <Activity className="mr-2" />
                  Electron Spin
                </Button>
              </div>

              <div className="bg-[#0a0a0a] rounded-lg h-[400px] flex items-center justify-center border border-gray-700 overflow-hidden">
                {activeSimulation === 'atomic' ? (
                  <AtomicStructure 
                    atomicNumber={currentElement.protons} 
                    symbol={currentElement.symbol} 
                    onElectronSelect={handleElectronSelect}
                  />
                ) : (
                  <ElectronSpinVisualization 
                    electronData={selectedElectron}
                    atomicNumber={currentElement.protons}
                    magneticField={magneticField}
                  />
                )}
              </div>

              <div className="mt-6 bg-[#252525] p-4 rounded-lg">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <Zap className="text-yellow-500 w-5 h-5" />
                  Quantum Facts
                </h3>
                <p className="text-gray-300 text-sm">
                  {activeSimulation === 'atomic' 
                    ? `The ${currentElement.name} atom has ${currentElement.electrons} electron(s) orbiting around a nucleus containing ${currentElement.protons} proton(s) and ${currentElement.neutrons} neutron(s). According to quantum mechanics, electrons don't orbit in fixed paths but exist as probability clouds around the nucleus.`
                    : `Electrons possess an intrinsic property called spin, which can be in one of two states: "spin up" or "spin down". The Pauli Exclusion Principle states that no two electrons in an atom can have the same set of quantum numbers, which limits how electrons arrange themselves in orbitals.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-3 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Neon Periodic Table | Interactive Chemistry Reference</p>
      </footer>
    </div>
  );
};

export default Quantum;
