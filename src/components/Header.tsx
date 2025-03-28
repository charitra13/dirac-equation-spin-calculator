import React from 'react';
import { Atom, Beaker } from 'lucide-react';
const Header = () => {
  return <header className="py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <Atom className="w-8 h-8 mr-3 text-neon-blue animate-pulse-glow" />
          <h1 className="text-3xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent md:text-3xl font-bold">Relativistic Spin Precession(Thomas Precession)</h1>
          <Beaker className="w-8 h-8 ml-3 text-neon-pink animate-pulse-glow" />
        </div>
        <p className="text-center mt-2 text-gray-400 max-w-2xl mx-auto">Explore the elements with our interactive periodic table. Click on any element to learn more about its properties.</p>
      </div>
    </header>;
};
export default Header;