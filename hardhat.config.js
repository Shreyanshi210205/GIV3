require("@nomicfoundation/hardhat-toolbox");  // General Hardhat toolbox for multiple plugins
require("@nomicfoundation/hardhat-ignition"); // Hardhat Ignition plugin for deployment management

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0", // Solidity version you're using
  networks: {
    // Define your local network for Hardhat (or other networks like testnets or mainnet)
    hardhat: {
      chainId: 31337,
     
       // You can change the port number here if needed
      // Default Hardhat chain ID
    },
    // You can add networks like Rinkeby or Mainnet here if you wish to deploy to them
    // Example:
    // rinkeby: {
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/YOUR_ALCHEMY_KEY`,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],
    // },
    // mainnet: {
    //   url: `https://eth-mainnet.alchemyapi.io/v2/YOUR_ALCHEMY_KEY`,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],
    // },
  },
  // Optional: Configure Hardhat Ignition module if you are using specific settings.
  ignition: {
    // You can add other Ignition configurations here if needed
    // Example: maxGasLimit: 5000000
  },
  paths: {
    // Optional: Customize paths if your folder structure differs
    sources: "./contracts", // Contract sources location
    tests: "./test", // Test folder location
    cache: "./cache", // Cache location
    artifacts: "./artifacts", // Artifacts location
  },
};
