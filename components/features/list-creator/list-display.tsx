import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ListPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from '@/components/ui/card';
import { ListItem } from '@/types';

interface ListDisplayProps {
  items: ListItem[];
  onRemoveItem: (id: string) => void;
}

export function ListDisplay({ items, onRemoveItem }: ListDisplayProps) {
  const [size, setSize] = useState(3);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

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
      <div className="flex items-center gap-4">
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
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative group aspect-square"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <div className="w-full h-full p-4 bg-background-secondary">
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
                    <h3 
                      className="text-primary text-center text-4xl max-w-full truncate"
                      onMouseEnter={() => setActiveTooltip(item.id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      onTouchStart={(e) => {
                        e.preventDefault(); // Prevent double-tap zoom on mobile
                        if (activeTooltip === item.id) {
                          setActiveTooltip(null);
                        } else {
                          setActiveTooltip(item.id);
                        }
                      }}
                    >
                      {item.name}
                    </h3>
                    
                    {/* Custom Tooltip */}
                    <AnimatePresence>
                      {activeTooltip === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute z-50 bottom-full -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md bg-popover text-popover-foreground text-sm shadow-md min-w-fit w-auto"
                          style={{
                            width: 'max-content',
                            maxWidth: '200px',
                            textAlign: 'center'
                          }}
                        >
                          {item.name}
                          <div 
                            className="absolute w-2 h-2 bg-popover transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <Button
                  onClick={() => onRemoveItem(item.id)}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-80"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}