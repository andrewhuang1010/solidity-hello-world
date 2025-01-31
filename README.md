# solidity-hello-world

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

## Commands for running frontend

Switch to the frontend directory
>cd frontend

Use npm to install all packages
>npm install

Add this line in ./node_modules/react-scripts/config/webpack.config.js under resolve around lines 310
>fallback: { "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"), "zlib": require.resolve("browserify-zlib")  },

Use npm to install @alch/alchemy-web3 package
>npm install @alch/alchemy-web3

Run frontend locally on http://localhost:3000/
>npm start

Additional details in the tutorial listed in frontend directory's README.md

## Links

Smart Contract address on Sepolia testnet
>https://sepolia.etherscan.io/address/0x01C7b5379763088A78604C66D4F7BE85DAd9A5d9
