module.exports = {
    Oracle: {
        address: "0x3aa5ebb10dc797cac828524e59a333d0a371443c",
        abi: [
            {
                "type": "constructor",
                "inputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "DOMAIN_SEPARATOR",
                "inputs": [],
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "type": "function",
                "name": "getHype",
                "inputs": [{
                    "internalType": "bytes4",
                    "name": "hypeId",
                    "type": "bytes4"
                }],
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "type": "function",
                "name": "updateHype",
                "inputs": [
                    {
                        "internalType": "bytes4",
                        "name": "hypeId",
                        "type": "bytes4"
                    },
                    {
                        "internalType": "uint256",
                        "name": "HypeA",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "HypeB",
                        "type": "uint256"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "type": "function",
                "name": "updateScore",
                "inputs": [
                    {
                        "internalType": "bytes4",
                        "name": "hypeId",
                        "type": "bytes4"
                    },
                    {
                        "internalType": "uint8",
                        "name": "goalsA",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "goalsB",
                        "type": "uint8"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
    }
};
