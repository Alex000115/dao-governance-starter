// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DAOToken.sol";
import "./Treasury.sol";

contract SimpleGovernor {
    DAOToken public token;
    Treasury public treasury;

    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        bool executed;
        uint256 deadline;
        address payable target;
        uint256 value;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    uint256 public proposalCount;
    uint256 public constant VOTING_DURATION = 5 minutes; // Short for testing

    constructor(address _token, address _treasury) {
        token = DAOToken(_token);
        treasury = Treasury(payable(_treasury));
    }

    function createProposal(string memory _desc, address payable _target, uint256 _value) external {
        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            description: _desc,
            voteCount: 0,
            executed: false,
            deadline: block.timestamp + VOTING_DURATION,
            target: _target,
            value: _value
        });
    }

    function vote(uint256 _proposalId) external {
        Proposal storage p = proposals[_proposalId];
        require(block.timestamp < p.deadline, "Voting ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");
        require(token.balanceOf(msg.sender) > 0, "No voting power");

        hasVoted[_proposalId][msg.sender] = true;
        p.voteCount += token.balanceOf(msg.sender); // 1 Token = 1 Vote
    }

    function executeProposal(uint256 _proposalId) external {
        Proposal storage p = proposals[_proposalId];
        require(block.timestamp >= p.deadline, "Voting not ended");
        require(!p.executed, "Already executed");
        require(p.voteCount > 100, "Quorum not met"); // Simple quorum

        p.executed = true;
        treasury.releaseFunds(p.target, p.value);
    }
}
