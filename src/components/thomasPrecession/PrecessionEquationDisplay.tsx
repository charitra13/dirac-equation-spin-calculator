
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface PrecessionEquationDisplayProps {
  speed: number;
  gamma: number;
  thomasFactor: number;
  larmorFrequency: number;
  precessionFrequency: number;
}

const PrecessionEquationDisplay: React.FC<PrecessionEquationDisplayProps> = ({
  speed,
  gamma,
  thomasFactor,
  larmorFrequency,
  precessionFrequency
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="bg-[#1a1a1a] border-gray-800 overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-medium text-white flex items-center">
            Thomas Precession Equations
          </h3>
          <CollapsibleTrigger className="rounded-full p-2 hover:bg-gray-800 transition-colors">
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <CardContent className="pt-4 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-neon-blue mb-3">Thomas Precession Formula</h4>
                <div className="bg-gray-900 p-4 mb-4 rounded-md flex justify-center">
                  <BlockMath math={String.raw`\Omega_T = \frac{\gamma - 1}{\gamma} \Omega_L`} />
                </div>
                
                <div className="space-y-2 text-gray-300">
                  <p className="flex justify-between border-b border-gray-800 pb-1">
                    <span className="text-gray-400">Relativistic factor (γ):</span>
                    <span className="text-neon-purple font-mono">
                      <InlineMath math={String.raw`\gamma = \frac{1}{\sqrt{1-v^2/c^2}}`} />
                      {" = "}{gamma.toFixed(3)}
                    </span>
                  </p>
                  <p className="flex justify-between border-b border-gray-800 pb-1">
                    <span className="text-gray-400">Thomas factor:</span>
                    <span className="text-neon-green font-mono">
                      <InlineMath math={String.raw`\frac{\gamma-1}{\gamma}`} />
                      {" = "}{thomasFactor.toFixed(5)}
                    </span>
                  </p>
                  <p className="flex justify-between border-b border-gray-800 pb-1">
                    <span className="text-gray-400">Velocity (v/c):</span>
                    <span className="text-neon-blue font-mono">{speed.toFixed(5)}c</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-neon-pink mb-3">Calculated Frequencies</h4>
                <div className="text-gray-300 space-y-4">
                  <div className="bg-gray-900 p-4 rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Larmor frequency (ΩL):</span>
                      <span className="text-yellow-400 font-mono">{larmorFrequency.toFixed(3)} rad/s</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-yellow-500 h-full" 
                        style={{ width: `${(larmorFrequency / 2) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Thomas precession (ΩT):</span>
                      <span className="text-neon-blue font-mono">{precessionFrequency.toFixed(5)} rad/s</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-neon-blue h-full" 
                        style={{ width: `${(precessionFrequency / 2) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-400">
                    <p className="mb-2">
                      Thomas precession increases with velocity as γ grows larger. This 
                      relativistic effect becomes significant at speeds above ~0.5c.
                    </p>
                    <p>
                      At the chosen velocity v = {(speed * 100).toFixed(1)}% of c, the 
                      Thomas factor is {(thomasFactor * 100).toFixed(2)}% of the Larmor frequency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default PrecessionEquationDisplay;
