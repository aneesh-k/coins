// contract test code will go here
// const ganasche = require("ganache-cli");
// const Web3 = require("web3");
// const web3 = new Web3(ganasche.provider());
// const compileCode = require("../compile");
// require("dotenv").config();

let accounts;
let inbox;

describe.skip("Deploy contract", async () => {
	it("Deploy function", async () => {
		console.log(accounts);
		inbox = await new web3.eth.Contract(JSON.parse(compileCode.interface))
			.deploy({ data: compileCode.bytecode, arguments: ["Hi There!"] })
			.send({
				from: accounts[0],
				gas: 1000000,
			});
	});
	it("Get account details of deployed contracts", () => {
		console.log("address = " + inbox.options.address);
		console.log("interface = " + inbox.options.jsonInterface);
	});
	it("Get Initial Message", async () => {
		const message = await inbox.methods.getMsg().call(); // call is used to call the method
		console.log(message);
	});
	it("Update message in contract", async () => {
		const hashData = await inbox.methods
			.setMsg("Second Message")
			.send({ from: accounts[0] }); // Send is used for transaction
		console.log("Hash data = " + hashData);
		const message = await inbox.methods.getMsg().call(); // call is used to call the method
		console.log("After update = " + message);
	});
});
