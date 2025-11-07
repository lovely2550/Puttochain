require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

// ดึงค่า private key และ RPC จากไฟล์ .env
const privateKey = process.env.PRIVATE_KEY;
const infuraProjectId = process.env.INFURA_ID;

module.exports = {
  networks: {
    // เครือข่ายทดสอบ Polygon
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          privateKey,
          `https://polygon-mumbai.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },

    // เครือข่าย Amoy (ใหม่ของ Polygon)
    amoy: {
      provider: () =>
        new HDWalletProvider(
          privateKey,
          `https://rpc-amoy.polygon.technology`
        ),
      network_id: 80002,
      gas: 6000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Compiler Settings
  compilers: {
    solc: {
      version: "0.8.20",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  // Directory structure
  contracts_directory: "./solidity/",
  contracts_build_directory: "./solidity/build",
  migrations_directory: "./",
};