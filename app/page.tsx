"use client"
import { useState, useEffect } from 'react';
import ListInput from '@/components/features/list-creator/list-input';
import { ListDisplay } from '@/components/features/list-creator/list-display';
import { ComparisonModal } from '@/components/features/decision-process/comparison-view';
import ResultDisplay from '@/components/features/decision-process/result-display';
import AnimatedSection from '@/components/animated-section';
import { ListItem } from '@/types';

export default function Home() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [currentPair, setCurrentPair] = useState<[ListItem, ListItem] | null>(null);
  const [selectedWinner, setSelectedWinner] = useState<ListItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleReorder = (newItems: ListItem[]) => {
    setItems(newItems);
  };

  const handleStartComparison = () => {
    setCurrentPair([items[0], items[1]]);
    setIsComparisonOpen(true);
  };

  const handleComparisonSelect = (selectedId: string) => {
    const winner = items.find(item => item.id === selectedId);
    setSelectedWinner(winner || null);
  };

  if (!mounted) {
    return null;
  }

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
        <AnimatedSection delay={0} className='section my-6 flex justify-center' key="buy-me-coffee">
          <a target="_blank" href="https://www.buymeacoffee.com/ferdieraslan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=ferdieraslan&button_colour=BD5FFF&font_colour=ffffff&font_family=Bree&outline_colour=000000&coffee_colour=FFDD00" /></a>
        </AnimatedSection>
        <AnimatedSection delay={0.2} className="section text-center my-6" key="intro">
          <h1 className="text-md text-secondary font-bold">How To Work?</h1>
          <p className="text-secondary">Enter your options with image (optional) and let the Pickizard help you decide.</p>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="section my-6" key="input">
          <ListInput items={items} setItems={setItems} />
        </AnimatedSection>

        <AnimatedSection delay={0.6} className="section my-6" key="display">
          <ListDisplay
            items={items}
            onRemoveItem={handleRemoveItem}
            onReorderItems={handleReorder}
            onStartComparison={handleStartComparison}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.8} className="section my-6" key="result" id='resultSection'>
          {selectedWinner && <ResultDisplay winner={{ ...selectedWinner, imageUrl: selectedWinner.imageUrl || '' }} />}
        </AnimatedSection>
      </div>
    </main>
  );
}