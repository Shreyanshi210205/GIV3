

import { donateToCampaign } from './web3.js';
import { connectWallet, checkWalletConnection } from './web3.js';




document.addEventListener("DOMContentLoaded", () => {
    // Fetch the current campaign from localStorage
    const currentCampaign = JSON.parse(localStorage.getItem("currentCampaign"));

   

    // Populate the campaign details on the page
    document.getElementById("campaign-id").textContent= `${currentCampaign.campaignId}`;
    document.getElementById("campaign-title").textContent = `${currentCampaign.name}`;
    document.getElementById("campaign-address").textContent=`${currentCampaign.walletAddress}`;
    document.getElementById("campaign-image").src = currentCampaign.image;

    document.getElementById("campaign-description").textContent = `Description: ${currentCampaign.description}`;
    document.getElementById("campaign-contact").textContent = `Contact: ${currentCampaign.contact}`;
});



// Function to deactivate the campaign with confirmation
document.getElementById("deactivateCampaignButton").addEventListener("click", () => {
    const currentCampaign = JSON.parse(localStorage.getItem("currentCampaign"));

    

    // Show confirmation pop-up
    const confirmation = confirm(
        `Are you sure you want to deactivate the campaign "${currentCampaign.name}"? This action cannot be undone.`
    );

    if (confirmation) {
        // Remove the campaign from localStorage
        const campaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
        const updatedCampaigns = campaigns.filter(
            (campaign) => campaign.campaignId !== currentCampaign.campaignId
        );

        // Save the updated list back to localStorage
        localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));

        // Clear the current campaign
        localStorage.removeItem("currentCampaign");

        // Notify the user and redirect
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
        donateToCampaign(donationAmount); // Pass the entered amount to the Web3 function
    } else {
        alert("Please enter a valid donation amount.");
    }
}

// Attach the event listener to the "Donate Now" button
document.getElementById('donate-button').addEventListener('click', openDonationPrompt);


export { openDonationPrompt };



