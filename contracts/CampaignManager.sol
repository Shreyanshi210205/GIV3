// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CampaignManager {
    struct Campaign {
        uint256 id;
        string name;
        address payable creator; 
        bool isActive; 
        string description; 
        string imageUrl; 
        string contact; 
        uint256 totalContributions; 
    }

    mapping(uint256 => Campaign) public campaigns; 
    mapping(address => uint256[]) public userContributions; 
    mapping(uint256 => mapping(address => uint256)) public contributions; // External mapping for contributions
    
    event CampaignCreated(uint256 id, string name, address indexed creator);
    event ContributionMade(uint256 campaignId, address indexed contributor, uint256 amount);
    event CampaignDeactivated(uint256 id, address indexed creator);
    event FundsWithdrawn(uint256 campaignId, address indexed creator, uint256 amount);

    // Create a new campaign
    function createCampaign(
        uint256 _id, 
        string memory _name,
        string memory _description,
        string memory _imageUrl,
        string memory _contact
    ) external {
        require(_id > 999 && _id < 10000, "Campaign ID must be a 4-digit number");
        require(campaigns[_id].creator == address(0), "Campaign ID already exists");

        campaigns[_id] = Campaign({
            id: _id,
            name: _name,
            creator: payable(msg.sender),
            isActive: true,
            description: _description,
            imageUrl: _imageUrl,
            contact: _contact,
            totalContributions: 0
        });

        emit CampaignCreated(_id, _name, msg.sender);
    }

    // Contribute to a campaign
    function contributeToCampaign(uint256 _campaignId, address payable _to) external payable {
        require(_campaignId > 999 && _campaignId < 10000, "Invalid campaign ID");
        Campaign storage campaign = campaigns[_campaignId];

        require(campaign.isActive, "Campaign is not active");
        require(msg.value > 0, "Contribution must be greater than zero");
        require(msg.sender != campaign.creator, "You cannot donate to your own campaign");

        _to.transfer(msg.value);

        contributions[_campaignId][msg.sender] += msg.value;
        campaign.totalContributions += msg.value;

        if (contributions[_campaignId][msg.sender] == msg.value) { 
            userContributions[msg.sender].push(_campaignId);
        }

        emit ContributionMade(_campaignId, msg.sender, msg.value);
    }

    // Deactivate a campaign
    function deactivateCampaign(uint256 _campaignId) public {
        require(_campaignId > 999 && _campaignId < 10000, "Invalid campaign ID");
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only the creator can deactivate this campaign");
        require(campaign.isActive, "Campaign is already inactive");

        campaign.isActive = false;

        emit CampaignDeactivated(_campaignId, msg.sender);
    }

    

    // Get user contributions
    function getUserContributions(address _user)
        external
        view
        returns (uint256[] memory campaignIds, uint256[] memory amounts)
    {
        uint256[] memory contributedCampaigns = userContributions[_user];
        uint256[] memory contributionsList = new uint256[](contributedCampaigns.length);

        for (uint256 i = 0; i < contributedCampaigns.length; i++) {
            contributionsList[i] = contributions[contributedCampaigns[i]][_user];
        }

        return (contributedCampaigns, contributionsList);
    }

    // Get campaign details
    function getCampaign(uint256 _campaignId)
        external
        view
        returns (
            uint256 id,
            string memory name,
            address creator,
            bool isActive,
            string memory description,
            string memory imageUrl,
            string memory contact,
            uint256 totalContributions
        )
    {
        require(_campaignId > 999 && _campaignId < 10000, "Invalid campaign ID");
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.id,
            campaign.name,
            campaign.creator,
            campaign.isActive,
            campaign.description,
            campaign.imageUrl,
            campaign.contact,
            campaign.totalContributions
        );
    }
}