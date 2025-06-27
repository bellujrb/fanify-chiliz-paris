"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FunifyWriteFunctionsProps {
  loading: boolean;
  account: string;
  hypeId: string;
  betAmount: string;
  teamA: boolean;
  allowance: string;
  onBetAmountChange: (value: string) => void;
  onTeamAChange: (value: boolean) => void;
  onPlaceBet: () => void;
  onClaimPrize: () => void;
  onApproveHypeToken: () => void;
}

export default function FunifyWriteFunctions({
  loading,
  account,
  hypeId,
  betAmount,
  teamA,
  allowance,
  onBetAmountChange,
  onTeamAChange,
  onPlaceBet,
  onClaimPrize,
  onApproveHypeToken,
}: FunifyWriteFunctionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Fazer Aposta</h3>
      
      {/* Seção de Approve */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">1. Aprovar Tokens</h4>
        <p className="text-sm text-yellow-700 mb-3">
          Antes de fazer uma aposta, você precisa aprovar o contrato Funify para gastar seus tokens HYPE.
        </p>
        <div className="flex items-center gap-4">
          <Button 
            onClick={onApproveHypeToken} 
            disabled={loading || !account || !betAmount}
            variant="outline"
            className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
          >
            {loading ? "Aprovando..." : `Aprovar ${betAmount || '0'} HYPE`}
          </Button>
          <div className="text-sm">
            <span className="text-yellow-700 font-medium">Aprovado:</span>
            <span className={`ml-1 ${Number(allowance) >= Number(betAmount || 0) ? 'text-green-600' : 'text-red-600'}`}>
              {allowance} HYPE
            </span>
            {betAmount && Number(allowance) < Number(betAmount) && (
              <span className="text-red-600 ml-2 text-xs">⚠️ Insuficiente</span>
            )}
            {betAmount && Number(allowance) >= Number(betAmount) && (
              <span className="text-green-600 ml-2 text-xs">✅ Suficiente</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Time</Label>
          <select
            className="w-full p-2 border rounded"
            value={teamA.toString()}
            onChange={(e) => onTeamAChange(e.target.value === "true")}
          >
            <option value="true">Time A</option>
            <option value="false">Time B</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Valor da Aposta (HYPE)</Label>
          <Input
            type="number"
            placeholder="0.0"
            value={betAmount}
            onChange={(e) => onBetAmountChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>&nbsp;</Label>
          <Button 
            onClick={onPlaceBet} 
            disabled={loading || !account || !hypeId || !betAmount}
            className="w-full"
          >
            {loading ? "Fazendo Aposta..." : "Fazer Aposta"}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Reclamar Prêmio</Label>
        <Button 
          onClick={onClaimPrize} 
          disabled={loading || !account || !hypeId}
          className="w-full"
        >
          {loading ? "Reclamando..." : "Reclamar Prêmio"}
        </Button>
      </div>
    </div>
  );
} 