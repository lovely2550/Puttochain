const KarmaToken = artifacts.require("KarmaToken");

module.exports = async function (deployer, network, accounts) {
  console.log("🚀 Deploying KarmaToken to network:", network);

  await deployer.deploy(KarmaToken);
  const karmaToken = await KarmaToken.deployed();

  console.log("✅ KarmaToken deployed at address:", karmaToken.address);
};