// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {FunifyClaim} from "./funify.claim.sol";
import {FunifySec} from "./funify.sec.sol";

abstract contract FunifyPlaceBet is FunifySec {
    constructor(address _token, address _oracle) FunifySec(_token, _oracle) {}

    function placeBet(bytes4 hypeId, bool teamA, uint256 amount) external onlyValidPlaceBet(hypeId, amount) {
        // Transfer HYPE from user to contract
        // Check if user already bet on this match
        if (bets[hypeId][msg.sender].amount > 0) {
            revert(UserAlreadyBet);
        }

        if (amount == 0) {
            revert(InvalidBetAmount);
        }

        // Check if user already bet on this match
        if (bets[hypeId][msg.sender].amount > 0) {
            revert(UserAlreadyBet);
        }

        if (amount == 0) {
            revert(InvalidBetAmount);
        }

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
