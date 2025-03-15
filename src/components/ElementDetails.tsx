
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface ElementDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  element: {
    name: string;
    symbol: string;
    number: number;
    mass: string;
    category: string;
    description: string;
    electronConfiguration: string;
    discoveredBy?: string;
    yearDiscovered?: string;
  } | null;
}

const ElementDetails = ({ isOpen, onClose, element }: ElementDetailsProps) => {
  if (!element) return null;

  // Function to get category label
  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'alkali': return 'Alkali Metal';
      case 'alkaline': return 'Alkaline Earth Metal';
      case 'transition': return 'Transition Metal';
      case 'poor': return 'Post-Transition Metal';
      case 'nonmetal': return 'Nonmetal';
      case 'noble': return 'Noble Gas';
      case 'lanthanoid': return 'Lanthanide';
      case 'actinoid': return 'Actinide';
      default: return 'Unknown';
    }
  };

  // Function to get class name for category-specific styling
  const getCategoryClass = (category: string) => {
    switch(category) {
      case 'alkali': return 'from-element-alkali/30 to-transparent';
      case 'alkaline': return 'from-element-alkaline/30 to-transparent';
      case 'transition': return 'from-element-transition/30 to-transparent';
      case 'poor': return 'from-element-poor/30 to-transparent';
      case 'nonmetal': return 'from-element-nonmetal/30 to-transparent';
      case 'noble': return 'from-element-noble/30 to-transparent';
      case 'lanthanoid': return 'from-element-lanthanoid/30 to-transparent';
      case 'actinoid': return 'from-element-actinoid/30 to-transparent';
      default: return 'from-gray-500/30 to-transparent';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#1a1a1a] border border-gray-800 max-w-md w-full shadow-lg rounded-md overflow-hidden">
        <DialogHeader className={`bg-gradient-to-br ${getCategoryClass(element.category)} p-6`}>
          <div className="absolute top-3 right-3">
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`element-card ${element.category} w-24 h-24 flex-shrink-0`}>
              <div className="element-number">{element.number}</div>
              <div className="element-symbol text-3xl">{element.symbol}</div>
              <div className="element-mass text-xs">{element.mass}</div>
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold mb-1">{element.name}</DialogTitle>
              <div className="text-sm opacity-70">{getCategoryLabel(element.category)}</div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
            <p className="text-sm">{element.description}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Electron Configuration</h3>
            <p className="text-sm font-mono">{element.electronConfiguration}</p>
          </div>
          
          {element.discoveredBy && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Discovery</h3>
              <p className="text-sm">
                Discovered by {element.discoveredBy}
                {element.yearDiscovered && ` in ${element.yearDiscovered}`}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ElementDetails;
