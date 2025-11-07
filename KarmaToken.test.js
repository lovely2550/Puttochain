const KarmaToken = artifacts.require("KarmaToken");
const { expect } = require("chai");

contract("KarmaToken", (accounts) => {
  const [owner, user1, user2] = accounts;
  let token;

  before(async () => {
    token = await KarmaToken.deployed();
  });

  it("ควรมีชื่อว่า Karma Token และสัญลักษณ์ KARMA", async () => {
    const name = await token.name();
    const symbol = await token.symbol();
    expect(name).to.equal("Karma Token");
    expect(symbol).to.equal("KARMA");
  });

  it("ควรมี supply เริ่มต้นและอยู่ในบัญชี owner", async () => {
    const totalSupply = await token.totalSupply();
    const ownerBalance = await token.balanceOf(owner);
    expect(ownerBalance.toString()).to.equal(totalSupply.toString());
  });

  it("owner ควร mint karma ให้ user1 ได้", async () => {
    const mintAmount = web3.utils.toWei("100", "ether");
    await token.mintKarma(user1, mintAmount, { from: owner });
    const balance = await token.balanceOf(user1);
    expect(balance.toString()).to.equal(mintAmount);
  });

  it("owner ควร burn karma จาก user1 ได้", async () => {
    const burnAmount = web3.utils.toWei("50", "ether");
    await token.burnKarma(user1, burnAmount, { from: owner });
    const balance = await token.balanceOf(user1);
    expect(balance.toString()).to.equal(web3.utils.toWei("50", "ether"));
  });

  it("คนอื่น (ไม่ใช่ owner) ไม่สามารถ mint ได้", async () => {
    try {
      await token.mintKarma(user2, web3.utils.toWei("10", "ether"), { from: user1 });
      assert.fail("Non-owner should not be able to mint");
    } catch (error) {
      expect(error.message).to.include("caller is not the owner");
    }
  });
});