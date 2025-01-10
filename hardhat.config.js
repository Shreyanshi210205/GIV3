require("@nomicfoundation/hardhat-ethers");// require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


module.exports = {
  solidity: "0.8.18",
  networks: {
    Ganache: {
      url:process.env.PROVIDER_URL,
      accounts:{
        mnemonic:"cabin trigger thing flavor replace squirrel prison raise gather clay rally emotion"
      },
      chainId:1337,
    },
  },
};
