// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../src/HypeToken.sol";
import "../../src/Oracle.sol";
import "../../src/funify/funify.sol";
import "../BaseSetup.t.sol";

contract Fase1Cenario4Test is BaseSetup {
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
        apostadores = createUsers(15);
        for (uint256 i = 0; i < 15; i++) {
            token.mint(apostadores[i], 10000 ether);
            vm.prank(apostadores[i]);
            token.approve(address(funify), type(uint256).max);
        }
    }

    function testReivindicarAntesFim() public {
        vm.prank(apostadores[0]);
        funify.placeBet(0x12345678, true, 100 ether);
        oracle.updateMatch(0x12345678, 0, 0, Status.Closed);
        vm.expectRevert("Match not finished");
        vm.prank(apostadores[0]);
        funify.claimPrize(0x12345678);
    }
}
