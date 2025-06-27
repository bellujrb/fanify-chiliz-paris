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

        console.log("Deployer address:", deployer);
        console.log("Deployer balance:", deployer.balance);

        vm.startBroadcast();

        // Deploy HypeToken
        console.log("Deploying HypeToken...");
        HypeToken hypeToken = new HypeToken();
        console.log("HypeToken deployed at:", address(hypeToken));

        // Deploy Oracle
        console.log("Deploying Oracle...");
        Oracle oracle = new Oracle();
        console.log("Oracle deployed at:", address(oracle));

        // Deploy Funify
        console.log("Deploying Funify...");
        Funify funify = new Funify(address(hypeToken), address(oracle));
        console.log("Funify deployed at:", address(funify));

        // Schedule test match
        console.log("Scheduling test match...");
        bytes4 testHypeId = 0x12341234;
        uint256 scheduledTime = block.timestamp + 3600;

        oracle.scheduleMatch(testHypeId, scheduledTime, "PSG", "REAL", "#psg_real");
        // Exemplo: 80% para A, 20% para B
        oracle.updateHype(testHypeId, 8000, 2000);
        console.log("Test match scheduled with hypeId: ");
        console.logBytes4(testHypeId);

        vm.stopBroadcast();

        // Log deployment summary
        console.log("\n=== DEPLOYMENT SUMMARY ===");
        console.log("HypeToken:", address(hypeToken));
        console.log("Oracle:", address(oracle));
        console.log("Funify:", address(funify));
        console.log("Deployer:", deployer);
        console.log("========================\n");

        // Verify initial state
        console.log("=== INITIAL STATE VERIFICATION ===");
        console.log("HypeToken total supply:", hypeToken.totalSupply());
        console.log("HypeToken deployer balance:", hypeToken.balanceOf(deployer));
        console.log("Funify owner:", funify.owner());
        console.log("Funify token address:", address(funify.token()));
        console.log("Funify oracle address:", address(funify.oracle()));
        console.log("Test match exists:", oracle.matchExists(testHypeId));
        console.log("==================================\n");
    }
}
