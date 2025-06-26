"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HypeTokenTab from "./HypeTokenTab";
import OracleTab from "./OracleTab";
import FunifyTab from "./FunifyTab";

interface ContractTabsProps {
  loading: boolean;
  account: string;
  hypeId: string;
  scheduledTime: string;
  hypeA: string;
  hypeB: string;
  goalsA: string;
  goalsB: string;
  stakeAmount: string;
  unstakeAmount: string;
  transferAmount: string;
  transferTo: string;
  betAmount: string;
  teamA: boolean;
  matchData: any;
  odds: any;
  prizePools: any;
  hypeTokenOwner: string;
  tokenInfo: any;
  userBet: any;
  matchStats: any;
  claimStatus: any;
  contractStats: any;
  allowance: string;
  hypeIds: string[];
  onHypeIdChange: (value: string) => void;
  onScheduledTimeChange: (value: string) => void;
  onHypeAChange: (value: string) => void;
  onHypeBChange: (value: string) => void;
  onGoalsAChange: (value: string) => void;
  onGoalsBChange: (value: string) => void;
  onStakeAmountChange: (value: string) => void;
  onUnstakeAmountChange: (value: string) => void;
  onTransferAmountChange: (value: string) => void;
  onTransferToChange: (value: string) => void;
  onBetAmountChange: (value: string) => void;
  onTeamAChange: (value: boolean) => void;
  onGetOwner: () => void;
  onGetTokenInfo: () => void;
  onMint: () => void;
  onStake: () => void;
  onUnstake: () => void;
  onTransfer: () => void;
  onEmergencyWithdraw: () => void;
  onGetMatchData: () => void;
  onGetHype: () => void;
  onGetMatch: () => void;
  onMatchExists: () => void;
  onScheduleMatch: () => void;
  onUpdateHype: () => void;
  onOpenToBets: () => void;
  onCloseBets: () => void;
  onUpdateScore: () => void;
  onFinishMatch: () => void;
  onGetOdds: () => void;
  onGetPrizePools: () => void;
  onPlaceBet: () => void;
  onClaimPrize: () => void;
  onGetUserBet: () => void;
  onGetMatchStats: () => void;
  onCheckClaimStatus: () => void;
  onGetContractStats: () => void;
  onApproveHypeToken: () => void;
  onGetAllHypeIds: () => void;
}

export default function ContractTabs({
  loading,
  account,
  hypeId,
  scheduledTime,
  hypeA,
  hypeB,
  goalsA,
  goalsB,
  stakeAmount,
  unstakeAmount,
  transferAmount,
  transferTo,
  betAmount,
  teamA,
  matchData,
  odds,
  prizePools,
  hypeTokenOwner,
  tokenInfo,
  userBet,
  matchStats,
  claimStatus,
  contractStats,
  allowance,
  hypeIds,
  onHypeIdChange,
  onScheduledTimeChange,
  onHypeAChange,
  onHypeBChange,
  onGoalsAChange,
  onGoalsBChange,
  onStakeAmountChange,
  onUnstakeAmountChange,
  onTransferAmountChange,
  onTransferToChange,
  onBetAmountChange,
  onTeamAChange,
  onGetOwner,
  onGetTokenInfo,
  onMint,
  onStake,
  onUnstake,
  onTransfer,
  onEmergencyWithdraw,
  onGetMatchData,
  onGetHype,
  onGetMatch,
  onMatchExists,
  onScheduleMatch,
  onUpdateHype,
  onOpenToBets,
  onCloseBets,
  onUpdateScore,
  onFinishMatch,
  onGetOdds,
  onGetPrizePools,
  onPlaceBet,
  onClaimPrize,
  onGetUserBet,
  onGetMatchStats,
  onCheckClaimStatus,
  onGetContractStats,
  onApproveHypeToken,
  onGetAllHypeIds,
}: ContractTabsProps) {
  return (
    <Tabs defaultValue="hypeToken" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="hypeToken">HypeToken</TabsTrigger>
        <TabsTrigger value="oracle">Oracle</TabsTrigger>
        <TabsTrigger value="funify">Funify</TabsTrigger>
      </TabsList>

      <TabsContent value="hypeToken">
        <HypeTokenTab
          loading={loading}
          account={account}
          hypeTokenOwner={hypeTokenOwner}
          tokenInfo={tokenInfo}
          stakeAmount={stakeAmount}
          unstakeAmount={unstakeAmount}
          transferAmount={transferAmount}
          transferTo={transferTo}
          onGetOwner={onGetOwner}
          onGetTokenInfo={onGetTokenInfo}
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
      </TabsContent>

      <TabsContent value="oracle">
        <OracleTab
          loading={loading}
          account={account}
          hypeId={hypeId}
          scheduledTime={scheduledTime}
          hypeA={hypeA}
          hypeB={hypeB}
          goalsA={goalsA}
          goalsB={goalsB}
          matchData={matchData}
          hypeIds={hypeIds}
          onHypeIdChange={onHypeIdChange}
          onScheduledTimeChange={onScheduledTimeChange}
          onHypeAChange={onHypeAChange}
          onHypeBChange={onHypeBChange}
          onGoalsAChange={onGoalsAChange}
          onGoalsBChange={onGoalsBChange}
          onGetMatchData={onGetMatchData}
          onGetHype={onGetHype}
          onGetMatch={onGetMatch}
          onMatchExists={onMatchExists}
          onScheduleMatch={onScheduleMatch}
          onUpdateHype={onUpdateHype}
          onOpenToBets={onOpenToBets}
          onCloseBets={onCloseBets}
          onUpdateScore={onUpdateScore}
          onFinishMatch={onFinishMatch}
          onGetAllHypeIds={onGetAllHypeIds}
        />
      </TabsContent>

      <TabsContent value="funify">
        <FunifyTab
          loading={loading}
          account={account}
          hypeId={hypeId}
          betAmount={betAmount}
          teamA={teamA}
          odds={odds}
          prizePools={prizePools}
          userBet={userBet}
          matchStats={matchStats}
          claimStatus={claimStatus}
          contractStats={contractStats}
          allowance={allowance}
          onHypeIdChange={onHypeIdChange}
          onBetAmountChange={onBetAmountChange}
          onTeamAChange={onTeamAChange}
          onGetOdds={onGetOdds}
          onGetPrizePools={onGetPrizePools}
          onPlaceBet={onPlaceBet}
          onClaimPrize={onClaimPrize}
          onGetUserBet={onGetUserBet}
          onGetMatchStats={onGetMatchStats}
          onCheckClaimStatus={onCheckClaimStatus}
          onGetContractStats={onGetContractStats}
          onApproveHypeToken={onApproveHypeToken}
        />
      </TabsContent>
    </Tabs>
  );
} 