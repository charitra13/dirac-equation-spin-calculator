
import React from 'react';

type QubitProps = {
  index: number;
  state: string;
};

const Qubit = ({ index, state }: QubitProps) => {
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

export default Qubit;
