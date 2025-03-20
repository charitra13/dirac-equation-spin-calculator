
import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GateNode from './GateNode';

type CircuitOperation = {
  gate: any;
  qubit: number;
  target?: number;
};

type QuantumCircuitProps = {
  circuit: CircuitOperation[];
  qubits: string[];
  onReset: () => void;
};

const QuantumCircuit = ({ circuit, qubits, onReset }: QuantumCircuitProps) => {
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

export default QuantumCircuit;
