const ContractArtifact = require('../artifacts/contracts/PeaqDid.sol/PeaqDid.json');

async function main() {
    // You can use a Hardhat runtime environment property to get a contract factory and then get a contract
    const [deployer] = await ethers.getSigners();
  
    // Get the contract instance at a specific address with the ABI and the signer
    const contractAddress = "deployed_contract_address"; // Replace with your contract's address which is outputted after deployment
    const contract = new ethers.Contract(contractAddress, ContractArtifact.abi, deployer);
  
    // Now you can call your contract's methods using the contract object

    // Perform a write
    const tx = await contract.createDid("myDid");
    await tx.wait();  // Wait for the transaction to be completed

    // // Read
    // const document = await contract.readDid("myDid");
    // console.log('id:', document[0]);
    // console.log('controller:', document[1]);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });