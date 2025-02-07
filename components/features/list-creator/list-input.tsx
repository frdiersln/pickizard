"use client"
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListItem } from '@/types';

interface ListInputProps {
  items: ListItem[];
  setItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

export default function ListInput({ items, setItems }: ListInputProps) {
  const [currentName, setCurrentName] = useState('');
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a URL for the image preview
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setCurrentImage(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button type="submit">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        {imagePreview && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-24 h-24"
          >
            <img
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