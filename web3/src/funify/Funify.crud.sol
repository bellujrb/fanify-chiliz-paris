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
}
