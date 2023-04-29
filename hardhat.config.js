require("@nomiclabs/hardhat-waffle");

const privateKey = process.env.NEXT_PUBLIC_METAMASK_PRIVATE_KEY;

module.exports = {
  networks: {
    sepolia: {
      url: process.env.NEXT_PUBLIC_PROVIDER_URL,
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
