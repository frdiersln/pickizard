"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, X, ImagePlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListItem } from '@/types';

interface ListInputProps {
  items: ListItem[];
  setItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

export default function ListInput({ items, setItems }: ListInputProps) {
  const [currentName, setCurrentName] = useState('');
  // eslint-disable-next-line
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const handleUploadClick = () => {
    setIsLoading(true);
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Create a promise to simulate/handle the image loading
      await new Promise((resolve) => {
        const img = new HTMLImageElement();
        img.src = URL.createObjectURL(file);
        img.onload = resolve;
      });  

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setCurrentImage(file);
    } catch (error) {
      console.error('Error loading image:', error);
    } finally {
      setIsLoading(false);
    }  
  };  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentName.trim()) return;

    const newItem: ListItem = {
      id: Date.now().toString(),
      name: currentName,
      imageUrl: imagePreview
    };

    setItems(prev => [...prev, newItem]);
    resetForm();
  };

  const resetForm = () => {
    setCurrentName('');
    setCurrentImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    document.getElementById('name-input')?.focus();
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setCurrentImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <Input
            id="name-input"
            type="text"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            placeholder="Enter item name"
            className="flex-1"
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleUploadClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-fit h-4 animate-spin" />
            ) : (
              <ImagePlus className="w-fit h-4" />
            )}
          </Button>
          <Button type="submit" 
          className="relative text-background bg-secondary hover:bg-secondary"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {imagePreview && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-24 h-24"
          >
            <Image
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border border-gray-200"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={removeImage}
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </form>
    </div>
  );
}