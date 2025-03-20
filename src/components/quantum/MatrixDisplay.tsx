
import React from 'react';
import { QUANTUM_GATES } from '@/utils/quantumUtils';

type MatrixDisplayProps = {
  gate: keyof typeof QUANTUM_GATES;
};

const MatrixDisplay = ({ gate }: MatrixDisplayProps) => {
  const gateInfo = QUANTUM_GATES[gate] || QUANTUM_GATES.H;
  
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
      <h3 className="text-xl font-semibold mb-4">Matrix Representation</h3>
      <div className="flex justify-center">
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex flex-col">
            {gateInfo.matrix ? (
              gateInfo.matrix.map((row, i) => (
                <div key={i} className="flex justify-center">
                  {row.map((element, j) => (
                    <div key={j} className="w-12 h-12 flex items-center justify-center text-white">
                      {element}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-gray-400">
                Matrix representation not available
              </div>
            )}
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

export default MatrixDisplay;
