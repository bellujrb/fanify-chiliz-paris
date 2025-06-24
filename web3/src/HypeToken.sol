// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "solady/tokens/ERC20.sol";

contract HypeToken is ERC20 {
    mapping(address staker => uint256 stake) public stakes;

    constructor() {
        _mint(msg.sender, 1_000_000e18);
    }

    function name() public pure override returns (string memory) {
        return "Hype Token";
    }

    function symbol() public pure override returns (string memory) {
        return "HYPE";
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    function stake() public payable {
        if (msg.value < 1 ether) {
            revert("Not enough ETH");
        }

        stakes[msg.sender] += msg.value;
        _mint(msg.sender, msg.value * 1000);
    }

    function unstake() public {
        uint256 amount = stakes[msg.sender];
        if (amount == 0) {
            revert("No stake to unstake");
        }
        stakes[msg.sender] = 0;
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(amount / 1000);
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
