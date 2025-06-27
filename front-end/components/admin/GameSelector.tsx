'use client';

import React from 'react';
import {
  ChevronDown,
  Info,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useSmartContractGames } from '@/hooks/useSmartContractGames';
import TeamsHypeChart from './TeamsHypeChart';
import { createPublicClient, http, getContract } from 'viem';
import { spicy } from 'viem/chains';
import deployedContracts from '@/lib/deployedContracts';


interface GameSelectorProps {
  selectedGame: string;
  onGameSelect: (hypeId: string) => void;
  onOpenToBets: () => void;
  onCloseBets: () => void;
  onFinishMatch: () => void;
  loading: boolean;
}

const GameSelector: React.FC<GameSelectorProps> = ({
  selectedGame,
  onGameSelect,
  onOpenToBets,
  onCloseBets,
  onFinishMatch,
  loading
}) => {
  const { games, loading: contractLoading } = useSmartContractGames();

  // Estado local para siglas dos times e dados completos do match
  const [teamAAbbreviation, setTeamAAbbreviation] = React.useState('');
  const [teamBAbbreviation, setTeamBAbbreviation] = React.useState('');
  const [matchData, setMatchData] = React.useState<any>(null);

  // Buscar dados do contrato ao selecionar um novo jogo
  React.useEffect(() => {
    async function fetchMatchData() {
      if (!selectedGame) {
        setTeamAAbbreviation('');
        setTeamBAbbreviation('');
        setMatchData(null);
        return;
      }
      try {
        const publicClient = createPublicClient({
          chain: spicy,
          transport: http(),
        });
        const oracleContract = getContract({
          address: deployedContracts.Oracle.address as `0x${string}`,
          abi: deployedContracts.Oracle.abi,
          client: publicClient,
        });
        const data = await oracleContract.read.getMatch([
          selectedGame as `0x${string}`,
        ]);
        setTeamAAbbreviation(data[8]);
        setTeamBAbbreviation(data[9]);
        setMatchData({
          hypeA: data[0]?.toString(),
          hypeB: data[1]?.toString(),
          goalsA: data[2]?.toString(),
          goalsB: data[3]?.toString(),
          start: data[4]?.toString(),
          end: data[5]?.toString(),
          scheduledTime: data[6]?.toString(),
          status: data[7],
          teamAAbbreviation: data[8],
          teamBAbbreviation: data[9],
        });
      } catch (err) {
        setTeamAAbbreviation('');
        setTeamBAbbreviation('');
        setMatchData(null);
      }
    }
    fetchMatchData();
  }, [selectedGame]);

  // Dados mock para o gráfico (exemplo)
  const mockHypeData = [
    { day: 'Seg', homeHype: 60, awayHype: 40 },
    { day: 'Ter', homeHype: 65, awayHype: 35 },
    { day: 'Qua', homeHype: 70, awayHype: 30 },
    { day: 'Qui', homeHype: 68, awayHype: 32 },
    { day: 'Sex', homeHype: 72, awayHype: 28 },
    { day: 'Sáb', homeHype: 75, awayHype: 25 },
    { day: 'Dom', homeHype: 80, awayHype: 20 },
  ];

  const homeTeamName = teamAAbbreviation || 'Time A';
  const awayTeamName = teamBAbbreviation || 'Time B';

  return (
    <div className="display">
      {/* Game Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-white border border-gray-200 hover:border-brand-300 transition-all duration-200 shadow-sm hover:shadow-md p-4 h-auto"
          >
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">Select Game:</span>
              {contractLoading ? (
                <span className="text-gray-400">Loading...</span>
              ) : (
                <>
                  {games.length > 0 ? (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">
                        {games.find(g => g.hypeId === selectedGame)?.teamA}
                      </span>
                      <span className="text-gray-400 text-sm">x</span>
                      <span className="font-semibold text-gray-900">
                        {games.find(g => g.hypeId === selectedGame)?.teamB}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">No games</span>
                  )}
                </>
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[400px] p-0 shadow-xl border-0 rounded-xl" align="center">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Available Games</h3>
              <p className="text-sm text-gray-600">Select a game to manage</p>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {contractLoading ? (
                <div className="p-4 text-gray-400">Loading games from contract...</div>
              ) : games.length === 0 ? (
                <div className="p-4 text-gray-400">No games found</div>
              ) : (
                games.map((game) => (
                  <div key={game.hypeId} className="flex items-center justify-between border-b last:border-b-0 hover:bg-gray-50 transition-all">
                    <button
                      onClick={() => onGameSelect(game.hypeId)}
                      className={`flex-1 text-left p-4 ${game.hypeId === selectedGame ? 'bg-brand-50/50 font-bold' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{game.teamA}</span>
                        <span className="text-gray-400">x</span>
                        <span className="font-semibold text-gray-900">{game.teamB}</span>
                        <span className="text-xs text-gray-500">{game.status}</span>
                        {game.goalsA !== 0 || game.goalsB !== 0 ? (
                          <span className="text-xs text-gray-700 ml-2">({game.goalsA} - {game.goalsB})</span>
                        ) : null}
                      </div>
                    </button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="mr-2">
                          <Info className="w-4 h-4 text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72">
                        <div className="text-xs text-gray-500 mb-2">HypeID:</div>
                        <div className="font-mono text-sm break-all mb-2">{game.hypeId}</div>
                        <div className="text-xs text-gray-500 mb-1">Status:</div>
                        <div className="text-sm mb-2">{game.status}</div>
                        <div className="text-xs text-gray-500 mb-1">Goals:</div>
                        <div className="text-sm">{game.goalsA} - {game.goalsB}</div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Row de botões de ação do admin */}
      <div className="flex flex-row gap-3 justify-center mt-4">
        <Button
          onClick={onOpenToBets}
          variant="default"
          className="min-w-[140px]"
          disabled={!selectedGame || loading}
        >
          Open for bets
        </Button>
        <Button
          onClick={onCloseBets}
          variant="outline"
          className="min-w-[140px]"
          disabled={!selectedGame || loading}
        >
          Close bets
        </Button>
        <Button
          onClick={onFinishMatch}
          variant="destructive"
          className="min-w-[140px]"
          disabled={!selectedGame || loading}
        >
          Finish match
        </Button>
      </div>

      {/* Exibir dados completos do match */}
      {matchData && (
        <div className="mt-6 mb-2 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Match Data</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-6 text-sm">
            <div className="text-gray-500">Hype A:<span className="ml-2 text-gray-900 font-semibold">{matchData.hypeA}</span></div>
            <div className="text-gray-500">Hype B:<span className="ml-2 text-gray-900 font-semibold">{matchData.hypeB}</span></div>
            <div className="text-gray-500">Goals A:<span className="ml-2 text-gray-900 font-semibold">{matchData.goalsA}</span></div>
            <div className="text-gray-500">Goals B:<span className="ml-2 text-gray-900 font-semibold">{matchData.goalsB}</span></div>
            <div className="text-gray-500">Start:<span className="ml-2 text-gray-900 font-semibold">{matchData.start}</span></div>
            <div className="text-gray-500">End:<span className="ml-2 text-gray-900 font-semibold">{matchData.end}</span></div>
            <div className="text-gray-500">Scheduled:<span className="ml-2 text-gray-900 font-semibold">{matchData.scheduledTime ? new Date(Number(matchData.scheduledTime) * 1000).toLocaleString('en-US') : '-'}</span></div>
            <div className="text-gray-500 flex items-center">Status:
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${matchData.status === 0 ? 'bg-blue-100 text-blue-700' : matchData.status === 1 ? 'bg-green-100 text-green-700' : matchData.status === 2 ? 'bg-yellow-100 text-yellow-700' : matchData.status === 3 ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-700'}`}>
                {typeof matchData.status === 'number' ? (['Scheduled','Open','Closed','Finished'][matchData.status] || matchData.status) : String(matchData.status)}
              </span>
            </div>
            <div className="text-gray-500 col-span-2 md:col-span-1">Team A:<span className="ml-2 text-gray-900 font-bold uppercase tracking-wide">{matchData.teamAAbbreviation}</span></div>
            <div className="text-gray-500 col-span-2 md:col-span-1">Team B:<span className="ml-2 text-gray-900 font-bold uppercase tracking-wide">{matchData.teamBAbbreviation}</span></div>
          </div>
        </div>
      )}

      <div className='py-2 mt-4'>
        <TeamsHypeChart
          mockHypeData={mockHypeData}
          homeTeamName={homeTeamName}
          awayTeamName={awayTeamName}
        />
      </div>
    </div>
  );
};

export default GameSelector;