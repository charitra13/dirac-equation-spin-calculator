
"use client";

import Header from "@/components/Header";
import PeriodicTable from "@/components/PeriodicTable";
import Legend from "@/components/Legend";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <main className="py-8">
        <div className="periodic-table-container">
          <PeriodicTable />
        </div>
        <div className="mt-8">
          <Legend />
        </div>
      </main>
    </div>
  );
}
