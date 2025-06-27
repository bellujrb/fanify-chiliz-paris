"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FunifyReadFunctions from "./FunifyReadFunctions";
import FunifyWriteFunctions from "./FunifyWriteFunctions";
import deployedContracts from "@/lib/deployedContracts";

interface FunifyTabProps {
  loading: boolean;
  account: string;
  hypeId: string;
  betAmount: string;
  teamA: boolean;
  odds: any;
  prizePools: any;
  userBet: any;
  matchStats: any;
  claimStatus: any;
  contractStats: any;
  allowance: string;
  onHypeIdChange: (value: string) => void;
  onBetAmountChange: (value: string) => void;
  onTeamAChange: (value: boolean) => void;
  onGetOdds: () => void;
  onGetPrizePools: () => void;
  onPlaceBet: () => void;
  onClaimPrize: () => void;
  onGetUserBet: () => void;
  onGetMatchStats: () => void;
  onCheckClaimStatus: () => void;
  onGetContractStats: () => void;
  onApproveHypeToken: () => void;
}

export default function FunifyTab({
  loading,
  account,
  hypeId,
  betAmount,
  teamA,
  odds,
  prizePools,
  userBet,
  matchStats,
  claimStatus,
  contractStats,
  allowance,
  onHypeIdChange,
  onBetAmountChange,
  onTeamAChange,
  onGetOdds,
  onGetPrizePools,
  onPlaceBet,
  onClaimPrize,
  onGetUserBet,
  onGetMatchStats,
  onCheckClaimStatus,
  onGetContractStats,
  onApproveHypeToken,
}: FunifyTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funify Contract</CardTitle>
        <CardDescription>
          Endereço: {deployedContracts.Funify.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FunifyReadFunctions
          hypeId={hypeId}
          odds={odds}
          prizePools={prizePools}
          userBet={userBet}
          matchStats={matchStats}
          claimStatus={claimStatus}
          contractStats={contractStats}
          onHypeIdChange={onHypeIdChange}
          onGetOdds={onGetOdds}
          onGetPrizePools={onGetPrizePools}
          onGetUserBet={onGetUserBet}
          onGetMatchStats={onGetMatchStats}
          onCheckClaimStatus={onCheckClaimStatus}
          onGetContractStats={onGetContractStats}
        />

        <Separator />

        <FunifyWriteFunctions
          loading={loading}
          account={account}
          hypeId={hypeId}
          betAmount={betAmount}
          teamA={teamA}
          allowance={allowance}
          onBetAmountChange={onBetAmountChange}
          onTeamAChange={onTeamAChange}
          onPlaceBet={onPlaceBet}
          onClaimPrize={onClaimPrize}
          onApproveHypeToken={onApproveHypeToken}
        />
      </CardContent>
    </Card>
  );
} 