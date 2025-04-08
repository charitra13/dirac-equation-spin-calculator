
import React from 'react';
import Header from '@/components/Header';
import PeriodicTable from '@/components/PeriodicTable';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <SEO 
        title="Atomic Simulations | Interactive Quantum Physics"
        description="Explore interactive simulations of quantum mechanical phenomena including electron spin, jitter motion, and atomic structures—all in one platform."
        keywords="quantum mechanics, atomic simulations, periodic table, interactive physics, quantum visualization"
        canonicalPath="/"
        ogImage="/images/og-default.png"
      />
      <Header />
      <main className="flex-1 flex flex-col container mx-auto px-2 pb-4 max-w-full">
        <PeriodicTable />
      </main>
      <footer className="py-3 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Atomic Simulations | Interactive Quantum Physics Reference</p>
      </footer>
    </div>
  );
};

export default Index;
