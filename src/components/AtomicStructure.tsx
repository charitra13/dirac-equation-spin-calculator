
import React, { useEffect, useRef, useState } from 'react';

interface AtomicStructureProps {
  atomicNumber: number;
  symbol: string;
  onElectronSelect?: (electronData: ElectronData) => void;
}

export interface ElectronData {
  shellNumber: number;
  electronIndex: number;
  quantumNumbers: {
    n: number;
    l: number;
    m: number;
    s: number;
  };
  position: {
    x: number;
    y: number;
  };
}

const AtomicStructure: React.FC<AtomicStructureProps> = ({ atomicNumber, symbol, onElectronSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedElectron, setSelectedElectron] = useState<ElectronData | null>(null);
  const electronPositionsRef = useRef<ElectronData[]>([]);

  // Calculate electron configuration
  const getElectronShells = (atomicNumber: number) => {
    // Maximum electrons per shell (2, 8, 18, 32, 50)
    const maxElectronsPerShell = [2, 8, 18, 32, 50];
    const shells = [];
    
    let remainingElectrons = atomicNumber;
    for (let i = 0; i < maxElectronsPerShell.length; i++) {
      const shellCapacity = maxElectronsPerShell[i];
      const electronsInShell = Math.min(remainingElectrons, shellCapacity);
      
      if (electronsInShell > 0) {
        shells.push(electronsInShell);
        remainingElectrons -= electronsInShell;
      } else {
        break;
      }
    }
    
    return shells;
  };

  // Helper to calculate quantum numbers for an electron
  const calculateQuantumNumbers = (shellNumber: number, electronIndex: number) => {
    // This is a simplified model - in reality, quantum numbers are more complex
    const n = shellNumber + 1; // Principal quantum number
    
    // For l (orbital angular momentum), we use a simplified assignment
    // In reality, l can be 0 to n-1
    const l = Math.min(shellNumber, 3); // s, p, d, f orbitals (0, 1, 2, 3)
    
    // For m (magnetic quantum number), ranges from -l to +l
    // Here we're just distributing electrons evenly
    const totalPossibleM = 2 * l + 1;
    const m = electronIndex % totalPossibleM - l;
    
    // Spin quantum number (s) is either +1/2 or -1/2
    const s = electronIndex % 2 === 0 ? 0.5 : -0.5;
    
    return { n, l, m, s };
  };

  // Handle canvas click for electron selection
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if the click is on an electron
    for (const electronData of electronPositionsRef.current) {
      const dx = electronData.position.x - x;
      const dy = electronData.position.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // If click is within electron radius (we use 10px for better UX)
      if (distance < 10) {
        setSelectedElectron(electronData);
        if (onElectronSelect) {
          onElectronSelect(electronData);
        }
        return;
      }
    }
    
    // If no electron was clicked, deselect
    setSelectedElectron(null);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      drawAtomicStructure();
    };

    // Draw the atomic structure
    const drawAtomicStructure = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate dimensions
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
      
      // Draw nucleus
      const nucleusRadius = maxRadius * 0.2;
      
      // Draw nucleus glow
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, nucleusRadius * 1.5
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.3, 'rgba(255, 100, 100, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 50, 50, 0.0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, nucleusRadius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw nucleus
      ctx.beginPath();
      ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ff4545';
      ctx.fill();
      
      // Draw element symbol in the nucleus
      ctx.font = `bold ${nucleusRadius}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(symbol, centerX, centerY);
      
      // Get electron configuration
      const electronShells = getElectronShells(atomicNumber);
      
      // Reset electron positions
      electronPositionsRef.current = [];
      
      // Draw electron shells
      electronShells.forEach((electrons, shellIndex) => {
        const shellRadius = (shellIndex + 1) * (maxRadius * 0.8 / electronShells.length) + maxRadius * 0.2;
        
        // Draw shell orbit
        ctx.beginPath();
        ctx.arc(centerX, centerY, shellRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(80, 200, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw electrons on this shell
        for (let i = 0; i < electrons; i++) {
          const angle = (i / electrons) * Math.PI * 2;
          const electronX = centerX + Math.cos(angle) * shellRadius;
          const electronY = centerY + Math.sin(angle) * shellRadius;
          
          // Store electron position and data
          const quantumNumbers = calculateQuantumNumbers(shellIndex, i);
          electronPositionsRef.current.push({
            shellNumber: shellIndex,
            electronIndex: i,
            quantumNumbers,
            position: { x: electronX, y: electronY }
          });
          
          // Check if this electron is selected
          const isSelected = selectedElectron && 
            selectedElectron.shellNumber === shellIndex && 
            selectedElectron.electronIndex === i;
          
          // Electron glow
          const electronGradient = ctx.createRadialGradient(
            electronX, electronY, 0,
            electronX, electronY, 8
          );
          
          if (isSelected) {
            // Use a different color for selected electron
            electronGradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
            electronGradient.addColorStop(1, 'rgba(255, 255, 0, 0.0)');
          } else {
            electronGradient.addColorStop(0, 'rgba(80, 200, 255, 0.8)');
            electronGradient.addColorStop(1, 'rgba(80, 200, 255, 0.0)');
          }
          
          ctx.beginPath();
          ctx.arc(electronX, electronY, 8, 0, Math.PI * 2);
          ctx.fillStyle = electronGradient;
          ctx.fill();
          
          // Electron
          ctx.beginPath();
          ctx.arc(electronX, electronY, 3, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#ffff00' : '#50c8ff';
          ctx.fill();
        }
      });
    };

    // Initial draw and set up resize listener
    resize();
    window.addEventListener('resize', resize);

    // Animate electrons
    let animationFrameId: number;
    let angle = 0;
    
    const animate = () => {
      angle += 0.005;
      
      // Define centerX and centerY inside animate function since they're needed here
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.translate(-centerX, -centerY);
      drawAtomicStructure();
      ctx.restore();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [atomicNumber, symbol, selectedElectron]);

  return (
    <div className="atomic-structure-container h-full w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-pointer"
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default AtomicStructure;
