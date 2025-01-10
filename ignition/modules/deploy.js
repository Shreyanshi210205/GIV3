const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const CampaignManager = await hre.ethers.getContractFactory("CampaignManager");

  // Deploy the contract
  const campaignManager = await CampaignManager.deploy();
  await campaignManager.waitForDeployment();

  const address = await campaignManager.getAddress();
  console.log("CampaignManager deployed to:", address);
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });