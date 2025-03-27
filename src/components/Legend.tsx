
import React from 'react';

const Legend = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 mt-8 mb-4">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 alkali"></div>
        <span className="text-xs md:text-sm">Alkali Metals</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 alkaline"></div>
        <span className="text-xs md:text-sm">Alkaline Earth Metals</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 transition"></div>
        <span className="text-xs md:text-sm">Transition Metals</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 poor"></div>
        <span className="text-xs md:text-sm">Post-Transition Metals</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 nonmetal"></div>
        <span className="text-xs md:text-sm">Nonmetals</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 noble"></div>
        <span className="text-xs md:text-sm">Noble Gases</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 lanthanoid"></div>
        <span className="text-xs md:text-sm">Lanthanides</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 actinoid"></div>
        <span className="text-xs md:text-sm">Actinides</span>
      </div>
    </div>
  );
};

export default Legend;
