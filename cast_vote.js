const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const addresses = JSON.parse(fs.readFileSync("addresses.json"));
    const [voter] = await ethers.getSigners();

    const governor = await ethers.getContractAt("SimpleGovernor", addresses.governor, voter);
    
    // We assume Proposal ID 1 is the active one
    const proposalId = 1;

    console.log(`Voting on Proposal ${proposalId} with address ${voter.address}...`);
    
    const tx = await governor.vote(proposalId);
    await tx.wait();

    console.log("Vote Cast Successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
