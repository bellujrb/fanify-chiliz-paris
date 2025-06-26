// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../src/HypeToken.sol";
import "../../src/Oracle.sol";
import "../../src/funify/funify.sol";
import "../BaseSetup.t.sol";

contract Fase0Cenario0Test is BaseSetup {
    HypeToken public token;
    Oracle public oracle;
    Funify public funify;
    address casa = address(0xCAFE);
    address payable apostador1;
    address payable apostador2;
    address payable apostador3;
    address payable apostador4;
    address payable apostador5;

    function setUp() public override {
        super.setUp();
        token = new HypeToken();
        oracle = new Oracle();
        funify = new Funify(address(token), address(oracle));
        
        // Schedule match for future time
        uint256 scheduledTime = block.timestamp + 1 hours;
        oracle.scheduleMatch(0x11111111, scheduledTime, "AAA", "BBB");
        
        // Update hype (50% for Team A, 50% for Team B)
        oracle.updateHype(0x11111111, 50, 50);
        
        // Open match for betting
        oracle.openToBets(0x11111111);
        
        apostador1 = createUsers(1)[0];
        apostador2 = createUsers(2)[1];
        apostador3 = createUsers(3)[2];
        apostador4 = createUsers(4)[3];
        apostador5 = createUsers(5)[4];
        
        token.mint(apostador1, 10000 ether);
        token.mint(apostador2, 10000 ether);
        token.mint(apostador3, 10000 ether);
        token.mint(apostador4, 10000 ether);
        token.mint(apostador5, 10000 ether);
        
        vm.prank(apostador1);
        token.approve(address(funify), type(uint256).max);
        vm.prank(apostador2);
        token.approve(address(funify), type(uint256).max);
        vm.prank(apostador3);
        token.approve(address(funify), type(uint256).max);
        vm.prank(apostador4);
        token.approve(address(funify), type(uint256).max);
        vm.prank(apostador5);
        token.approve(address(funify), type(uint256).max);
    }

    function testCenarioSimples() public {
        // Apostador 1 aposta no Time A
        vm.prank(apostador1);
        funify.placeBet(0x11111111, true, 100 ether);
        // Apostador 2 aposta no Time B
        vm.prank(apostador2);
        funify.placeBet(0x11111111, false, 200 ether);
        // Apostador 3 aposta no Time A
        vm.prank(apostador3);
        funify.placeBet(0x11111111, true, 300 ether);
        // Apostador 4 aposta no Time B
        vm.prank(apostador4);
        funify.placeBet(0x11111111, false, 400 ether);
        // Apostador 5 aposta no Time A
        vm.prank(apostador5);
        funify.placeBet(0x11111111, true, 500 ether);

        // Fechar apostas
        oracle.closeBets(0x11111111);
        // Atualizar placar: Time A vence
        oracle.updateScore(0x11111111, 1, 0);
        // Finalizar partida
        oracle.finishMatch(0x11111111);

        // Apostadores do Time A retiram prêmio
        uint256 saldoAntes1 = token.balanceOf(apostador1);
        vm.prank(apostador1);
        funify.claimPrize(0x11111111);
        assertGt(token.balanceOf(apostador1), saldoAntes1, "Apostador1 sem ganho");

        uint256 saldoAntes3 = token.balanceOf(apostador3);
        vm.prank(apostador3);
        funify.claimPrize(0x11111111);
        assertGt(token.balanceOf(apostador3), saldoAntes3, "Apostador3 sem ganho");

        uint256 saldoAntes5 = token.balanceOf(apostador5);
        vm.prank(apostador5);
        funify.claimPrize(0x11111111);
        assertGt(token.balanceOf(apostador5), saldoAntes5, "Apostador5 sem ganho");

        // Apostadores do Time B não recebem nada
        uint256 saldoAntes2 = token.balanceOf(apostador2);
        vm.prank(apostador2);
        funify.claimPrize(0x11111111);
        assertEq(token.balanceOf(apostador2), saldoAntes2, "Apostador2 recebeu erroneamente");

        uint256 saldoAntes4 = token.balanceOf(apostador4);
        vm.prank(apostador4);
        funify.claimPrize(0x11111111);
        assertEq(token.balanceOf(apostador4), saldoAntes4, "Apostador4 recebeu erroneamente");
    }
}