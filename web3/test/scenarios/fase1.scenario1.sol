// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../src/HypeToken.sol";
import "../../src/Oracle.sol";
import "../../src/funify/funify.sol";
import "../BaseSetup.t.sol";

contract Fase1Cenario1Test is BaseSetup {
    HypeToken public token;
    Oracle public oracle;
    Funify public funify;
    address casa = address(0xCAFE);
    address payable[] apostadores;
    uint256[10] apostasA = [100, 200, 100, 200, 200, 200, 200, 400, 800, 1000];
    uint256[5] apostasB = [100, 200, 100, 800, 1000];

    function setUp() public override {
        super.setUp();
        token = new HypeToken();
        oracle = new Oracle();
        funify = new Funify(address(token), address(oracle));
        oracle.openMatch(0x12345678, 7000, 3000);
        apostadores = createUsers(15);
        for (uint256 i = 0; i < 15; i++) {
            token.mint(apostadores[i], 10000 ether);
            vm.prank(apostadores[i]);
            token.approve(address(funify), type(uint256).max);
        }
    }

    function testCenario1() public {
        for (uint256 i = 0; i < 10; i++) {
            vm.prank(apostadores[i]);
            funify.placeBet(0x12345678, true, apostasA[i] * 1 ether);
        }
        for (uint256 i = 0; i < 5; i++) {
            vm.prank(apostadores[10 + i]);
            funify.placeBet(0x12345678, false, apostasB[i] * 1 ether);
        }
        oracle.updateMatch(0x12345678, 1, 0, Status.Finished);
        uint256 totalPrize;
        for (uint256 i = 0; i < 10; i++) {
            uint256 saldoAntes = token.balanceOf(apostadores[i]);
            vm.prank(apostadores[i]);
            funify.claimPrize(0x12345678);
            uint256 ganho = token.balanceOf(apostadores[i]) - saldoAntes;
            assertGt(ganho, 0, "Apostador A sem ganho");
            totalPrize += ganho;
        }
        for (uint256 i = 10; i < 15; i++) {
            uint256 saldoAntes = token.balanceOf(apostadores[i]);
            vm.prank(apostadores[i]);
            funify.claimPrize(0x12345678);
            assertEq(token.balanceOf(apostadores[i]), saldoAntes, "Apostador B recebeu erroneamente");
        }
        vm.prank(casa);
        funify.withdrawHouseProfit(0x12345678);
        uint256 lucroCasa = token.balanceOf(casa);
        uint256 totalApostado = 5500 ether;
        assertEq(lucroCasa, totalApostado * 5 / 100, "Lucro da casa incorreto");
    }
}
