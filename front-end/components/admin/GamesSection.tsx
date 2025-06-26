'use client';

import React from 'react';
import GameSelector from './GameSelector';

interface GamesSectionProps {
  selectedGame: string;
  onGameSelect: (gameId: string) => void;
}

const GamesSection: React.FC<GamesSectionProps> = ({
  selectedGame,
  onGameSelect
}) => {

  return (
    <div className="space-y-8">
      <GameSelector
        selectedGame={selectedGame}
        onGameSelect={onGameSelect}
      />
    </div>
  );
};

export default GamesSection; 