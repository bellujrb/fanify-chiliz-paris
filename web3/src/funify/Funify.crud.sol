// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {FunifySec} from "./funify.sec.sol";
import {Status} from "../Oracle.sol";

abstract contract FunifyCrud is FunifySec {
    constructor(address _token, address _oracle) FunifySec(_token, _oracle) {}

    function getOdds(bytes4 hypeId) public view returns (uint256 oddsA, uint256 oddsB) {
        (uint256 hypeA, uint256 hypeB, ) = oracle.getHype(hypeId);
        if (hypeA + hypeB == 0) {
            revert(InvalidHypeValues);
        }

        oddsA = _getOdds(hypeA, hypeB, true);
        oddsB = _getOdds(hypeA, hypeB, false);
    }

    function getPrizePools(bytes4 hypeId) external view returns (uint256 poolA, uint256 poolB, uint256 houseCut) {
        uint256 totalPool = prizePoolA[hypeId] + prizePoolB[hypeId];
        houseCut = (totalPool * HOUSE_FEE) / 1e18;
        poolA = prizePoolA[hypeId];
        poolB = prizePoolB[hypeId];
    }

    // Nova função para obter informações completas do match
    function getMatchInfo(bytes4 hypeId) external view returns (
        uint256 HypeA,
        uint256 HypeB,
        uint8 goalsA,
        uint8 goalsB,
        uint256 start,
        uint256 end,
        uint256 scheduledTime,
        Status status
    ) {
        return oracle.getMatch(hypeId);
    }

    // Nova função para verificar se um match existe
    function matchExists(bytes4 hypeId) external view returns (bool) {
        return oracle.matchExists(hypeId);
    }

    // Nova função para obter dados do match usando matchHypes
    function getMatchData(bytes4 hypeId) external view returns (
        uint256 HypeA,
        uint256 HypeB,
        uint8 goalsA,
        uint8 goalsB,
        uint256 start,
        uint256 end,
        uint256 scheduledTime,
        Status status
    ) {
        return oracle.matchHypes(hypeId);
    }
}
