1. Install dependencies
`npm install`

2. Compile and Copy abi
- `npx hardhat compile`
- `mkdir abis`
- `cp artifacts/contracts/PeaqDid.sol/PeaqDid.json abis/PeaqDid.json`

3. Deploy smart contract to agung
`npx hardhat ignition deploy ./ignition/modules/HelloWorld.js --network agung`
- note down the contract address
- goto block explorer using contract address
- get block number the contract was deployed at
- record contract address and block number into subgraph.yaml
- update abis to include the path to the abis directory

4. Write data to your contract
`npx hardhat run scripts/interactDid.js --network agung`

5. Deploy graph from cloning the [graph-node](https://github.com/graphprotocol/graph-node)
```
cargo run -p graph-node --release -- \
  --postgres-url postgresql://username[:password]@localhost:5432/graph-node \
  --ethereum-rpc agung::https://rpcpc1-qa.agung.peaq.network \
  --ipfs 127.0.0.1:5001
```

6. Create and deploy subgraph
- auto-generate to build the mapping with cmd `graph codegen`
- create: `graph create my-peaqDid-subgraph --node http://localhost:8020`
- deploy: `graph deploy my-peaqDid-subgraph --ipfs http://localhost:5001 --node http://localhost:8020`