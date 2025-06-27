// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {FunifyStorage} from "./funify.storage.sol";
import {Status} from "../Oracle.sol";

abstract contract FunifySec is FunifyStorage {
    constructor(address _token, address _oracle) FunifyStorage(_token, _oracle) {}

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert(NotOwner);
        }
        _;
    }

    modifier onlyValidClaim(bytes4 hypeId) {
        if (bets[hypeId][msg.sender].amount == 0) {
            revert(NoBetOnMatch);
        }
        _;
    }

    modifier onlyMatchFinished(bytes4 hypeId) {
        Status status = oracle.getMatchStatus(hypeId);
        if (status != Status.Finished) {
            revert(MatchNotFinished);
        }
        _;
    }

    modifier onlyNoDraw(bytes4 hypeId) {
        (uint8 goalsA, uint8 goalsB) = oracle.getMatchGoals(hypeId);
        if (goalsA == goalsB) {
            revert(MatchEndedInDraw);
        }
        _;
    }

    modifier onlyUserWon(bytes4 hypeId) {
        Bet storage bet = bets[hypeId][msg.sender];
        (uint8 goalsA, uint8 goalsB) = oracle.getMatchGoals(hypeId);
        bool teamAWon = goalsA > goalsB;
        bool userBetOnTeamA = bet.teamA;
        require((teamAWon && userBetOnTeamA) || (!teamAWon && !userBetOnTeamA), UserDidNotWin);
        _;
    }

    modifier onlyValidPlaceBet(bytes4 hypeId, uint256 amount) {
        if (oracle.matchExists(hypeId) == false) {
            revert(NoBetOnMatch);
        }
        Status status = oracle.getMatchStatus(hypeId);
        if (status != Status.Open) {
            revert(MatchNotOpen);
        }
        if (amount == 0) {
            revert(InvalidBetAmount);
        }
        if (bets[hypeId][msg.sender].amount != 0) {
            revert(UserAlreadyBet);
        }
        _;
    }

    function _getOdds(uint256 hypeA, uint256 hypeB, bool teamA) internal pure returns (uint256) {
        uint256 totalHype = hypeA + hypeB;
        require(totalHype == 10000, "Total hype must be 10000");
        return teamA ? (1e18 * totalHype) / hypeA : (1e18 * totalHype) / hypeB;
    }

    function _getTotalProporcao(bool teamAWon, uint256 prizePoolA_, uint256 prizePoolB_, uint256 odds)
        internal
        pure
        returns (uint256)
    {
        return teamAWon ? prizePoolA_ * odds : prizePoolB_ * odds;
    }
}
