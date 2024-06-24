// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";


contract PeaqDid {

    struct DidDocument {
        string id;
        string controller;
    }

    event NewDid(string didName, DidDocument didDoc); // event to the graph

    mapping (string => address) public nameToOwner;
    mapping (address => DidDocument) public ownerToDid;


    // may want to store hash only representing a less costly place to store the did
    function createDid(string memory _didName) public {
        string memory base = "did:peaq:";
        // Convert msg.sender to string
        string memory senderAddress = Strings.toHexString(uint160(msg.sender), 20);
        string memory did = string(abi.encodePacked(base, senderAddress));

        DidDocument memory didDocument =  DidDocument(did,did);

        nameToOwner[_didName] = msg.sender;
        ownerToDid[msg.sender] = didDocument;
        
        // emit event
        emit NewDid(_didName, didDocument);
    }

    function readDid(string memory _didName) public view returns (string memory, string memory) {
        // get address of the owner that created the _nameDid to read
        address owner = nameToOwner[_didName];

        // get stored didDocument
        DidDocument memory docDid = ownerToDid[owner];

        return (docDid.id, docDid.controller);
    }
}