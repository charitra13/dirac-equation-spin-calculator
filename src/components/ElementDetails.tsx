
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import AtomicStructure, { ElectronData } from './AtomicStructure';
import ElectronSpinVisualization from './ElectronSpinVisualization';
import ThomasPrecessionPanel from './ThomasPrecessionPanel';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  const [precessionMode, setPrecessionMode] = useState<'larmor' | 'thomas'>('thomas');
  const [showPrecessionCone, setShowPrecessionCone] = useState<boolean>(true);

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

  const handleMagneticFieldChange = (value: number) => {
    setMagneticField(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="bg-[#121212] border border-gray-800 max-w-full w-[95vw] h-[90vh] md:h-[90vh] shadow-lg rounded-md p-0 flex flex-col overflow-hidden" 
        aria-describedby="element-description"
        closeButton={false}
      >
        <DialogTitle className="sr-only">{element.name} - Element Details</DialogTitle>
        
        {/* Header - Fixed at the top */}
        <div className={`bg-gradient-to-br ${getCategoryClass(element.category)} p-4 sm:p-6 relative flex-shrink-0`}>
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
        
        {/* Content - Scrollable area */}
        <ScrollArea className="flex-grow overflow-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column: Atomic Structure + Electron Spin */}
            <div className="w-full lg:w-2/3 p-4">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                {/* Atomic Structure Visualization */}
                <div className="w-full md:w-1/2 h-[300px] md:h-[400px] bg-gray-900 border border-gray-800 rounded-md overflow-hidden">
                  <div className="p-3 text-sm bg-gray-800/50">
                    <h3 className="font-medium mb-1">Atomic Structure</h3>
                    <p className="text-xs text-gray-400">Click on an electron to select it. Click on the nucleus to pause/resume rotation.</p>
                  </div>
                  <div className="h-[calc(100%-40px)]">
                    <AtomicStructure 
                      atomicNumber={element.number} 
                      symbol={element.symbol}
                      onElectronSelect={handleElectronSelect}
                    />
                  </div>
                </div>
                
                {/* Electron Spin Visualization */}
                <div className="w-full md:w-1/2 h-[300px] md:h-[400px] bg-gray-900 border border-gray-800 rounded-md overflow-hidden">
                  <ElectronSpinVisualization 
                    electronData={selectedElectron}
                    atomicNumber={element.number}
                    magneticField={magneticField}
                    precessionMode={precessionMode}
                    showPrecessionCone={showPrecessionCone}
                  />
                </div>
              </div>
              
              {/* Thomas Precession Panel - Only show if an electron is selected */}
              {selectedElectron && (
                <div className="mt-4">
                  <ThomasPrecessionPanel 
                    atomicNumber={element.number}
                    element={{name: element.name, symbol: element.symbol}}
                    quantumNumbers={selectedElectron.quantumNumbers}
                    magneticField={magneticField}
                    onMagneticFieldChange={handleMagneticFieldChange}
                    precessionMode={precessionMode}
                    onPrecessionModeChange={setPrecessionMode}
                  />
                </div>
              )}
              
              {/* Visualization Options */}
              {selectedElectron && (
                <div className="mt-4 flex flex-wrap items-center gap-6 p-3 bg-gray-900 border border-gray-800 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-precession-cone"
                      checked={showPrecessionCone}
                      onCheckedChange={setShowPrecessionCone}
                    />
                    <Label htmlFor="show-precession-cone">Show Precession Cone</Label>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column: Element Information */}
            <div className="w-full lg:w-1/3 p-4 border-t lg:border-t-0 lg:border-l border-gray-800">
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
                
                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Thomas Precession</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Thomas precession is a relativistic correction to the angular velocity of a spinning particle.
                    It becomes increasingly important for elements with higher atomic numbers, where electrons
                    move at significant fractions of the speed of light.
                  </p>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                    The Thomas precession frequency ω<sub>T</sub> = ω<sub>L</sub>(1 - 1/γ), where ω<sub>L</sub> is the
                    Larmor frequency and γ is the Lorentz factor that increases with atomic number.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ElementDetails;
