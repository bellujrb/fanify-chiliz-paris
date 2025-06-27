"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface OracleWriteFunctionsProps {
  loading: boolean;
  account: string;
  hypeId: string;
  scheduledTime: string;
  hypeA: string;
  hypeB: string;
  goalsA: string;
  goalsB: string;
  hashtag: string;
  teamAAbbreviation: string;
  teamBAbbreviation: string;
  onHypeIdChange: (value: string) => void;
  onScheduledTimeChange: (value: string) => void;
  onHypeAChange: (value: string) => void;
  onHypeBChange: (value: string) => void;
  onGoalsAChange: (value: string) => void;
  onGoalsBChange: (value: string) => void;
  onHashtagChange: (value: string) => void;
  onTeamAAbbreviationChange: (value: string) => void;
  onTeamBAbbreviationChange: (value: string) => void;
  onScheduleMatch: () => void;
  onUpdateHype: () => void;
  onOpenToBets: () => void;
  onCloseBets: () => void;
  onUpdateScore: () => void;
  onFinishMatch: () => void;
}

export default function OracleWriteFunctions({
  loading,
  account,
  hypeId,
  scheduledTime,
  hypeA,
  hypeB,
  goalsA,
  goalsB,
  hashtag,
  teamAAbbreviation,
  teamBAbbreviation,
  onHypeIdChange,
  onScheduledTimeChange,
  onHypeAChange,
  onHypeBChange,
  onGoalsAChange,
  onGoalsBChange,
  onHashtagChange,
  onTeamAAbbreviationChange,
  onTeamBAbbreviationChange,
  onScheduleMatch,
  onUpdateHype,
  onOpenToBets,
  onCloseBets,
  onUpdateScore,
  onFinishMatch,
}: OracleWriteFunctionsProps) {
  // Função para converter data para timestamp
  const handleDateChange = (dateString: string) => {
    if (dateString) {
      const timestamp = Math.floor(new Date(dateString).getTime() / 1000);
      onScheduledTimeChange(timestamp.toString());
    } else {
      onScheduledTimeChange("");
    }
  };

  // Função para converter timestamp para data (para exibição)
  const getDateFromTimestamp = (timestamp: string) => {
    if (timestamp && !isNaN(Number(timestamp))) {
      return new Date(Number(timestamp) * 1000).toISOString().slice(0, 16);
    }
    return "";
  };

  // Função para atualizar hype A via slider
  const handleHypeAChange = (value: number[]) => {
    const newHypeA = value[0];
    onHypeAChange(newHypeA.toString());
    // Calcular hype B automaticamente para manter total = 100
    onHypeBChange((100 - newHypeA).toString());
  };

  // Função para atualizar hype B via slider
  const handleHypeBChange = (value: number[]) => {
    const newHypeB = value[0];
    onHypeBChange(newHypeB.toString());
    // Calcular hype A automaticamente para manter total = 100
    onHypeAChange((100 - newHypeB).toString());
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold">Funções de Escrita - Etapas do Oracle (0-5)</h3>
      
      {/* Etapa 1: Criar Jogo */}
      <div className="p-4 border rounded-lg bg-blue-50">
        <h4 className="font-medium mb-3 text-blue-800">0. Criar Jogo (Scheduled)</h4>
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
            <Label>Data e Hora do Jogo</Label>
            <Input
              type="datetime-local"
              value={getDateFromTimestamp(scheduledTime)}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
            {scheduledTime && (
              <p className="text-xs text-gray-600">
                Timestamp: {scheduledTime} ({new Date(Number(scheduledTime) * 1000).toLocaleString()})
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Sigla Time A</Label>
            <Input
              placeholder="PSG"
              value={teamAAbbreviation}
              onChange={(e) => onTeamAAbbreviationChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Sigla Time B</Label>
            <Input
              placeholder="BAR"
              value={teamBAbbreviation}
              onChange={(e) => onTeamBAbbreviationChange(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Hashtag Oficial</Label>
            <Input
              placeholder="#PSGBAR"
              value={hashtag}
              onChange={(e) => onHashtagChange(e.target.value)}
            />
          </div>
        </div>
        <Button 
          onClick={onScheduleMatch} 
          disabled={loading || !account || !hypeId || !scheduledTime || !teamAAbbreviation || !teamBAbbreviation || !hashtag}
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Agendando..." : "0. Agendar Match"}
        </Button>
      </div>

      {/* Etapa 2: Alimentar com Hype */}
      <div className="p-4 border rounded-lg bg-yellow-50">
        <h4 className="font-medium mb-3 text-yellow-800">1. Alimentar com Hype</h4>
        
        {/* Slider para Hype A */}
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-yellow-800 font-medium">Hype Time A: {hypeA}%</Label>
              <span className="text-sm text-yellow-700 bg-yellow-200 px-2 py-1 rounded">
                {hypeA}%
              </span>
            </div>
            <Slider
              value={[Number(hypeA) || 0]}
              onValueChange={handleHypeAChange}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Slider para Hype B */}
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-yellow-800 font-medium">Hype Time B: {hypeB}%</Label>
              <span className="text-sm text-yellow-700 bg-yellow-200 px-2 py-1 rounded">
                {hypeB}%
              </span>
            </div>
            <Slider
              value={[Number(hypeB) || 0]}
              onValueChange={handleHypeBChange}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Total e Validação */}
        <div className="mb-4 p-3 bg-yellow-100 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-yellow-800">Total:</span>
            <span className={`font-bold ${Number(hypeA) + Number(hypeB) === 100 ? 'text-green-600' : 'text-red-600'}`}>
              {Number(hypeA) + Number(hypeB)}%
            </span>
          </div>
          {Number(hypeA) + Number(hypeB) !== 100 && (
            <p className="text-xs text-red-600 mt-1">
              ⚠️ Total deve ser igual a 100%
            </p>
          )}
        </div>

        <Button 
          onClick={onUpdateHype} 
          disabled={loading || !account || !hypeId || !hypeA || !hypeB || Number(hypeA) + Number(hypeB) !== 100}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          {loading ? "Atualizando..." : "1. Atualizar Hype"}
        </Button>
      </div>

      {/* Etapa 3: Abrir para Apostas */}
      <div className="p-4 border rounded-lg bg-green-50">
        <h4 className="font-medium mb-3 text-green-800">2. Abrir para Apostas (Open)</h4>
        <Button 
          onClick={onOpenToBets} 
          disabled={loading || !account || !hypeId}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? "Abrindo..." : "2. Abrir para Apostas"}
        </Button>
      </div>

      {/* Etapa 4: Fechar Apostas */}
      <div className="p-4 border rounded-lg bg-orange-50">
        <h4 className="font-medium mb-3 text-orange-800">3. Fechar Apostas (Closed)</h4>
        <Button 
          onClick={onCloseBets} 
          disabled={loading || !account || !hypeId}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
        >
          {loading ? "Fechando..." : "3. Fechar Apostas"}
        </Button>
      </div>

      {/* Etapa 5: Atualizar Placar */}
      <div className="p-4 border rounded-lg bg-purple-50">
        <h4 className="font-medium mb-3 text-purple-800">4. Atualizar Placar</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Gols Time A</Label>
            <Input
              type="number"
              placeholder="2"
              value={goalsA}
              onChange={(e) => onGoalsAChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Gols Time B</Label>
            <Input
              type="number"
              placeholder="1"
              value={goalsB}
              onChange={(e) => onGoalsBChange(e.target.value)}
            />
          </div>
        </div>
        <Button 
          onClick={onUpdateScore} 
          disabled={loading || !account || !hypeId || !goalsA || !goalsB}
          className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white"
        >
          {loading ? "Atualizando..." : "4. Atualizar Placar"}
        </Button>
      </div>

      {/* Etapa 6: Finalizar Jogo */}
      <div className="p-4 border rounded-lg bg-red-50">
        <h4 className="font-medium mb-3 text-red-800">5. Finalizar Jogo (Finished)</h4>
        <Button 
          onClick={onFinishMatch} 
          disabled={loading || !account || !hypeId}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          {loading ? "Finalizando..." : "5. Finalizar Jogo"}
        </Button>
      </div>
    </div>
  );
} 