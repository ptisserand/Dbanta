require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.8",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  networks: {
    mumbai: {
      chainId: 80001,
      url: process.env.POLYGON_MUMBAI_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      chainId: 137,
      url: process.env.POLYGON_MAINNET_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  paths: {
    root: "./hardhat"
  }
};
