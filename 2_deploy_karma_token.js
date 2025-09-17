// 2_deploy_karma_token.js
const KarmaToken = artifacts.require("KarmaToken");

module.exports = function (deployer) {
  deployer.deploy(KarmaToken);
};
