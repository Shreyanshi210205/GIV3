import {getConnectedAccount,getEthereumBalance} from './web3.js';

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




// Assume you have a div with id 'balance-display' in your HTML to display the balance.
// Example: <div id="balance-display">Loading balance...</div>

document.addEventListener("DOMContentLoaded", async () =>{
        const balanceDisplayElement = document.getElementById('balance-display');
        let address=await getConnectedAccount();
    if (!address) {
      alert('Connect Your Wallet First');
      return;
    }
  
    try {
      // Fetch the balance using the provided function
      const balance = await getEthereumBalance(address);
  
      if (balance !== null) {
        balanceDisplayElement.textContent = ` ${balance} ETH`;
      } else {
        balanceDisplayElement.textContent = 'Unable to fetch balance. Please try again later.';
      }
    } catch (error) {
      console.error('Error displaying balance:', error);
      balanceDisplayElement.textContent = 'Error displaying balance. Check console for details.';
    }
  });
  
  
  