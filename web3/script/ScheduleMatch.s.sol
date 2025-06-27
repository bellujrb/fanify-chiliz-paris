// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Oracle} from "../src/Oracle.sol";

contract ScheduleMatchScript is Script {
    function setUp() public {}

    function run() public {
        address deployer = msg.sender;

        console.log("[1] Deployer address:", deployer);
        console.log("[2] Deployer balance:", deployer.balance);

        // Oracle contract address from the deployment logs
        address oracleAddress = 0xDEDCDe27aC9398f8274Accf4C0Ff8bCCd79a3634;
        Oracle oracle = Oracle(oracleAddress);

        vm.startBroadcast();

        // Schedule test match
        console.log("[3] Scheduling test match...");
        bytes4 testHypeId = 0x12341234;
        uint256 scheduledTime = block.timestamp + 3600;

        oracle.scheduleMatch(testHypeId, scheduledTime, "PSG", "MIA", "#Chiliz_PSGxMIA_20250629");
        // Exemplo: 75.87% para A, 24.13% para B
        oracle.updateHype(testHypeId, 7587, 2413);
        console.log("[4] Test match scheduled with hypeId: ");
        console.logBytes4(testHypeId);

        console.log("[5] Opening match to receive bets");
        oracle.openToBets(testHypeId);

        vm.stopBroadcast();
    }
} 