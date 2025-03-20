
import React from 'react';
import { Cpu, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { QUANTUM_GATES } from '@/utils/quantumUtils';

type GatesPanelProps = {
  numQubits: number;
  handleQubitChange: (num: number) => void;
  selectedGate: keyof typeof QUANTUM_GATES;
  setSelectedGate: (gate: keyof typeof QUANTUM_GATES) => void;
  activeQubit: number;
  applyGateToQubit: (gate: keyof typeof QUANTUM_GATES, qubitIndex: number) => void;
};

const GatesPanel = ({ 
  numQubits, 
  handleQubitChange, 
  selectedGate, 
  setSelectedGate, 
  activeQubit,
  applyGateToQubit 
}: GatesPanelProps) => {
  return (
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
      
      <TooltipProvider>
        <Tabs defaultValue="single" className="mb-4">
          <TabsList className="grid grid-cols-2 mb-4 bg-gray-800">
            <TabsTrigger value="single">Single Qubit</TabsTrigger>
            <TabsTrigger value="multi">Multi Qubit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {['X', 'Y', 'Z', 'H', 'S', 'T'].map(gate => (
                <Tooltip key={gate}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedGate === gate ? "default" : "outline"}
                      className={`${selectedGate === gate ? `bg-opacity-20 border-2 ${QUANTUM_GATES[gate].color}` : ''}`}
                      onClick={() => setSelectedGate(gate as keyof typeof QUANTUM_GATES)}
                    >
                      {QUANTUM_GATES[gate].symbol}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                    <div className="space-y-1">
                      <p className="font-bold">{QUANTUM_GATES[gate].name}</p>
                      <p className="text-xs">{QUANTUM_GATES[gate].description}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="multi" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {['CNOT', 'SWAP', 'CCNOT'].map(gate => (
                <Tooltip key={gate}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedGate === gate ? "default" : "outline"}
                      className={`${selectedGate === gate ? `bg-opacity-20 border-2 ${QUANTUM_GATES[gate].color}` : ''}`}
                      onClick={() => setSelectedGate(gate as keyof typeof QUANTUM_GATES)}
                      disabled={
                        (QUANTUM_GATES[gate].requiresTwo && numQubits < 2) || 
                        (QUANTUM_GATES[gate].requiresThree && numQubits < 3)
                      }
                    >
                      {QUANTUM_GATES[gate].symbol}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                    <div className="space-y-1">
                      <p className="font-bold">{QUANTUM_GATES[gate].name}</p>
                      <p className="text-xs">{QUANTUM_GATES[gate].description}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </TooltipProvider>
      
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
  );
};

export default GatesPanel;
