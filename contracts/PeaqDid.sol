// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";


contract PeaqDid {

    event NewDid(string id, string controller); // event to the graph

    struct DidDocument {
        string id;
        string controller;
    }

    // create a contract that gives back a value representing a did_hash
    // -mapping of hash (use native crypto algo to mock) and did name set by user
    // -msg.sender address to mpa that to the name. 

    mapping (string => address) public nameToOwner;
    mapping (address => DidDocument) public ownerToDid;


    // may want to store hash only representing a less costly place to store the did
    function createDid(string memory _nameDid) public {
        string memory base = "did:peaq:";
        // Convert msg.sender to string
        string memory senderAddress = Strings.toHexString(uint160(msg.sender), 20);
        string memory did = string(abi.encodePacked(base, senderAddress));

        nameToOwner[_nameDid] = msg.sender;
        ownerToDid[msg.sender] = DidDocument(did,did);
        
        // emit event
        emit NewDid(did, did);
    }

    function readDid(string memory _nameDid) public view returns (string memory, string memory) {
        // get address of the owner that created the _nameDid to read
        address owner = nameToOwner[_nameDid];

        // get stored didDocument
        DidDocument memory docDid = ownerToDid[owner];

        return (docDid.id, docDid.controller);
    }
}