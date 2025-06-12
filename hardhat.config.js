//const { network } = require("hardhat");

// This loads your .env file so you can securely use environment variables like PRIVATE_KEY and SEPOLIA_RPC_URL.
require("dotenv").config();
// This brings in useful Hardhat plugins such as:
// hardhat-ethers (for Ethers.js integration),
// hardhat-waffle (for smart contract testing),
// hardhat-etherscan (for verifying contracts),and more.
require("@nomicfoundation/hardhat-toolbox");

// These lines pull values from your .env file so your script can use them in the networks section.
// SEPOLIA_RPC_URL: Your remote node provider (e.g. Alchemy or Infura).
// PRIVATE_KEY: The private key of your Sepolia wallet.
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// This tells Hardhat to compile your Solidity contracts using version 0.8.18.
module.exports = {
  solidity: "0.8.18",
  // This defines a sepolia network.
  // url: Connects Hardhat to Sepolia via your provider (Alchemy, Infura, etc.).
  // accounts: Uses your wallet's private key to sign and send transactions.
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
