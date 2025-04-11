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

  const cleanupThreeJS = () => {
    if (frameIdRef.current !== null) {
      cancelAnimationFrame(frameIdRef.current);
      frameIdRef.current = null;
    }

    if (controlsRef.current) {
      controlsRef.current.dispose();
      controlsRef.current = null;
    }

    if (rendererRef.current) {
      if (rendererRef.current.domElement.parentElement) {
        rendererRef.current.domElement.parentElement.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
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

    cameraRef.current = null;
    particleRef.current = null;
  };

  useEffect(() => {
    if (!is3DMode) {
      cleanupThreeJS();
      setShowResetButton(false);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resizeCanvas = () => {
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth;
          canvas.height = 400;
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      particleDataRef.current = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        z: 0,
        baseX: canvas.width / 2,
        time: 0,
        trail: Array(50).fill({ x: canvas.width / 2, y: canvas.height / 2, z: 0 }),
      };

      const renderFrame = () => {
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const normalizedMass = mass / 100;
        const normalizedSpeed = speed / 50;
        const normalizedAmplitude = (amplitude / 100) * 60;

        const particle = particleDataRef.current;
        particle.time += 0.05 * normalizedSpeed;

        const frequency = (1 - normalizedMass * 0.5) * 0.4;
        const driftSpeed = normalizedSpeed * (energyMode === EnergyMode.NEGATIVE ? -0.5 : 1);
        const newX = particle.baseX + Math.sin(particle.time) * 50 * driftSpeed;

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

        particle.trail.unshift({ x: particle.x, y: particle.y, z: 0 });
        particle.trail.pop();

        ctx.beginPath();
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y);

        for (let i = 1; i < particle.trail.length; i++) {
          ctx.lineTo(particle.trail[i].x, particle.trail[i].y);

          const dx = particle.trail[i].x - particle.trail[i-1].x;
          const dy = particle.trail[i].y - particle.trail[i-1].y;
          const speed = Math.sqrt(dx*dx + dy*dy);

          const r = Math.min(255, speed * 5 + 100);
          const g = Math.max(0, 100 - speed * 2);
          const b = Math.max(0, 255 - speed * 5);

          ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          if (i < particle.trail.length - 1) {
            ctx.beginPath();
            ctx.moveTo(particle.trail[i].x, particle.trail[i].y);
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#FF00AA';
        ctx.fill();
        ctx.strokeStyle = '#00DDFF';
        ctx.lineWidth = 2;
        ctx.stroke();

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

        frameIdRef.current = requestAnimationFrame(renderFrame);
      };

      frameIdRef.current = requestAnimationFrame(renderFrame);

      return () => {
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
        }
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [is3DMode, mass, speed, amplitude, energyMode]);

  useEffect(() => {
    if (is3DMode) {
      cleanupThreeJS();

      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const container = containerRef.current || canvas.parentElement;
      if (!container) return;

      canvas.style.display = 'none';

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / 400,
        0.1,
        5000
      );
      camera.position.z = 100;
      camera.position.y = 20;
      cameraRef.current = camera;

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

      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      const gridSize = 10000;
      const gridDivisions = 1000;
      const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x008888, 0x555555);
      gridHelper.position.y = -20;

      if (gridHelper.material instanceof THREE.Material) {
        gridHelper.material.opacity = 0.25;
        gridHelper.material.transparent = true;
      } else if (Array.isArray(gridHelper.material)) {
        gridHelper.material.forEach(mat => {
          if (mat instanceof THREE.Material) {
            mat.opacity = 0.25;
            mat.transparent = true;
          }
        });
      }

      scene.add(gridHelper);
      
      const zAxisGeometry = new THREE.BufferGeometry();
      const zAxisPoints = [];
      zAxisPoints.push(new THREE.Vector3(0, -20, -gridSize/2));
      zAxisPoints.push(new THREE.Vector3(0, -20, gridSize/2));
      zAxisGeometry.setFromPoints(zAxisPoints);
      
      const zAxisMaterial = new THREE.LineBasicMaterial({ 
        color: 0x4488ff, 
        linewidth: 2,
        opacity: 0.5,
        transparent: true
      });
      
      const zAxisLine = new THREE.Line(zAxisGeometry, zAxisMaterial);
      scene.add(zAxisLine);
      
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.15;
      controls.rotateSpeed = 0.2;
      controls.zoomSpeed = 0.5;
      controls.panSpeed = 0.3;
      controls.minDistance = 5;
      controls.maxDistance = 500;
      controls.minPolarAngle = Math.PI * 0.1;
      controls.maxPolarAngle = Math.PI * 0.8;
      controlsRef.current = controls;
      
      setShowResetButton(true);

      const particleGeometry = new THREE.SphereGeometry(2, 32, 32);
      const particleMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff00aa,
        emissive: 0x220022,
        shininess: 100
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      scene.add(particle);
      particleRef.current = particle;

      const trailLength = 1000;
      const trailGeometry = new THREE.BufferGeometry();
      const trailPositions = new Float32Array(trailLength * 3);
      trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      
      const colors = new Float32Array(trailLength * 3);
      trailGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const trailMaterial = new THREE.PointsMaterial({ 
        size: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      });
      
      const trail = new THREE.Points(trailGeometry, trailMaterial);
      scene.add(trail);

      for (let i = 0; i < trailLength * 3; i += 3) {
        trailPositions[i] = 0;
        trailPositions[i + 1] = 0;
        trailPositions[i + 2] = 0;
        
        colors[i] = 0;
        colors[i + 1] = 0.5;
        colors[i + 2] = 1;
      }

      let time = 0;
      const trailPoints: THREE.Vector3[] = Array(trailLength).fill(null).map(() => new THREE.Vector3(0, 0, 0));
      
      const cameraTarget = new THREE.Vector3();
      const cameraOffset = new THREE.Vector3(0, 10, 50);
      
      const targetCameraPosition = new THREE.Vector3();

      const animate = () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
        
        time += 0.01 * (speed / 50);
        
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        const normalizedMass = mass / 100;
        const frequency = (1 - normalizedMass * 0.5) * 0.2;
        const helixRadius = (amplitude / 100) * 20;
        
        let driftSpeed = 0.5 * (speed / 50);
        let oscillationScale = 1.0;
        let zMotion = 0;
        
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
        
        const t = time * driftSpeed;
        
        const helixX = Math.cos(t / frequency) * helixRadius * oscillationScale;
        const helixY = Math.sin(t / frequency) * helixRadius * oscillationScale;
        
        const pathX = Math.sin(t * 0.2) * 30;
        const pathY = Math.cos(t * 0.1) * 10 + zMotion;
        const pathZ = -t * 20;
        
        if (particleRef.current) {
          particleRef.current.position.set(
            pathX + helixX,
            pathY + helixY,
            pathZ
          );
          
          if (cameraRef.current && controlsRef.current) {
            const particlePos = particleRef.current.position.clone();
            
            cameraTarget.x = particlePos.x;
            cameraTarget.y = particlePos.y;
            cameraTarget.z = particlePos.z;
            
            cameraTarget.x = cameraTarget.x + (targetCameraPosition.x - cameraTarget.x) * 0.03;
            cameraTarget.y = cameraTarget.y + (targetCameraPosition.y - cameraTarget.y) * 0.03;
            cameraTarget.z = cameraTarget.z + (targetCameraPosition.z - cameraTarget.z) * 0.03;
            
            controlsRef.current.target.copy(cameraTarget);
            
            targetCameraPosition.copy(cameraRef.current.position);
            targetCameraPosition.z = cameraTarget.z + cameraOffset.z;
            
            cameraRef.current.position.z += (targetCameraPosition.z - cameraRef.current.position.z) * 0.03;
          }
        }
        
        const particlePos = particleRef.current?.position || new THREE.Vector3();
        trailPoints.unshift(new THREE.Vector3(
          particlePos.x,
          particlePos.y,
          particlePos.z
        ));
        
        if (trailPoints.length > trailLength) {
          trailPoints.pop();
        }
        
        const positionAttribute = trailGeometry.getAttribute('position');
        const colorAttribute = trailGeometry.getAttribute('color');
        
        const positions = (positionAttribute as THREE.BufferAttribute).array as Float32Array;
        const colors = (colorAttribute as THREE.BufferAttribute).array as Float32Array;
        
        let trailColors: {r: number, g: number, b: number}[] = [];
        
        if (energyMode === EnergyMode.POSITIVE) {
          trailColors = Array(trailLength).fill(0).map((_, i) => {
            const t = i / trailLength;
            return {
              r: 0,
              g: 0.5 + 0.5 * (1 - t),
              b: 0.8 + 0.2 * (1 - t)
            };
          });
        } else if (energyMode === EnergyMode.NEGATIVE) {
          trailColors = Array(trailLength).fill(0).map((_, i) => {
            const t = i / trailLength;
            return {
              r: 0.8 + 0.2 * (1 - t),
              g: 0.2 * (1 - t),
              b: 0.5 + 0.3 * (1 - t)
            };
          });
        } else {
          trailColors = Array(trailLength).fill(0).map((_, i) => {
            const t = i / trailLength;
            const hue = t * 360;
            
            const h = hue / 60;
            const c = 1;
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
        
        for (let i = 0; i < trailLength; i++) {
          const idx = i * 3;
          
          if (i < trailPoints.length && trailPoints[i]) {
            const point = trailPoints[i];
            positions[idx] = point.x;
            positions[idx + 1] = point.y;
            positions[idx + 2] = point.z;
          }
          
          if (i < trailColors.length) {
            colors[idx] = trailColors[i].r;
            colors[idx + 1] = trailColors[i].g;
            colors[idx + 2] = trailColors[i].b;
          }
        }
        
        positionAttribute.needsUpdate = true;
        colorAttribute.needsUpdate = true;
        
        rendererRef.current.render(scene, camera);
        
        frameIdRef.current = requestAnimationFrame(animate);
      };

      frameIdRef.current = requestAnimationFrame(animate);

      const handleResize = () => {
        if (!container || !cameraRef.current || !rendererRef.current) return;
        
        const width = container.clientWidth;
        const height = 400;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        
        rendererRef.current.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
        }
        
        window.removeEventListener('resize', handleResize);
        
        cleanupThreeJS();
        
        if (canvas) {
          canvas.style.display = 'block';
        }
        
        setShowResetButton(false);
      };
    }
  }, [is3DMode, mass, speed, amplitude, energyMode]);

  const resetCameraView = () => {
    if (cameraRef.current && controlsRef.current) {
      if (is3DMode) {
        const time = 0;
        cameraRef.current.position.set(0, 20, 50);
        controlsRef.current.target.set(0, 0, 0);
        cameraRef.current.lookAt(0, 0, 0);
        controlsRef.current.update();
      }
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
