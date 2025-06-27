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
  hypeIds: string[];
  onHypeIdChange: (value: string) => void;
  onScheduledTimeChange: (value: string) => void;
  onGetMatchData: () => void;
  onGetHype: () => void;
  onGetMatch: () => void;
  onMatchExists: () => void;
  onGetAllHypeIds: () => void;
}

export default function OracleReadFunctions({
  hypeId,
  scheduledTime,
  matchData,
  hypeIds,
  onHypeIdChange,
  onScheduledTimeChange,
  onGetMatchData,
  onGetHype,
  onGetMatch,
  onMatchExists,
  onGetAllHypeIds,
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

      {/* Seção para Lista de HypeIds */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-gray-800">Lista de HypeIds</h4>
          <Button onClick={onGetAllHypeIds} variant="outline" size="sm">
            Atualizar Lista
          </Button>
        </div>

        {hypeIds.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 mb-3">
              Total de jogos: {hypeIds.length}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {hypeIds.map((id, index) => (
                <div
                  key={index}
                  className="p-2 bg-white border rounded text-sm font-mono text-blue-600 hover:bg-blue-50 cursor-pointer"
                  onClick={() => onHypeIdChange(id)}
                  title="Clique para selecionar este HypeId"
                >
                  {id}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            Nenhum hypeId encontrado. Clique em "Atualizar Lista" para buscar.
          </p>
        )}
      </div>

      {matchData && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Dados do Match:</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {/* Coluna 1: Time A */}
            <div>
              <div>Nome A: {matchData.nameA}</div>
              <div>Hype A: {matchData.hypeA}</div>
              <div>Gols A: {matchData.goalsA}</div>
            </div>
            {/* Coluna 2: Time B */}
            <div>
              <div>Nome B: {matchData.nameB}</div>
              <div>Hype B: {matchData.hypeB}</div>
              <div>Gols B: {matchData.goalsB}</div>
            </div>
            {/* Coluna 3: Outros dados */}
            <div>
              <div>Hashtag: {matchData.hashtag}</div>
              <div>Agendado: {matchData.scheduledTime}</div>
              <div>Início: {matchData.start}</div>
              <div>Fim: {matchData.end}</div>
              <div className="flex items-center gap-2 mt-1">
                Status:
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                    matchData.status
                  )}`}
                >
                  {getStatusText(matchData.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
