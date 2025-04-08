
import React from 'react';
import Header from '@/components/Header';
import PeriodicTable from '@/components/PeriodicTable';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col container mx-auto px-2 pb-4 max-w-full">
        <PeriodicTable />
      </main>
      <footer className="py-3 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Neon Periodic Table | Interactive Chemistry Reference</p>
      </footer>
    </div>
  );
};

export default Index;
