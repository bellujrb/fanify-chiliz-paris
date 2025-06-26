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
}
