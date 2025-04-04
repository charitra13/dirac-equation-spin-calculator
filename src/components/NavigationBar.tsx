
import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, Info, Zap } from 'lucide-react';
import { Button } from './ui/button';

const NavigationBar = () => {
  return <nav className="w-full bg-[#1a1a1a] border-b border-gray-800 py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Atom className="w-6 h-6 text-neon-blue mr-2" />
          <Link to="/" className="text-lg font-semibold text-white hover:text-neon-blue transition-colors">Dirac Equation</Link>
        </div>
        
        <div className="flex space-x-4">
          <Button asChild variant="ghost" className="flex items-center text-gray-300 hover:text-neon-blue hover:bg-[#252525]">
            <Link to="/">
              <Atom className="mr-1" />
              <span>Thomas Precession</span>
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="flex items-center text-gray-300 hover:text-neon-purple hover:bg-[#252525]">
            <Link to="/zitterbewegung">
              <Zap className="mr-1" />
              <span>Jitter Motion</span>
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="flex items-center text-gray-300 hover:text-neon-green hover:bg-[#252525] ml-auto">
            <Link to="/about">
              <Info className="mr-1" />
              <span>About Us</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>;
};

export default NavigationBar;
