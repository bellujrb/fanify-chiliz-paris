// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

abstract contract FunifyEvents {
    event BetPlaced(bytes4 indexed hypeId, address indexed user, bool teamA, uint256 amount);
    event PrizesDistributed(bytes4 indexed hypeId, address indexed winner, uint256 amount);
    event HouseProfitWithdrawn(bytes4 indexed hypeId, uint256 amount);
    
    // Novos eventos para funcionalidades adicionadas
    event MatchInfoRequested(bytes4 indexed hypeId, address indexed requester);
    event UserBetQueried(bytes4 indexed hypeId, address indexed user, uint256 amount, bool teamA);
    event MatchStatsCalculated(bytes4 indexed hypeId, uint256 totalBetsA, uint256 totalBetsB, uint256 totalPool);
    event PrizeClaimabilityChecked(bytes4 indexed hypeId, address indexed user, bool canClaim, string reason);
}
