// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../src/HypeToken.sol";
import "../../src/Oracle.sol";
import "../../src/funify/funify.sol";
import "../BaseSetup.t.sol";

contract TeamAbbreviationsTest is BaseSetup {
    HypeToken public token;
    Oracle public oracle;
    Funify public funify;

    function setUp() public override {
        super.setUp();
        token = new HypeToken();
        oracle = new Oracle();
        funify = new Funify(address(token), address(oracle));
    }

    function testSetAndGetTeamAbbreviations() public {
        bytes4 hypeId = 0x12345678;
        
        // Schedule match
        uint256 scheduledTime = block.timestamp + 1 hours;
        oracle.scheduleMatch(hypeId, scheduledTime);
        
        // Set team abbreviations
        oracle.setTeamAbbreviations(hypeId, "PSG", "REAL");
        
        // Get team abbreviations
        (string memory teamA, string memory teamB) = oracle.getTeamAbbreviations(hypeId);
        
        assertEq(teamA, "PSG");
        assertEq(teamB, "REAL");
    }

    function testGetTeamAbbreviationsFromFunify() public {
        bytes4 hypeId = 0x12345678;
        
        // Schedule match
        uint256 scheduledTime = block.timestamp + 1 hours;
        oracle.scheduleMatch(hypeId, scheduledTime);
        
        // Set team abbreviations
        oracle.setTeamAbbreviations(hypeId, "BAR", "JUV");
        
        // Get team abbreviations through Oracle (since Funify function was removed)
        (string memory teamA, string memory teamB) = oracle.getTeamAbbreviations(hypeId);
        
        assertEq(teamA, "BAR");
        assertEq(teamB, "JUV");
    }

    function testCannotSetAbbreviationsForNonExistentMatch() public {
        bytes4 hypeId = 0x12345678;
        
        // Try to set abbreviations without scheduling match
        vm.expectRevert("Match not found");
        oracle.setTeamAbbreviations(hypeId, "PSG", "REAL");
    }

    function testCannotSetEmptyAbbreviations() public {
        bytes4 hypeId = 0x12345678;
        
        // Schedule match
        uint256 scheduledTime = block.timestamp + 1 hours;
        oracle.scheduleMatch(hypeId, scheduledTime);
        
        // Try to set empty abbreviations
        vm.expectRevert("Team A abbreviation cannot be empty");
        oracle.setTeamAbbreviations(hypeId, "", "REAL");
        
        vm.expectRevert("Team B abbreviation cannot be empty");
        oracle.setTeamAbbreviations(hypeId, "PSG", "");
    }

    function testCannotOpenMatchWithoutAbbreviations() public {
        bytes4 hypeId = 0x12345678;
        
        // Schedule match
        uint256 scheduledTime = block.timestamp + 1 hours;
        oracle.scheduleMatch(hypeId, scheduledTime);
        
        // Update hype
        oracle.updateHype(hypeId, 70, 30);
        
        // Try to open match without setting abbreviations
        vm.expectRevert("Team abbreviations must be set before opening");
        oracle.openToBets(hypeId);
    }

    function testCanOpenMatchWithAbbreviations() public {
        bytes4 hypeId = 0x12345678;
        
        // Schedule match
        uint256 scheduledTime = block.timestamp + 1 hours;
        oracle.scheduleMatch(hypeId, scheduledTime);
        
        // Set team abbreviations
        oracle.setTeamAbbreviations(hypeId, "PSG", "REAL");
        
        // Update hype
        oracle.updateHype(hypeId, 70, 30);
        
        // Open match - should work now
        oracle.openToBets(hypeId);
        
        // Verify match is open
        (,, Status status) = oracle.getHype(hypeId);
        assertEq(uint8(status), uint8(Status.Open));
    }
} 