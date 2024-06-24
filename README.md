## Implementation Steps

1. Install dependencies
`npm install`

2. Deploy graph from cloning the [graph-node](https://github.com/graphprotocol/graph-node). Understand the README.md file located in that repository to understand how to properly start a local graph node. Update the **ethereum** identifier in the **docker-compose.yml** with the chain you want to connect, e.g: `agung:https://rpcpc1-qa.agung.peaq.network`. Use the provided docker file to start local graph node by cd into **/graph-node/docker**.
Start docker container with cmd `docker compose up`

3. Create and deploy subgraph
- create: `graph create my-peaqDid-subgraph --node http://localhost:8020`
- deploy: `graph deploy my-peaqDid-subgraph --ipfs http://localhost:5001 --node http://localhost:8020` (using v0.6 -> TODO what is best?)

4. Send query to localhost graph gui
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