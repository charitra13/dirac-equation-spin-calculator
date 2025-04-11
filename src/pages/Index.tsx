
import React from 'react';
import Header from '@/components/Header';
import PeriodicTable from '@/components/PeriodicTable';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <>
      <SEO 
        title="Interactive Periodic Table & Thomas Precession | Quantum Mechanics"
        description="Explore the quantum mechanics of atomic structures with our interactive periodic table. Visualize electron configurations, spin states, and Thomas Precession phenomena."
        keywords="periodic table, quantum mechanics, atomic structure, electron configuration, thomas precession, dirac equation, spin visualization"
        canonicalPath="/"
        ogImage="/og-image.png"
      />
      <div className="min-h-screen bg-[#121212] text-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col container mx-auto px-2 pb-4 max-w-full">
          <div className="text-center py-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Interactive Periodic Table & Thomas Precession</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Explore quantum spin dynamics and Thomas Precession effects for any element. Click on an element to
              visualize atomic structure and electron spin behavior.
            </p>
          </div>
          <PeriodicTable />
        </main>
        <footer className="py-3 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Neon Periodic Table | Interactive Quantum Visualization</p>
        </footer>
      </div>
    </>
  );
};

export default Index;
