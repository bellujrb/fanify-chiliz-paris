// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Oracle} from "../Oracle.sol";
import {HypeToken} from "../HypeToken.sol";
import {FunifyError} from "./funify.error.sol";
import {FunifyEvents} from "./funify.events.sol";

abstract contract FunifyStorage is FunifyError, FunifyEvents {
    HypeToken public immutable token;
    Oracle public immutable oracle;
    address public immutable owner;

    // Structure to track bets
    struct Bet {
        uint256 amount; // Amount of HYPE bet
        bool teamA; // true for Team A, false for Team B
    }

    // Mappings
    mapping(bytes4 => mapping(address => Bet)) public bets; // Bets by match and user
    mapping(bytes4 => uint256) public prizePoolA; // Prize pool for Team A
    mapping(bytes4 => uint256) public prizePoolB; // Prize pool for Team B
    mapping(bytes4 => uint256) public houseProfit; // House profit by match

    // House fee (5%)
    uint256 public constant HOUSE_FEE = 5e16; // 5% = 0.05 * 1e18

    constructor(address _token, address _oracle) {
        token = HypeToken(_token);
        oracle = Oracle(_oracle);
        owner = msg.sender;
    }
}
