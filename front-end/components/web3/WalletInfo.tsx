"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface WalletInfoProps {
  account: string;
  balance: string;
  hypeTokenBalance: string;
  onConnect: () => void;
}

export default function WalletInfo({ account, balance, hypeTokenBalance, onConnect }: WalletInfoProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Carteira</CardTitle>
        <CardDescription>Conecte sua carteira e veja seus saldos</CardDescription>
      </CardHeader>
      <CardContent>
        {!account ? (
          <ConnectButton
            showBalance={false}
            accountStatus="avatar"
            chainStatus="icon"
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Endereço:</span>
              <Badge variant="secondary">{account}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">CHZ Balance:</span>
              <Badge variant="outline">{balance} CHZ</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">HypeToken Balance:</span>
              <Badge variant="outline">{hypeTokenBalance} HYPE</Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 