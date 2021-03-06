// compile code will go here

const path = require("path");
const fs = require("fs");

const solc = require("solc");
require("dotenv").config();

const inboxPath = path.resolve(__dirname, "contracts", "lottery.sol");
const source = fs.readFileSync(inboxPath, "utf8");
module.exports = solc.compile(source).contracts[":Lottery"];
