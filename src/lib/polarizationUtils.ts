
// Light source types
export type LightSourceType = 'natural' | 'laser' | 'led';

// Polarization types
export type PolarizationType = 'linear' | 'circular' | 'elliptical';
export type CircularPolarizationDirection = 'left' | 'right';

// Optical element types
export type OpticalElementType = 'polarizer' | 'waveplate' | 'birefringent' | 'beamsplitter';
export type PolarizerType = 'linear' | 'circular';
export type WavePlateType = 'quarter' | 'half';
export type BeamSplitterType = 'polarizing' | 'non-polarizing';

// Material types for interaction
export type MaterialType = 'glass' | 'water' | 'metal';
export type ScatteringType = 'rayleigh' | 'mie' | 'tyndall';

// Light source configuration
export interface LightSourceConfig {
  type: LightSourceType;
  wavelength: number; // in nanometers
  intensity: number; // 0 to 100
}

// Polarization state
export interface PolarizationState {
  type: PolarizationType;
  linearAngle?: number; // for linear polarization, in degrees
  circularDirection?: CircularPolarizationDirection; // for circular polarization
  ellipticalRatio?: number; // for elliptical polarization, ratio of minor to major axis
  ellipticalOrientation?: number; // for elliptical polarization, in degrees
}

// Optical element configuration
export interface OpticalElement {
  id: string;
  type: OpticalElementType;
  position: { x: number; y: number };
  angle: number; // in degrees
  subtype?: PolarizerType | WavePlateType | BeamSplitterType;
}

// Material interaction configuration
export interface MaterialInteraction {
  material: MaterialType;
  brewsterAngle?: number; // calculated based on material
  scatteringType?: ScatteringType;
  scatteringIntensity?: number; // 0 to 100
}

// Constants for the simulation
export const WAVELENGTH_RANGE = {
  min: 380, // UV
  max: 780, // IR
  visible: {
    min: 380,
    max: 750
  }
};

export const MATERIAL_REFRACTIVE_INDICES = {
  glass: 1.52,
  water: 1.33,
  metal: 0 // Special case, handled differently
};

// Calculate Brewster's angle
export const calculateBrewstersAngle = (materialType: MaterialType): number => {
  if (materialType === 'metal') {
    return 0; // Metals don't have a Brewster's angle in the same way
  }
  const n = MATERIAL_REFRACTIVE_INDICES[materialType];
  return Math.atan(n) * (180 / Math.PI); // Convert to degrees
};

// Get a color for the visible wavelength
export const wavelengthToColor = (wavelength: number): string => {
  if (wavelength < WAVELENGTH_RANGE.visible.min || wavelength > WAVELENGTH_RANGE.visible.max) {
    return 'rgba(255, 255, 255, 0.5)'; // Outside visible spectrum
  }
  
  // Simplified conversion of wavelength to RGB
  let r = 0, g = 0, b = 0;
  
  if (wavelength >= 380 && wavelength < 440) {
    r = -(wavelength - 440) / (440 - 380);
    b = 1;
  } else if (wavelength >= 440 && wavelength < 490) {
    g = (wavelength - 440) / (490 - 440);
    b = 1;
  } else if (wavelength >= 490 && wavelength < 510) {
    g = 1;
    b = -(wavelength - 510) / (510 - 490);
  } else if (wavelength >= 510 && wavelength < 580) {
    r = (wavelength - 510) / (580 - 510);
    g = 1;
  } else if (wavelength >= 580 && wavelength < 645) {
    r = 1;
    g = -(wavelength - 645) / (645 - 580);
  } else if (wavelength >= 645 && wavelength <= 780) {
    r = 1;
  }
  
  // Intensity correction
  let factor = 1;
  if (wavelength >= 380 && wavelength < 420) {
    factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
  } else if (wavelength >= 700 && wavelength <= 780) {
    factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);
  }
  
  r = Math.round(255 * Math.pow(r * factor, 0.8));
  g = Math.round(255 * Math.pow(g * factor, 0.8));
  b = Math.round(255 * Math.pow(b * factor, 0.8));
  
  return `rgb(${r}, ${g}, ${b})`;
};

// Calculate Stokes parameters
export interface StokesParameters {
  S0: number; // Total intensity
  S1: number; // Linear horizontal/vertical polarization
  S2: number; // Linear +45/-45 polarization
  S3: number; // Circular right/left polarization
}

export const calculateStokesParameters = (state: PolarizationState, intensity: number): StokesParameters => {
  let S0 = intensity;
  let S1 = 0, S2 = 0, S3 = 0;
  
  if (state.type === 'linear' && state.linearAngle !== undefined) {
    const angle = state.linearAngle * Math.PI / 180; // Convert to radians
    S1 = intensity * Math.cos(2 * angle);
    S2 = intensity * Math.sin(2 * angle);
  } else if (state.type === 'circular' && state.circularDirection !== undefined) {
    S3 = intensity * (state.circularDirection === 'right' ? 1 : -1);
  } else if (state.type === 'elliptical' && 
             state.ellipticalRatio !== undefined && 
             state.ellipticalOrientation !== undefined) {
    const angle = state.ellipticalOrientation * Math.PI / 180;
    const ratio = state.ellipticalRatio;
    S1 = intensity * (1 - ratio * ratio) / (1 + ratio * ratio) * Math.cos(2 * angle);
    S2 = intensity * (1 - ratio * ratio) / (1 + ratio * ratio) * Math.sin(2 * angle);
    // S3 would depend on the handedness of the elliptical polarization
  }
  
  return { S0, S1, S2, S3 };
};
