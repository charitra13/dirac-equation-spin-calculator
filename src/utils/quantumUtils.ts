
// Define a consistent type for quantum gates
type QuantumGateInfo = {
  name: string;
  symbol: string;
  description: string;
  color: string;
  matrix?: (string | number)[][];
  requiresTwo?: boolean;
  requiresThree?: boolean;
};

// Defines the quantum gates and their properties
export const QUANTUM_GATES: Record<string, QuantumGateInfo> = {
  X: {
    name: 'Pauli-X (NOT)',
    symbol: 'X',
    matrix: [
      [0, 1],
      [1, 0]
    ],
    description: 'Bit flip operation. Equivalent to classical NOT gate.',
    color: 'border-red-500'
  },
  Y: {
    name: 'Pauli-Y',
    symbol: 'Y',
    matrix: [
      [0, '-i'],
      ['i', 0]
    ],
    description: 'Rotation around Y-axis of the Bloch sphere.',
    color: 'border-green-500'
  },
  Z: {
    name: 'Pauli-Z',
    symbol: 'Z',
    matrix: [
      [1, 0],
      [0, -1]
    ],
    description: 'Phase flip operation.',
    color: 'border-blue-500'
  },
  H: {
    name: 'Hadamard',
    symbol: 'H',
    matrix: [
      ['1/√2', '1/√2'],
      ['1/√2', '-1/√2']
    ],
    description: 'Creates superposition states. Rotation around diagonal axis.',
    color: 'border-purple-500'
  },
  S: {
    name: 'Phase (S)',
    symbol: 'S',
    matrix: [
      [1, 0],
      [0, 'i']
    ],
    description: 'π/2 phase rotation gate.',
    color: 'border-pink-500'
  },
  T: {
    name: 'T-Gate',
    symbol: 'T',
    matrix: [
      [1, 0],
      [0, 'e^(iπ/4)']
    ],
    description: 'π/4 phase rotation gate.',
    color: 'border-yellow-500'
  },
  CNOT: {
    name: 'CNOT',
    symbol: '⊕',
    matrix: [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ],
    description: 'Controlled-NOT gate. Flips target if control is |1⟩.',
    color: 'border-orange-500',
    requiresTwo: true
  },
  SWAP: {
    name: 'SWAP',
    symbol: '⇄',
    matrix: [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1]
    ],
    description: 'Swaps the states of two qubits.',
    color: 'border-cyan-500',
    requiresTwo: true
  },
  CCNOT: {
    name: 'Toffoli',
    symbol: 'T',
    // Add matrix for CCNOT gate
    matrix: [
      [1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 0]
    ],
    description: 'Controlled-Controlled-NOT gate. Requires 3 qubits.',
    color: 'border-indigo-500',
    requiresThree: true
  }
};

// Applies a gate operation to a qubit state
export const applyGate = (gate: string, state: string) => {
  if (gate === 'X') {
    if (state === '|0⟩') return '|1⟩';
    if (state === '|1⟩') return '|0⟩';
    if (state === '|+⟩') return '|+⟩';
    if (state === '|-⟩') return '|-⟩';
    return state;
  }
  
  if (gate === 'H') {
    if (state === '|0⟩') return '|+⟩';
    if (state === '|1⟩') return '|-⟩';
    if (state === '|+⟩') return '|0⟩';
    if (state === '|-⟩') return '|1⟩';
    return state;
  }
  
  if (gate === 'Z') {
    if (state === '|1⟩') return '|1⟩';
    if (state === '|0⟩') return '|0⟩';
    if (state === '|+⟩') return '|-⟩';
    if (state === '|-⟩') return '|+⟩';
    return state;
  }
  
  return state;
};
