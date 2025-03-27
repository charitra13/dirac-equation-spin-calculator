
import React from 'react';

const Legend = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 mt-8 mb-4">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded border-2" style={{ 
          borderColor: 'var(--neon-red)',
          boxShadow: '0 0 5px var(--neon-red), 0 0 10px var(--neon-red)'
        }}></div>
        <span className="text-xs md:text-sm">Alkali Metals</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded border-2" style={{ 
          borderColor: 'var(--neon-orange)',
          boxShadow: '0 0 5px var(--neon-orange), 0 0 10px var(--neon-orange)'
        }}></div>
        <span className="text-xs md:text-sm">Alkaline Earth Metals</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded border-2" style={{ 
          borderColor: 'var(--neon-yellow)',
          boxShadow: '0 0 5px var(--neon-yellow), 0 0 10px var(--neon-yellow)'
        }}></div>
        <span className="text-xs md:text-sm">Transition Metals</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded border-2" style={{ 
          borderColor: 'var(--neon-green)',
          boxShadow: '0 0 5px var(--neon-green), 0 0 10px var(--neon-green)'
        }}></div>
        <span className="text-xs md:text-sm">Post-Transition Metals</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded border-2" style={{ 
          borderColor: 'var(--neon-blue)',
          boxShadow: '0 0 5px var(--neon-blue), 0 0 10px var(--neon-blue)'
        }}></div>
        <span className="text-xs md:text-sm">Nonmetals</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded border-2" style={{ 
          borderColor: 'var(--neon-purple)',
          boxShadow: '0 0 5px var(--neon-purple), 0 0 10px var(--neon-purple)'
        }}></div>
        <span className="text-xs md:text-sm">Noble Gases</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded border-2" style={{ 
          borderColor: 'var(--neon-blue)',
          boxShadow: '0 0 5px var(--neon-blue), 0 0 10px var(--neon-blue)'
        }}></div>
        <span className="text-xs md:text-sm">Lanthanides</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded border-2" style={{ 
          borderColor: 'var(--neon-pink)',
          boxShadow: '0 0 5px var(--neon-pink), 0 0 10px var(--neon-pink)'
        }}></div>
        <span className="text-xs md:text-sm">Actinides</span>
      </div>
    </div>
  );
};

export default Legend;
