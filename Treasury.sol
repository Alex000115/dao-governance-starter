// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Treasury is Ownable {
    uint256 public totalFunds;

    event FundsReceived(address indexed sender, uint256 amount);
    event FundsReleased(address indexed to, uint256 amount);

    // Accept ETH deposits
    receive() external payable {
        totalFunds += msg.value;
        emit FundsReceived(msg.sender, msg.value);
    }

    // Only the owner (The Governor Contract) can release funds
    function releaseFunds(address payable _to, uint256 _amount) external onlyOwner {
        require(address(this).balance >= _amount, "Insufficient funds");
        totalFunds -= _amount;
        (bool sent, ) = _to.call{value: _amount}("");
        require(sent, "Failed to send Ether");
        emit FundsReleased(_to, _amount);
    }
}
