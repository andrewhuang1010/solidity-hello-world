const alchemyKey = "wss://eth-sepolia.g.alchemy.com/v2/uqDNgrZEYZDZQH0v6HPBGA4C0Tbcjjkv"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contractABI = require("../contract-abi.json");
const contractAddress = "0x01C7b5379763088A78604C66D4F7BE85DAd9A5d9";

export const helloWorldContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export const loadCurrentMessage = async () => { 
    const message = await helloWorldContract.methods.message().call();
    return message;
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
        const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const obj = {
            status: "👆🏽 Write a message in the text-field above.",
            address: addressArray[0],
        };
        return obj;
    }
    catch (err) {
        return {
            address: "",
            status: "😥 " + err.message,
        };
    }
  }
  else {
    return {
        address: "",
        status: (
            <span>
                <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" href={`https://metamask.io/download`}>
                        You must install Metamask, a virtual Ethereum wallet, in your browser.
                    </a>
                </p>
            </span>
        ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
        const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
            return {
                address: addressArray[0],
                status: "👆🏽 Write a message in the text-field above.",
            };
        }
        else {
            return {
                address: "",
                status: "🦊 Connect to Metamask using the top right button.",
            };
        }
    }
    catch (err) {
        return {
            address: "",
            status: "😥 " + err.message,
        };
    }
  }
  else {
    return {
        address: "",
        status: (
            <span>
                <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" href={`https://metamask.io/download`}>
                        You must install Metamask, a virtual Ethereum wallet, in your browser.
                    </a>
                </p>
            </span>
        ),
    };
  }
};

export const updateMessage = async (address, message) => {
    if (!window.ethereum || address === null) {
        return {
            status:
            "💡 Connect your Metamask wallet to update the message on the blockchain.",
        };
    }

    if (message.trim() === "") {
        return {
            status: "❌ Your message cannot be an empty string.",
        };
    }

    //set up transcation parameters
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: address, // must match user's active address.
        data: helloWorldContract.methods.update(message).encodeABI(),
    };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`}>
                        View the status of your transaction on Etherscan!
                    </a>
                    <br />
                    ℹ️ Once the transaction is verified by the network, the message will
                    be updated automatically.
                </span>
            ),
        }
    }
    catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
};
