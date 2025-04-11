
import React from 'react';
import Header from '@/components/Header';
import PeriodicTable from '@/components/PeriodicTable';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <>
      <SEO 
        title="Interactive Periodic Table | Thomas Precession"
        description="Explore the quantum mechanics of atomic structures with our interactive periodic table. Visualize electron configurations, spin states, and quantum phenomena."
        keywords="periodic table, quantum mechanics, atomic structure, electron configuration, interactive chemistry, thomas precession, dirac equation"
        canonicalPath="/"
        ogImage="/og-image.png"
      />
      <div className="min-h-screen bg-[#121212] text-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col container mx-auto px-2 pb-4 max-w-full">
          <PeriodicTable />
        </main>
        <footer className="py-3 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Neon Periodic Table | Interactive Chemistry Reference</p>
        </footer>
      </div>
    </>
  );
};

export default Index;
