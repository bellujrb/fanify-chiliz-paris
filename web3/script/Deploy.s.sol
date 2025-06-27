// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {HypeToken} from "../src/HypeToken.sol";
import {Oracle} from "../src/Oracle.sol";
import {Funify} from "../src/funify/Funify.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        address deployer = msg.sender;

        console.log("[1] Deployer address:", deployer);
        console.log("[2] Deployer balance:", deployer.balance);

        vm.startBroadcast();

        // Deploy HypeToken
        console.log("[3] Deploying HypeToken...");
        HypeToken hypeToken = new HypeToken();
        console.log("[4] HypeToken deployed at:", address(hypeToken));

        // Deploy Oracle
        console.log("[5] Deploying Oracle...");
        Oracle oracle = new Oracle();
        console.log("[6] Oracle deployed at:", address(oracle));

        // Deploy Funify
        console.log("[7] Deploying Funify...");
        Funify funify = new Funify(address(hypeToken), address(oracle));
        console.log("[8] Funify deployed at:", address(funify));

        // Schedule test match
        console.log("[9] Scheduling test match...");
        bytes4 testHypeId = 0x12341234;
        uint256 scheduledTime = block.timestamp + 3600;

        oracle.scheduleMatch(testHypeId, scheduledTime, "PSG", "MIA", "#Chiliz_PSGxMIA_20250629");
        // Exemplo: 75.87% para A, 24.13% para B
        oracle.updateHype(testHypeId, 7587, 2413);
        console.log("[10] Test match scheduled with hypeId: ");
        console.logBytes4(testHypeId);

        console.log("[11] Open match to receive bets");
        oracle.openToBets(0x12341234);

        vm.stopBroadcast();
    }
}
