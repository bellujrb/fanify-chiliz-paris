// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

enum Status {
    Scheduled,  // 0. Jogo criado e agendado
    Open,       // 1. Aberto para apostas
    Closed,     // 2. Fechado para apostas (jogo em andamento)
    Finished    // 3. Jogo finalizado
}

contract Oracle {
    struct MatchHype {
        uint256 HypeA;
        uint256 HypeB;
        uint8 goalsA;
        uint8 goalsB;
        uint256 start;
        uint256 end;
        uint256 scheduledTime;  // Horário agendado para o jogo
        Status status;
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

    // 1. Criar um Jogo (hype, status.scheduled)
    function scheduleMatch(bytes4 hypeId, uint256 scheduledTime) public {
        require(matchHypes[hypeId].start == 0, "Match already exists");
        // AQUI - VALIDAÇÃO DE TEMPO COMENTADA PARA TESTES
        // require(scheduledTime > block.timestamp, "Scheduled time must be in the future");
        
        matchHypes[hypeId] = MatchHype({
            start: 0,
            end: 0,
            scheduledTime: scheduledTime,
            HypeA: 0,
            HypeB: 0,
            goalsA: 0,
            goalsB: 0,
            status: Status.Scheduled
        });

        hypeIds.push(hypeId); // Adiciona o hypeId à lista

        emit MatchScheduled(hypeId, scheduledTime);
    }

    // 2. Alimentar esse jogo com hype (hype A, hype B)
    function updateHype(bytes4 hypeId, uint256 HypeA, uint256 HypeB) public {
        MatchHype storage matchHype = matchHypes[hypeId];
        require(matchHype.scheduledTime != 0, "Match not found");
        require(matchHype.status == Status.Scheduled, "Match must be scheduled to update hype");
        require(HypeA + HypeB == 100, "Total hype must equal 100");

        matchHype.HypeA = HypeA;
        matchHype.HypeB = HypeB;

        emit HypeUpdated(hypeId, HypeA, HypeB);
    }

    // 3. Abrir o jogo para apostas (status.open)
    function openToBets(bytes4 hypeId) public {
        MatchHype storage matchHype = matchHypes[hypeId];
        require(matchHype.scheduledTime != 0, "Match not found");
        require(matchHype.status == Status.Scheduled, "Match must be scheduled");
        require(matchHype.HypeA > 0 && matchHype.HypeB > 0, "Hype must be set before opening");
        // require(block.timestamp >= matchHype.scheduledTime - 120 minutes, "Too early to open bets");

        matchHype.status = Status.Open;
        matchHype.start = block.timestamp;
        matchHype.end = block.timestamp + 120 minutes;

        emit MatchOpened(hypeId, matchHype.HypeA, matchHype.HypeB);
    }

    // 4. Iniciar o jogo e fechar para apostas (status.closed)
    function closeBets(bytes4 hypeId) public {
        MatchHype storage matchHype = matchHypes[hypeId];
        require(matchHype.scheduledTime != 0, "Match not found");
        require(matchHype.status == Status.Open, "Match must be open to close bets");
        // AQUI - VALIDAÇÃO DE TEMPO COMENTADA PARA TESTES
        // require(block.timestamp >= matchHype.scheduledTime, "Match has not started yet");

        matchHype.status = Status.Closed;

        emit MatchClosed(hypeId);
    }

    // 5. Atualizar o placar do jogo (golA, golB)
    function updateScore(bytes4 hypeId, uint8 goalsA, uint8 goalsB) public {
        MatchHype storage matchHype = matchHypes[hypeId];
        require(matchHype.scheduledTime != 0, "Match not found");
        require(matchHype.status == Status.Closed, "Match must be closed to update score");

        matchHype.goalsA = goalsA;
        matchHype.goalsB = goalsB;

        emit ScoreUpdated(hypeId, goalsA, goalsB);
    }

    // 6. Finalizar o jogo e liberar apostas (status.finished)
    function finishMatch(bytes4 hypeId) public {
        MatchHype storage matchHype = matchHypes[hypeId];
        require(matchHype.scheduledTime != 0, "Match not found");
        require(matchHype.status == Status.Closed, "Match must be closed to finish");
        require(matchHype.goalsA > 0 || matchHype.goalsB > 0, "Score must be set before finishing");

        matchHype.status = Status.Finished;

        emit MatchFinished(hypeId, matchHype.goalsA, matchHype.goalsB);
    }

    // Função para obter informações completas do jogo
    function getMatch(bytes4 hypeId) public view returns (
        uint256 HypeA,
        uint256 HypeB,
        uint8 goalsA,
        uint8 goalsB,
        uint256 start,
        uint256 end,
        uint256 scheduledTime,
        Status status
    ) {
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
            matchHype.status
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
        return matchHypes[hypeId].scheduledTime != 0;
    }

    // Função para obter todos os hypeIds
    function getAllHypeIds() public view returns (bytes4[] memory) {
        return hypeIds;
    }

    // Função para obter o número total de jogos
    function getTotalMatches() public view returns (uint256) {
        return hypeIds.length;
    }
}
