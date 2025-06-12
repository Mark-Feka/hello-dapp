const hre = require("hardhat");

async function main() 
{
    // Use the local Hardhat network
    // Gets the list of accounts (signers) provided by Hardhat’s local blockchain.
    // We use the first one (deployer) as the account interacting with the contract.
    // Think of deployer as your wallet.
    const [deployer] = await hre.ethers.getSigners();

    // this logs which wallet address you're using for the interaction
    console.log("interacting with the contract using:", deployer.address);

    //this tells the script where your smart contract is on the blockchain 
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // this loads your contract's ABI and bytecode from artifacts/. 
    // NB. a ContractFactory is like a JS object that helps you deploy or connect to contracts 
    const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");

    // this "attach()" call tells Hardhat to use contract already deployed at contractAddress
    const contract = await HelloWorld.attach(contractAddress);

    // calls the getGreeting() function from solidity contract. 
    // since it's a view function (read-only), it's free and doesn't cost gas. 
    // "console.log" logs the result
    const currentGreeting = await contract.getGreeting();
    console.log("hello there!", currentGreeting);

    // calls "setGreeting()" which sends transaction to the blockchain. 
    // it modifies the state and therefore uses gas.
    const tx = await contract.setGreeting("hello from Mark");
    await tx.wait();

    // calls the getter again to verify that the greeting was actually updated on the blockchain
    // logs the new message
    const updatedGreeting = await contract.getGreeting();
    console.log("updated to hello there again!", updatedGreeting);

}

// This runs the main function and handles any errors that might occur
// if anything goes wromg (e.g., typo, no contract found) it will log the error. 
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}
);