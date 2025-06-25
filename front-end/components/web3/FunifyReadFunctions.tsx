"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FunifyReadFunctionsProps {
  hypeId: string;
  odds: any;
  prizePools: any;
  onHypeIdChange: (value: string) => void;
  onGetOdds: () => void;
  onGetPrizePools: () => void;
}

export default function FunifyReadFunctions({
  hypeId,
  odds,
  prizePools,
  onHypeIdChange,
  onGetOdds,
  onGetPrizePools,
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
} 