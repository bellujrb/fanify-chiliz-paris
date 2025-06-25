// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "solady/tokens/ERC20.sol";

contract HypeToken is ERC20 {
    address public owner;
    bool private _locked;

    // Events
    event TokensStaked(address indexed user, uint256 ethAmount, uint256 tokensMinted);
    event TokensUnstaked(address indexed user, uint256 tokensBurned, uint256 ethReturned);
    event TokensMinted(address indexed to, uint256 amount, address indexed by);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier nonReentrant() {
        require(!_locked, "Reentrant call");
        _locked = true;
        _;
        _locked = false;
    }

    constructor() {
        owner = msg.sender;
        // _mint(msg.sender, 1_000_000e18);
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

    function stake() public payable nonReentrant {
        if (msg.value < 1 ether) {
            revert("Not enough ETH");
        }
        // // Check for overflow
        // if (msg.value > type(uint256).max / 1000) {
        //     revert("Stake amount too large");
        // }

        uint256 tokensToMint = msg.value * 1000;
        _mint(msg.sender, tokensToMint);
        emit TokensStaked(msg.sender, msg.value, tokensToMint);
    }

    function unstake(uint256 _amount) public nonReentrant {
        if (_amount > balanceOf(msg.sender)) {
            revert("Insufficient balance to unstake");
        }
        if (_amount == 0) {
            revert("Cannot unstake zero amount");
        }
        uint256 ethToReturn = _amount / 1000;
        if (ethToReturn == 0) {
            revert("Amount too small to unstake");
        }
        if (address(this).balance < ethToReturn) {
            revert("Insufficient contract balance");
        }
        
        // Burn tokens first to prevent reentrancy
        _burn(msg.sender, _amount);
        
        (bool success, ) = payable(msg.sender).call{value: ethToReturn}("");
        if (!success) {
            revert("ETH transfer failed");
        }
        emit TokensUnstaked(msg.sender, _amount, ethToReturn);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        require(amount > 0, "Cannot mint zero amount");
        _mint(to, amount);
        emit TokensMinted(to, amount, msg.sender);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        require(newOwner != owner, "New owner must be different");
        
        address oldOwner = owner;
        owner = newOwner;
        
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    function renounceOwnership() external onlyOwner {
        address oldOwner = owner;
        owner = address(0);
        emit OwnershipTransferred(oldOwner, address(0));
    }

    // Emergency function to withdraw ETH if needed
    function emergencyWithdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "ETH transfer failed");
    }
}
