// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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
        funify = new Funify(address(token), address(oracle));
        oracle.openMatch(0x12345678, 7000, 3000);
        apostadores = createUsers(10);
        for (uint256 i = 0; i < 10; i++) {
            token.mint(apostadores[i], 10000 ether);
            vm.prank(apostadores[i]);
            token.approve(address(funify), type(uint256).max);
        }
    }

    function testCenarioAleatorio() public {
        for (uint256 i = 0; i < 10; i++) {
            uint256 amount = (100 + (i * 100)) * 1 ether;
            bool apostaA = i < 7;
            vm.prank(apostadores[i]);
            funify.placeBet(0x12345678, apostaA, amount);
        }
        oracle.updateMatch(0x12345678, 1, 0, Status.Finished);
        for (uint256 i = 0; i < 7; i++) {
            uint256 saldoAntes = token.balanceOf(apostadores[i]);
            vm.prank(apostadores[i]);
            funify.claimPrize(0x12345678);
            assertGt(token.balanceOf(apostadores[i]), saldoAntes, "Sem ganho para vencedor");
        }
        for (uint256 i = 7; i < 10; i++) {
            uint256 saldoAntes = token.balanceOf(apostadores[i]);
            vm.prank(apostadores[i]);
            funify.claimPrize(0x12345678);
            assertEq(token.balanceOf(apostadores[i]), saldoAntes, "Perdedor recebeu erroneamente");
        }
    }
}
