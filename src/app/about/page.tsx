
"use client";

import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <main className="py-8">
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-foreground">About the Neon Periodic Table</CardTitle>
            <CardDescription className="text-muted-foreground">
              An interactive visualization of the elements
            </CardDescription>
          </CardHeader>
          <CardContent className="text-foreground">
            <p className="mb-4">
              The Neon Periodic Table is an interactive visualization that allows you to explore the elements
              of the periodic table in a visually stunning way. With glowing neon colors and detailed atomic
              structures, it provides an engaging way to learn about the building blocks of our universe.
            </p>
            <p className="mb-4">
              Click on any element to view detailed information about its properties, atomic structure,
              and electron configuration. You can also interact with the atomic structure visualization
              to observe electron behavior under different conditions.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-2">Features:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Detailed information for all elements</li>
              <li>Interactive atomic structure visualization</li>
              <li>Electron spin simulation</li>
              <li>Color coding by element categories</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
