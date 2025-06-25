// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {HypeToken} from "../src/HypeToken.sol";
import {Oracle} from "../src/Oracle.sol";
import {Funify} from "../src/funify/Funify.sol";
import {Status} from "../src/Oracle.sol";

contract SetupExampleScript is Script {
    function setUp() public {}

    function run() public {
        // Endereços do deploy local que acabou de ser executado
        address hypeTokenAddress = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
        address oracleAddress = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512;
        address funifyAddress = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0;

        HypeToken hypeToken = HypeToken(hypeTokenAddress);
        Oracle oracle = Oracle(oracleAddress);
        Funify funify = Funify(funifyAddress);

        console.log("=== SETUP EXAMPLE - FUNIFY ===");
        console.log("HypeToken:", address(hypeToken));
        console.log("Oracle:", address(oracle));
        console.log("Funify:", address(funify));

        // Simular algumas operações básicas
        console.log("\n=== EXAMPLE OPERATIONS ===");

        // 1. Verificar saldo inicial do deployer
        address deployer = msg.sender;
        console.log("Deployer HYPE balance:", hypeToken.balanceOf(deployer));

        // 2. Transferir tokens para alguns usuários de teste
        address user1 = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        address user2 = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;

        vm.startBroadcast();

        // Transferir tokens para usuários
        hypeToken.transfer(user1, 1000e18);
        hypeToken.transfer(user2, 1000e18);

        console.log("Transferred 1000 HYPE to user1:", user1);
        console.log("Transferred 1000 HYPE to user2:", user2);

        // 3. Criar uma partida no Oracle
        bytes4 matchId = bytes4(keccak256("MATCH_001"));
        oracle.openMatch(matchId, 100, 80); // HypeA: 100, HypeB: 80

        console.log("Created match with ID:", vm.toString(matchId));
        console.log("Match hype values - Team A: 100, Team B: 80");

        // 4. Verificar odds da partida
        (uint256 oddsA, uint256 oddsB) = funify.getOdds(matchId);
        console.log("Match odds - Team A:", oddsA, "Team B:", oddsB);

        // 5. Simular apostas
        // User1 aposta 100 HYPE no Team A
        hypeToken.approve(address(funify), 100e18);
        funify.placeBet(matchId, true, 100e18); // true = Team A

        console.log("User1 placed 100 HYPE bet on Team A");

        // User2 aposta 50 HYPE no Team B
        vm.stopBroadcast();
        vm.startBroadcast();
        hypeToken.approve(address(funify), 50e18);
        funify.placeBet(matchId, false, 50e18); // false = Team B

        console.log("User2 placed 50 HYPE bet on Team B");

        // 6. Verificar pools de prêmios
        (uint256 poolA, uint256 poolB, uint256 houseCut) = funify.getPrizePools(matchId);
        console.log("Prize pools - Team A:", poolA);
        console.log("Prize pools - Team B:", poolB);
        console.log("House cut:", houseCut);

        vm.stopBroadcast();

        console.log("\n=== SETUP COMPLETE ===");
        console.log("The system is now ready for testing!");
        console.log("Next steps:");
        console.log("1. Wait for match to finish");
        console.log("2. Update match results in Oracle");
        console.log("3. Allow winners to claim prizes");
    }
}
