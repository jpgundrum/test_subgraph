//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

contract HelloWorld {
    string private hello_string;

    constructor(string memory _hello) {
        hello_string = _hello;
    }

    function hello() public view returns (string memory) {
        return hello_string;
    }

    function setHello(string memory _hello) public {
        hello_string = _hello;
    }
}