pragma solidity ^0.4.17;

// linter warnings (red underline) about pragma version can igonored!

// contract code will go here
contract Inbox {
    string private message;

    constructor(string initMessage) public {
        message = initMessage;
    }

    function setMsg(string msg) public {
        message = msg;
    }

    function getMsg() public view returns (string) {
        return message;
    }
}
