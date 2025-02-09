import React from 'react';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListItem } from '@/types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ListItem[];
  onSelect: (selectedId: string) => void;
  currentPair: [ListItem, ListItem];
}

export function ComparisonModal({
    isOpen,
    onClose,
    items,
    onSelect,
    currentPair,
  }: ComparisonModalProps) {
    if (!isOpen) return null;
  
    const [leftItem, rightItem] = currentPair;
  
    const handleContentClick = (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
    };

  return (
    <div 
      className="fixed inset-0 z-50 touch-none"
      onClick={onClose}
      onTouchEnd={onClose}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Close Button */}
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

          {/* Comparison Container */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-8 items-stretch">
            {/* Left Item */}
            <div className="flex-1">
              <ComparisonItem
                item={leftItem}
                onSelect={() => onSelect(leftItem.id)}
                direction="left"
              />
            </div>

          {/* Progress Indicator Mobile*/}
          <div className="flex justify-center md:hidden">
            <div className="bg-card h-2 rounded-full w-full max-w-md overflow-hidden">
              <div 
                className="bg-[#FFFAAF] h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${(items.indexOf(rightItem) / (items.length - 1)) * 100}%` 
                }}
              />
            </div>
          </div>

            {/* Right Item */}
            <div className="flex-1">
              <ComparisonItem
                item={rightItem}
                onSelect={() => onSelect(rightItem.id)}
                direction="right"
              />
            </div>
          </div>

          {/* Progress Indicator Desktop*/}
          <div className="mt-8 hidden md:flex justify-center">
            <div className="bg-card h-2 rounded-full w-full overflow-hidden">
              <div 
                className="bg-[#FFFAAF] h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${(items.indexOf(rightItem) / (items.length - 1)) * 100}%` 
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ComparisonItem component remains the same
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
        hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-[#FFFAAF]">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="text-xl font-semibold text-center">{item.name}</p>
          </div>
        </div>
      </div>
    </button>
  );
}