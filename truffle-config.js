// truffle-config.js
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "your twelve word mnemonic here"; // **คำเตือน: ห้ามใช้ mnemonic จริงในโค้ด!**

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID`),
      network_id: 11155111,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: "0.8.20",
    }
  }
};
