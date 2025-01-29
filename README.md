# Solidity-hello-world

Simple hello world project written in solidity.

Deploys a smart contract using Hardhat/Alchemy to the Ethereum blockchain (or Sepolia testnet)

## Description

Smart contract contains a hello world string that is updatable


## Commands

Compile the project
>npx hardhat compile

Run deploy script to deploy smart contract to the sepolia testnet. Returns the deployed contract address
>npx hardhat run scripts/deploy.js --network sepolia

Verify the contract on etherscan.io
(Everyone is able to see the contract details once verified)
>npx hardhat verify --network sepolia CONTRACT_ADDRESS

## Links

Smart Contract address on Sepolia testnet
>https://sepolia.etherscan.io/address/0x01C7b5379763088A78604C66D4F7BE85DAd9A5d9
