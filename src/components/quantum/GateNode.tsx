
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { QUANTUM_GATES } from '@/utils/quantumUtils';

type GateNodeProps = {
  gate: keyof typeof QUANTUM_GATES;
  onClick: () => void;
};

const GateNode = ({ gate, onClick }: GateNodeProps) => {
  const gateInfo = QUANTUM_GATES[gate];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={`w-12 h-12 rounded-md flex items-center justify-center cursor-pointer transition-all
                    hover:scale-110 text-white font-bold text-lg border-2 ${gateInfo.color}`}
          onClick={onClick}
        >
          {gateInfo.symbol}
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-[200px] bg-gray-800 border-gray-700 text-white">
        <div className="space-y-1">
          <p className="font-bold">{gateInfo.name}</p>
          <p className="text-xs">{gateInfo.description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default GateNode;
