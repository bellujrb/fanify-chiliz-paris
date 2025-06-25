"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FunifyReadFunctionsProps {
  hypeId: string;
  odds: any;
  prizePools: any;
  userBet: any;
  matchStats: any;
  claimStatus: any;
  contractStats: any;
  onHypeIdChange: (value: string) => void;
  onGetOdds: () => void;
  onGetPrizePools: () => void;
  onGetUserBet: () => void;
  onGetMatchStats: () => void;
  onCheckClaimStatus: () => void;
  onGetContractStats: () => void;
}

export default function FunifyReadFunctions({
  hypeId,
  odds,
  prizePools,
  userBet,
  matchStats,
  claimStatus,
  contractStats,
  onHypeIdChange,
  onGetOdds,
  onGetPrizePools,
  onGetUserBet,
  onGetMatchStats,
  onCheckClaimStatus,
  onGetContractStats,
}: FunifyReadFunctionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Funções de Leitura</h3>
      
      <div className="space-y-2">
        <Label>Hype ID (0x...)</Label>
        <Input
          placeholder="0x12345678"
          value={hypeId}
          onChange={(e) => onHypeIdChange(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          onClick={onGetOdds} 
          disabled={!hypeId}
          variant="outline"
        >
          Buscar Odds
        </Button>
        <Button 
          onClick={onGetPrizePools} 
          disabled={!hypeId}
          variant="outline"
        >
          Buscar Prize Pools
        </Button>
        <Button 
          onClick={onGetUserBet} 
          disabled={!hypeId}
          variant="outline"
        >
          Minha Aposta
        </Button>
        <Button 
          onClick={onGetMatchStats} 
          disabled={!hypeId}
          variant="outline"
        >
          Estatísticas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={onCheckClaimStatus} 
          disabled={!hypeId}
          variant="outline"
        >
          Verificar Claim
        </Button>
        <Button 
          onClick={onGetContractStats} 
          variant="outline"
        >
          Estatísticas do Contrato
        </Button>
      </div>

      {odds && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Odds:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Odds A: {odds.oddsA}</div>
            <div>Odds B: {odds.oddsB}</div>
          </div>
        </div>
      )}

      {prizePools && (
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold mb-2">Prize Pools:</h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>Pool A: {prizePools.poolA}</div>
            <div>Pool B: {prizePools.poolB}</div>
            <div>House Cut: {prizePools.houseCut}</div>
          </div>
        </div>
      )}

      {userBet && (
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold mb-2">Minha Aposta:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Valor: {userBet.amount} HYPE</div>
            <div>Time: {userBet.teamA ? 'A' : 'B'}</div>
          </div>
        </div>
      )}

      {matchStats && (
        <div className="p-4 bg-orange-50 rounded-lg">
          <h3 className="font-semibold mb-2">Estatísticas do Match:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Total Bets A: {matchStats.totalBetsA}</div>
            <div>Total Bets B: {matchStats.totalBetsB}</div>
            <div>Total Pool: {matchStats.totalPool}</div>
            <div>House Cut: {matchStats.houseCut}</div>
          </div>
        </div>
      )}

      {claimStatus && (
        <div className={`p-4 rounded-lg ${claimStatus.canClaim ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className="font-semibold mb-2">Status do Claim:</h3>
          <div className="text-sm">
            <div className={`font-medium ${claimStatus.canClaim ? 'text-green-700' : 'text-red-700'}`}>
              {claimStatus.canClaim ? '✅ Pode Reclamar' : '❌ Não Pode Reclamar'}
            </div>
            <div className="text-gray-600 mt-1">{claimStatus.reason}</div>
          </div>
        </div>
      )}

      {contractStats && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Estatísticas do Contrato:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Total Matches: {contractStats.totalMatches}</div>
            <div>Total Bets: {contractStats.totalBets}</div>
            <div>Total House Profit: {contractStats.totalHouseProfit}</div>
            <div>Contract Owner: {contractStats.contractOwner?.slice(0, 10)}...</div>
          </div>
        </div>
      )}
    </div>
  );
} 