// deploy code will go here

const HDWallet = require("truffle-hdwallet-provider");
require("dotenv").config();
const Web3 = require("web3");
const compileCode = require("./compile");

//Provider from HDWallet

var contractDetails;
var accounts;

const deploy = async () => {
	const provider = await new HDWallet(
		process.env.phrase,
		process.env.infurio_endpoint
	);

	const web3 = new Web3(provider);

	accounts = await web3.eth.getAccounts();

	const deployOptions = {
		data: compileCode.bytecode,
		arguments: ["Init setup"],
	};

	const sendOptions = {
		from: accounts[0],
		gas: "1000000",
	};

	// console.log(accounts[0]);

	contractDetails = await new web3.eth.Contract(
		JSON.parse(compileCode.interface)
	)
		.deploy(deployOptions)
		.send(sendOptions);

	console.log(contractDetails);
	console.log("Address of the contract = " + contractDetails.options.address);
};
deploy();
