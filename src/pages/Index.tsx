
import React from 'react';
import Header from '@/components/Header';
import PeriodicTable from '@/components/PeriodicTable';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />
      <main className="container mx-auto px-2 pb-16 max-w-full">
        <PeriodicTable />
      </main>
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Neon Periodic Table | Interactive Chemistry Reference</p>
      </footer>
    </div>
  );
};

export default Index;
