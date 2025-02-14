import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListItem } from '@/types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    id: string;
    name: string;
    imageUrl?: string;
  }>;
  onSelect: (selectedId: string) => void;
  currentPair: [any, any];
}

export function ComparisonModal({
  isOpen,
  onClose,
  items,
  onSelect,
  currentPair,
}: ComparisonModalProps) {
  const [currentPairState, setCurrentPairState] = useState<[any, any]>(currentPair);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(2);

  useEffect(() => {
    if (currentPair) {
      setCurrentPairState(currentPair);
    }
  }, [currentPair]);

  const handleContentClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  const handleItemSelect = useCallback(async (selectedId: string, side: 'left' | 'right') => {
    setSelectedItem(selectedId);
    setSelectedSide(side);
    setIsTransitioning(true);
    
    const winner = items.find(item => item.id === selectedId);
    const nextOpponent = items[currentIndex];
    
    setTimeout(() => {
      if (winner && nextOpponent) {
        onSelect(selectedId);
        setCurrentPairState(side === 'right' ? [nextOpponent, winner] : [winner, nextOpponent]);
        setCurrentIndex(prev => prev + 1);
      } else {
        // This is the final selection!
        onSelect(selectedId);
        onClose(); // Close the modal
        setCurrentIndex(2); // reset the comparison phase for next time
      }
      
      setSelectedItem(null);
      setSelectedSide(null);
      setIsTransitioning(false);
    }, 500);
  }, [items, currentIndex, onSelect, onClose]);

  if (!isOpen || !currentPairState) return null;

  return (
    <div 
      className="fixed inset-0 z-50 touch-none"
      onClick={onClose}
      onTouchEnd={onClose}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <Button
        onClick={onClose}
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-4 right-4 opacity-80 z-50 touch-auto md:hidden"
      >
        <X className="w-6 h-6" />
      </Button>

      <div className="relative h-[90dvh] w-[89dvw] flex items-center justify-center m-auto mt-[5dvh] touch-auto">
        <Card 
          className="relative w-full max-w-7xl bg-transparent border-none touch-auto"
          onClick={handleContentClick}
          onTouchEnd={handleContentClick}
        >
          <div className="flex flex-col gap-4 md:flex-row md:gap-8 items-stretch">
            <div className="flex-1">
              <div className={`transition-all duration-500 ${
                selectedItem && selectedItem !== currentPairState[0].id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}>
                <ComparisonItem
                  item={currentPairState[0]}
                  onSelect={() => handleItemSelect(currentPairState[0].id, 'left')}
                  direction="left"
                />
              </div>
            </div>

            <div className="flex justify-center md:hidden">
              <div className="bg-card h-2 rounded-full w-full max-w-md overflow-hidden">
                <div 
                  className="bg-[#FFFAAF] h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${((currentIndex - 2) / (items.length - 2)) * 100}%` 
                  }}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className={`transition-all duration-500 ${
                selectedItem && selectedItem !== currentPairState[1].id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}>
                <ComparisonItem
                  item={currentPairState[1]}
                  onSelect={() => handleItemSelect(currentPairState[1].id, 'right')}
                  direction="right"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 hidden md:flex justify-center">
            <div className="bg-card h-2 rounded-full w-full overflow-hidden">
              <div 
                className="bg-[#FFFAAF] h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${((currentIndex - 2) / (items.length - 2)) * 100}%` 
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

interface ComparisonItemProps {
  item: ListItem;
  onSelect: () => void;
  direction: 'left' | 'right';
}

function ComparisonItem({ item, onSelect, direction }: ComparisonItemProps) {
  return (
    <button
      onClick={onSelect}
      className="w-full h-full group"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden transition-all duration-300 
        hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-primary">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="text-xl font-semibold text-center">{item.name}</p>
          </div>
        </div>
      </div>
    </button>
  );
}