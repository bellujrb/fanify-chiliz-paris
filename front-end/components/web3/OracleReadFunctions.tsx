"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStatusText, getStatusColor } from "@/lib/utils";

interface OracleReadFunctionsProps {
  hypeId: string;
  scheduledTime: string;
  matchData: any;
  onHypeIdChange: (value: string) => void;
  onScheduledTimeChange: (value: string) => void;
  onGetMatchData: () => void;
  onGetHype: () => void;
  onGetMatch: () => void;
  onMatchExists: () => void;
}

export default function OracleReadFunctions({
  hypeId,
  scheduledTime,
  matchData,
  onHypeIdChange,
  onScheduledTimeChange,
  onGetMatchData,
  onGetHype,
  onGetMatch,
  onMatchExists,
}: OracleReadFunctionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Funções de Leitura</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Hype ID (0x...)</Label>
          <Input
            placeholder="0x12345678"
            value={hypeId}
            onChange={(e) => onHypeIdChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Horário Agendado (timestamp)</Label>
          <Input
            type="number"
            placeholder="1735689600"
            value={scheduledTime}
            onChange={(e) => onScheduledTimeChange(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          onClick={onGetMatchData} 
          disabled={!hypeId}
          variant="outline"
          className="w-full"
        >
          Buscar Dados do Match
        </Button>
        <Button 
          onClick={onGetHype} 
          disabled={!hypeId}
          variant="outline"
          className="w-full"
        >
          Buscar Hype
        </Button>
        <Button 
          onClick={onGetMatch} 
          disabled={!hypeId}
          variant="outline"
          className="w-full"
        >
          Buscar Match Completo
        </Button>
        <Button 
          onClick={onMatchExists} 
          disabled={!hypeId}
          variant="outline"
          className="w-full"
        >
          Verificar Existência
        </Button>
      </div>

      {matchData && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Dados do Match:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Hype A: {matchData.hypeA}</div>
            <div>Hype B: {matchData.hypeB}</div>
            <div>Gols A: {matchData.goalsA}</div>
            <div>Gols B: {matchData.goalsB}</div>
            <div>Início: {matchData.start}</div>
            <div>Fim: {matchData.end}</div>
            <div>Agendado: {matchData.scheduledTime}</div>
            <div className="flex items-center gap-2">
              Status: 
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(matchData.status)}`}>
                {getStatusText(matchData.status)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 