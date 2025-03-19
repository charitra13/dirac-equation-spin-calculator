import React, { useState, useEffect } from 'react';
import { CircuitBoard, RotateCcw, Zap, Cpu, Code, Shuffle, Box, GitMerge, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const QUANTUM_GATES = {
  X: {
    name: 'Pauli-X (NOT)',
    symbol: 'X',
    matrix: [
      [0, 1],
      [1, 0]
    ],
    description: 'Bit flip operation. Equivalent to classical NOT gate.',
    color: 'border-red-500'
  },
  Y: {
    name: 'Pauli-Y',
    symbol: 'Y',
    matrix: [
      [0, '-i'],
      ['i', 0]
    ],
    description: 'Rotation around Y-axis of the Bloch sphere.',
    color: 'border-green-500'
  },
  Z: {
    name: 'Pauli-Z',
    symbol: 'Z',
    matrix: [
      [1, 0],
      [0, -1]
    ],
    description: 'Phase flip operation.',
    color: 'border-blue-500'
  },
  H: {
    name: 'Hadamard',
    symbol: 'H',
    matrix: [
      ['1/√2', '1/√2'],
      ['1/√2', '-1/√2']
    ],
    description: 'Creates superposition states. Rotation around diagonal axis.',
    color: 'border-purple-500'
  },
  S: {
    name: 'Phase (S)',
    symbol: 'S',
    matrix: [
      [1, 0],
      [0, 'i']
    ],
    description: 'π/2 phase rotation gate.',
    color: 'border-pink-500'
  },
  T: {
    name: 'T-Gate',
    symbol: 'T',
    matrix: [
      [1, 0],
      [0, 'e^(iπ/4)']
    ],
    description: 'π/4 phase rotation gate.',
    color: 'border-yellow-500'
  },
  CNOT: {
    name: 'CNOT',
    symbol: '⊕',
    matrix: [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ],
    description: 'Controlled-NOT gate. Flips target if control is |1⟩.',
    color: 'border-orange-500',
    requiresTwo: true
  },
  SWAP: {
    name: 'SWAP',
    symbol: '⇄',
    matrix: [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1]
    ],
    description: 'Swaps the states of two qubits.',
    color: 'border-cyan-500',
    requiresTwo: true
  },
  CCNOT: {
    name: 'Toffoli',
    symbol: 'T',
    description: 'Controlled-Controlled-NOT gate. Requires 3 qubits.',
    color: 'border-indigo-500',
    requiresThree: true
  }
};

const applyGate = (gate, state) => {
  if (gate === 'X') {
    if (state === '|0⟩') return '|1⟩';
    if (state === '|1⟩') return '|0⟩';
    if (state === '|+⟩') return '|+⟩';
    if (state === '|-⟩') return '|-⟩';
    return state;
  }
  
  if (gate === 'H') {
    if (state === '|0⟩') return '|+⟩';
    if (state === '|1⟩') return '|-⟩';
    if (state === '|+⟩') return '|0⟩';
    if (state === '|-⟩') return '|1⟩';
    return state;
  }
  
  if (gate === 'Z') {
    if (state === '|1⟩') return '|1⟩';
    if (state === '|0⟩') return '|0⟩';
    if (state === '|+⟩') return '|-⟩';
    if (state === '|-⟩') return '|+⟩';
    return state;
  }
  
  return state;
};

const Qubit = ({ index, state, onGateApply }) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="text-white mb-2">Qubit {index}</div>
      <div className="bg-gray-800 rounded-lg p-3 w-16 h-16 flex items-center justify-center text-xl border-2 border-purple-500">
        {state}
      </div>
      <div className="h-px w-full bg-gray-700 my-2"></div>
    </div>
  );
};

const GateNode = ({ gate, onClick }) => {
  const gateInfo = QUANTUM_GATES[gate];
  return (
    <div 
      className={`w-12 h-12 rounded-md flex items-center justify-center cursor-pointer transition-all
                  hover:scale-110 text-white font-bold text-lg border-2 ${gateInfo.color}`}
      onClick={onClick}
    >
      {gateInfo.symbol}
    </div>
  );
};

const QuantumCircuit = ({ circuit, qubits, onReset }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Circuit</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset}
          className="flex items-center gap-1"
        >
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>
      
      <div className="space-y-4">
        {qubits.map((qubit, i) => (
          <div key={i} className="flex items-center">
            <div className="w-12 flex-shrink-0 text-center">
              |{i}⟩
            </div>
            <div className="flex-1 h-px bg-gray-700 mx-2"></div>
            <div className="flex space-x-3">
              {circuit
                .filter(item => item.qubit === i || item.target === i)
                .map((item, j) => (
                  <div key={j} className="flex items-center justify-center w-12 h-12">
                    <GateNode 
                      gate={item.gate} 
                      onClick={() => {}} 
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlochSphere = ({ qubitState }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800 flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4">Bloch Sphere</h3>
      <div className="w-60 h-60 rounded-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center relative">
        <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_10px_5px_rgba(255,255,255,0.5)]"></div>
        
        <div className="absolute h-full w-px bg-blue-500"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-blue-500 text-xs mt-1">|0⟩</div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-blue-500 text-xs mt-1">|1⟩</div>
        
        <div className="absolute w-full h-px bg-red-500"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-red-500 text-xs ml-1">|-⟩</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500 text-xs mr-1">|+⟩</div>
        
        <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_10px_rgba(255,255,255,0.3)]"></div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-white">Current State: {qubitState}</p>
        <p className="text-gray-400 text-sm mt-2">
          The Bloch sphere is a geometric representation of a qubit's pure state space.
        </p>
      </div>
    </div>
  );
};

const MatrixDisplay = ({ gate }) => {
  const gateInfo = QUANTUM_GATES[gate] || QUANTUM_GATES.H;
  
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
      <h3 className="text-xl font-semibold mb-4">Matrix Representation</h3>
      <div className="flex justify-center">
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex flex-col">
            {gateInfo.matrix.map((row, i) => (
              <div key={i} className="flex justify-center">
                {row.map((element, j) => (
                  <div key={j} className="w-12 h-12 flex items-center justify-center text-white">
                    {element}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-white">{gateInfo.name}</p>
        <p className="text-gray-400 text-sm mt-2">{gateInfo.description}</p>
      </div>
    </div>
  );
};

const Quantum = () => {
  const [numQubits, setNumQubits] = useState(1);
  const [qubitStates, setQubitStates] = useState(['|0⟩']);
  const [selectedGate, setSelectedGate] = useState('H');
  const [activeQubit, setActiveQubit] = useState(0);
  const [circuit, setCircuit] = useState([]);
  
  useEffect(() => {
    const initialStates = Array(numQubits).fill('|0⟩');
    setQubitStates(initialStates);
  }, [numQubits]);
  
  const applyGateToQubit = (gate, qubitIndex) => {
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
  
  const handleQubitChange = (num) => {
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1 bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Cpu className="text-blue-500" />
                Quantum Gates
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">Number of Qubits</label>
                <div className="flex space-x-2">
                  {[1, 2, 3].map(num => (
                    <Button 
                      key={num}
                      variant={numQubits === num ? "default" : "outline"}
                      className={numQubits === num ? "bg-blue-500" : ""}
                      onClick={() => handleQubitChange(num)}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Tabs defaultValue="single" className="mb-4">
                <TabsList className="grid grid-cols-2 mb-4 bg-gray-800">
                  <TabsTrigger value="single">Single Qubit</TabsTrigger>
                  <TabsTrigger value="multi">Multi Qubit</TabsTrigger>
                </TabsList>
                
                <TabsContent value="single" className="mt-0">
                  <div className="grid grid-cols-2 gap-2">
                    {['X', 'Y', 'Z', 'H', 'S', 'T'].map(gate => (
                      <Button
                        key={gate}
                        variant={selectedGate === gate ? "default" : "outline"}
                        className={`${selectedGate === gate ? `bg-opacity-20 border-2 ${QUANTUM_GATES[gate].color}` : ''}`}
                        onClick={() => setSelectedGate(gate)}
                      >
                        {QUANTUM_GATES[gate].symbol}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="multi" className="mt-0">
                  <div className="grid grid-cols-2 gap-2">
                    {['CNOT', 'SWAP', 'CCNOT'].map(gate => (
                      <Button
                        key={gate}
                        variant={selectedGate === gate ? "default" : "outline"}
                        className={`${selectedGate === gate ? `bg-opacity-20 border-2 ${QUANTUM_GATES[gate].color}` : ''}`}
                        onClick={() => setSelectedGate(gate)}
                        disabled={
                          (QUANTUM_GATES[gate].requiresTwo && numQubits < 2) || 
                          (QUANTUM_GATES[gate].requiresThree && numQubits < 3)
                        }
                      >
                        {QUANTUM_GATES[gate].symbol}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Code className="text-green-500 w-5 h-5" />
                  Gate Details
                </h3>
                <div className="bg-gray-800 rounded p-4 space-y-2">
                  <p className="text-white">
                    {QUANTUM_GATES[selectedGate].name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {QUANTUM_GATES[selectedGate].description}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => applyGateToQubit(selectedGate, activeQubit)}
                >
                  <Zap className="mr-2" />
                  Apply Gate to Qubit {activeQubit}
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <QuantumCircuit 
                circuit={circuit} 
                qubits={qubitStates}
                onReset={resetCircuit}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Box className="text-orange-500" />
                    Qubit States
                  </h3>
                  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
                    {qubitStates.map((state, i) => (
                      <div 
                        key={i} 
                        className={`mb-2 p-2 rounded ${activeQubit === i ? 'bg-blue-900/30 border border-blue-500' : 'bg-gray-800'} 
                                    cursor-pointer transition-colors`}
                        onClick={() => setActiveQubit(i)}
                      >
                        <div className="flex justify-between items-center">
                          <span>Qubit {i}:</span>
                          <span className="font-mono">{state}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
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
