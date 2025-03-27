
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Atom, Info, Waves } from 'lucide-react';
import { Button } from './ui/button';

const NavigationBar = () => {
  const location = useLocation();
  
  return (
    <nav className="w-full bg-[#1a1a1a] border-b border-gray-800 py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Atom className="w-6 h-6 text-neon-blue mr-2" />
          <Link to="/" className="text-lg font-semibold text-white hover:text-neon-blue transition-colors">
            Neon Periodic Table
          </Link>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            asChild 
            variant="ghost" 
            className={`flex items-center ${location.pathname === '/' ? 'text-neon-blue bg-[#252525]' : 'text-gray-300'} hover:text-neon-blue hover:bg-[#252525]`}
          >
            <Link to="/">
              <Atom className="mr-1" />
              <span>Dirac Equation</span>
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="ghost" 
            className={`flex items-center ${location.pathname === '/polarization' ? 'text-neon-purple bg-[#252525]' : 'text-gray-300'} hover:text-neon-purple hover:bg-[#252525]`}
          >
            <Link to="/polarization">
              <Waves className="mr-1" />
              <span>Polarization Simulator</span>
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="ghost" 
            className={`flex items-center ${location.pathname === '/about' ? 'text-neon-green bg-[#252525]' : 'text-gray-300'} hover:text-neon-green hover:bg-[#252525] ml-auto`}
          >
            <Link to="/about">
              <Info className="mr-1" />
              <span>About Us</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
