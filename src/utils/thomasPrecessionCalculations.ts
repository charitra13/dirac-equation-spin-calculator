
// Physical constants
export const ELECTRON_CHARGE = 1.602176634e-19; // Coulombs
export const ELECTRON_MASS = 9.1093837015e-31; // kg
export const DEFAULT_G_FACTOR = 2.00231930436; // electron g-factor
export const LIGHT_SPEED = 299792458; // m/s
export const FINE_STRUCTURE_CONSTANT = 1/137.035999084; // α

/**
 * Calculate the Lorentz factor (γ) for relativistic corrections
 * For elements, we use Z/137 as an approximation for v/c
 * @param atomicNumber - Atomic number (Z)
 */
export const calculateLorentzFactor = (atomicNumber: number): number => {
  // Use Z as a proxy for velocity relative to c
  // Z/137 is related to the fine structure constant
  const velocity = Math.min(atomicNumber * FINE_STRUCTURE_CONSTANT, 0.9);
  return 1 / Math.sqrt(1 - velocity * velocity);
};

/**
 * Calculate the Larmor frequency
 * ω_L = (e*B/m_e) * (g/2)
 * @param magneticField - Magnetic field in Tesla
 * @param gFactor - g-factor for the electron (default is ~2.002)
 */
export const calculateLarmorFrequency = (
  magneticField: number, 
  gFactor: number = DEFAULT_G_FACTOR
): number => {
  return (ELECTRON_CHARGE * magneticField / ELECTRON_MASS) * (gFactor / 2);
};

/**
 * Calculate the Thomas precession frequency
 * ω_T = ω_L * (1 - 1/γ)
 * @param larmorFrequency - The Larmor frequency
 * @param lorentzFactor - The Lorentz factor (γ)
 */
export const calculateThomasFrequency = (
  larmorFrequency: number, 
  lorentzFactor: number
): number => {
  return larmorFrequency * (1 - 1 / lorentzFactor);
};

/**
 * Calculate the total spin precession frequency based on quantum numbers
 * ω_s = (e*B/m_e) * (g/2 - 1 + 1/γ) * spin projection factor * orbital factor
 * @param atomicNumber - Atomic number (Z)
 * @param magneticField - Magnetic field in Tesla
 * @param quantumNumbers - Object containing n, l, m, s quantum numbers
 * @param useThomaseCorrection - Whether to include Thomas precession correction
 */
export const calculateSpinPrecessionFrequency = (
  atomicNumber: number,
  magneticField: number,
  quantumNumbers: { n: number; l: number; m: number; s: number },
  useThomaseCorrection: boolean = true
): number => {
  const gamma = calculateLorentzFactor(atomicNumber);
  const gFactor = DEFAULT_G_FACTOR;
  
  // Basic Larmor component
  let spinFrequency = (ELECTRON_CHARGE * magneticField / ELECTRON_MASS) * (gFactor / 2);
  
  // Apply Thomas correction if enabled
  if (useThomaseCorrection) {
    spinFrequency *= (1 - 1 / gamma);
  }
  
  // Apply quantum number adjustments
  // Spin projection factor based on s quantum number
  const spinProjectionFactor = quantumNumbers.s > 0 ? 1 : -1;
  
  // Orbital contribution based on l and m (magnetic quantum number affects precession)
  const orbitalFactor = 1 + (quantumNumbers.m / (quantumNumbers.l + 1));
  
  return spinFrequency * spinProjectionFactor * orbitalFactor;
};

/**
 * Determine if relativistic effects are significant for this element
 * @param atomicNumber - Atomic number (Z)
 */
export const isRelativisticSignificant = (atomicNumber: number): boolean => {
  const gamma = calculateLorentzFactor(atomicNumber);
  return gamma > 1.05; // Threshold where relativistic effects become noticeable
};

/**
 * Get a human-readable description of the spin precession speed
 * @param frequency - The precession frequency in rad/s
 */
export const getSpinSpeedDescription = (frequency: number): string => {
  const absFreq = Math.abs(frequency);
  if (absFreq > 1e14) return "Extremely Fast";
  if (absFreq > 1e13) return "Very Fast";
  if (absFreq > 1e12) return "Fast";
  if (absFreq > 1e11) return "Moderate";
  return "Slow";
};

/**
 * Get a formatted string for the frequency in scientific notation
 * @param frequency - The frequency in rad/s
 */
export const formatScientificNotation = (frequency: number): string => {
  const absFreq = Math.abs(frequency);
  let exponent = 0;
  let base = absFreq;
  
  if (absFreq > 0) {
    exponent = Math.floor(Math.log10(absFreq));
    base = absFreq / Math.pow(10, exponent);
  }
  
  return `${base.toFixed(2)} × 10^${exponent} rad/s`;
};
