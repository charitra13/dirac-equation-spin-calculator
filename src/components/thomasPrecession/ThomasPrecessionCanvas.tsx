
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ThomasPrecessionCanvasProps {
  speed: number;
  is3DMode: boolean;
  precessionFrequency: number;
  larmorFrequency: number;
}

const ThomasPrecessionCanvas: React.FC<ThomasPrecessionCanvasProps> = ({
  speed,
  is3DMode,
  precessionFrequency
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number | null>(null);
  
  // Get color based on speed (relativistic factor)
  const getSpeedColor = (speed: number): string => {
    if (speed < 0.3) {
      return '#0EA5E9'; // Blue for non-relativistic
    } else if (speed < 0.8) {
      return '#9b87f5'; // Purple for intermediate
    } else {
      return '#FF0000'; // Red for highly relativistic
    }
  };
  
  const getSpeedColorRGB = (speed: number): { r: number, g: number, b: number } => {
    if (speed < 0.3) {
      return { r: 0.05, g: 0.65, b: 0.91 }; // Blue for non-relativistic
    } else if (speed < 0.8) {
      return { r: 0.61, g: 0.53, b: 0.96 }; // Purple for intermediate
    } else {
      return { r: 1.0, g: 0.0, b: 0.0 }; // Red for highly relativistic
    }
  };
  
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

      // Trail storage
      const trailLength = 50;
      const trail = Array(trailLength).fill({ x: 0, y: 0 });
      let angle = 0;

      // Animation function for 2D
      const renderFrame = () => {
        if (!canvas || !ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid and circles
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(centerX, centerY) * 0.8;
        
        // Draw grid lines
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
        
        // Draw horizontal grid line
        ctx.beginPath();
        ctx.moveTo(centerX - maxRadius, centerY);
        ctx.lineTo(centerX + maxRadius, centerY);
        ctx.stroke();
        
        // Draw vertical grid line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - maxRadius);
        ctx.lineTo(centerX, centerY + maxRadius);
        ctx.stroke();
        
        // Draw circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Update angle based on precession frequency
        const speedFactor = (precessionFrequency * 0.1) + 0.01;
        angle -= speedFactor;
        
        // Calculate new position on circle
        const radius = maxRadius * 0.6;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Update trail
        trail.unshift({ x, y });
        if (trail.length > trailLength) {
          trail.pop();
        }
        
        // Draw trail with gradient color
        const speedColor = getSpeedColor(speed);
        
        if (trail.length > 1) {
          for (let i = 0; i < trail.length - 1; i++) {
            const alpha = 1 - (i / trail.length);
            
            ctx.beginPath();
            ctx.moveTo(trail[i].x, trail[i].y);
            ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
            ctx.strokeStyle = `${speedColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 3 * (1 - i/trail.length);
            ctx.stroke();
          }
        }
        
        // Draw spin vector
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = speedColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw the precessing point
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = speedColor;
        ctx.fill();
        
        // Add glow effect
        const gradient = ctx.createRadialGradient(x, y, 4, x, y, 16);
        gradient.addColorStop(0, `${speedColor}80`);
        gradient.addColorStop(1, `${speedColor}00`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
        
        // Add labels
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('|↑⟩', centerX, centerY - radius - 15);
        ctx.fillText('|↓⟩', centerX, centerY + radius + 15);
        ctx.fillText('|+⟩', centerX + radius + 15, centerY);
        ctx.fillText('|-⟩', centerX - radius - 15, centerY);
        
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
  }, [is3DMode, speed, precessionFrequency]);

  // Set up 3D mode with Three.js
  useEffect(() => {
    if (is3DMode) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Clean up any previous animation
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }

      // Create Three.js scene
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
      camera.position.z = 5;
      cameraRef.current = camera;

      // Create renderer
      if (!rendererRef.current) {
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        rendererRef.current = renderer;
        
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

      // Add orbit controls
      if (rendererRef.current) {
        const controls = new OrbitControls(camera, rendererRef.current.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controlsRef.current = controls;
      }

      // Create Bloch sphere
      const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
      const sphereMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        transparent: true,
        opacity: 0.3,
        wireframe: false
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);
      
      // Add coordinate axes
      const axisLength = 2.5;
      
      // Z-axis (vertical)
      const zAxisGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -axisLength, 0),
        new THREE.Vector3(0, axisLength, 0)
      ]);
      const zAxisMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const zAxis = new THREE.Line(zAxisGeometry, zAxisMaterial);
      scene.add(zAxis);
      
      // X-axis (horizontal)
      const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-axisLength, 0, 0),
        new THREE.Vector3(axisLength, 0, 0)
      ]);
      const xAxisMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial);
      scene.add(xAxis);
      
      // Y-axis (depth)
      const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -axisLength),
        new THREE.Vector3(0, 0, axisLength)
      ]);
      const yAxisMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
      const yAxis = new THREE.Line(yAxisGeometry, yAxisMaterial);
      scene.add(yAxis);
      
      // Create labels for axes
      const createTextSprite = (text: string, position: THREE.Vector3) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return null;
        
        canvas.width = 128;
        canvas.height = 64;
        
        context.fillStyle = 'white';
        context.font = '32px Arial';
        context.fillText(text, 24, 40);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.copy(position);
        sprite.scale.set(1, 0.5, 1);
        return sprite;
      };
      
      // Add labels
      const labelUp = createTextSprite('|↑⟩', new THREE.Vector3(0, axisLength + 0.5, 0));
      const labelDown = createTextSprite('|↓⟩', new THREE.Vector3(0, -axisLength - 0.5, 0));
      const labelRight = createTextSprite('|+⟩', new THREE.Vector3(axisLength + 0.5, 0, 0));
      const labelLeft = createTextSprite('|-⟩', new THREE.Vector3(-axisLength - 0.5, 0, 0));
      
      if (labelUp) scene.add(labelUp);
      if (labelDown) scene.add(labelDown);
      if (labelRight) scene.add(labelRight);
      if (labelLeft) scene.add(labelLeft);
      
      // Create particle for spin representation
      const spinGeo = new THREE.SphereGeometry(0.2, 32, 32);
      const colorObj = getSpeedColorRGB(speed);
      const spinMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(colorObj.r, colorObj.g, colorObj.b),
        emissive: new THREE.Color(colorObj.r * 0.2, colorObj.g * 0.2, colorObj.b * 0.2)
      });
      const spinParticle = new THREE.Mesh(spinGeo, spinMaterial);
      scene.add(spinParticle);
      
      // Create spin vector
      const lineGeometry = new THREE.BufferGeometry();
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: new THREE.Color(colorObj.r, colorObj.g, colorObj.b),
        linewidth: 2 
      });
      const linePoints = new Float32Array(6); // 2 points × 3 coordinates
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePoints, 3));
      const spinVector = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(spinVector);
      
      // Trail for spin vector
      const trailLength = 50;
      const trailGeometry = new THREE.BufferGeometry();
      const trailMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true
      });
      
      const trailPositions = new Float32Array(trailLength * 3);
      const trailColors = new Float32Array(trailLength * 3);
      
      // Initialize trail positions and colors
      for (let i = 0; i < trailLength * 3; i += 3) {
        trailPositions[i] = 0;
        trailPositions[i + 1] = 0;
        trailPositions[i + 2] = 0;
        
        trailColors[i] = colorObj.r;
        trailColors[i + 1] = colorObj.g;
        trailColors[i + 2] = colorObj.b;
      }
      
      trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
      
      const trail = new THREE.Line(trailGeometry, trailMaterial);
      scene.add(trail);
      
      // Animation variables
      let time = 0;
      const trailPoints: THREE.Vector3[] = Array(trailLength).fill(new THREE.Vector3(0, 0, 0));
      
      // Animation loop
      const animate = () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
        
        // Update controls
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        // Update time based on precession frequency
        time += 0.01 * ((precessionFrequency * 0.5) + 0.5);
        
        // Calculate position on sphere
        const theta = Math.PI / 4; // Tilt from z-axis
        const phi = time; // Angle around z-axis
        
        const x = 2 * Math.sin(theta) * Math.cos(phi);
        const y = 2 * Math.cos(theta);
        const z = 2 * Math.sin(theta) * Math.sin(phi);
        
        // Update spin particle position
        spinParticle.position.set(x, y, z);
        
        // Update spin vector (line from origin to particle)
        const positions = (lineGeometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
        positions[0] = 0; // Origin x
        positions[1] = 0; // Origin y
        positions[2] = 0; // Origin z
        positions[3] = x; // End point x
        positions[4] = y; // End point y
        positions[5] = z; // End point z
        lineGeometry.attributes.position.needsUpdate = true;
        
        // Update trail
        trailPoints.unshift(new THREE.Vector3(x, y, z));
        if (trailPoints.length > trailLength) {
          trailPoints.pop();
        }
        
        // Update trail geometry
        const trailPositions = (trailGeometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
        const trailColors = (trailGeometry.getAttribute('color') as THREE.BufferAttribute).array as Float32Array;
        
        for (let i = 0; i < trailLength; i++) {
          const idx = i * 3;
          const point = trailPoints[i] || new THREE.Vector3(0, 0, 0);
          
          trailPositions[idx] = point.x;
          trailPositions[idx + 1] = point.y;
          trailPositions[idx + 2] = point.z;
          
          // Fade trail intensity based on position
          const alpha = 1 - (i / trailLength);
          trailColors[idx] = colorObj.r * alpha;
          trailColors[idx + 1] = colorObj.g * alpha;
          trailColors[idx + 2] = colorObj.b * alpha;
        }
        
        trailGeometry.attributes.position.needsUpdate = true;
        trailGeometry.attributes.color.needsUpdate = true;
        
        // Render scene
        rendererRef.current.render(scene, camera);
        
        // Continue animation
        frameIdRef.current = requestAnimationFrame(animate);
      };
      
      // Start animation
      frameIdRef.current = requestAnimationFrame(animate);
      
      // Handle window resize
      const handleResize = () => {
        if (!canvas.parentElement || !cameraRef.current || !rendererRef.current) return;
        
        const width = canvas.parentElement.clientWidth;
        const height = 400;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        
        rendererRef.current.setSize(width, height);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
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
        
        // Clear refs
        sceneRef.current = null;
        cameraRef.current = null;
        controlsRef.current = null;
      };
    }
  }, [is3DMode, speed, precessionFrequency]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full rounded-md border border-gray-800 bg-black overflow-hidden"
      style={{ height: '400px', display: is3DMode ? 'none' : 'block' }}
    />
  );
};

export default ThomasPrecessionCanvas;
