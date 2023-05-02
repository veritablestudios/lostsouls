require("@nomiclabs/hardhat-waffle");

module.exports = {
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/tr6z5zzw0vPOYy2U3jZm0pl2gq3R1hLH",
      accounts: [
        "231a1b0f20198c6409768fccc1a8fc3c5b1629b55ecd65934142756af23108ad",
      ],
    },
  },
  solidity: "0.8.4",
};
