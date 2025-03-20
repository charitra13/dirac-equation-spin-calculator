
import React, { useState, useEffect } from 'react';
import { CircuitBoard } from 'lucide-react';
import QuantumGuide from '@/components/QuantumGuide';
import QuantumCircuit from '@/components/quantum/QuantumCircuit';
import BlochSphere from '@/components/quantum/BlochSphere';
import MatrixDisplay from '@/components/quantum/MatrixDisplay';
import QubitsDisplay from '@/components/quantum/QubitsDisplay';
import GatesPanel from '@/components/quantum/GatesPanel';
import { QUANTUM_GATES, applyGate } from '@/utils/quantumUtils';

type CircuitOperation = {
  gate: keyof typeof QUANTUM_GATES;
  qubit: number;
  target?: number;
};

const Quantum = () => {
  const [numQubits, setNumQubits] = useState(1);
  const [qubitStates, setQubitStates] = useState(['|0⟩']);
  const [selectedGate, setSelectedGate] = useState<keyof typeof QUANTUM_GATES>('H');
  const [activeQubit, setActiveQubit] = useState(0);
  const [circuit, setCircuit] = useState<CircuitOperation[]>([]);
  
  useEffect(() => {
    const initialStates = Array(numQubits).fill('|0⟩');
    setQubitStates(initialStates);
  }, [numQubits]);
  
  const applyGateToQubit = (gate: keyof typeof QUANTUM_GATES, qubitIndex: number) => {
    const gateInfo = QUANTUM_GATES[gate];
    if (gateInfo.requiresTwo && numQubits < 2) {
      console.log("This gate requires at least 2 qubits");
      return;
    }
    
    if (gateInfo.requiresThree && numQubits < 3) {
      console.log("This gate requires at least 3 qubits");
      return;
    }
    
    if (!gateInfo.requiresTwo && !gateInfo.requiresThree) {
      setQubitStates(prev => {
        const newStates = [...prev];
        newStates[qubitIndex] = applyGate(gate, prev[qubitIndex]);
        return newStates;
      });
      
      setCircuit(prev => [...prev, { gate, qubit: qubitIndex }]);
    } 
    else if (gateInfo.requiresTwo) {
      const targetQubit = qubitIndex === 0 ? 1 : 0;
      setCircuit(prev => [...prev, { gate, qubit: qubitIndex, target: targetQubit }]);
    }
  };
  
  const resetCircuit = () => {
    setQubitStates(Array(numQubits).fill('|0⟩'));
    setCircuit([]);
  };
  
  const handleQubitChange = (num: number) => {
    setNumQubits(num);
    resetCircuit();
  };
  
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <main className="flex-1 flex flex-col container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-3 text-center">
            <CircuitBoard className="w-8 h-8 text-purple-500" />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Quantum Logic Gates Simulator
            </span>
          </h1>
          
          <QuantumGuide />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <GatesPanel 
              numQubits={numQubits}
              handleQubitChange={handleQubitChange}
              selectedGate={selectedGate}
              setSelectedGate={setSelectedGate}
              activeQubit={activeQubit}
              applyGateToQubit={applyGateToQubit}
            />
            
            <div className="lg:col-span-2 space-y-6">
              <QuantumCircuit 
                circuit={circuit} 
                qubits={qubitStates}
                onReset={resetCircuit}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QubitsDisplay 
                  qubitStates={qubitStates}
                  activeQubit={activeQubit}
                  setActiveQubit={setActiveQubit}
                />
                
                {numQubits === 1 ? (
                  <BlochSphere qubitState={qubitStates[0]} />
                ) : (
                  <MatrixDisplay gate={selectedGate} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-3 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Neon Periodic Table | Interactive Quantum Logic Gates Simulator</p>
      </footer>
    </div>
  );
};

export default Quantum;
