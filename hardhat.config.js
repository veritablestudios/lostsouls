const fs = require("fs");
require("@nomiclabs/hardhat-waffle");

const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/43ba7885966749148fa66d9f0bb5a4a0",
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
