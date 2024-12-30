import {web3,contract,getConnectedAccount} from './web3.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Await the account to ensure you get the connected account
        let account = await getConnectedAccount();
        
        // Check if account is available
        if (account) {
            document.getElementById('wallet-address').textContent = `${account}`;
        } else {
            console.error("No account found.");
        }
    } catch (error) {
        console.error("Error getting connected account:", error);
    }
});




document.addEventListener("DOMContentLoaded", async () => {
    const walletAddressElement = document.getElementById("wallet-address");
    const contributionsListElement = document.getElementById("contributions-list");
    web3 = new Web3(window.ethereum); // Initialize Web3 instance with MetaMask provider
          contract = new web3.eth.Contract(contractABI, contractAddress); 
    try {
        // Get connected account
        const account = await getConnectedAccount();
        walletAddressElement.textContent = account;

        // Fetch existing contributions (optional, if you want to load previous data)
        // Example: fetch and append existing contributions here if needed.

        // Listen for real-time contributions
        contract.events.ContributionMade({}, async (error, event) => {
            if (error) {
                console.error("Error listening to ContributionMade event:", error);
                return;
            }

            console.log("New Contribution Event:", event);

            // Extract event data
            const { campaignId, contributor, amount } = event.returnValues;

            if (contributor.toLowerCase() === account.toLowerCase()) {
                // Fetch campaign details for the name (optional, if needed)
                const campaignDetails = await contract.methods.getCampaign(campaignId).call();
                const campaignName = campaignDetails.name;

                // Convert amount from Wei to Ether
                const amountInEther = web3.utils.fromWei(amount, "ether");

                // Append the new contribution to the list
                appendContribution(campaignName, amountInEther, new Date());
            }
        });
    } catch (error) {
        console.error("Error initializing dashboard:", error);
    }

    function appendContribution(name, amount, date) {
        const formattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const newListItem = document.createElement("li");
        newListItem.innerHTML = `
            <span class="campaign-name">${name}</span>
            <span class="amount-donated">${amount} ETH</span>
            <span class="date-donated">${formattedDate}</span>
        `;
        contributionsListElement.appendChild(newListItem);
    }
});
