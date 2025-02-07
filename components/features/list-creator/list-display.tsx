"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListItem } from '@/types';

interface ListDisplayProps {
  items: ListItem[];
  onRemoveItem: (id: string) => void;
}

export function ListDisplay({ items, onRemoveItem }: ListDisplayProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
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
              {/* Image Container */}
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

              {/* Overlay with name */}
              <div className="absolute inset-x-0 bottom-0 w-fit h-fit mx-auto bg-background-secondary rounded-t-xl px-4">
                <h3 className="text-primary text-center text-4xl truncate">
                  {item.name}
                </h3>
              </div>

              {/* Delete Button */}
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
  );
}