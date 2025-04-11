
import React, { useEffect, useRef, useState } from 'react';
import { ElectronData } from './AtomicStructure';
import { 
  calculateSpinPrecessionFrequency,
  formatScientificNotation
} from '@/utils/thomasPrecessionCalculations';

interface ElectronSpinVisualizationProps {
  electronData: ElectronData | null;
  atomicNumber: number;
  magneticField: number; // in Tesla
  precessionMode: 'larmor' | 'thomas';
  showPrecessionCone?: boolean;
}

const ElectronSpinVisualization: React.FC<ElectronSpinVisualizationProps> = ({
  electronData,
  atomicNumber,
  magneticField,
  precessionMode,
  showPrecessionCone = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Calculate spin speed using the enhanced calculation function
  const calculateSpinSpeed = (atomicNumber: number, magneticField: number, quantumNumbers: any) => {
    return calculateSpinPrecessionFrequency(
      atomicNumber,
      magneticField,
      quantumNumbers,
      precessionMode === 'thomas'
    );
  };
  
  useEffect(() => {
    if (!canvasRef.current || !electronData) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Calculate spin speed
    const spinSpeed = calculateSpinSpeed(
      atomicNumber,
      magneticField,
      electronData.quantumNumbers
    );
    
    // Set canvas dimensions based on container
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Bloch sphere parameters
    const blochSphereRadius = Math.min(centerX, centerY) * 0.7;
    
    // Animation variables
    let angle = 0;
    let animationFrameId: number;
    
    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Bloch sphere
      ctx.beginPath();
      ctx.arc(centerX, centerY, blochSphereRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw x, y, z axes
      const axisLength = blochSphereRadius * 1.3;
      
      // z-axis (vertical)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - axisLength);
      ctx.lineTo(centerX, centerY + axisLength);
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.7)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // x-axis (horizontal)
      ctx.beginPath();
      ctx.moveTo(centerX - axisLength, centerY);
      ctx.lineTo(centerX + axisLength, centerY);
      ctx.stroke();
      
      // y-axis (perspective)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX - axisLength * 0.7, centerY - axisLength * 0.7);
      ctx.stroke();
      
      // Label the axes
      ctx.font = '12px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      
      // z-axis labels
      ctx.fillText("|↑⟩", centerX, centerY - axisLength - 10);
      ctx.fillText("|↓⟩", centerX, centerY + axisLength + 15);
      
      // x-axis labels
      ctx.fillText("|+⟩", centerX + axisLength + 10, centerY);
      ctx.fillText("|-⟩", centerX - axisLength - 10, centerY);
      
      // y-axis label
      ctx.fillText("|i⟩", centerX - axisLength * 0.7 - 15, centerY - axisLength * 0.7 - 5);
      
      // Calculate spin vector position
      // Use electronData.quantumNumbers to influence the direction
      // s quantum number determines up/down bias
      const spinBiasZ = electronData.quantumNumbers.s * 0.8;
      
      // Precession
      const precessionAngle = angle * Math.sign(spinSpeed);
      const precessionSpeed = Math.abs(spinSpeed) / 1e12; // Scale down for visualization
      
      // Update angle based on time and speed, but only if not paused
      if (!isPaused) {
        angle += 0.05 * precessionSpeed;
      }
      
      const spinX = Math.sin(Math.PI * 0.4) * Math.cos(precessionAngle);
      const spinY = Math.sin(Math.PI * 0.4) * Math.sin(precessionAngle);
      const spinZ = Math.cos(Math.PI * 0.4) + spinBiasZ;
      
      // Normalize to ensure the vector touches the sphere surface
      const norm = Math.sqrt(spinX*spinX + spinY*spinY + spinZ*spinZ);
      
      const normalizedX = spinX / norm;
      const normalizedY = spinY / norm;
      const normalizedZ = spinZ / norm;
      
      // Convert to canvas coordinates
      const vectorX = centerX + normalizedX * blochSphereRadius;
      const vectorY = centerY - normalizedZ * blochSphereRadius; // Negative for y-axis up
      
      // Draw spin vector
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(vectorX, vectorY);
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw vector endpoint
      ctx.beginPath();
      ctx.arc(vectorX, vectorY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0000';
      ctx.fill();
      
      // Draw precession circle if enabled
      if (showPrecessionCone) {
        ctx.beginPath();
        ctx.arc(
          centerX, 
          centerY - normalizedZ * blochSphereRadius, 
          Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY) * blochSphereRadius,
          0, Math.PI * 2
        );
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.stroke();
      }
      
      // Continue animation
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [electronData, atomicNumber, magneticField, precessionMode, showPrecessionCone, isPaused]);
  
  if (!electronData) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 rounded-md p-4">
        <p className="text-gray-400 text-center">
          Click on an electron in the atomic structure to visualize its spin properties
        </p>
      </div>
    );
  }
  
  // Calculate spin speed for display
  const spinSpeed = calculateSpinSpeed(
    atomicNumber,
    magneticField,
    electronData.quantumNumbers
  );
  
  return (
    <div className="electron-spin-container h-full flex flex-col">
      <div className="electron-spin-info bg-gray-800 p-3 rounded-t-md">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-300">Electron Spin Properties</h3>
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-400">Shell: {electronData.shellNumber + 1}</p>
            <p className="text-gray-400">Quantum Numbers:</p>
            <p className="text-gray-400 ml-3">n = {electronData.quantumNumbers.n}</p>
            <p className="text-gray-400 ml-3">l = {electronData.quantumNumbers.l}</p>
            <p className="text-gray-400 ml-3">m = {electronData.quantumNumbers.m}</p>
            <p className="text-gray-400 ml-3">s = {electronData.quantumNumbers.s}</p>
          </div>
          <div>
            <p className="text-gray-400">Magnetic Field: {magneticField.toFixed(2)} T</p>
            <p className="text-gray-400">Spin Speed: {formatScientificNotation(spinSpeed)}</p>
            <p className="text-gray-400">Spin Direction: {spinSpeed > 0 ? "Clockwise" : "Counterclockwise"}</p>
            <p className="text-gray-400">Mode: {precessionMode === 'thomas' ? "Thomas-Corrected" : "Larmor Only"}</p>
          </div>
        </div>
      </div>
      <div className="electron-spin-visualization flex-1 bg-gray-900 rounded-b-md">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default ElectronSpinVisualization;
