const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Deploy Token
  const Token = await ethers.getContractFactory("DAOToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("Token deployed to:", tokenAddress);

  // 2. Deploy Treasury
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy();
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log("Treasury deployed to:", treasuryAddress);

  // 3. Deploy Governor
  const Governor = await ethers.getContractFactory("SimpleGovernor");
  const governor = await Governor.deploy(tokenAddress, treasuryAddress);
  await governor.waitForDeployment();
  const governorAddress = await governor.getAddress();
  console.log("Governor deployed to:", governorAddress);

  // 4. Transfer Treasury Ownership to Governor
  await treasury.transferOwnership(governorAddress);
  console.log("Treasury ownership transferred to Governor");

  // Save addresses for scripts
  const addresses = { token: tokenAddress, treasury: treasuryAddress, governor: governorAddress };
  fs.writeFileSync("addresses.json", JSON.stringify(addresses));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
