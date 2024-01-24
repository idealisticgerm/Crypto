require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/o3tfnO-U3-YjeIOgr3FRwnF55IyXg2I2",
      accounts: [
        "698c2d45204e25e7741db406a9e66ab0bd982faddbbf13297c79cfc104cde216",
      ],
    },
  },
};
