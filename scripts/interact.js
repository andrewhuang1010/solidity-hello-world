const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers, network } = require("hardhat");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// provider - Alchemy
// AlchemyProvider doesn't support sepolia in ethers v5
// @nomiclabs/hardhat-ethers doesn't support ethers v6
//const alchemyProvider = new ethers.providers.AlchemyProvider(network="sepolia", API_KEY);
const provider = new ethers.providers.JsonRpcProvider(API_URL, "sepolia");

// signer - you
//const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// contract instance
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await helloWorldContract.message();
    console.log("The message is: " + message);

    console.log("Updating the message...");
    const tx = await helloWorldContract.update("this is the new message");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("The new message is: " + newMessage);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });