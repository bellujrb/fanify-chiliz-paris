"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import HypeTokenInfo from "./HypeTokenInfo";
import TokenOperations from "./TokenOperations";
import deployedContracts from "@/lib/deployedContracts";

interface HypeTokenTabProps {
  loading: boolean;
  account: string;
  hypeTokenOwner: string;
  tokenInfo: any;
  stakeAmount: string;
  unstakeAmount: string;
  transferAmount: string;
  transferTo: string;
  onGetOwner: () => void;
  onGetTokenInfo: () => void;
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

export default function HypeTokenTab({
  loading,
  account,
  hypeTokenOwner,
  tokenInfo,
  stakeAmount,
  unstakeAmount,
  transferAmount,
  transferTo,
  onGetOwner,
  onGetTokenInfo,
  onStakeAmountChange,
  onUnstakeAmountChange,
  onTransferAmountChange,
  onTransferToChange,
  onMint,
  onStake,
  onUnstake,
  onTransfer,
  onEmergencyWithdraw,
}: HypeTokenTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>HypeToken Contract</CardTitle>
        <CardDescription>
          Endereço: {deployedContracts.HypeToken.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <HypeTokenInfo
          hypeTokenOwner={hypeTokenOwner}
          tokenInfo={tokenInfo}
          onGetOwner={onGetOwner}
          onGetTokenInfo={onGetTokenInfo}
        />

        <Separator />

        <TokenOperations
          loading={loading}
          account={account}
          stakeAmount={stakeAmount}
          unstakeAmount={unstakeAmount}
          transferAmount={transferAmount}
          transferTo={transferTo}
          onStakeAmountChange={onStakeAmountChange}
          onUnstakeAmountChange={onUnstakeAmountChange}
          onTransferAmountChange={onTransferAmountChange}
          onTransferToChange={onTransferToChange}
          onMint={onMint}
          onStake={onStake}
          onUnstake={onUnstake}
          onTransfer={onTransfer}
          onEmergencyWithdraw={onEmergencyWithdraw}
        />
      </CardContent>
    </Card>
  );
} 