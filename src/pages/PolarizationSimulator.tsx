
import React, { useState, useEffect } from 'react';
import { 
  LightSourceType, 
  PolarizationState, 
  PolarizationType, 
  CircularPolarizationDirection,
  OpticalElement,
  MaterialType,
  ScatteringType,
  MaterialInteraction,
  LightSourceConfig,
  StokesParameters,
  calculateStokesParameters
} from '@/lib/polarizationUtils';
import LightSourceControls from '@/components/polarization/LightSourceControls';
import PolarizationControls from '@/components/polarization/PolarizationControls';
import OpticalElements from '@/components/polarization/OpticalElements';
import MaterialInteractions from '@/components/polarization/MaterialInteractions';
import Visualization from '@/components/polarization/Visualization';

const PolarizationSimulator: React.FC = () => {
  // Light source state
  const [lightSource, setLightSource] = useState<LightSourceConfig>({
    type: 'laser',
    wavelength: 550, // Green light
    intensity: 80
  });
  
  // Polarization state
  const [polarizationState, setPolarizationState] = useState<PolarizationState>({
    type: 'linear',
    linearAngle: 0
  });
  
  // Optical elements
  const [opticalElements, setOpticalElements] = useState<OpticalElement[]>([]);
  
  // Material interaction
  const [materialInteraction, setMaterialInteraction] = useState<MaterialInteraction>({
    material: 'glass',
    scatteringType: 'rayleigh',
    scatteringIntensity: 20
  });
  
  // Stokes parameters
  const [stokesParameters, setStokesParameters] = useState<StokesParameters>({
    S0: 80,
    S1: 80,
    S2: 0,
    S3: 0
  });
  
  // Update Stokes parameters when polarization state or intensity changes
  useEffect(() => {
    const newStokesParams = calculateStokesParameters(polarizationState, lightSource.intensity);
    setStokesParameters(newStokesParams);
  }, [polarizationState, lightSource.intensity]);
  
  // Light source handlers
  const handleSourceTypeChange = (type: LightSourceType) => {
    setLightSource(prev => ({ ...prev, type }));
    
    // Additional logic for different source types
    if (type === 'natural') {
      // Natural light is unpolarized
      setPolarizationState({
        type: 'linear',
        linearAngle: 0
      });
    } else if (type === 'laser') {
      // Laser light is typically linearly polarized
      setPolarizationState({
        type: 'linear',
        linearAngle: 0
      });
    }
  };
  
  const handleWavelengthChange = (wavelength: number) => {
    setLightSource(prev => ({ ...prev, wavelength }));
  };
  
  const handleIntensityChange = (intensity: number) => {
    setLightSource(prev => ({ ...prev, intensity }));
  };
  
  // Polarization state handlers
  const handlePolarizationChange = (state: PolarizationState) => {
    setPolarizationState(state);
  };
  
  // Optical elements handlers
  const handleElementAdd = (element: OpticalElement) => {
    setOpticalElements(prev => [...prev, element]);
  };
  
  const handleElementUpdate = (updatedElement: OpticalElement) => {
    setOpticalElements(prev => 
      prev.map(element => element.id === updatedElement.id ? updatedElement : element)
    );
  };
  
  const handleElementRemove = (id: string) => {
    setOpticalElements(prev => prev.filter(element => element.id !== id));
  };
  
  // Material interaction handlers
  const handleMaterialChange = (material: MaterialType) => {
    setMaterialInteraction(prev => ({ ...prev, material }));
  };
  
  const handleScatteringTypeChange = (scatteringType: ScatteringType) => {
    setMaterialInteraction(prev => ({ ...prev, scatteringType }));
  };
  
  const handleScatteringIntensityChange = (scatteringIntensity: number) => {
    setMaterialInteraction(prev => ({ ...prev, scatteringIntensity }));
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-transparent bg-clip-text">
        Polarization Simulator
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Visualization 
          lightSource={lightSource}
          polarizationState={polarizationState}
          stokesParameters={stokesParameters}
          opticalElements={opticalElements}
        />
        
        <div className="space-y-6">
          <LightSourceControls 
            sourceType={lightSource.type}
            wavelength={lightSource.wavelength}
            intensity={lightSource.intensity}
            onSourceTypeChange={handleSourceTypeChange}
            onWavelengthChange={handleWavelengthChange}
            onIntensityChange={handleIntensityChange}
          />
          
          <PolarizationControls 
            polarizationState={polarizationState}
            onPolarizationChange={handlePolarizationChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OpticalElements 
          elements={opticalElements}
          onElementAdd={handleElementAdd}
          onElementUpdate={handleElementUpdate}
          onElementRemove={handleElementRemove}
        />
        
        <MaterialInteractions 
          materialInteraction={materialInteraction}
          onMaterialChange={handleMaterialChange}
          onScatteringTypeChange={handleScatteringTypeChange}
          onScatteringIntensityChange={handleScatteringIntensityChange}
        />
      </div>
    </div>
  );
};

export default PolarizationSimulator;
