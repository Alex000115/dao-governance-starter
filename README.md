# DAO Governance Starter

![Solidity](https://img.shields.io/badge/solidity-^0.8.19-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

## Overview

**DAO Governance Starter** is a foundational repository for launching decentralized organizations. It implements a transparent voting mechanism where token holders can propose changes and vote on the usage of treasury funds.

## Key Components

1.  **Governance Token ($GOV)**: An ERC-20 token used for voting power.
2.  **Governor Contract**: Manages proposal creation, voting states, and vote counting.
3.  **Treasury**: A vault that holds funds (ETH/Tokens), controlled exclusively by the Governor contract.

## Workflow

1.  **Propose**: A token holder creates a proposal (e.g., "Send 10 ETH to Alice").
2.  **Vote**: Community members cast votes (For/Against/Abstain) based on their token balance.
3.  **Execute**: If the proposal passes and the voting period ends, the Governor contract triggers the transaction in the Treasury.

## Installation & Usage

```bash
# 1. Install dependencies
npm install

# 2. Deploy the DAO system
npx hardhat run deploy.js --network localhost

# 3. Create a Proposal
node create_proposal.js

# 4. Cast a Vote
node cast_vote.js

# 5. Execute Result
node execute_proposal.js
