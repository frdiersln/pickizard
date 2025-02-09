import React, { useState } from 'react';
import { X, ListPlus, ChevronUp, ChevronDown, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from '@/components/ui/card';
import { ListItem } from '@/types';

interface ListDisplayProps {
  items: ListItem[];
  onRemoveItem: (id: string) => void;
  onReorderItems: (newItems: ListItem[]) => void;
  onStartComparison: () => void;
}

export function ListDisplay({ 
  items, 
  onRemoveItem, 
  onReorderItems,
  onStartComparison 
}: ListDisplayProps) {
  const [size, setSize] = useState(3);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    
    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    onReorderItems(newItems);
  };

  if (items.length === 0) {
    return (
      <Card className="w-full h-[300px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center gap-4">
          <ListPlus className="h-12 w-12" />
          <p className="text-lg">Add items to your list to get started</p>
        </CardContent>
      </Card>
    );
  }

  const gridSizeClasses = {
    1: "grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
    2: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2",
    5: "grid-cols-1"
  }[size];

  return (
    <div className="space-y-6 rounded-lg p-2">
      <Button
        onClick={onStartComparison}
        disabled={items.length < 3}
        className="bg-primary w-full text-primary-foreground hover:bg-primary hover:scale-105 shadow-[0_0_20px_rgba(255,250,175,0.6)] border border-[#FFFAAF]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <Wand2 className="mr-2 h-4 w-4" />
        Lets Pick!
      </Button>

      <div className="flex items-center justify-between gap-4">
        <div className="sliderWrapper flex w-fit max-w-full">
          <span className="text-xs mt-1 text-muted-foreground">Smaller</span>
          <Slider
            defaultValue={[3]}
            max={5}
            min={1}
            step={1}
            value={[size]}
            onValueChange={([newSize]) => setSize(newSize)}
            className="w-[300px] max-w-full mx-2"
          />
          <span className="text-md text-muted-foreground">Larger</span>
        </div>        
      </div>

      <div className={`grid ${gridSizeClasses} gap-4`}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative group aspect-square"
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <div 
                className="w-full h-full p-2 sm:p-4 bg-background-secondary"
                onMouseEnter={() => setActiveTooltip(item.id)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                {/* Reorder Controls - Redesigned */}
                <div className="absolute left-0 top-0 z-10 flex flex-col h-full justify-between">
                  <Button
                    onClick={() => moveItem(index, 'up')}
                    variant="secondary"
                    size="icon"
                    className="h-5 w-5 bg-white/60 backdrop-blur-sm hover:bg-white/80 rounded-bl-none rounded-tr-none"
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button
                    onClick={() => moveItem(index, 'down')}
                    variant="secondary"
                    size="icon"
                    className="h-5 w-5 bg-white/60 backdrop-blur-sm hover:bg-white/80 rounded-br-none rounded-tl-none"
                    disabled={index === items.length - 1}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>

                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full rounded-sm object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center rounded-sm bg-gray-200">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              <div className="absolute inset-x-0 bottom-0 max-w-[60%] w-fit h-fit mx-auto bg-background-secondary rounded-t-xl px-4">
                <div className="relative flex justify-center">
                  <h3 className="text-primary text-center text-xl max-w-full truncate py-2">
                    {item.name}
                  </h3>
                  
                  {activeTooltip === item.id && item.name.length > 15 && (
                    <div className="absolute z-50 bottom-full -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md bg-popover text-popover-foreground text-sm shadow-md">
                      {item.name}
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={() => onRemoveItem(item.id)}
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 h-6 w-6 opacity-80 hover:opacity-100 rounded-br-none rounded-tl-none"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}