// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

abstract contract FunifyEvents {
    event BetPlaced(bytes4 indexed hypeId, address indexed user, bool teamA, uint256 amount);
    event PrizesDistributed(bytes4 indexed hypeId, address indexed winner, uint256 amount);
    event HouseProfitWithdrawn(bytes4 indexed hypeId, uint256 amount);
}
