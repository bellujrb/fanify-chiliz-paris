// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {FunifyClaim} from "./funify.claim.sol";

abstract contract FunifyPlaceBet is FunifyClaim {
    constructor(address _token, address _oracle) FunifyClaim(_token, _oracle) {}

    function placeBet(bytes4 hypeId, bool teamA, uint256 amount) external onlyValidPlaceBet(hypeId, amount) {
        // Transfer HYPE from user to contract
        if (!token.transferFrom(msg.sender, address(this), amount)) {
            revert(TokenTransferFailed);
        }

        // Register bet
        bets[hypeId][msg.sender] = Bet({amount: amount, teamA: teamA});
        if (teamA) {
            prizePoolA[hypeId] += amount;
        } else {
            prizePoolB[hypeId] += amount;
        }

        emit BetPlaced(hypeId, msg.sender, teamA, amount);
    }

    // Nova função para obter informações do bet de um usuário
    function getUserBet(bytes4 hypeId, address user) external view returns (uint256 amount, bool teamA) {
        Bet storage bet = bets[hypeId][user];
        return (bet.amount, bet.teamA);
    }

    // Nova função para obter estatísticas do match
    function getMatchStats(bytes4 hypeId) external view returns (
        uint256 totalBetsA,
        uint256 totalBetsB,
        uint256 totalPool,
        uint256 houseCut
    ) {
        totalBetsA = prizePoolA[hypeId];
        totalBetsB = prizePoolB[hypeId];
        totalPool = totalBetsA + totalBetsB;
        houseCut = (totalPool * HOUSE_FEE) / 1e18;
    }
}
