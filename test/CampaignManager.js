const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CampaignManager Contract", function () {
  let CampaignManager;
  let campaignManager;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract before each test
    CampaignManager = await ethers.getContractFactory("CampaignManager");
    campaignManager = await CampaignManager.deploy();
  });

  // Test 1: Contract deployment
  it("Should deploy successfully", async function () {
    expect(campaignManager.address).to.be.properAddress;
  });

  // Test 2: Should allow the owner to create a campaign
  it("Should allow the owner to create a campaign", async function () {
    const campaignId = 1001;
    await campaignManager.createCampaign(
      campaignId, 
      "Test Campaign", 
      "Description of campaign", 
      "image_url.jpg", 
      "contact@domain.com"
    );

    // Check if campaign was created
    const campaign = await campaignManager.campaigns(campaignId);
    expect(campaign.name).to.equal("Test Campaign");
    expect(campaign.creator).to.equal(owner.address);
    expect(campaign.isActive).to.equal(true);
  });

  // Test 3: Should allow contributions to a campaign
  it("Should allow contributions to a campaign", async function () {
    const campaignId = 1002;
    await campaignManager.createCampaign(
      campaignId, 
      "Test Campaign 2", 
      "Another description", 
      "image_url2.jpg", 
      "contact2@domain.com"
    );

    // Address 1 contributes to the campaign
    const contributionAmount = ethers.utils.parseEther("1"); // 1 Ether
    await expect(() =>
      campaignManager.connect(addr1).contributeToCampaign(campaignId, owner.address, { value: contributionAmount })
    ).to.changeEtherBalances([addr1, owner], [-contributionAmount, contributionAmount]);

    const campaign = await campaignManager.campaigns(campaignId);
    expect(campaign.totalContributions).to.equal(contributionAmount);
  });

  // Test 4: Should prevent the creator from contributing to their own campaign
  it("Should prevent the creator from contributing to their own campaign", async function () {
    const campaignId = 1003;
    await campaignManager.createCampaign(
      campaignId, 
      "Test Campaign 3", 
      "Description of campaign 3", 
      "image_url3.jpg", 
      "contact3@domain.com"
    );

    await expect(
      campaignManager.connect(owner).contributeToCampaign(campaignId, owner.address, { value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("You cannot donate to your own campaign");
  });

  // Test 5: Should allow the owner to withdraw funds
  it("Should allow the owner to withdraw funds", async function () {
    const campaignId = 1004;
    await campaignManager.createCampaign(
      campaignId, 
      "Test Campaign 4", 
      "Description of campaign 4", 
      "image_url4.jpg", 
      "contact4@domain.com"
    );

    const contributionAmount = ethers.utils.parseEther("2"); // 2 Ether
    await campaignManager.connect(addr1).contributeToCampaign(campaignId, owner.address, { value: contributionAmount });

    // Check initial balance of the owner
    const initialBalance = await ethers.provider.getBalance(owner.address);

    // Withdraw the funds
    await expect(() => campaignManager.connect(owner).withdrawFunds(campaignId))
      .to.changeEtherBalances([owner], [contributionAmount]);

    // Check the total contributions in the contract after withdrawal
    const campaign = await campaignManager.campaigns(campaignId);
    expect(campaign.totalContributions).to.equal(0);
  });

  // Test 6: Should deactivate a campaign
  it("Should allow the creator to deactivate a campaign", async function () {
    const campaignId = 1005;
    await campaignManager.createCampaign(
      campaignId, 
      "Test Campaign 5", 
      "Description of campaign 5", 
      "image_url5.jpg", 
      "contact5@domain.com"
    );

    await campaignManager.connect(owner).deactivateCampaign(campaignId);

    const campaign = await campaignManager.campaigns(campaignId);
    expect(campaign.isActive).to.equal(false);
  });

  // Test 7: Should not allow non-creator to deactivate a campaign
  it("Should not allow non-creator to deactivate a campaign", async function () {
    const campaignId = 1006;
    await campaignManager.createCampaign(
      campaignId, 
      "Test Campaign 6", 
      "Description of campaign 6", 
      "image_url6.jpg", 
      "contact6@domain.com"
    );

    await expect(
      campaignManager.connect(addr1).deactivateCampaign(campaignId)
    ).to.be.revertedWith("Only the creator can deactivate this campaign");
  });

  // Test 8: Should get user contributions
  it("Should get user contributions", async function () {
    const campaignId = 1007;
    await campaignManager.createCampaign(
      campaignId, 
      "Test Campaign 7", 
      "Description of campaign 7", 
      "image_url7.jpg", 
      "contact7@domain.com"
    );

    // Address 1 contributes to the campaign
    const contributionAmount = ethers.utils.parseEther("3"); // 3 Ether
    await campaignManager.connect(addr1).contributeToCampaign(campaignId, owner.address, { value: contributionAmount });

    // Get user contributions
    const [campaignIds, amounts] = await campaignManager.getUserContributions(addr1.address);
    expect(campaignIds[0]).to.equal(campaignId);
    expect(amounts[0]).to.equal(contributionAmount);
  });
});
