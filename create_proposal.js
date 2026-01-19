const { ethers } = require("hardhat");
const fs = require("fs");
const { PROPOSAL_DESCRIPTION, TARGET_AMOUNT } = require("./constants");

async function main() {
    const addresses = JSON.parse(fs.readFileSync("addresses.json"));
    const [proposer] = await ethers.getSigners();

    const governor = await ethers.getContractAt("SimpleGovernor", addresses.governor, proposer);
    
    // Proposal: Send 0.5 ETH to the proposer (as a test)
    const amountWei = ethers.parseEther(TARGET_AMOUNT);
    
    console.log("Creating proposal...");
    const tx = await governor.createProposal(PROPOSAL_DESCRIPTION, proposer.address, amountWei);
    await tx.wait();

    console.log(`Proposal Created! Description: ${PROPOSAL_DESCRIPTION}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
