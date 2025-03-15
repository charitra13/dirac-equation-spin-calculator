
import React, { useState } from 'react';
import Element from './Element';
import ElementDetails from './ElementDetails';
import Legend from './Legend';
import { elements, Element as ElementType, getElementByPosition } from '@/data/elements';

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleElementClick = (element: ElementType) => {
    setSelectedElement(element);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
  };

  // Generate a period row
  const renderPeriod = (periodNumber: number) => {
    const row = [];
    
    for (let group = 1; group <= 18; group++) {
      const element = getElementByPosition(periodNumber, group);
      
      if (element) {
        row.push(
          <div key={element.symbol} className="flex justify-center items-center">
            <Element 
              symbol={element.symbol}
              number={element.number}
              name={element.name}
              mass={element.mass}
              category={element.category}
              onClick={() => handleElementClick(element)}
            />
          </div>
        );
      } else {
        // Empty cell
        row.push(<div key={`empty-${periodNumber}-${group}`} className="w-16 h-16 md:w-20 md:h-20"></div>);
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
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-sm">
          {rowLabel}
        </div>
        <div className="flex">
          {elements.map(element => (
            <Element 
              key={element.symbol}
              symbol={element.symbol}
              number={element.number}
              name={element.name}
              mass={element.mass}
              category={element.category}
              onClick={() => handleElementClick(element)}
            />
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
    <div className="periodic-table-container p-2 overflow-x-auto">
      <div className="min-w-max">
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
