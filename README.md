## Implementation Steps

1. Install dependencies
`npm install`

2. Compile to produce the abi
- `npx hardhat compile`

3. Deploy smart contract to peaq
`npx hardhat ignition deploy ./ignition/modules/PeaqDid.js --network peaq`
- note down the contract address
- goto peaq [block explorer](https://peaq.subscan.io/) using contract address
- get block number the contract was deployed at
- record contract address and block number into subgraph.yaml
- build the auto-generated mapping file with cmd `graph codegen`

4. Write data to your contract
- in your scripts/interactDid.js make sure to change the contractAddress the address you obtained after deploying
`npx hardhat run scripts/interactDid.js --network peaq`

5. Deploy graph from cloning the [graph-node](https://github.com/graphprotocol/graph-node). Understand the README.md file located in that repository to understand how to properly start a local graph node
- make sure to have ipfs and PostgreSQL running
- ipfs cmd `ipfs daemon`
- PostgreSQL cmds: `initdb -D .postgres -E UTF8 --locale=C` followed by `pg_ctl -D .postgres -l logfile start` and `createdb graph-node`
- run graph node cmd:
```
cargo run -p graph-node --release -- \
  --postgres-url postgresql://username[:password]@localhost:5432/graph-node \
  --ethereum-rpc peaq::https://peaq_rpc_endpoint \
  --ipfs 127.0.0.1:5001
```

6. Create and deploy subgraph
- create: `graph create my-peaqDid-subgraph --node http://localhost:8020`
- deploy: `graph deploy my-peaqDid-subgraph --ipfs http://localhost:5001 --node http://localhost:8020` (using v0.6 -> TODO what is best?)

7. Send query to localhost graph gui
- goto site: `http://localhost:8000/subgraphs/name/my-peaqDid-subgraph/graphql`

- query to test:
```
{
  attributes {
    id
    sender
    didAccount
    name
    value
    validity
  }
}
```

### Removed a subgraph
`graph remove my-peaqDid-subgraph --node http://localhost:8020`