
export interface ParticleData {
  name: string;
  symbol: string;
  mass: number; // in MeV/c²
  relativeToElectron: number;
  description: string;
  icon: string;
  value: number; // 0-100 slider value
}

export const particleReferenceData: ParticleData[] = [
  {
    name: "Electron",
    symbol: "e⁻",
    mass: 0.511,
    relativeToElectron: 1,
    description: "Baseline lepton, fundamental charged particle",
    icon: "⚡",
    value: 10
  },
  {
    name: "Positron",
    symbol: "e⁺",
    mass: 0.511,
    relativeToElectron: 1,
    description: "Electron's antimatter counterpart",
    icon: "⚡",
    value: 20
  },
  {
    name: "Muon",
    symbol: "μ⁻",
    mass: 105.66,
    relativeToElectron: 206,
    description: "Heavy lepton, decays rapidly",
    icon: "⚛️",
    value: 30
  },
  {
    name: "Up Quark",
    symbol: "u",
    mass: 2.2,
    relativeToElectron: 4.3,
    description: "Lightest quark, component of protons/neutrons",
    icon: "🏀",
    value: 40
  },
  {
    name: "Down Quark",
    symbol: "d",
    mass: 4.7,
    relativeToElectron: 9.2,
    description: "Light quark, component of protons/neutrons",
    icon: "🏀",
    value: 50
  },
  {
    name: "Strange Quark",
    symbol: "s",
    mass: 96,
    relativeToElectron: 188,
    description: "Second-generation quark",
    icon: "🏀",
    value: 60
  },
  {
    name: "Tau",
    symbol: "τ⁻",
    mass: 1776.86,
    relativeToElectron: 3477,
    description: "Heaviest lepton",
    icon: "⚛️",
    value: 70
  },
  {
    name: "Charm Quark",
    symbol: "c",
    mass: 1270, // 1.27 GeV/c²
    relativeToElectron: 2486,
    description: "Medium-heavy quark",
    icon: "🏀",
    value: 80
  },
  {
    name: "Bottom Quark",
    symbol: "b",
    mass: 4180, // 4.18 GeV/c²
    relativeToElectron: 8180,
    description: "Heavy quark, third generation",
    icon: "🏀",
    value: 90
  },
  {
    name: "Top Quark",
    symbol: "t",
    mass: 173100, // 173.1 GeV/c²
    relativeToElectron: 339000,
    description: "Heaviest known elementary particle",
    icon: "🏀",
    value: 100
  }
];

export const findClosestParticle = (value: number): ParticleData => {
  let closest = particleReferenceData[0];
  let minDistance = Math.abs(value - closest.value);
  
  for (const particle of particleReferenceData) {
    const distance = Math.abs(value - particle.value);
    if (distance < minDistance) {
      minDistance = distance;
      closest = particle;
    }
  }
  
  return closest;
};

export const formatMass = (mass: number): string => {
  if (mass >= 1000) {
    return `${(mass / 1000).toFixed(2)} GeV/c²`;
  }
  return `${mass.toFixed(2)} MeV/c²`;
};

export enum EnergyMode {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  SUPERPOSITION = "superposition"
}

export const energyModeOptions = [
  {
    value: EnergyMode.POSITIVE,
    label: "Positive Energy Mode",
    description: "Normal drift motion"
  },
  {
    value: EnergyMode.NEGATIVE,
    label: "Negative Energy Mode",
    description: "Stronger oscillations (anti-particle effects)"
  },
  {
    value: EnergyMode.SUPERPOSITION,
    label: "Superposition Mode",
    description: "Combined modes (true Zitterbewegung)"
  }
];
