// SPDX-License-License-Identifier: MIT
pragma solidity ^0.8.28;

import {FunifyPlaceBet} from "./funify.placebet.sol";

contract Funify is FunifyPlaceBet {
    constructor(address _token, address _oracle) FunifyPlaceBet(_token, _oracle) {}

    function withdrawHouseProfit(bytes4 hypeId) external onlyOwner {
        uint256 profit = houseProfit[hypeId];
        if (profit == 0) {
            revert(NoProfitToWithdraw);
        }

        houseProfit[hypeId] = 0;
        if (!token.transfer(owner, profit)) {
            revert(TokenTransferFailed);
        }

        emit HouseProfitWithdrawn(hypeId, profit);
    }
}
