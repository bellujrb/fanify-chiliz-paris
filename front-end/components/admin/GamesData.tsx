'use client';

import React from 'react';
import { 
  ChevronDown,
  Circle,
  Clock,
  Trophy,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, Bar } from 'recharts';
import GameSelector from './GameSelector';

interface Game {
  id: string;
  homeTeam: { name: string; logo: string; hype: number };
  awayTeam: { name: string; logo: string; hype: number };
  status: string;
  time: string;
  competition: string;
  score: string;
  minute?: number;
}

interface GamesSectionProps {
  currentGame: Game;
  selectedGame: string;
  onGameSelect: (gameId: string) => void;
}

const GamesData: React.FC<GamesSectionProps> = ({
  currentGame,
  selectedGame,
  onGameSelect
}) => {


  // MOCK DATA para o gráfico de hype (agora por dia)
  const mockHypeData = Array.from({ length: 7 }, (_, i) => ({
    day: `Dia ${i + 1}`,
    homeHype: Math.max(30, Math.min(80, currentGame.homeTeam.hype + Math.round(Math.sin(i / 1.5) * 10) - i)),
    awayHype: Math.max(20, Math.min(70, currentGame.awayTeam.hype + Math.round(Math.cos(i / 1.5) * 10) + i)),
  }));

  return (
    <div className="space-y-8">
      <GameSelector
        selectedGame={selectedGame}
        onGameSelect={onGameSelect}
      />
      {/* Hype Chart - Evolução do Hype dos Times */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span>Hype dos Times</span>
          <span className="text-xs font-normal text-gray-400">(últimos dias)</span>
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockHypeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar dataKey="homeHype" name={currentGame.homeTeam.name} fill="#f87171" barSize={18} radius={[4, 4, 0, 0]} />
              <Bar dataKey="awayHype" name={currentGame.awayTeam.name} fill="#60a5fa" barSize={18} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="homeHype" name={currentGame.homeTeam.name + ' (linha)'} stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="awayHype" name={currentGame.awayTeam.name + ' (linha)'} stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GamesData; 