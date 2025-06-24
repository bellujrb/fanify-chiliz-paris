// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Utils} from "./Utils.t.sol";

contract BaseSetup is Utils {
    address owner;

    function setUp() public virtual {
        vm.label(owner, "OWNER");
        owner = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

        // deploy do Oracle
        // deploy do HypeToken
    }
}
