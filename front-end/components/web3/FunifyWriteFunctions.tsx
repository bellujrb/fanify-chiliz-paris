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
  onBetAmountChange: (value: string) => void;
  onTeamAChange: (value: boolean) => void;
  onPlaceBet: () => void;
  onClaimPrize: () => void;
}

export default function FunifyWriteFunctions({
  loading,
  account,
  hypeId,
  betAmount,
  teamA,
  onBetAmountChange,
  onTeamAChange,
  onPlaceBet,
  onClaimPrize,
}: FunifyWriteFunctionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Fazer Aposta</h3>
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