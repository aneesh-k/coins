const ganache = require("ganache-cli");
const Web3 = require("web3");
const compileCode = require("../compile");
const web3 = new Web3(ganache.provider());
const assert = require("assert");

const contractParams = compileCode.interface;
const deployOptions = {
	data: compileCode.bytecode,
};

let account;
let lottery;

describe("Deploy and Test Lottery", async () => {
	beforeEach(async () => {
		const accounts = await web3.eth.getAccounts();
		account = accounts[0];
	});

	it("Deploy Lottery", async () => {
		lottery = await new web3.eth.Contract(JSON.parse(contractParams))
			.deploy(deployOptions)
			.send({
				from: account,
				gas: "1000000",
			});

		assert.ok(lottery.options.address);
	});

	it("add a player", async () => {
		await lottery.methods.enter().send({
			from: account,
			value: web3.utils.toWei("0.02", "ether"),
		});

		const players = await lottery.methods.getPlayers().call();
		assert.strictEqual(1, players.length);
	});
});
