
import React from 'react';

type BlochSphereProps = {
  qubitState: string;
};

const BlochSphere = ({ qubitState }: BlochSphereProps) => {
  let pointX = 0;
  let pointY = 0;
  let pointZ = 0;
  
  if (qubitState === '|0⟩') {
    pointZ = -30;
  } else if (qubitState === '|1⟩') {
    pointZ = 30;
  } else if (qubitState === '|+⟩') {
    pointX = 30;
    pointZ = 0;
  } else if (qubitState === '|-⟩') {
    pointX = -30;
    pointZ = 0;
  }

  const stateStyle = {
    transform: `translate(${pointX}px, ${pointZ}px)`,
    transition: 'transform 0.5s ease-out',
  };

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
        
        <div 
          className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_10px_rgba(255,255,255,0.3)]"
          style={stateStyle}
        ></div>
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

export default BlochSphere;
