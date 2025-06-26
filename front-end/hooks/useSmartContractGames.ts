import { useEffect, useState } from 'react';
import { createPublicClient, http, getContract } from 'viem';
import { anvil } from 'viem/chains';
import deployedContracts from '@/lib/deployedContracts';
import { getStatusText } from '@/lib/utils';

export interface SmartContractGame {
  hypeId: string;
  teamA: string;
  teamB: string;
  status: string;
  goalsA: number;
  goalsB: number;
}

export function useSmartContractGames() {
  const [games, setGames] = useState<SmartContractGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      try {
        const publicClient = createPublicClient({
          chain: anvil,
          transport: http(),
        });
        const oracleContract = getContract({
          address: deployedContracts.Oracle.address as `0x${string}`,
          abi: deployedContracts.Oracle.abi,
          client: publicClient,
        });
        const hypeIds = await oracleContract.read.getAllHypeIds();
        const gamesData = await Promise.all(
          (hypeIds as string[]).map(async (hypeId) => {
            const data = await oracleContract.read.getMatch([hypeId as `0x${string}`]);
            return {
              hypeId,
              teamA: data[8],
              teamB: data[9],
              status: getStatusText(data[7].toString()),
              goalsA: Number(data[2]),
              goalsB: Number(data[3]),
            };
          })
        );
        setGames(gamesData);
      } catch (err) {
        setGames([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  return { games, loading };
} 