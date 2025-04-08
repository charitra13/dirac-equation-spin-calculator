import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const activeClass =
    'text-white bg-gray-700 rounded-md px-3 py-2 font-medium hover:bg-gray-600 transition-colors';
  const inactiveClass =
    'text-gray-300 rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white transition-colors';

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-semibold text-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            ⚛️ Atomic Simulations
          </NavLink>
        </div>
        <nav className="flex justify-center items-center md:space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/zitterbewegung"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Zitterbewegung
          </NavLink>
          <NavLink
            to="/thomas-precession"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Thomas Precession
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            About
          </NavLink>
        </nav>
      </nav>
    </header>
  );
};

export default NavigationBar;
