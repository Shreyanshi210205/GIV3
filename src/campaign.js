import { donateToCampaign } from './web3.js';
import { connectWallet, checkWalletConnection } from './web3.js';




document.addEventListener("DOMContentLoaded", () => {
    // Fetch the current campaign from localStorage
    const currentCampaign = JSON.parse(localStorage.getItem("currentCampaign"));

   

    document.getElementById("campaign-id").textContent= `${currentCampaign.campaignId}`;
    document.getElementById("campaign-title").textContent = `${currentCampaign.name}`;
    document.getElementById("campaign-address").textContent=`${currentCampaign.walletAddress}`;
    document.getElementById("campaign-image").src = currentCampaign.image;

    document.getElementById("campaign-description").textContent = `Description: ${currentCampaign.description}`;
    document.getElementById("campaign-contact").textContent = `Contact: ${currentCampaign.contact}`;
});



//deactivate the campaign 
document.getElementById("deactivateCampaignButton").addEventListener("click", () => {
    const currentCampaign = JSON.parse(localStorage.getItem("currentCampaign"));

    

    // confirmation pop-up
    const confirmation = confirm(
        `Are you sure you want to deactivate the campaign "${currentCampaign.name}"? This action cannot be undone.`
    );

    if (confirmation) {
        // Remove the campaign
        const campaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
        const updatedCampaigns = campaigns.filter(
            (campaign) => campaign.campaignId !== currentCampaign.campaignId
        );

        // save the updated list back to localStorage
        localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));

        // clear the current campaign
        localStorage.removeItem("currentCampaign");

        alert("Campaign deactivated successfully!");
        window.location.href = "index.html"; // Redirect to homepage
    } else {
        alert("Campaign deactivation cancelled.");
    }
});
async function initializePage() {
    const connectedAccount = await checkWalletConnection();
    if (!connectedAccount) {
        alert("Please connect your wallet to proceed.");
        await connectWallet();
    } else {
        console.log("Wallet connected:", connectedAccount);
    }
}

initializePage();


function openDonationPrompt() {
    const donationAmount = prompt("Enter donation amount (in ETH):");
    if (donationAmount) {
        donateToCampaign(donationAmount); 
    } else {
        alert("Please enter a valid donation amount.");
    }
}

document.getElementById('donate-button').addEventListener('click', openDonationPrompt);


export { openDonationPrompt };



