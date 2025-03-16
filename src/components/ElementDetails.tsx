
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import AtomicStructure from './AtomicStructure';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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
      <DialogContent 
        className="bg-[#121212] border border-gray-800 max-w-full w-[95vw] h-[90vh] shadow-lg rounded-md overflow-hidden p-0" 
        aria-describedby="element-description"
        // Remove the default close button from DialogContent
        closeButton={false}
      >
        <DialogTitle className="sr-only">{element.name} - Element Details</DialogTitle>
        <div className="flex flex-col h-full">
          <div className={`bg-gradient-to-br ${getCategoryClass(element.category)} p-4 sm:p-6 relative`}>
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-4">
              <div className={`element-card ${element.category} w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0`}>
                <div className="element-number">{element.number}</div>
                <div className="element-symbol text-3xl">{element.symbol}</div>
                <div className="element-mass text-xs">{element.mass}</div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1">{element.name}</h2>
                <div className="text-sm opacity-70">{getCategoryLabel(element.category)}</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Atomic Structure Visualization */}
            <div className="w-full md:w-2/3 h-[40vh] md:h-full border-b md:border-b-0 md:border-r border-gray-800">
              <AtomicStructure atomicNumber={element.number} symbol={element.symbol} />
            </div>
            
            {/* Element Information */}
            <div className="w-full md:w-1/3 p-4 sm:p-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Description</h3>
                  <p id="element-description" className="text-sm text-gray-400 leading-relaxed">{element.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Electron Configuration</h3>
                  <p className="text-sm font-mono text-gray-400">{element.electronConfiguration}</p>
                </div>
                
                {element.discoveredBy && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Discovery</h3>
                    <p className="text-sm text-gray-400">
                      Discovered by {element.discoveredBy}
                      {element.yearDiscovered && ` in ${element.yearDiscovered}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ElementDetails;
