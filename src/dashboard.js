import {getConnectedAccount,getEthereumBalance} from './web3.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Await the account to ensure you get the connected account
        let account = await getConnectedAccount();
        
        if (account) {
            document.getElementById('wallet-address').textContent = `${account}`;
        } else {
            console.error("No account found.");
        }
    } catch (error) {
        console.error("Error getting connected account:", error);
    }
});



document.addEventListener("DOMContentLoaded", async () =>{
        const balanceDisplayElement = document.getElementById('balance-display');
        let address=await getConnectedAccount();
    if (!address) {
      alert('Connect Your Wallet First');
      return;
    }
  
    try {
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

  
  
  