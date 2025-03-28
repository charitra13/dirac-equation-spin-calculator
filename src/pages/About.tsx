
import React from 'react';
import { Beaker, Atom, BookOpen, Users, Star, User } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const teamMembers = [
    { name: "Mahir Abbas", initials: "MA" },
    { name: "Charitra Jain", initials: "CJ" },
    { name: "Saksham Dwivedi", initials: "SD" },
    { name: "Ankit Sharma", initials: "AS" },
    { name: "Ashvi Shah", initials: "AS" },
  ];

  return <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <main className="flex-1 flex flex-col container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-3 text-center">
            <BookOpen className="w-8 h-8 text-neon-green" />
            <span className="bg-gradient-to-r from-neon-blue via-neon-green to-neon-purple bg-clip-text text-transparent font-semibold">About Our Quantum Simulation Project</span>
          </h1>

          <div className="space-y-8 mb-8">
            <section className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 shadow-neon-blue">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Users className="text-neon-blue" />
                Our Mission
              </h2>
              <p className="text-gray-300 leading-relaxed">We developed this project as an interactive educational tool to make quantum physics more engaging and accessible. Our goal is to combine accurate scientific information with a visually appealing interface that draws users in and makes learning about the quantum mechanics an enjoyable experience.</p>
            </section>

            <section className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 shadow-neon-green">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Star className="text-neon-green" />
                Project Features
              </h2>
              <ul className="text-gray-300 space-y-2 list-disc pl-5">
                <li>Visualize Electron Spin Precession: Simulate how an electron's spin axis rotates due to Thomas Precession in relativistic motion.</li>
                <li>Jitter Motion (Zitterbewegung) Path Tracking: Display real-time oscillatory motion of an electron with adjustable mass and speed parameters.</li>
                <li>Dynamic Spin-Orbit Coupling Effect: Demonstrate how spin interacts with orbital motion, leading to relativistic corrections in atomic structures.</li>
                <li>3D Helical Motion Simulation: Enable a 3D view of jitter motion to illustrate the combined effects of drift and rapid oscillations.</li>
                <li>Real-Time Equation Updates: Show dynamic mathematical representations of Thomas Precession & Zitterbewegung as users tweak simulation settings.</li>
              </ul>
            </section>

            <section className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 shadow-neon-purple">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Beaker className="text-neon-purple" />
                Technology
              </h2>
              <p className="text-gray-300 leading-relaxed">
                This project is built using modern web technologies including React, TailwindCSS, and interactive 
                visualizations. We've designed the interface with a focus on performance and accessibility, ensuring 
                that the periodic table is not just beautiful but also functional as an educational resource.
              </p>
            </section>
            
            <section className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 shadow-neon-pink">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <User className="text-neon-pink" />
                Our Team
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="bg-[#252525] border-gray-700 hover:shadow-neon-pink transition-shadow duration-300">
                    <CardContent className="p-4 flex flex-col items-center">
                      <Avatar className="h-16 w-16 mb-3 mt-2 bg-[#333] text-white border-2 border-neon-pink">
                        <AvatarFallback className="text-lg bg-gradient-to-br from-neon-purple to-neon-pink text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-white text-center font-medium">{member.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div className="text-center">
            <p className="text-gray-400 italic">
              "The periodic table is probably the most important concept in chemistry. It's the unifying principle that all chemists and chemistry students use to organize what they know and to predict what they don't know yet."
            </p>
            <p className="text-gray-500 mt-2">— Theodore Gray</p>
          </div>
        </div>
      </main>
      <footer className="py-3 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Neon Periodic Table | Interactive Chemistry Reference</p>
      </footer>
    </div>;
};
export default About;
