'use client';

import React from 'react';
import GameSelector from './GameSelector';

interface GamesSectionProps {
  selectedGame: string;
  onGameSelect: (gameId: string) => void;
  onOpenToBets: () => void;
  onCloseBets: () => void;
  onFinishMatch: () => void;
  loading: boolean;
}

const GamesSection: React.FC<GamesSectionProps> = ({
  selectedGame,
  onGameSelect,
  onOpenToBets,
  onCloseBets,
  onFinishMatch,
  loading
}) => {

  return (
    <div className="space-y-8">
      <GameSelector
        selectedGame={selectedGame}
        onGameSelect={onGameSelect}
        onOpenToBets={onOpenToBets}
        onCloseBets={onCloseBets}
        onFinishMatch={onFinishMatch}
        loading={loading}
      />
    </div>
  );
};

export default GamesSection; 