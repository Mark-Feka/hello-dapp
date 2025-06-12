// provider: Connects to the blockchain (Ethereum) via MetaMask.
// signer: Represents the user’s wallet (who will sign the transactions).
// contract: The JS version of your Solidity contract (the deployed HelloWorld contract) (connected to the address and ABI).
let provider;
let signer;
let contract;


// contractAddress: The address where your smart contract lives on the blockchain.
// abi: The Application Binary Interface — tells your frontend what functions the smart contract has and how JavaScript can call them.
const contractAddress = "0xe5d3E4B771A54E429D6D16E5A8f6cb3d0701b59B";
const abi = [
    
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getGreeting",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greeting",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_newGreeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];



// Checks if MetaMask is installed (it injects window.ethereum).
// Requests access to the user’s wallet.
// web3Provider uses metaMask as the provider
// signer lets you send transactions 
// contract is your connected smart contract object. 
async function connectContract() 
{
    if (typeof window.ethereum !== "undefined")
    {
        try 
        {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract (contractAddress, abi, signer);
            // updates status text.
            // calls getGreeting() to read the content once wallet is connected. 
            document.getElementById("status").textContent = "✅ Wallet connected!";
            getGreeting();
        }
        catch (err) 
        {
            console.error("wallet connection failed", err);
        }
        
    }
    else
    {
        alert("Please install MetaMask");
    }
}

// Calls the getGreeting() function from Solidity.
// Displays the result on your HTML page (<span id="greeting">).
async function getGreeting() 
{
    try
    {
        const message = await contract.getGreeting();
        document.getElementById("greetingDisplay").textContent = message;
    }
    catch (err)
    {
        console.error("Unable to get greetings at the moment", err);
    }
}

// Reads the value from the input box.
// Calls setGreeting(...) — which sends a blockchain transaction.
// Waits for the blockchain to process it.
// Refreshes the greeting display.
async function updateGreeting() 
{
    const newGreeting = document.getElementById("newGreeting").value;
    try
    {
        const tx = await contract.setGreeting(newGreeting);
        await tx.wait(); //wait for tx to be mined
        getGreeting(); // refresh the greeting after update
        alert("Greeting updated successfully!");
    }
    catch (err)
    {
        console.error("Error setting greeting. Transaction failed: ", err);
    }
    
}

// These tie the buttons in the index.html to the javaScript functions.
document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("setGreetingButton").addEventListener("click", setGreeting);