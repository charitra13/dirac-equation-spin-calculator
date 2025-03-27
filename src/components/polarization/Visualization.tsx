
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PolarizationState, StokesParameters, LightSourceConfig, wavelengthToColor, OpticalElement } from '@/lib/polarizationUtils';

interface VisualizationProps {
  lightSource: LightSourceConfig;
  polarizationState: PolarizationState;
  stokesParameters: StokesParameters;
  opticalElements: OpticalElement[];
}

const Visualization: React.FC<VisualizationProps> = ({
  lightSource,
  polarizationState,
  stokesParameters,
  opticalElements
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stokesCanvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);
        
        // Draw light path
        const lightColor = wavelengthToColor(lightSource.wavelength);
        const startX = 20;
        const endX = width - 20;
        
        // Draw base light beam
        ctx.beginPath();
        ctx.moveTo(startX, height / 2);
        ctx.lineTo(endX, height / 2);
        ctx.strokeStyle = lightColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw polarization state visualization
        const centerX = width / 2;
        const centerY = height / 2;
        
        if (polarizationState.type === 'linear' && polarizationState.linearAngle !== undefined) {
          // Draw linear polarization visualization
          const angle = polarizationState.linearAngle * Math.PI / 180;
          const length = 30;
          
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(angle);
          
          // Draw oscillating wave pattern
          ctx.beginPath();
          for (let x = -60; x <= 60; x += 2) {
            const y = 15 * Math.sin(x * 0.2);
            ctx.lineTo(x, y);
          }
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Draw polarization direction
          ctx.beginPath();
          ctx.moveTo(0, -length);
          ctx.lineTo(0, length);
          ctx.strokeStyle = '#4c9aff';
          ctx.lineWidth = 3;
          ctx.stroke();
          
          ctx.restore();
        } else if (polarizationState.type === 'circular' && polarizationState.circularDirection) {
          // Draw circular polarization visualization
          const radius = 25;
          const direction = polarizationState.circularDirection === 'right' ? 1 : -1;
          
          ctx.save();
          ctx.translate(centerX, centerY);
          
          // Draw circle
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Draw rotating vector
          for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 8) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(
              radius * Math.cos(angle),
              radius * Math.sin(angle * direction)
            );
            ctx.strokeStyle = `rgba(76, 154, 255, ${0.3 + 0.7 * (angle / (2 * Math.PI))})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          
          // Add direction arrow
          ctx.beginPath();
          const arrowAngle = Math.PI / 4;
          ctx.arc(0, 0, radius + 10, arrowAngle, arrowAngle + Math.PI / 8 * direction, direction === -1);
          ctx.strokeStyle = '#4c9aff';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Arrow head
          ctx.beginPath();
          const headX = (radius + 10) * Math.cos(arrowAngle + Math.PI / 8 * direction);
          const headY = (radius + 10) * Math.sin(arrowAngle + Math.PI / 8 * direction);
          ctx.moveTo(headX, headY);
          ctx.lineTo(headX - 5 * Math.cos(arrowAngle), headY - 5 * Math.sin(arrowAngle));
          ctx.lineTo(headX - 5 * Math.cos(arrowAngle + Math.PI / 2), headY - 5 * Math.sin(arrowAngle + Math.PI / 2));
          ctx.closePath();
          ctx.fillStyle = '#4c9aff';
          ctx.fill();
          
          ctx.restore();
        } else if (polarizationState.type === 'elliptical' && 
                  polarizationState.ellipticalRatio !== undefined && 
                  polarizationState.ellipticalOrientation !== undefined) {
          // Draw elliptical polarization visualization
          const majorAxis = 30;
          const minorAxis = majorAxis * polarizationState.ellipticalRatio;
          const angle = polarizationState.ellipticalOrientation * Math.PI / 180;
          
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(angle);
          
          // Draw ellipse
          ctx.beginPath();
          ctx.ellipse(0, 0, majorAxis, minorAxis, 0, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Draw major and minor axes
          ctx.beginPath();
          ctx.moveTo(-majorAxis, 0);
          ctx.lineTo(majorAxis, 0);
          ctx.moveTo(0, -minorAxis);
          ctx.lineTo(0, minorAxis);
          ctx.strokeStyle = '#4c9aff';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          ctx.restore();
        }
        
        // Draw optical elements
        opticalElements.forEach((element, index) => {
          const x = startX + (endX - startX) * (index + 1) / (opticalElements.length + 1);
          
          ctx.save();
          ctx.translate(x, centerY);
          ctx.rotate(element.angle * Math.PI / 180);
          
          ctx.beginPath();
          
          switch (element.type) {
            case 'polarizer':
              // Draw polarizer as rectangle with lines
              ctx.rect(-15, -30, 30, 60);
              ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
              ctx.fill();
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.lineWidth = 1;
              ctx.stroke();
              
              // Draw lines to indicate polarization direction
              if (element.subtype === 'linear') {
                for (let y = -25; y <= 25; y += 5) {
                  ctx.beginPath();
                  ctx.moveTo(-10, y);
                  ctx.lineTo(10, y);
                  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                  ctx.lineWidth = 1;
                  ctx.stroke();
                }
              } else {
                // Circular polarizer
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, 2 * Math.PI);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = 1;
                ctx.stroke();
                
                ctx.beginPath();
                ctx.arc(0, 0, 5, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.fill();
              }
              break;
              
            case 'waveplate':
              // Draw waveplate as crystal shape
              ctx.beginPath();
              ctx.rect(-20, -25, 40, 50);
              ctx.fillStyle = element.subtype === 'quarter' ? 'rgba(100, 100, 200, 0.3)' : 'rgba(200, 100, 200, 0.3)';
              ctx.fill();
              ctx.strokeStyle = 'white';
              ctx.lineWidth = 1;
              ctx.stroke();
              
              // Label the waveplate
              ctx.fillStyle = 'white';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = '12px Arial';
              ctx.fillText(element.subtype === 'quarter' ? 'λ/4' : 'λ/2', 0, 0);
              break;
              
            case 'birefringent':
              // Draw birefringent material
              ctx.beginPath();
              
              // Draw rhombus shape
              ctx.moveTo(0, -30);
              ctx.lineTo(20, 0);
              ctx.lineTo(0, 30);
              ctx.lineTo(-20, 0);
              ctx.closePath();
              
              ctx.fillStyle = 'rgba(150, 150, 50, 0.3)';
              ctx.fill();
              ctx.strokeStyle = 'white';
              ctx.lineWidth = 1;
              ctx.stroke();
              
              // Add some crystal-like internal lines
              ctx.beginPath();
              ctx.moveTo(-10, -15);
              ctx.lineTo(10, 15);
              ctx.moveTo(10, -15);
              ctx.lineTo(-10, 15);
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
              ctx.lineWidth = 1;
              ctx.stroke();
              break;
              
            case 'beamsplitter':
              // Draw beam splitter
              ctx.beginPath();
              
              if (element.subtype === 'polarizing') {
                // Draw cube for polarizing beam splitter
                ctx.rect(-20, -20, 40, 40);
                ctx.fillStyle = 'rgba(100, 150, 200, 0.3)';
                ctx.fill();
                
                // Draw diagonal line to indicate splitting plane
                ctx.beginPath();
                ctx.moveTo(-20, -20);
                ctx.lineTo(20, 20);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Draw output beams
                ctx.beginPath();
                ctx.moveTo(20, 0);
                ctx.lineTo(35, 0);
                ctx.moveTo(0, 20);
                ctx.lineTo(0, 35);
                ctx.strokeStyle = lightColor;
                ctx.lineWidth = 2;
                ctx.stroke();
              } else {
                // Draw circle for non-polarizing beam splitter
                ctx.beginPath();
                ctx.arc(0, 0, 20, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(150, 150, 150, 0.3)';
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1;
                ctx.stroke();
                
                // Draw crossed lines to indicate splitting
                ctx.beginPath();
                ctx.moveTo(-15, -15);
                ctx.lineTo(15, 15);
                ctx.moveTo(15, -15);
                ctx.lineTo(-15, 15);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.lineWidth = 1;
                ctx.stroke();
              }
              break;
          }
          
          ctx.restore();
        });
      }
    }
    
    // Draw Stokes parameters
    if (stokesCanvasRef.current) {
      const canvas = stokesCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.min(width, height) / 2 - 20;
        
        // Draw coordinate system
        ctx.beginPath();
        ctx.moveTo(centerX - maxRadius, centerY);
        ctx.lineTo(centerX + maxRadius, centerY);
        ctx.moveTo(centerX, centerY - maxRadius);
        ctx.lineTo(centerX, centerY + maxRadius);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Label axes
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px Arial';
        ctx.fillText('S1', centerX + maxRadius + 15, centerY);
        ctx.fillText('S2', centerX, centerY - maxRadius - 15);
        
        // Draw Poincaré sphere projection (S1-S2 plane)
        const normalizedS1 = stokesParameters.S1 / stokesParameters.S0;
        const normalizedS2 = stokesParameters.S2 / stokesParameters.S0;
        const normalizedS3 = stokesParameters.S3 / stokesParameters.S0;
        
        const pointX = centerX + maxRadius * normalizedS1;
        const pointY = centerY - maxRadius * normalizedS2;
        
        // Draw reference circle (fully polarized light)
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw shading to represent S3 (out of plane)
        const s3Intensity = Math.abs(normalizedS3) * 0.7;
        ctx.beginPath();
        ctx.arc(pointX, pointY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = normalizedS3 >= 0 
          ? `rgba(100, 200, 255, ${s3Intensity})`
          : `rgba(255, 100, 100, ${s3Intensity})`;
        ctx.fill();
        
        // Draw point representing polarization state
        ctx.beginPath();
        ctx.arc(pointX, pointY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#4c9aff';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw line from center to point
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(pointX, pointY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }, [lightSource, polarizationState, stokesParameters, opticalElements]);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vector">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="vector">Vector View</TabsTrigger>
            <TabsTrigger value="stokes">Stokes Parameters</TabsTrigger>
            <TabsTrigger value="matrix">Matrix View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vector" className="space-y-4">
            <div className="w-full h-60 bg-black/70 rounded-md overflow-hidden">
              <canvas 
                ref={canvasRef} 
                width={600} 
                height={240} 
                className="w-full h-full"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="stokes" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>S₀ (Intensity):</span>
                  <span>{stokesParameters.S0.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>S₁ (H/V):</span>
                  <span>{stokesParameters.S1.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>S₂ (+45°/-45°):</span>
                  <span>{stokesParameters.S2.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>S₃ (R/L):</span>
                  <span>{stokesParameters.S3.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span>Degree of Polarization:</span>
                  <span>
                    {(Math.sqrt(
                      Math.pow(stokesParameters.S1, 2) + 
                      Math.pow(stokesParameters.S2, 2) + 
                      Math.pow(stokesParameters.S3, 2)
                    ) / stokesParameters.S0).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="w-full h-40 bg-black/70 rounded-md overflow-hidden">
                <canvas 
                  ref={stokesCanvasRef} 
                  width={300} 
                  height={160} 
                  className="w-full h-full"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="matrix" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Jones Matrix</h3>
                <div className="bg-black/30 p-4 rounded-md">
                  <div className="flex items-center justify-center">
                    <div className="border-l-2 border-r-2 border-white px-4 py-2">
                      {polarizationState.type === 'linear' && polarizationState.linearAngle !== undefined ? (
                        <>
                          <div className="flex items-center justify-center gap-4">
                            <span>{Math.cos(polarizationState.linearAngle * Math.PI / 180).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-center gap-4 mt-2">
                            <span>{Math.sin(polarizationState.linearAngle * Math.PI / 180).toFixed(2)}</span>
                          </div>
                        </>
                      ) : polarizationState.type === 'circular' && polarizationState.circularDirection !== undefined ? (
                        <>
                          <div className="flex items-center justify-center gap-4">
                            <span>1/√2</span>
                          </div>
                          <div className="flex items-center justify-center gap-4 mt-2">
                            <span>{polarizationState.circularDirection === 'right' ? 'i/√2' : '-i/√2'}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center gap-4">
                            <span>Complex</span>
                          </div>
                          <div className="flex items-center justify-center gap-4 mt-2">
                            <span>Matrix</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Mueller Matrix (Selected Elements)</h3>
                <div className="bg-black/30 p-4 rounded-md">
                  <div className="text-xs text-center text-muted-foreground mb-2">
                    First row and column shown
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    <div className="bg-primary/20 p-1 text-center">1</div>
                    <div className="bg-muted/20 p-1 text-center">0</div>
                    <div className="bg-muted/20 p-1 text-center">0</div>
                    <div className="bg-muted/20 p-1 text-center">0</div>
                    
                    <div className="bg-muted/20 p-1 text-center">0</div>
                    <div className="bg-primary/10 p-1 text-center">...</div>
                    <div className="bg-primary/10 p-1 text-center">...</div>
                    <div className="bg-primary/10 p-1 text-center">...</div>
                    
                    <div className="bg-muted/20 p-1 text-center">0</div>
                    <div className="bg-primary/10 p-1 text-center">...</div>
                    <div className="bg-primary/10 p-1 text-center">...</div>
                    <div className="bg-primary/10 p-1 text-center">...</div>
                    
                    <div className="bg-muted/20 p-1 text-center">0</div>
                    <div className="bg-primary/10 p-1 text-center">...</div>
                    <div className="bg-primary/10 p-1 text-center">...</div>
                    <div className="bg-primary/10 p-1 text-center">...</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Visualization;
