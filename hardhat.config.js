require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const AGUNG_RPC_URL = process.env.AGUNG_RPC_URL;    // agung rpc url from .env
const PEAQ_RPC_URL = process.env.PEAQ_RPC_URL;    // agung rpc url from .env
const PRIVATE_KEY = process.env.PRIVATE_KEY;                      // Private key from .env file

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    agung: {
      url: AGUNG_RPC_URL,
      chainId: 9990,
      accounts: [`0x${PRIVATE_KEY}`], // Make sure to add 0x prefix to the private key
    },
    peaq: {
      url: PEAQ_RPC_URL,
      chainId: 3338,
      accounts: [`0x${PRIVATE_KEY}`], // Make sure to add 0x prefix to the private key
    },
  },
};