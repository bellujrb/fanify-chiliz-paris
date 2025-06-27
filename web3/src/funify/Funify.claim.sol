// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {FunifyCrud} from "./funify.crud.sol";

abstract contract FunifyClaim is FunifyCrud {
    constructor(address _token, address _oracle) FunifyCrud(_token, _oracle) {}

    function claimPrize(bytes4 hypeId)
        external
        onlyMatchFinished(hypeId)
        onlyNoDraw(hypeId)
        onlyUserWon(hypeId)
        onlyValidClaim(hypeId)
    {
        // Get bet and match details
        Bet storage bet = bets[hypeId][msg.sender];

        // Calculate and transfer prize
        uint256 userPrize = _calculatePrize(hypeId, bet);

        // Update house profit
        _updateHouseProfit(hypeId);

        // Clear user's bet to prevent re-claiming
        bet.amount = 0;

        // Transfer prize to user
        if (!token.transfer(msg.sender, userPrize)) {
            revert(TokenTransferFailed);
        }

        // Emit event
        emit PrizesDistributed(hypeId, msg.sender, userPrize);
    }

    function _calculatePrize(bytes4 hypeId, Bet storage bet) internal view returns (uint256) {
        (uint256 hypeA, uint256 hypeB,) = oracle.getHype(hypeId);
        (,, uint8 goalsA, uint8 goalsB,,,,,,,) = oracle.getMatch(hypeId);
        bool teamAWon = goalsA > goalsB;

        // Calcule oddsA e oddsB
        uint256 oddsA = _getOdds(hypeA, hypeB, true);
        uint256 oddsB = _getOdds(hypeA, hypeB, false);
        uint256 userOdds = bet.teamA ? oddsA : oddsB;
        uint256 totalPool = prizePoolA[hypeId] + prizePoolB[hypeId];
        uint256 houseCut = (totalPool * HOUSE_FEE) / 1e18;
        uint256 prizePool = totalPool - houseCut;

        uint256 totalProporcao = _getTotalProporcao(teamAWon, prizePoolA[hypeId], prizePoolB[hypeId], oddsA, oddsB);
        return (bet.amount * userOdds * prizePool) / totalProporcao;
    }

    function _getTotalProporcao(bool teamAWon, uint256 prizePoolA_, uint256 prizePoolB_, uint256 oddsA, uint256 oddsB)
        internal
        pure
        returns (uint256)
    {
        return teamAWon ? prizePoolA_ * oddsA : prizePoolB_ * oddsB;
    }

    function _updateHouseProfit(bytes4 hypeId) internal {
        if (houseProfit[hypeId] == 0) {
            uint256 totalPool = prizePoolA[hypeId] + prizePoolB[hypeId];
            uint256 houseCut = (totalPool * HOUSE_FEE) / 1e18;
            houseProfit[hypeId] = houseCut;
        }
    }
}
