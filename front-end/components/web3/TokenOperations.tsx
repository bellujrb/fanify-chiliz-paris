"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TokenOperationsProps {
  loading: boolean;
  account: string;
  stakeAmount: string;
  unstakeAmount: string;
  transferAmount: string;
  transferTo: string;
  onStakeAmountChange: (value: string) => void;
  onUnstakeAmountChange: (value: string) => void;
  onTransferAmountChange: (value: string) => void;
  onTransferToChange: (value: string) => void;
  onMint: () => void;
  onStake: () => void;
  onUnstake: () => void;
  onTransfer: () => void;
  onEmergencyWithdraw: () => void;
}

export default function TokenOperations({
  loading,
  account,
  stakeAmount,
  unstakeAmount,
  transferAmount,
  transferTo,
  onStakeAmountChange,
  onUnstakeAmountChange,
  onTransferAmountChange,
  onTransferToChange,
  onMint,
  onStake,
  onUnstake,
  onTransfer,
  onEmergencyWithdraw,
}: TokenOperationsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Operações de Token</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label>Mintar Tokens</Label>
          <Button 
            onClick={onMint} 
            disabled={loading || !account}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? "Mintando..." : "Mintar 1000 HYPE"}
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Stake Amount (CHZ)</Label>
          <Input
            type="number"
            placeholder="0.0"
            value={stakeAmount}
            onChange={(e) => onStakeAmountChange(e.target.value)}
          />
          <Button 
            onClick={onStake} 
            disabled={loading || !account || !stakeAmount}
            className="w-full"
          >
            {loading ? "Stakando..." : "Stake"}
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Unstake Amount (HYPE)</Label>
          <Input
            type="number"
            placeholder="0.0"
            value={unstakeAmount}
            onChange={(e) => onUnstakeAmountChange(e.target.value)}
          />
          <Button 
            onClick={onUnstake} 
            disabled={loading || !account || !unstakeAmount}
            className="w-full"
          >
            {loading ? "Unstakando..." : "Unstake"}
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Transferir HYPE</Label>
          <Input
            placeholder="0x..."
            value={transferTo}
            onChange={(e) => onTransferToChange(e.target.value)}
          />
          <Input
            type="number"
            placeholder="0.0"
            value={transferAmount}
            onChange={(e) => onTransferAmountChange(e.target.value)}
          />
          <Button 
            onClick={onTransfer} 
            disabled={loading || !account || !transferTo || !transferAmount}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {loading ? "Transferindo..." : "Transferir"}
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Emergency Withdraw</Label>
          <Button 
            onClick={onEmergencyWithdraw} 
            disabled={loading || !account}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            {loading ? "Withdrawing..." : "Emergency Withdraw"}
          </Button>
        </div>
      </div>
    </div>
  );
} 