
import React, { useState, useEffect } from 'react';
import Element from './Element';
import ElementDetails from './ElementDetails';
import Legend from './Legend';
import { ScrollArea } from './ui/scroll-area';
import { elements, Element as ElementType, getElementByPosition } from '@/data/elements';
import { useIsMobile } from '@/hooks/use-mobile';

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateContainerWidth = () => {
      const container = document.querySelector('.periodic-table-container');
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    
    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  const handleElementClick = (element: ElementType) => {
    setSelectedElement(element);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
  };

  // Calculate size of elements based on container width
  const getElementSize = () => {
    // For the 18 elements in the widest period plus some margin
    const idealElementWidth = Math.floor((containerWidth - 40) / 18);
    
    // Ensure a minimum size
    return Math.max(idealElementWidth, isMobile ? 30 : 50);
  };

  const elementSize = getElementSize();
  const elementStyle = {
    width: `${elementSize}px`,
    height: `${elementSize}px`,
    fontSize: `${Math.max(elementSize * 0.18, 8)}px`, // Adjust font size based on element size
  };

  // Generate a period row with responsive sizes
  const renderPeriod = (periodNumber: number) => {
    const row = [];
    
    for (let group = 1; group <= 18; group++) {
      const element = getElementByPosition(periodNumber, group);
      
      if (element) {
        row.push(
          <div key={element.symbol} className="flex justify-center items-center" style={{ width: `${elementSize}px`, height: `${elementSize}px` }}>
            <Element 
              symbol={element.symbol}
              number={element.number}
              name={element.name}
              mass={element.mass}
              category={element.category}
              onClick={() => handleElementClick(element)}
              style={elementStyle}
            />
          </div>
        );
      } else {
        // Empty cell
        row.push(<div key={`empty-${periodNumber}-${group}`} style={{ width: `${elementSize}px`, height: `${elementSize}px` }}></div>);
      }
    }
    
    return (
      <div key={`period-${periodNumber}`} className="flex">
        {row}
      </div>
    );
  };

  // Special case for lanthanides and actinides (periods 6 and 7)
  const renderSpecialPeriods = () => {
    const lanthanides = elements.filter(el => el.category === 'lanthanoid');
    const actinides = elements.filter(el => el.category === 'actinoid');
    
    const renderSpecialRow = (elements: ElementType[], rowLabel: string) => (
      <div className="flex items-center mt-4">
        <div className="flex items-center justify-center text-sm" style={{ width: `${elementSize}px`, height: `${elementSize}px` }}>
          {!isMobile && rowLabel}
        </div>
        <div className="flex">
          {elements.map(element => (
            <div key={element.symbol} style={{ width: `${elementSize}px`, height: `${elementSize}px` }}>
              <Element 
                symbol={element.symbol}
                number={element.number}
                name={element.name}
                mass={element.mass}
                category={element.category}
                onClick={() => handleElementClick(element)}
                style={elementStyle}
              />
            </div>
          ))}
        </div>
      </div>
    );
    
    return (
      <div className="mt-4">
        {renderSpecialRow(lanthanides, "Lanthanides")}
        {renderSpecialRow(actinides, "Actinides")}
      </div>
    );
  };

  return (
    <div className="periodic-table-container p-2">
      <ScrollArea className="w-full">
        <div className="mx-auto">
          {/* Main periodic table */}
          <div className="periodic-table">
            {/* Period 1 */}
            {renderPeriod(1)}
            
            {/* Period 2 */}
            {renderPeriod(2)}
            
            {/* Period 3 */}
            {renderPeriod(3)}
            
            {/* Period 4 */}
            {renderPeriod(4)}
            
            {/* Period 5 */}
            {renderPeriod(5)}
            
            {/* Period 6 (excluding lanthanides) */}
            {renderPeriod(6)}
            
            {/* Period 7 (excluding actinides) */}
            {renderPeriod(7)}
            
            {/* Lanthanides and Actinides */}
            {renderSpecialPeriods()}
          </div>
          
          {/* Legend */}
          <Legend />
        </div>
      </ScrollArea>
      
      {/* Element Details Dialog */}
      <ElementDetails 
        isOpen={isDetailsOpen}
        onClose={closeDetails}
        element={selectedElement}
      />
    </div>
  );
};

export default PeriodicTable;
