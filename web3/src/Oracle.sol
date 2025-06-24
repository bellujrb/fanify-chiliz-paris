// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

enum Status {
    Open,
    Closed,
    Finished
}

contract Oracle {
    struct MatchHype {
        uint256 HypeA;
        uint256 HypeB;
        uint8 goalsA;
        uint8 goalsB;
        uint256 start;
        uint256 end;
        Status status;
    }

    mapping(bytes4 hypeId => MatchHype) public matchHypes;

    event MatchStarted(bytes4 indexed hypeId, uint256 HypeA, uint256 HypeB);

    function getHype(bytes4 hypeId) public view returns (uint256, uint256, Status) {
        MatchHype memory matchHype = matchHypes[hypeId];
        if (matchHype.start == 0) {
            revert("Match not found");
        }
        return (matchHype.HypeA, matchHype.HypeB, matchHype.status);
    }

    function openMatch(bytes4 hypeId, uint256 hypeA, uint256 hypeB) public {
        matchHypes[hypeId] = MatchHype({
            start: block.timestamp,
            end: block.timestamp + 90 minutes,
            HypeA: hypeA,
            goalsA: 0,
            HypeB: hypeB,
            goalsB: 0,
            status: Status.Open
        });

        emit MatchStarted(hypeId, hypeA, hypeB);
    }

    function updateMatch(bytes4 hypeId, uint8 goalsA, uint8 goalsB, Status status) public {
        matchHypes[hypeId].goalsA = goalsA;
        matchHypes[hypeId].goalsB = goalsB;
        matchHypes[hypeId].status = status;
    }
}
