
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Atom, Lightbulb, BookOpen } from 'lucide-react';

const HistoricalContext: React.FC = () => {
  return (
    <Card className="bg-[#1a1a1a] border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-neon-green" />
          Historical & Experimental Context
        </CardTitle>
        <CardDescription>
          The fascinating story behind Zitterbewegung
        </CardDescription>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="border-l-2 border-neon-blue pl-4 py-1">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Atom className="h-4 w-4 text-neon-blue" />
            Discovery
          </h3>
          <p className="text-sm mt-1">
            Zitterbewegung (German for "trembling motion") was first identified by Erwin Schrödinger in 1930 while analyzing solutions to the Dirac equation. Paul Dirac had published his relativistic wave equation for electrons in 1928, but it was Schrödinger who noted the peculiar oscillatory behavior predicted by the equation.
          </p>
        </div>

        <div className="border-l-2 border-neon-purple pl-4 py-1">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-neon-purple" />
            Why It's Difficult to Observe
          </h3>
          <p className="text-sm mt-1">
            Zitterbewegung oscillations occur at an extremely high frequency of approximately 10²¹ Hz, with amplitude on the order of the Compton wavelength (about 2.4×10⁻¹² m for electrons). These scales are far beyond direct measurement with current technology.
          </p>
        </div>

        <div className="border-l-2 border-neon-pink pl-4 py-1">
          <h3 className="text-white font-semibold">Quantum Vacuum Connection</h3>
          <p className="text-sm mt-1">
            Modern interpretations link Zitterbewegung to the interaction between particles and the quantum vacuum. It can be understood as a manifestation of virtual particle-antiparticle pairs briefly forming from vacuum fluctuations and influencing the electron's motion.
          </p>
        </div>

        <div className="border-l-2 border-neon-green pl-4 py-1">
          <h3 className="text-white font-semibold">Experimental Analogs</h3>
          <p className="text-sm mt-1">
            While direct observation remains elusive, researchers have created quantum simulations of Zitterbewegung using trapped ions and Bose-Einstein condensates. These experiments provide indirect evidence for the phenomenon and help test our understanding of relativistic quantum mechanics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalContext;
