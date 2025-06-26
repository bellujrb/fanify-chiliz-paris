// SPDX-License-License-Identifier: MIT
pragma solidity ^0.8.28;

import {FunifyPlaceBet} from "./funify.placebet.sol";
import {Status} from "../Oracle.sol";

contract Funify is FunifyPlaceBet {
    constructor(address _token, address _oracle) FunifyPlaceBet(_token, _oracle) {}

    function withdrawHouseProfit(bytes4 hypeId) external onlyOwner {
        uint256 profit = houseProfit[hypeId];
        if (profit == 0) {
            revert(NoProfitToWithdraw);
        }

        houseProfit[hypeId] = 0;
        if (!token.transfer(owner, profit)) {
            revert(TokenTransferFailed);
        }

        emit HouseProfitWithdrawn(hypeId, profit);
    }

    // Nova função para verificar se um usuário pode reclamar prêmio
    function canClaimPrize(bytes4 hypeId, address user) external view returns (bool canClaim, string memory reason) {
        // Verificar se o usuário fez uma aposta
        if (bets[hypeId][user].amount == 0) {
            return (false, "No bet on match");
        }

        // Verificar se o match está finalizado
        (,, Status status) = oracle.getHype(hypeId);
        if (status != Status.Finished) {
            return (false, "Match not finished");
        }

        // Verificar se não houve empate
        (,, uint8 goalsA, uint8 goalsB,,,,,,) = oracle.getMatch(hypeId);
        if (goalsA == goalsB) {
            return (false, "Match ended in draw");
        }

        // Verificar se o usuário ganhou
        Bet storage bet = bets[hypeId][user];
        bool teamAWon = goalsA > goalsB;
        bool userBetOnTeamA = bet.teamA;

        if ((teamAWon && !userBetOnTeamA) || (!teamAWon && userBetOnTeamA)) {
            return (false, "User did not win");
        }

        return (true, "Can claim prize");
    }

    // Nova função para obter estatísticas gerais do contrato
    function getContractStats() external view returns (
        uint256 totalMatches,
        uint256 totalBets,
        uint256 totalHouseProfit,
        address tokenAddress,
        address oracleAddress,
        address contractOwner
    ) {
        // Nota: Para obter estatísticas completas, seria necessário iterar sobre todos os matches
        // Por simplicidade, retornamos informações básicas
        tokenAddress = address(token);
        oracleAddress = address(oracle);
        contractOwner = owner;
        totalHouseProfit = 0; // Seria calculado iterando sobre houseProfit
        totalMatches = 0; // Seria calculado iterando sobre prizePoolA
        totalBets = 0; // Seria calculado iterando sobre bets
    }
}
