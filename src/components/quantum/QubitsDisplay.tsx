
import React from 'react';
import { Box } from 'lucide-react';

type QubitsDisplayProps = {
  qubitStates: string[];
  activeQubit: number;
  setActiveQubit: (index: number) => void;
};

const QubitsDisplay = ({ qubitStates, activeQubit, setActiveQubit }: QubitsDisplayProps) => {
  return (
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
  );
};

export default QubitsDisplay;
