// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

abstract contract FunifyError {
    string public constant MatchAlreadyFinished = "E000";
    string public constant TokenTransferFailed = "E001";
    string public constant NoProfitToWithdraw = "E002";
    string public constant InvalidHypeValues = "E003";
    string public constant InvalidBetAmount = "E004";
    string public constant MatchNotFinished = "E005";
    string public constant MatchEndedInDraw = "E006";
    string public constant UserAlreadyBet = "E007";
    string public constant UserDidNotWin = "E008";
    string public constant MatchNotOpen = "E009";
    string public constant NoBetOnMatch = "E010";
    string public constant OnlyOwner = "E011";
    string public constant NotOwner = "E012";

    // Novos códigos de erro para funcionalidades adicionadas
    string public constant MatchNotFound = "E013";
    string public constant InvalidMatchStatus = "E014";
    string public constant InsufficientPrizePool = "E015";
    string public constant PrizeAlreadyClaimed = "E016";
    string public constant InvalidUserAddress = "E017";
    string public constant OracleCallFailed = "E018";

    // Novos códigos de erro para funcionalidade de siglas dos times
    string public constant TeamAbbreviationsNotSet = "E019";
    string public constant InvalidTeamAbbreviation = "E020";
    string public constant TeamAbbreviationTooLong = "E021";
}
