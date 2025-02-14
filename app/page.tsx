"use client"
import { useState } from 'react';
import ListInput from '@/components/features/list-creator/list-input';
import { ListDisplay } from '@/components/features/list-creator/list-display';
import { ComparisonModal } from '@/components/features/decision-process/comparison-view';
import ResultDisplay from '@/components/features/decision-process/result-display';
import { ListItem } from '@/types';

export default function Home() {
  const [items, setItems] = useState<ListItem[]>([]);

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleReorder = (newItems: ListItem[]) => {
    setItems(newItems);
  };

  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [currentPair, setCurrentPair] = useState<[ListItem, ListItem] | null>(null);

  const handleStartComparison = () => {
    // Set initial pair
    setCurrentPair([items[0], items[1]]);
    setIsComparisonOpen(true);
  };

  const [selectedWinner, setSelectedWinner] = useState<ListItem | null>(null);

  const handleComparisonSelect = (selectedId: string) => {
    const winner = items.find(item => item.id === selectedId);
    setSelectedWinner(winner || null );
  };

  return (
    <main>
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        items={items}
        currentPair={currentPair!}
        onSelect={handleComparisonSelect}
      />
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
            onStartComparison={handleStartComparison}
          />
        </div>
        <div className="section my-6">
          {selectedWinner && <ResultDisplay winner={{ ...selectedWinner, imageUrl: selectedWinner.imageUrl || '' }} />}
        </div>
      </div>
    </main>
  )
}