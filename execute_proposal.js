const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const addresses = JSON.parse(fs.readFileSync("addresses.json"));
    const [executor] = await ethers.getSigners();

    const governor = await ethers.getContractAt("SimpleGovernor", addresses.governor, executor);
    const treasury = await ethers.getContractAt("Treasury", addresses.treasury, executor);
    
    const proposalId = 1;

    // Optional: Send some ETH to treasury so it has funds to release
    // await executor.sendTransaction({ to: addresses.treasury, value: ethers.parseEther("1.0") });

    console.log("Executing proposal...");
    try {
        const tx = await governor.executeProposal(proposalId);
        await tx.wait();
        console.log("Proposal Executed! Funds transferred.");
    } catch (e) {
        console.log("Execution failed. Check if voting period ended or if treasury has funds.");
        console.log(e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
