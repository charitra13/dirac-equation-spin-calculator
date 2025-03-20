
import React from 'react';
import { Book, CircuitBoard, Code, Box, Shuffle, Zap, Layers } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const QuantumGuide = () => {
  return (
    <div className="max-w-6xl mx-auto w-full bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 mb-6">
      <Collapsible>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Book className="w-6 h-6 text-purple-500 mr-2" />
            <h2 className="text-2xl font-semibold">Quantum Computing Guide</h2>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost">
              Show Guide
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="mt-6 space-y-6">
            <section className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <CircuitBoard className="text-blue-500 w-5 h-5" />
                Understanding Quantum Computing
              </h3>
              <p className="text-gray-300">
                Quantum computing uses quantum bits or "qubits" instead of classical bits. While a classical bit can only be 0 or 1,
                a qubit can exist in a superposition of both states simultaneously, represented as |0⟩, |1⟩, or a combination.
              </p>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="text-yellow-500 w-5 h-5" />
                Working with Quantum Gates
              </h3>
              <p className="text-gray-300">
                Quantum gates manipulate qubit states. Common gates include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li><strong>X (NOT) Gate:</strong> Flips |0⟩ to |1⟩ and vice versa</li>
                <li><strong>H (Hadamard) Gate:</strong> Creates superposition states</li>
                <li><strong>Z Gate:</strong> Flips the phase of |1⟩</li>
                <li><strong>CNOT Gate:</strong> Two-qubit gate that flips the target qubit if the control qubit is |1⟩</li>
              </ul>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Shuffle className="text-green-500 w-5 h-5" />
                How to Use This Simulator
              </h3>
              <ol className="list-decimal pl-6 space-y-3 text-gray-300">
                <li>
                  <strong>Select the number of qubits</strong> (1-3) you want to work with using the buttons in the left panel.
                </li>
                <li>
                  <strong>Choose a quantum gate</strong> from either the Single Qubit or Multi Qubit tab. Hover over gates to see their descriptions.
                </li>
                <li>
                  <strong>Select a target qubit</strong> by clicking on a qubit in the "Qubit States" section.
                </li>
                <li>
                  <strong>Apply the gate</strong> by clicking the "Apply Gate" button. Watch how the qubit state changes!
                </li>
                <li>
                  <strong>Observe the circuit</strong> building up as you apply gates. This represents the sequence of operations.
                </li>
                <li>
                  For single-qubit operations, <strong>watch the Bloch sphere</strong> to visualize how the state vector moves.
                </li>
                <li>
                  <strong>Reset the circuit</strong> at any time to start over.
                </li>
              </ol>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Box className="text-orange-500 w-5 h-5" />
                Understanding Qubit States
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Basic States</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-300">
                    <li><strong>|0⟩</strong> - Ground state (classical 0)</li>
                    <li><strong>|1⟩</strong> - Excited state (classical 1)</li>
                    <li><strong>|+⟩</strong> - Equal superposition with same phase</li>
                    <li><strong>|-⟩</strong> - Equal superposition with opposite phase</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">The Bloch Sphere</h4>
                  <p className="text-gray-300 text-sm">
                    The Bloch sphere is a geometrical representation of a qubit's state:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-300 text-sm">
                    <li>North pole: |0⟩ state</li>
                    <li>South pole: |1⟩ state</li>
                    <li>Equator: Superposition states</li>
                    <li>X-axis: |+⟩ and |-⟩ states</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Code className="text-pink-500 w-5 h-5" />
                Educational Experiments
              </h3>
              <div className="space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="mr-2 mb-2">Create a superposition</Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border-gray-700 text-white">
                    <div className="space-y-2">
                      <h5 className="font-semibold">Creating Superposition</h5>
                      <p className="text-sm">Apply an H (Hadamard) gate to a qubit in |0⟩ state to create a superposition state |+⟩. This places the qubit in an equal probability of being measured as either 0 or 1.</p>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="mr-2 mb-2">Quantum NOT operation</Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border-gray-700 text-white">
                    <div className="space-y-2">
                      <h5 className="font-semibold">Bit Flip (NOT Gate)</h5>
                      <p className="text-sm">Apply an X gate to flip a qubit from |0⟩ to |1⟩ or vice versa. This is the quantum equivalent of a classical NOT gate.</p>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="mr-2 mb-2">Phase flip</Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border-gray-700 text-white">
                    <div className="space-y-2">
                      <h5 className="font-semibold">Phase Flip (Z Gate)</h5>
                      <p className="text-sm">Apply a Z gate to a qubit in superposition (first apply H, then Z). Notice how the state changes on the Bloch sphere while maintaining superposition.</p>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="mr-2 mb-2">Entanglement</Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border-gray-700 text-white">
                    <div className="space-y-2">
                      <h5 className="font-semibold">Creating Entanglement</h5>
                      <p className="text-sm">With 2 qubits: Apply H to the first qubit, then apply CNOT with the first qubit as control. The qubits are now entangled, meaning their states are correlated.</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </section>
            
            <section className="bg-blue-950/30 p-4 rounded-lg border border-blue-800">
              <h3 className="text-lg font-semibold mb-2">Educational Note</h3>
              <p className="text-gray-300 text-sm">
                This simulator demonstrates the fundamental concepts of quantum computing in a simplified manner. 
                Real quantum computers are affected by decoherence and require error correction. 
                The visualizations here are meant to build intuition about quantum mechanics and quantum computing principles.
              </p>
            </section>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default QuantumGuide;
