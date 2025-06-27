"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OracleReadFunctions from "./OracleReadFunctions";
import OracleWriteFunctions from "./OracleWriteFunctions";
import deployedContracts from "@/lib/deployedContracts";

interface OracleTabProps {
  loading: boolean;
  account: string;
  hypeId: string;
  scheduledTime: string;
  hypeA: string;
  hypeB: string;
  goalsA: string;
  goalsB: string;
  matchData: any;
  hypeIds: string[];
  hashtag: string;
  teamAAbbreviation: string;
  teamBAbbreviation: string;
  onHypeIdChange: (value: string) => void;
  onScheduledTimeChange: (value: string) => void;
  onHypeAChange: (value: string) => void;
  onHypeBChange: (value: string) => void;
  onGoalsAChange: (value: string) => void;
  onGoalsBChange: (value: string) => void;
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
  onGetAllHypeIds: () => void;
  onHashtagChange: (value: string) => void;
  onTeamAAbbreviationChange: (value: string) => void;
  onTeamBAbbreviationChange: (value: string) => void;
}

export default function OracleTab({
  loading,
  account,
  hypeId,
  scheduledTime,
  hypeA,
  hypeB,
  goalsA,
  goalsB,
  matchData,
  hypeIds,
  hashtag,
  teamAAbbreviation,
  teamBAbbreviation,
  onHypeIdChange,
  onScheduledTimeChange,
  onHypeAChange,
  onHypeBChange,
  onGoalsAChange,
  onGoalsBChange,
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
  onGetAllHypeIds,
  onHashtagChange,
  onTeamAAbbreviationChange,
  onTeamBAbbreviationChange,
}: OracleTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oracle Contract</CardTitle>
        <CardDescription>
          Endereço: {deployedContracts.Oracle.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <OracleReadFunctions
          hypeId={hypeId}
          scheduledTime={scheduledTime}
          matchData={matchData}
          hypeIds={hypeIds}
          onHypeIdChange={onHypeIdChange}
          onScheduledTimeChange={onScheduledTimeChange}
          onGetMatchData={onGetMatchData}
          onGetHype={onGetHype}
          onGetMatch={onGetMatch}
          onMatchExists={onMatchExists}
          onGetAllHypeIds={onGetAllHypeIds}
        />

        <Separator />

        <OracleWriteFunctions
          loading={loading}
          account={account}
          hypeId={hypeId}
          scheduledTime={scheduledTime}
          hypeA={hypeA}
          hypeB={hypeB}
          goalsA={goalsA}
          goalsB={goalsB}
          hashtag={hashtag}
          teamAAbbreviation={teamAAbbreviation}
          teamBAbbreviation={teamBAbbreviation}
          onHypeIdChange={onHypeIdChange}
          onScheduledTimeChange={onScheduledTimeChange}
          onHypeAChange={onHypeAChange}
          onHypeBChange={onHypeBChange}
          onGoalsAChange={onGoalsAChange}
          onGoalsBChange={onGoalsBChange}
          onHashtagChange={onHashtagChange}
          onTeamAAbbreviationChange={onTeamAAbbreviationChange}
          onTeamBAbbreviationChange={onTeamBAbbreviationChange}
          onScheduleMatch={onScheduleMatch}
          onUpdateHype={onUpdateHype}
          onOpenToBets={onOpenToBets}
          onCloseBets={onCloseBets}
          onUpdateScore={onUpdateScore}
          onFinishMatch={onFinishMatch}
        />
      </CardContent>
    </Card>
  );
} 