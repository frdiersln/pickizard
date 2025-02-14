import React from 'react';
import { ListItem } from '@/types';

interface ResultDisplayProps {
  winner: ListItem | null;
}

const ResultDisplay = ({ winner }: ResultDisplayProps) => {

  return (
    <>
      {winner && (
        <div>
          <h2>Winner: {winner.name}</h2>
        </div>
      )}
    </>
  );
};

export default ResultDisplay;