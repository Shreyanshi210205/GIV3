const { ethers } = require("hardhat");

async function main() {
    // Get the deployer's account
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory
    const CampaignManager = await ethers.getContractFactory("CampaignManager");

    // Deploy the contract
    const campaignManager = await CampaignManager.deploy();

    console.log("CampaignManager contract deployed to:", campaignManager.address);

    // You can also deploy a campaign after deployment if needed
    // await campaignManager.createCampaign(
    //   1001,
    //   "Test Campaign",
    //   "A test description",
    //   "test_image_url",
    //   "test_contact"
    // );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
