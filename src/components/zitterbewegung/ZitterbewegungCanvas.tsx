
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EnergyMode } from './ParticleReferenceData';

interface ZitterbewegungCanvasProps {
  mass: number;
  speed: number;
  amplitude: number;
  is3DMode: boolean;
  energyMode: EnergyMode;
}

const ZitterbewegungCanvas: React.FC<ZitterbewegungCanvasProps> = ({
  mass,
  speed,
  amplitude,
  is3DMode,
  energyMode
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number | null>(null);

  const particleRef = useRef({
    x: 0,
    y: 0,
    z: 0,
    baseX: 0,
    time: 0,
    trail: Array(50).fill({ x: 0, y: 0, z: 0 }),
  });

  // Set up 2D canvas for non-3D mode
  useEffect(() => {
    if (!is3DMode) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clean up any previous 3D renderer
      if (rendererRef.current) {
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
          frameIdRef.current = null;
        }
        
        if (canvas.parentElement && rendererRef.current.domElement !== canvas) {
          canvas.parentElement.removeChild(rendererRef.current.domElement);
        }
        
        rendererRef.current = null;
        sceneRef.current = null;
        cameraRef.current = null;
        controlsRef.current = null;
      }

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
      particleRef.current.z = 0;

      // Animation function for 2D
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
        const driftSpeed = normalizedSpeed * (energyMode === EnergyMode.NEGATIVE ? -0.5 : 1);
        const newX = particle.baseX + Math.sin(particle.time) * 50 * driftSpeed; // Slow drift
        
        // Adjust oscillation strength based on energy mode
        let oscillationScale = normalizedAmplitude;
        if (energyMode === EnergyMode.NEGATIVE) {
          oscillationScale *= 1.5;
        } else if (energyMode === EnergyMode.SUPERPOSITION) {
          oscillationScale *= 1 + Math.sin(particle.time * 0.1) * 0.5;
        }
        
        const jitterX = Math.sin(particle.time / frequency) * oscillationScale;
        const jitterY = Math.cos(particle.time / frequency) * oscillationScale;
        
        particle.x = newX + jitterX;
        particle.y = canvas.height / 2 + jitterY;

        // Update trail
        particle.trail.unshift({ x: particle.x, y: particle.y, z: 0 });
        particle.trail.pop();

        // Draw trail with color based on speed
        ctx.beginPath();
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
        
        for (let i = 1; i < particle.trail.length; i++) {
          ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          
          // Calculate speed between points for color
          const dx = particle.trail[i].x - particle.trail[i-1].x;
          const dy = particle.trail[i].y - particle.trail[i-1].y;
          const speed = Math.sqrt(dx*dx + dy*dy);
          
          // Create gradient colors based on speed
          const r = Math.min(255, speed * 5 + 100);
          const g = Math.max(0, 100 - speed * 2);
          const b = Math.max(0, 255 - speed * 5);
          
          ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Start a new path for the next segment with a different color
          if (i < particle.trail.length - 1) {
            ctx.beginPath();
            ctx.moveTo(particle.trail[i].x, particle.trail[i].y);
          }
        }

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
        frameIdRef.current = requestAnimationFrame(renderFrame);
      };

      // Start animation
      frameIdRef.current = requestAnimationFrame(renderFrame);

      // Cleanup
      return () => {
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
        }
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [is3DMode, mass, speed, amplitude, energyMode]);

  // Set up 3D scene
  useEffect(() => {
    if (is3DMode) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Clean up any previous 2D animation
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }

      // Create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.parentElement ? canvas.parentElement.clientWidth / 400 : 2,
        0.1,
        1000
      );
      camera.position.z = 100;
      camera.position.y = 20;
      cameraRef.current = camera;

      // Create renderer if it doesn't exist
      if (!rendererRef.current) {
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        rendererRef.current = renderer;
        
        // Add the renderer's canvas
        if (canvas.parentElement) {
          renderer.setSize(canvas.parentElement.clientWidth, 400);
          canvas.style.display = 'none';
          canvas.parentElement.appendChild(renderer.domElement);
        }
      }

      // Add lights
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Add grid helper
      const gridHelper = new THREE.GridHelper(200, 20, 0x008888, 0x555555);
      gridHelper.position.y = -20;
      scene.add(gridHelper);

      // Add orbit controls
      if (rendererRef.current) {
        const controls = new OrbitControls(camera, rendererRef.current.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controlsRef.current = controls;
      }

      // Create particle geometry
      const particleGeometry = new THREE.SphereGeometry(2, 32, 32);
      const particleMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff00aa,
        emissive: 0x220022,
        shininess: 100
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      scene.add(particle);

      // Create trail using points
      const trailGeometry = new THREE.BufferGeometry();
      const trailPositions = new Float32Array(600 * 3); // 200 points * 3 coordinates
      trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      
      // Create trail color attributes
      const colors = new Float32Array(600 * 3); // 200 points * 3 color values (r,g,b)
      trailGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const trailMaterial = new THREE.PointsMaterial({ 
        size: 0.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      
      const trail = new THREE.Points(trailGeometry, trailMaterial);
      scene.add(trail);

      // Initialize trail positions
      for (let i = 0; i < 600; i += 3) {
        trailPositions[i] = 0;
        trailPositions[i + 1] = 0;
        trailPositions[i + 2] = 0;
        
        // Initialize colors
        colors[i] = 0; // r
        colors[i + 1] = 0.5; // g
        colors[i + 2] = 1; // b
      }

      // Animation loop
      let time = 0;
      const trailLength = 200;
      const trailPoints: THREE.Vector3[] = Array(trailLength).fill(new THREE.Vector3(0, 0, 0));
      
      const animate = () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
        
        time += 0.01 * (speed / 50);
        
        // Update controls if they exist
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        // Calculate particle position based on parameters
        const normalizedMass = mass / 100;
        const frequency = (1 - normalizedMass * 0.5) * 0.2;
        const helixRadius = (amplitude / 100) * 20;
        
        // Base motion parameters
        let driftSpeed = 0.5 * (speed / 50);
        let oscillationScale = 1.0;
        let zMotion = 0;
        
        // Adjust behavior based on energy mode
        switch (energyMode) {
          case EnergyMode.POSITIVE:
            driftSpeed *= 1.5;
            break;
          case EnergyMode.NEGATIVE:
            driftSpeed *= 0.3;
            oscillationScale *= 1.5;
            break;
          case EnergyMode.SUPERPOSITION:
            oscillationScale *= 1 + Math.sin(time * 0.2) * 0.5;
            zMotion = Math.sin(time * 0.1) * 5;
            break;
        }
        
        // Helix motion around a central path
        const t = time * driftSpeed;
        
        const helixX = Math.cos(t / frequency) * helixRadius * oscillationScale;
        const helixY = Math.sin(t / frequency) * helixRadius * oscillationScale;
        
        // Main path
        const pathX = Math.sin(t * 0.2) * 30;
        const pathY = Math.cos(t * 0.1) * 10 + zMotion;
        const pathZ = -t * 20; // Moving along Z axis
        
        // Set particle position
        particle.position.set(
          pathX + helixX,
          pathY + helixY,
          pathZ
        );
        
        // Update camera to follow the particle with some lag
        if (cameraRef.current) {
          cameraRef.current.position.z = pathZ + 50;
        }
        
        // Update trail positions
        trailPoints.unshift(particle.position.clone());
        if (trailPoints.length > trailLength) {
          trailPoints.pop();
        }
        
        // Update trail geometry
        const positions = trailGeometry.attributes.position.array as Float32Array;
        const colors = trailGeometry.attributes.color.array as Float32Array;
        
        for (let i = 0; i < trailPoints.length; i++) {
          const point = trailPoints[i];
          const idx = i * 3;
          
          positions[idx] = point.x;
          positions[idx + 1] = point.y;
          positions[idx + 2] = point.z;
          
          // Color based on position in trail and energy mode
          const colorFactor = 1 - (i / trailLength);
          
          // Base color
          let r = 0, g = 0, b = 0;
          
          // Different color schemes based on energy mode
          if (energyMode === EnergyMode.POSITIVE) {
            // Blue to cyan gradient
            r = 0;
            g = colorFactor * 0.8;
            b = 0.5 + colorFactor * 0.5;
          } else if (energyMode === EnergyMode.NEGATIVE) {
            // Red to pink gradient
            r = 0.5 + colorFactor * 0.5;
            g = 0;
            b = colorFactor * 0.5;
          } else {
            // Rainbow effect for superposition
            r = 0.5 + 0.5 * Math.sin(colorFactor * Math.PI * 2);
            g = 0.5 + 0.5 * Math.sin(colorFactor * Math.PI * 2 + Math.PI * 2/3);
            b = 0.5 + 0.5 * Math.sin(colorFactor * Math.PI * 2 + Math.PI * 4/3);
          }
          
          colors[idx] = r;
          colors[idx + 1] = g;
          colors[idx + 2] = b;
        }
        
        // Tell three.js the attributes need updating
        trailGeometry.attributes.position.needsUpdate = true;
        trailGeometry.attributes.color.needsUpdate = true;
        
        // Render scene
        rendererRef.current.render(scene, camera);
        
        // Continue animation
        frameIdRef.current = requestAnimationFrame(animate);
      };
      
      // Start animation
      frameIdRef.current = requestAnimationFrame(animate);
      
      // Handle resize
      const handleResize = () => {
        if (!canvas.parentElement || !cameraRef.current || !rendererRef.current) return;
        
        const width = canvas.parentElement.clientWidth;
        const height = 400;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        
        rendererRef.current.setSize(width, height);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup function
      return () => {
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
        }
        
        window.removeEventListener('resize', handleResize);
        
        // Remove Three.js canvas if it exists
        if (rendererRef.current && canvas.parentElement) {
          const threeCanvas = rendererRef.current.domElement;
          if (canvas.parentElement.contains(threeCanvas)) {
            canvas.parentElement.removeChild(threeCanvas);
          }
        }
        
        // Show the original canvas again
        if (canvas) {
          canvas.style.display = 'block';
        }
      };
    }
  }, [is3DMode, mass, speed, amplitude, energyMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full rounded-md border border-gray-800 bg-black overflow-hidden"
      style={{ height: '400px', display: is3DMode ? 'none' : 'block' }}
    />
  );
};

export default ZitterbewegungCanvas;
