"use client"
import { useState } from 'react';
import ListInput from '@/components/features/list-creator/list-input';
import { ListDisplay } from '@/components/features/list-creator/list-display';
import { ListItem } from '@/types';

export default function Home() {
  const [items, setItems] = useState<ListItem[]>([]);

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleReorder = (newItems: ListItem[]) => {
    setItems(newItems);
  };

  return (
    <main>
      <div className="container mx-auto w-[90%] md:w-1/2">
        <div className="section text-center my-6">
          <h1>Hello Pickizard!</h1>
        </div>
        <div className="section my-6">
          <ListInput items={items} setItems={setItems} />
        </div>
        <div className="section my-6">
          <ListDisplay 
            items={items} 
            onRemoveItem={handleRemoveItem} 
            onReorderItems={handleReorder}
          />        
        </div>
      </div>
    </main>
  )
}