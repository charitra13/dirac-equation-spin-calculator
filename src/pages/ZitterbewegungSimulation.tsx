
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Beaker } from 'lucide-react';

const ZitterbewegungSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mass, setMass] = useState<number>(50);
  const [speed, setSpeed] = useState<number>(50);
  const [amplitude, setAmplitude] = useState<number>(50);
  
  // Animation state
  const animationRef = useRef<number | null>(null);
  const particleRef = useRef({
    x: 0,
    y: 0,
    baseX: 0,
    time: 0,
    trail: Array(50).fill({ x: 0, y: 0 }),
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 400;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particle position
    particleRef.current.baseX = canvas.width / 2;
    particleRef.current.x = canvas.width / 2;
    particleRef.current.y = canvas.height / 2;

    // Animation function
    const renderFrame = () => {
      if (!canvas || !ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current parameters
      const normalizedMass = mass / 100; // Convert to 0-1 range
      const normalizedSpeed = speed / 50; // Convert to 0-2 range
      const normalizedAmplitude = (amplitude / 100) * 60; // Max amplitude of 60px

      // Update particle position based on Zitterbewegung physics (simplified for visualization)
      const particle = particleRef.current;
      particle.time += 0.05 * normalizedSpeed;
      
      // Calculate the new position with jitter motion
      const frequency = (1 - normalizedMass * 0.5) * 0.4; // Lower mass means higher frequency
      const newX = particle.baseX + Math.sin(particle.time) * 50; // Slow drift
      const jitterX = Math.sin(particle.time / frequency) * normalizedAmplitude;
      const jitterY = Math.cos(particle.time / frequency) * normalizedAmplitude;
      
      particle.x = newX + jitterX;
      particle.y = canvas.height / 2 + jitterY;

      // Update trail
      particle.trail.unshift({ x: particle.x, y: particle.y });
      particle.trail.pop();

      // Draw trail
      ctx.beginPath();
      ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
      for (let i = 1; i < particle.trail.length; i++) {
        ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
      }
      ctx.strokeStyle = '#00DDFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#FF00AA';
      ctx.fill();
      ctx.strokeStyle = '#00DDFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw glow effect
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 12, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 8,
        particle.x, particle.y, 16
      );
      gradient.addColorStop(0, 'rgba(255, 0, 170, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 0, 170, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Continue animation
      animationRef.current = requestAnimationFrame(renderFrame);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(renderFrame);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mass, speed, amplitude]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-8">
        <Beaker className="w-8 h-8 mr-3 text-neon-purple animate-pulse-glow" />
        <h1 className="text-3xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent md:text-3xl font-bold">
          Zitterbewegung Simulation
        </h1>
        <Beaker className="w-8 h-8 ml-3 text-neon-pink animate-pulse-glow" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1a1a1a] border-gray-800 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">What is Zitterbewegung?</CardTitle>
            <CardDescription>
              The rapid oscillatory motion of electrons
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p className="mb-4">
              Zitterbewegung (German for "jitter motion") is a theoretical rapid oscillation of elementary particles, especially electrons, that obey the Dirac equation.
            </p>
            <p className="mb-4">
              The Dirac equation predicts oscillations with a frequency of approximately 10²¹ Hz at the Compton wavelength scale.
            </p>
            <p>
              This simulation slows down the motion significantly to visualize the concept, showing how a relativistic electron combines both drift motion and rapid oscillations.
            </p>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Simulation</CardTitle>
              <CardDescription>
                Electron jitter motion visualization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 rounded-md border border-gray-800 bg-black overflow-hidden">
                <canvas ref={canvasRef} className="w-full" style={{ height: '400px' }}></canvas>
              </div>

              <div className="grid gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="mass" className="text-gray-300">Particle Mass</Label>
                    <span className="text-gray-400">{mass}%</span>
                  </div>
                  <Slider
                    id="mass"
                    min={10}
                    max={100}
                    step={1}
                    value={[mass]} 
                    onValueChange={(value) => setMass(value[0])}
                    className="[&>.bg-primary]:bg-neon-blue"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="speed" className="text-gray-300">Simulation Speed</Label>
                    <span className="text-gray-400">{speed}%</span>
                  </div>
                  <Slider
                    id="speed"
                    min={10}
                    max={100}
                    step={1}
                    value={[speed]}
                    onValueChange={(value) => setSpeed(value[0])}
                    className="[&>.bg-primary]:bg-neon-purple"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="amplitude" className="text-gray-300">Oscillation Amplitude</Label>
                    <span className="text-gray-400">{amplitude}%</span>
                  </div>
                  <Slider
                    id="amplitude"
                    min={10}
                    max={100}
                    step={1}
                    value={[amplitude]}
                    onValueChange={(value) => setAmplitude(value[0])}
                    className="[&>.bg-primary]:bg-neon-pink"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ZitterbewegungSimulation;
