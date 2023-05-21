require("@nomiclabs/hardhat-waffle");

module.exports = {
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/d8704bff47d94c528e5613729cbd33fd",
      accounts: [
        "c2929f9f8aa1efae11f8bc405deed8d802aa1ace889539e06d9145e5b025cf71",
      ],
    },
  },
  solidity: "0.8.4",
};
