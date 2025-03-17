
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import AtomicStructure, { ElectronData } from './AtomicStructure';
import ElectronSpinVisualization from './ElectronSpinVisualization';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Slider } from "@/components/ui/slider";

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

  const [selectedElectron, setSelectedElectron] = useState<ElectronData | null>(null);
  const [magneticField, setMagneticField] = useState<number>(1.0); // Default 1.0 Tesla

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

  const handleElectronSelect = (electronData: ElectronData) => {
    setSelectedElectron(electronData);
  };

  const handleMagneticFieldChange = (value: number[]) => {
    setMagneticField(value[0]);
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
            <div className="w-full md:w-1/3 h-[30vh] md:h-full border-b md:border-b-0 md:border-r border-gray-800">
              <div className="p-3 text-sm bg-gray-800/50">
                <h3 className="font-medium mb-1">Atomic Structure</h3>
                <p className="text-xs text-gray-400">Click on an electron to select it.</p>
              </div>
              <AtomicStructure 
                atomicNumber={element.number} 
                symbol={element.symbol}
                onElectronSelect={handleElectronSelect}
              />
            </div>
            
            {/* Electron Spin Visualization */}
            <div className="w-full md:w-1/3 h-[30vh] md:h-full border-b md:border-b-0 md:border-r border-gray-800">
              <div className="p-3 bg-gray-800/50 flex justify-between items-center">
                <h3 className="font-medium">Electron Spin</h3>
                <div className="flex items-center space-x-2 w-1/2">
                  <span className="text-xs text-gray-400">Magnetic Field (T):</span>
                  <Slider
                    value={[magneticField]}
                    min={0.1}
                    max={10}
                    step={0.1}
                    onValueChange={handleMagneticFieldChange}
                    className="w-32"
                  />
                  <span className="text-xs">{magneticField.toFixed(1)}</span>
                </div>
              </div>
              <ElectronSpinVisualization 
                electronData={selectedElectron}
                atomicNumber={element.number}
                magneticField={magneticField}
              />
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

                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Spin Theory</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Electron spin is a fundamental quantum property described by the Dirac equation. 
                    For element {element.name} (Z={element.number}), 
                    {element.number > 30 ? 
                      " relativistic effects significantly influence electron behavior." : 
                      " non-relativistic models approximate electron behavior well."}
                  </p>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                    The spin precession frequency (ω<sub>s</sub>) follows: ω<sub>s</sub> = (eB/m<sub>e</sub>)(g/2-1+1/γ)
                    where g≈2.002 is the g-factor and γ is the relativistic Lorentz factor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ElementDetails;
