"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface HypeTokenInfoProps {
  hypeTokenOwner: string;
  tokenInfo: any;
  onGetOwner: () => void;
  onGetTokenInfo: () => void;
}

export default function HypeTokenInfo({ 
  hypeTokenOwner, 
  tokenInfo, 
  onGetOwner, 
  onGetTokenInfo 
}: HypeTokenInfoProps) {
  return (
    <div className="space-y-2">
      <Label>Informações do Contrato</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button 
          onClick={onGetOwner} 
          variant="outline"
          className="w-full"
        >
          Verificar Owner
        </Button>
        <Button 
          onClick={onGetTokenInfo} 
          variant="outline"
          className="w-full"
        >
          Informações do Token
        </Button>
      </div>
      {hypeTokenOwner && (
        <div className="p-2 bg-gray-50 rounded text-sm">
          <strong>Owner:</strong> {hypeTokenOwner}
        </div>
      )}
      {tokenInfo && (
        <div className="p-2 bg-blue-50 rounded text-sm space-y-1">
          <div><strong>Nome:</strong> {tokenInfo.name}</div>
          <div><strong>Símbolo:</strong> {tokenInfo.symbol}</div>
          <div><strong>Total Supply:</strong> {tokenInfo.totalSupply}</div>
          <div><strong>Decimais:</strong> {tokenInfo.decimals}</div>
        </div>
      )}
    </div>
  );
} 