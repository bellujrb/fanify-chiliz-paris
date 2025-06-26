// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {FunifyCrud} from "./funify.crud.sol";

abstract contract FunifyClaim is FunifyCrud {
    constructor(address _token, address _oracle) FunifyCrud(_token, _oracle) {}

    function claimPrize(bytes4 hypeId)
        external
        onlyValidClaim(hypeId)
        onlyMatchFinished(hypeId)
        onlyNoDraw(hypeId)
        onlyUserWon(hypeId)
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
            (,, uint8 goalsA, uint8 goalsB,,,,,,) = oracle.getMatch(hypeId);
            bool teamAWon = goalsA > goalsB;

            uint256 odds = _getOdds(hypeA, hypeB, bet.teamA);
            uint256 totalPool = prizePoolA[hypeId] + prizePoolB[hypeId];
            uint256 houseCut = (totalPool * HOUSE_FEE) / 1e18;
            uint256 prizePool = totalPool - houseCut;

            uint256 totalProporcao = _getTotalProporcao(teamAWon, prizePoolA[hypeId], prizePoolB[hypeId], odds);
            return (bet.amount * odds * prizePool) / totalProporcao;
        }

    function _updateHouseProfit(bytes4 hypeId) internal {
        if (houseProfit[hypeId] == 0) {
            uint256 totalPool = prizePoolA[hypeId] + prizePoolB[hypeId];
            uint256 houseCut = (totalPool * HOUSE_FEE) / 1e18;
            houseProfit[hypeId] = houseCut;
        }
    }
}
