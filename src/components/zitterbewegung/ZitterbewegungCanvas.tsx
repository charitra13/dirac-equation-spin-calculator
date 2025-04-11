import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EnergyMode } from './ParticleReferenceData';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<THREE.Mesh | null>(null);
  const [showResetButton, setShowResetButton] = useState<boolean>(false);

  const particleDataRef = useRef({
    x: 0,
    y: 0,
    z: 0,
    baseX: 0,
    time: 0,
    trail: Array(50).fill({ x: 0, y: 0, z: 0 }),
  });

  // Cleanup function to properly dispose of Three.js resources
  const cleanupThreeJS = () => {
    // Cancel any active animation frame
    if (frameIdRef.current !== null) {
      cancelAnimationFrame(frameIdRef.current);
      frameIdRef.current = null;
    }

    // Dispose of orbit controls
    if (controlsRef.current) {
      controlsRef.current.dispose();
      controlsRef.current = null;
    }

    // Dispose of renderer
    if (rendererRef.current) {
      // Remove renderer DOM element if it exists
      if (rendererRef.current.domElement.parentElement) {
        rendererRef.current.domElement.parentElement.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    // Dispose of scene objects
    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        // Dispose of geometries and materials
        if (object instanceof THREE.Mesh) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      sceneRef.current = null;
    }

    // Clear camera reference
    cameraRef.current = null;
    particleRef.current = null;
  };

  // Set up 2D canvas for non-3D mode
  useEffect(() => {
    if (!is3DMode) {
      // Clean up any existing 3D renderer
      cleanupThreeJS();
      setShowResetButton(false);

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

      // Reset particle state
      particleDataRef.current = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        z: 0,
        baseX: canvas.width / 2,
        time: 0,
        trail: Array(50).fill({ x: canvas.width / 2, y: canvas.height / 2, z: 0 }),
      };

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
        const particle = particleDataRef.current;
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
      // Clean up any existing resources first
      cleanupThreeJS();

      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const container = containerRef.current || canvas.parentElement;
      if (!container) return;

      // Hide 2D canvas
      canvas.style.display = 'none';

      // Create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / 400,
        0.1,
        1000
      );
      camera.position.z = 100;
      camera.position.y = 20;
      cameraRef.current = camera;

      // Create renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.clientWidth, 400);
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Add lights
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Create infinite grid
      const gridSize = 2000; // Much larger grid
      const gridDivisions = 200; // More divisions for a finer grid
      const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x008888, 0x555555);
      gridHelper.position.y = -20;
      scene.add(gridHelper);
      
      // Add orbit controls with reduced sensitivity
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.1; // Increased damping for smoother camera movement
      controls.rotateSpeed = 0.4; // Reduced rotation sensitivity
      controls.zoomSpeed = 0.7; // Reduced zoom sensitivity
      controls.panSpeed = 0.5; // Reduced pan sensitivity
      controls.minDistance = 20; // Prevent zooming in too close
      controls.maxDistance = 300; // Prevent zooming out too far
      // Limit vertical rotation to prevent camera flipping
      controls.minPolarAngle = Math.PI * 0.1; // Limit looking straight down
      controls.maxPolarAngle = Math.PI * 0.9; // Limit looking straight up
      controlsRef.current = controls;
      
      // Show reset button when in 3D mode
      setShowResetButton(true);

      // Create particle geometry
      const particleGeometry = new THREE.SphereGeometry(2, 32, 32);
      const particleMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff00aa,
        emissive: 0x220022,
        shininess: 100
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      scene.add(particle);
      particleRef.current = particle;

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
      
      // Camera tracking parameters - using linear following as requested
      const cameraTarget = new THREE.Vector3();
      const cameraOffset = new THREE.Vector3(0, 10, 50); // Offset the camera from the particle
      
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
        if (particleRef.current) {
          particleRef.current.position.set(
            pathX + helixX,
            pathY + helixY,
            pathZ
          );
          
          // Linear camera following (no rotation with particle)
          if (cameraRef.current && controlsRef.current) {
            // Calculate the desired camera position
            const particlePos = particleRef.current.position;
            
            // Update the orbit controls target to follow the particle linearly
            cameraTarget.lerp(particlePos, 0.05);
            controlsRef.current.target.copy(cameraTarget);
            
            // Keep the camera's relative position to the target consistent
            // This means we just update the look-at target without changing the camera's relative position
            // Note: we don't update camera position here to avoid rotating with the particle
          }
        }
        
        // Update trail positions
        const particlePos = particleRef.current?.position || new THREE.Vector3();
        trailPoints.unshift(new THREE.Vector3(
          particlePos.x,
          particlePos.y,
          particlePos.z
        ));
        
        if (trailPoints.length > trailLength) {
          trailPoints.pop();
        }
        
        // Update trail geometry
        const positionAttribute = trailGeometry.getAttribute('position');
        const colorAttribute = trailGeometry.getAttribute('color');
        
        // Type assertion to safely access the array property
        const positions = (positionAttribute as THREE.BufferAttribute).array as Float32Array;
        const colors = (colorAttribute as THREE.BufferAttribute).array as Float32Array;
        
        // Define consistent colors based on energy mode
        let trailColors: {r: number, g: number, b: number}[] = [];
        
        // Set consistent color scheme based on energy mode
        if (energyMode === EnergyMode.POSITIVE) {
          // Blue to cyan gradient for positive energy
          trailColors = Array(trailLength).fill(0).map((_, i) => {
            const t = i / trailLength;
            return {
              r: 0,
              g: 0.5 + 0.5 * (1 - t),
              b: 0.8 + 0.2 * (1 - t)
            };
          });
        } else if (energyMode === EnergyMode.NEGATIVE) {
          // Magenta to purple gradient for negative energy
          trailColors = Array(trailLength).fill(0).map((_, i) => {
            const t = i / trailLength;
            return {
              r: 0.8 + 0.2 * (1 - t),
              g: 0.2 * (1 - t),
              b: 0.5 + 0.3 * (1 - t)
            };
          });
        } else {
          // Rainbow effect for superposition with consistent progression
          trailColors = Array(trailLength).fill(0).map((_, i) => {
            const t = i / trailLength;
            const hue = t * 360; // Full hue rotation
            
            // Convert HSL to RGB (simplified version)
            const h = hue / 60;
            const c = 1; // Full saturation and lightness for vivid colors
            const x = c * (1 - Math.abs(h % 2 - 1));
            
            let r = 0, g = 0, b = 0;
            
            if (h >= 0 && h < 1) { r = c; g = x; b = 0; }
            else if (h >= 1 && h < 2) { r = x; g = c; b = 0; }
            else if (h >= 2 && h < 3) { r = 0; g = c; b = x; }
            else if (h >= 3 && h < 4) { r = 0; g = x; b = c; }
            else if (h >= 4 && h < 5) { r = x; g = 0; b = c; }
            else { r = c; g = 0; b = x; }
            
            return { r, g, b };
          });
        }
        
        for (let i = 0; i < trailPoints.length; i++) {
          const point = trailPoints[i];
          const idx = i * 3;
          
          positions[idx] = point.x;
          positions[idx + 1] = point.y;
          positions[idx + 2] = point.z;
          
          // Apply consistent colors from our pre-calculated array
          colors[idx] = trailColors[i].r;
          colors[idx + 1] = trailColors[i].g;
          colors[idx + 2] = trailColors[i].b;
        }
        
        // Tell three.js the attributes need updating
        positionAttribute.needsUpdate = true;
        colorAttribute.needsUpdate = true;
        
        // Render scene
        rendererRef.current.render(scene, camera);
        
        // Continue animation
        frameIdRef.current = requestAnimationFrame(animate);
      };
      
      // Start animation
      frameIdRef.current = requestAnimationFrame(animate);
      
      // Handle resize
      const handleResize = () => {
        if (!container || !cameraRef.current || !rendererRef.current) return;
        
        const width = container.clientWidth;
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
        
        // Full cleanup
        cleanupThreeJS();
        
        // Show the original canvas again
        if (canvas) {
          canvas.style.display = 'block';
        }
        
        setShowResetButton(false);
      };
    }
  }, [is3DMode, mass, speed, amplitude, energyMode]);

  // Function to reset camera to default view
  const resetCameraView = () => {
    if (cameraRef.current && controlsRef.current && particleRef.current) {
      // Get the current particle position
      const particlePosition = particleRef.current.position.clone();
      
      // Reset camera to default offset from particle
      controlsRef.current.target.copy(particlePosition);
      
      // Position camera at an offset from the particle
      cameraRef.current.position.set(
        particlePosition.x,
        particlePosition.y + 20,
        particlePosition.z + 50
      );
      
      // Update the controls
      controlsRef.current.update();
    }
  };

  return (
    <div ref={containerRef} className="w-full relative">
      <canvas 
        ref={canvasRef} 
        className="w-full rounded-md border border-gray-800 bg-black overflow-hidden"
        style={{ height: '400px', display: is3DMode ? 'none' : 'block' }}
      />
      
      {showResetButton && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetCameraView}
          className="absolute top-2 right-2 bg-gray-900/70 text-white border-gray-700 hover:bg-gray-800"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset View
        </Button>
      )}
    </div>
  );
};

export default ZitterbewegungCanvas;
