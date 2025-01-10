// Initialize web3 and contract variables
// Initialize web3 and contract variables
let web3;
let contract;
let accounts = [];

// Replace with your contract's ABI and deployed contract address
const contractABI =  [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "CampaignCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "CampaignDeactivated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ContributionMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FundsWithdrawn",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "campaigns",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address payable",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imageUrl",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "contact",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "totalContributions",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_campaignId",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "contributeToCampaign",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "contributions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageUrl",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_contact",
        "type": "string"
      }
    ],
    "name": "createCampaign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_campaignId",
        "type": "uint256"
      }
    ],
    "name": "deactivateCampaign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_campaignId",
        "type": "uint256"
      }
    ],
    "name": "getCampaign",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imageUrl",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "contact",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "totalContributions",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserContributions",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "campaignIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userContributions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const contractAddress = '0xac7184615A0519462C038Da195aAD2E809e76687'; 


async function getEthereumBalance(address) {
  if (web3) {
    try {
      const balance = await web3.eth.getBalance(address);
      return web3.utils.fromWei(balance, 'ether'); // Convert balance to Ether
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  } else {
    console.warn('Web3 is not initialized. Connect wallet first.');
    return null;
  }
}


// Function to connect the user's wallet (e.g., MetaMask)
async function connectWallet() {
  if (window.ethereum) {
    try {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });//awaits for the method to request to access the user's ethereum account
      web3 = new Web3(window.ethereum); // Initialize Web3 instance with MetaMask provider
      contract = new web3.eth.Contract(contractABI, contractAddress); // Instantiate the contract

      console.log('Connected wallet address:', accounts[0]);
      return accounts[0]; // Return the connected wallet address
    } catch (err) {
      console.error('Error connecting to wallet:', err);
    }
  } else {
    alert('MetaMask or a compatible wallet is required to connect.');
  }
}

// Function to check if the wallet is already connected
async function checkWalletConnection() {
  if (window.ethereum) {//basically a wallet provider
    try {
      const connectedAccounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (connectedAccounts.length > 0) {
        web3 = new Web3(window.ethereum); // Initialize Web3 instance
        contract = new web3.eth.Contract(contractABI, contractAddress); // Instantiate the contract

        console.log('Wallet already connected:', connectedAccounts[0]);
        return connectedAccounts[0]; // Return the first connected account
      } else {
        console.log('No wallet connected.');
        return null;
      }
    } catch (err) {
      console.error('Error checking wallet connection:', err);
    }
  } else {
    console.warn('MetaMask or compatible wallet is not available.');
    return null;
  }
}


// Function to donate to a campaign
async function donateToCampaign(donationAmount) {
  
  if (!web3 || !contract) {
      alert("Web3 or contract is not initialized. Please connect your wallet.");
      return;
  }

  try {
      const accounts = await web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
          alert("No wallet account found. Please connect your wallet.");
          return;
      }

      const account = accounts[0]; // Use the first account
      console.log("Active account:", account);

      const campaignAddress = document.getElementById('campaign-address').textContent.trim();
      const campaignId=document.getElementById('campaign-id').textContent.trim();
      console.log("Campaign Address:", campaignAddress);

      if (!web3.utils.isAddress(campaignAddress)) {
          alert("Invalid campaign address. Please check the details.");
          return;
      }

      if (!donationAmount || isNaN(donationAmount)) {
          alert("Invalid donation amount. Please enter a valid number.");
          return;
      }

      const amountInWei = web3.utils.toWei(donationAmount, 'ether');
      console.log("Amount in Wei:", amountInWei);

      console.log("Sending transaction from:", account, "to:", campaignAddress);

       await contract.methods
            .contributeToCampaign(campaignId, campaignAddress)
            .send({
                from: account, 
                to:campaignAddress,// The sender's wallet address
                value: amountInWei, // The amount to donate in Wei
            });

      alert("Donation successful!");
  } catch (error) {
      console.error("Error during donation process:", error);
      alert("Failed to process the transaction. Check the console for details.");
  }
}


async function getConnectedAccount() {
  web3 = new Web3(window.ethereum); // Initialize Web3 instance with MetaMask provider

  try {
      if (!web3) {
          console.error("Web3 is not initialized.");
          alert("Please connect your wallet first.");
          return;
      }

      // Fetch accounts from the Ethereum provider (MetaMask or any injected wallet)
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
          console.error("No accounts found. Please connect your wallet.");
          alert("No accounts found. Please connect your wallet.");
          return;
      }

      // The first account is typically the currently connected account
      const connectedAccount = accounts[0];
      console.log("Connected Account:", connectedAccount);

      return connectedAccount; // Optionally return the account for further use
  } catch (error) {
      console.error("Error fetching connected account:", error);
      alert("Error fetching connected account: " + error.message);
  }
}













export {web3,contract,checkWalletConnection,connectWallet,getEthereumBalance,donateToCampaign,getConnectedAccount}