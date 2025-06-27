// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {FunifyError} from "./funify/Funify.error.sol";

enum Status {
    Scheduled, // 0. Jogo criado e agendado
    Open, // 1. Aberto para apostas
    Closed, // 2. Fechado para apostas (jogo em andamento)
    Finished, // 3. Jogo finalizado
    Canceled // 4. Jogo Cancelado

}

contract Oracle is FunifyError {
    address public immutable owner;

    struct MatchHype {
        uint256 HypeA;
        uint256 HypeB;
        uint8 goalsA;
        uint8 goalsB;
        uint256 start;
        uint256 end;
        uint256 scheduledTime; // Horário agendado para o jogo
        Status status;
        string teamAAbbreviation; // Sigla do Time A (ex: "PSG", "REAL")
        string teamBAbbreviation; // Sigla do Time B (ex: "BAR", "JUV")
        string hashtag; // NOVO CAMPO
    }

    mapping(bytes4 hypeId => MatchHype) public matchHypes;
    bytes4[] public hypeIds; // Lista de todos os hypeIds

    // Events para cada etapa
    event MatchScheduled(bytes4 indexed hypeId, uint256 scheduledTime);
    event HypeUpdated(bytes4 indexed hypeId, uint256 HypeA, uint256 HypeB);
    event MatchOpened(bytes4 indexed hypeId, uint256 HypeA, uint256 HypeB);
    event MatchClosed(bytes4 indexed hypeId);
    event ScoreUpdated(bytes4 indexed hypeId, uint8 goalsA, uint8 goalsB);
    event MatchFinished(bytes4 indexed hypeId, uint8 goalsA, uint8 goalsB);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert(NotOwner);
        }
        _;
    }

    // 1. Criar um Jogo (hype, status.scheduled)
    function scheduleMatch(
        bytes4 hypeId,
        uint256 scheduledTime,
        string memory teamAAbbreviation,
        string memory teamBAbbreviation,
        string memory hashtag // NOVO PARAM
    ) public onlyOwner {
        if (matchHypes[hypeId].start != 0) revert(MatchAlreadyFinished);
        // require(scheduledTime > block.timestamp, "Scheduled time must be in the future");
        if (bytes(teamAAbbreviation).length == 0) revert(InvalidTeamAbbreviation);
        if (bytes(teamBAbbreviation).length == 0) revert(InvalidTeamAbbreviation);
        if (bytes(hashtag).length == 0) revert(OracleCallFailed);

        matchHypes[hypeId] = MatchHype({
            start: 0,
            end: 0,
            scheduledTime: scheduledTime,
            HypeA: 0,
            HypeB: 0,
            goalsA: 0,
            goalsB: 0,
            status: Status.Scheduled,
            teamAAbbreviation: teamAAbbreviation,
            teamBAbbreviation: teamBAbbreviation,
            hashtag: hashtag
        });

        hypeIds.push(hypeId); // Adiciona o hypeId à lista

        emit MatchScheduled(hypeId, scheduledTime);
    }

    // 2. Alimentar esse jogo com hype (hype A, hype B)
    function updateHype(bytes4 hypeId, uint256 HypeA, uint256 HypeB) public onlyOwner {
        MatchHype storage matchHype = matchHypes[hypeId];
        if (matchHype.scheduledTime == 0) revert(MatchNotFound);
        if (matchHype.status != Status.Scheduled) revert(InvalidMatchStatus);
        if (HypeA + HypeB != 10000) revert(InvalidHypeValues);

        matchHype.HypeA = HypeA;
        matchHype.HypeB = HypeB;

        emit HypeUpdated(hypeId, HypeA, HypeB);
    }

    // 3. Abrir o jogo para apostas (status.open)
    function openToBets(bytes4 hypeId) public onlyOwner {
        MatchHype storage matchHype = matchHypes[hypeId];
        if (matchHype.scheduledTime == 0) revert(MatchNotFound);
        if (matchHype.status != Status.Scheduled) revert(InvalidMatchStatus);
        if (matchHype.status == Status.Canceled) revert(InvalidMatchStatus); // Não pode abrir se cancelado
        if (matchHype.HypeA == 0 || matchHype.HypeB == 0) revert(InvalidHypeValues);
        if (bytes(matchHype.teamAAbbreviation).length == 0 || bytes(matchHype.teamBAbbreviation).length == 0) {
            revert(TeamAbbreviationsNotSet);
        }
        // require(block.timestamp >= matchHype.scheduledTime - 120 minutes, "Too early to open bets");

        matchHype.status = Status.Open;
        matchHype.start = block.timestamp;
        matchHype.end = block.timestamp + 120 minutes;

        emit MatchOpened(hypeId, matchHype.HypeA, matchHype.HypeB);
    }

    // 4. Iniciar o jogo e fechar para apostas (status.closed)
    function closeBets(bytes4 hypeId) public onlyOwner {
        MatchHype storage matchHype = matchHypes[hypeId];
        if (matchHype.status != Status.Open) revert(InvalidMatchStatus);
        if (matchHype.status == Status.Canceled) revert(InvalidMatchStatus); // Não pode fechar se cancelado

        matchHype.status = Status.Closed;
        matchHype.end = block.timestamp;

        emit MatchClosed(hypeId);
    }

    // 5. Atualizar o placar do jogo (golA, golB)
    function updateScore(bytes4 hypeId, uint8 goalsA, uint8 goalsB) public onlyOwner {
        MatchHype storage matchHype = matchHypes[hypeId];
        if (matchHype.scheduledTime == 0) revert(MatchNotFound);
        if (matchHype.status != Status.Closed) revert(InvalidMatchStatus);

        matchHype.goalsA = goalsA;
        matchHype.goalsB = goalsB;

        emit ScoreUpdated(hypeId, goalsA, goalsB);
    }

    // 6. Finalizar o jogo e liberar apostas (status.finished)
    function finishMatch(bytes4 hypeId) public onlyOwner {
        MatchHype storage matchHype = matchHypes[hypeId];
        if (matchHype.scheduledTime == 0) revert(MatchNotFound);
        if (matchHype.status != Status.Closed) revert(InvalidMatchStatus);
        if (matchHype.status == Status.Canceled) revert(InvalidMatchStatus); // Não pode finalizar se cancelado

        matchHype.status = Status.Finished;

        emit MatchFinished(hypeId, matchHype.goalsA, matchHype.goalsB);
    }

    // 7. Cancelar o jogo (status.canceled)
    function cancelMatch(bytes4 hypeId) public onlyOwner {
        MatchHype storage matchHype = matchHypes[hypeId];
        if (matchHype.scheduledTime == 0) revert(MatchNotFound);

        matchHype.status = Status.Canceled;

        emit MatchFinished(hypeId, matchHype.goalsA, matchHype.goalsB);
    }

    // Função para obter informações completas do jogo
    function getMatch(bytes4 hypeId)
        public
        view
        returns (
            uint256 HypeA,
            uint256 HypeB,
            uint8 goalsA,
            uint8 goalsB,
            uint256 start,
            uint256 end,
            uint256 scheduledTime,
            Status status,
            string memory teamAAbbreviation,
            string memory teamBAbbreviation,
            string memory hashtag // NOVO RETORNO
        )
    {
        MatchHype memory matchHype = matchHypes[hypeId];
        require(matchHype.scheduledTime != 0, "Match not found");

        return (
            matchHype.HypeA,
            matchHype.HypeB,
            matchHype.goalsA,
            matchHype.goalsB,
            matchHype.start,
            matchHype.end,
            matchHype.scheduledTime,
            matchHype.status,
            matchHype.teamAAbbreviation,
            matchHype.teamBAbbreviation,
            matchHype.hashtag // NOVO RETORNO
        );
    }

    // Função para obter apenas o hype e status (mantida para compatibilidade)
    function getHype(bytes4 hypeId) public view returns (uint256, uint256, Status) {
        MatchHype memory matchHype = matchHypes[hypeId];
        require(matchHype.scheduledTime != 0, "Match not found");
        return (matchHype.HypeA, matchHype.HypeB, matchHype.status);
    }

    // Função para verificar se um jogo existe
    function matchExists(bytes4 hypeId) public view returns (bool) {
        return matchHypes[hypeId].status != Status.Scheduled;
    }

    // Função para obter todos os hypeIds
    function getAllHypeIds() public view returns (bytes4[] memory) {
        return hypeIds;
    }

    // Função para obter o número total de jogos
    function getTotalMatches() public view returns (uint256) {
        return hypeIds.length;
    }

    function getMatchStatus(bytes4 hypeId) public view returns (Status) {
        return matchHypes[hypeId].status;
    }

    function getMatchGoals(bytes4 hypeId) public view returns (uint8 goalsA, uint8 goalsB) {
        return (matchHypes[hypeId].goalsA, matchHypes[hypeId].goalsB);
    }

    // Função para buscar jogo por hashtag
    function getMatchByHashtag(string memory hashtag) public view returns (bytes4 hypeId, MatchHype memory matchHype) {
        for (uint256 i = 0; i < hypeIds.length; i++) {
            MatchHype memory m = matchHypes[hypeIds[i]];
            if (keccak256(bytes(m.hashtag)) == keccak256(bytes(hashtag))) {
                return (hypeIds[i], m);
            }
        }
        revert(MatchNotFound);
    }
}
