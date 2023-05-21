require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
module.exports = {
  networks: {
    sepolia: {
      url: process.env.INFURA_URL,
      accounts: [
        process.env.PRIVATE_KEY,
      ],
    },
  },
  solidity: "0.8.4",
};
