
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface EquationDisplayProps {
  mass: number;
  amplitude: number;
  frequency: number;
}

const EquationDisplay: React.FC<EquationDisplayProps> = ({ 
  mass, 
  amplitude, 
  frequency 
}) => {
  // Calculate equation parameters based on simulation values
  const frequencyTerm = (2 * mass / 100).toFixed(2);
  const amplitudeTerm = (amplitude / 100).toFixed(2);

  return (
    <Card className="bg-[#1a1a1a] border-gray-800">
      <CardContent className="pt-6">
        <div className="text-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-white">Zitterbewegung Equation</h3>
          <p className="mb-3 text-sm text-gray-400">
            The mathematical representation of electron jitter motion:
          </p>
          
          <div className="bg-black p-4 rounded-md overflow-x-auto">
            <BlockMath math={`r(t) = r_0 + \\frac{c^2 p}{H}t + \\frac{\\hbar}{2m_e c}\\gamma_0\\gamma_i\\cos\\left(\\frac{2m_e c^2 t}{\\hbar}\\right)`} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-900 p-3 rounded-md">
              <h4 className="text-neon-blue font-medium mb-1">Frequency</h4>
              <p className="text-sm text-gray-300">
                <InlineMath math={`\\omega = \\frac{2m_e c^2}{\\hbar} \\approx ${frequencyTerm} \\times 10^{21} \\text{ Hz}`} />
              </p>
            </div>
            
            <div className="bg-gray-900 p-3 rounded-md">
              <h4 className="text-neon-purple font-medium mb-1">Amplitude</h4>
              <p className="text-sm text-gray-300">
                <InlineMath math={`A = \\frac{\\hbar}{2m_e c} \\approx ${amplitudeTerm} \\times \\lambda_C`} />
              </p>
            </div>
            
            <div className="bg-gray-900 p-3 rounded-md">
              <h4 className="text-neon-pink font-medium mb-1">Compton Wavelength</h4>
              <p className="text-sm text-gray-300">
                <InlineMath math={`\\lambda_C = \\frac{h}{m_e c} \\approx 2.43 \\times 10^{-12} \\text{ m}`} />
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquationDisplay;
