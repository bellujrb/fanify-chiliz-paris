// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../src/HypeToken.sol";
import "../../src/Oracle.sol";
import "../../src/funify/funify.sol";
import "../BaseSetup.t.sol";

contract Fase2Cenario1Test is BaseSetup {
    HypeToken public token;
    Oracle public oracle;
    Funify public funify;
    address casa = address(0xCAFE);
    address payable[] apostadores;

    function setUp() public override {
        super.setUp();
        token = new HypeToken();
        oracle = new Oracle();
        vm.prank(casa);
        funify = new Funify(address(token), address(oracle));

        // Schedule match for future time
        uint256 scheduledTime = block.timestamp + 1 hours;
        oracle.scheduleMatch(0x12345678, scheduledTime, "AAA", "BBB", "#aaa_bbb");

        // Update hype (70% for Team A, 30% for Team B)
        oracle.updateHype(0x12345678, 7000, 3000);

        // Open match for betting
        oracle.openToBets(0x12345678);

        apostadores = createUsers(10);
        for (uint256 i = 0; i < 10; i++) {
            token.mint(apostadores[i], 10000 ether);
            vm.prank(apostadores[i]);
            token.approve(address(funify), type(uint256).max);
        }
    }

    function testCenarioAleatorio1() public {
        // Place random bets (7 on Team A, 3 on Team B)
        for (uint256 i = 0; i < 10; i++) {
            uint256 amount = (100 + (i * 100)) * 1 ether;
            bool apostaA = i < 7;
            vm.prank(apostadores[i]);
            funify.placeBet(0x12345678, apostaA, amount);
        }

        // Close bets (match status becomes Closed)
        oracle.closeBets(0x12345678);

        // Update score: Team A wins (1-0)
        oracle.updateScore(0x12345678, 1, 0);

        // Finish match (match status becomes Finished)
        oracle.finishMatch(0x12345678);

        // Winners claim prizes (Team A bettors - first 7 users)
        for (uint256 i = 0; i < 7; i++) {
            uint256 saldoAntes = token.balanceOf(apostadores[i]);
            vm.prank(apostadores[i]);
            funify.claimPrize(0x12345678);
            assertGt(token.balanceOf(apostadores[i]), saldoAntes, "Sem ganho para vencedor");
        }

        // Losers should not receive anything (Team B bettors - last 3 users)
        for (uint256 i = 7; i < 10; i++) {
            vm.prank(apostadores[i]);
            vm.expectRevert(bytes("E008")); // Espera revert porque perdeu
            funify.claimPrize(0x12345678);
        }
    }
}
