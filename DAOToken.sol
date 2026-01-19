// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAOToken is ERC20, Ownable {
    constructor() ERC20("Governance Token", "GOV") {
        // Mint initial supply to the deployer for testing
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Function to burn tokens if needed
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
