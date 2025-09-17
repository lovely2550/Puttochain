// KarmaToken.test.js
const KarmaToken = artifacts.require("KarmaToken");

contract("KarmaToken", (accounts) => {
    let karmaToken;
    const owner = accounts[0];
    const user = accounts[1];

    beforeEach(async () => {
        karmaToken = await KarmaToken.new();
    });

    it("should have correct name and symbol", async () => {
        const name = await karmaToken.name();
        const symbol = await karmaToken.symbol();
        assert.equal(name, "Karma Token", "Incorrect token name");
        assert.equal(symbol, "KRM", "Incorrect token symbol");
    });

    it("should mint initial tokens to the owner", async () => {
        const ownerBalance = await karmaToken.balanceOf(owner);
        assert.equal(ownerBalance.toString(), web3.utils.toWei("1000000", "ether"), "Incorrect initial token balance");
    });

    it("should only allow the owner to give karma", async () => {
        const amount = web3.utils.toWei("100", "ether");
        try {
            await karmaToken.giveKarma(user, amount, { from: user });
            assert.fail("Non-owner should not be able to call giveKarma");
        } catch (error) {
            assert(error.message.includes("Ownable: caller is not the owner"), "Expected onlyOwner error");
        }
    });

    it("should log meditation and award tokens correctly", async () => {
        const duration = 45; // 45 minutes
        let userBalanceBefore = await karmaToken.balanceOf(user);
        
        const tx = await karmaToken.logMeditation(duration, { from: user });
        
        let userBalanceAfter = await karmaToken.balanceOf(user);
        
        // Check if the user's balance increased by 100 KRM
        const expectedIncrease = web3.utils.toWei("100", "ether");
        assert.equal(userBalanceAfter.sub(userBalanceBefore).toString(), expectedIncrease, "Incorrect tokens awarded for meditation");
        
        // Check if the MeditationLog event was emitted correctly
        const event = tx.logs[0];
        assert.equal(event.event, "MeditationLog", "Event name is incorrect");
        assert.equal(event.args.user, user, "User address in event is incorrect");
        assert.equal(event.args.durationInMinutes.toNumber(), duration, "Meditation duration is incorrect");
    });
});
