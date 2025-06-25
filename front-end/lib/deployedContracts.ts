
const deployedContracts = {
    "HypeToken": {
        "address": "0x851356ae760d987e095750cceb3bc6014560891c",
        "abi": [
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
                        "name": "result",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "allowance",
                "inputs": [
                    {
                        "name": "owner",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "spender",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "result",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "approve",
                "inputs": [
                    {
                        "name": "spender",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "balanceOf",
                "inputs": [
                    {
                        "name": "owner",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "result",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "decimals",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "uint8",
                        "internalType": "uint8"
                    }
                ],
                "stateMutability": "pure"
            },
            {
                "type": "function",
                "name": "emergencyWithdraw",
                "inputs": [],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "mint",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "name",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "pure"
            },
            {
                "type": "function",
                "name": "nonces",
                "inputs": [
                    {
                        "name": "owner",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "result",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "owner",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "permit",
                "inputs": [
                    {
                        "name": "owner",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "spender",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "deadline",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "v",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "r",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    {
                        "name": "s",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "renounceOwnership",
                "inputs": [],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "stake",
                "inputs": [],
                "outputs": [],
                "stateMutability": "payable"
            },
            {
                "type": "function",
                "name": "symbol",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "pure"
            },
            {
                "type": "function",
                "name": "totalSupply",
                "inputs": [],
                "outputs": [
                    {
                        "name": "result",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "transfer",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "transferFrom",
                "inputs": [
                    {
                        "name": "from",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "to",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "transferOwnership",
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "unstake",
                "inputs": [
                    {
                        "name": "_amount",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "event",
                "name": "Approval",
                "inputs": [
                    {
                        "name": "owner",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "spender",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "OwnershipTransferred",
                "inputs": [
                    {
                        "name": "previousOwner",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "newOwner",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "TokensMinted",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    },
                    {
                        "name": "by",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "TokensStaked",
                "inputs": [
                    {
                        "name": "user",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "ethAmount",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    },
                    {
                        "name": "tokensMinted",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "TokensUnstaked",
                "inputs": [
                    {
                        "name": "user",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "tokensBurned",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    },
                    {
                        "name": "ethReturned",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "Transfer",
                "inputs": [
                    {
                        "name": "from",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "to",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "error",
                "name": "AllowanceOverflow",
                "inputs": []
            },
            {
                "type": "error",
                "name": "AllowanceUnderflow",
                "inputs": []
            },
            {
                "type": "error",
                "name": "InsufficientAllowance",
                "inputs": []
            },
            {
                "type": "error",
                "name": "InsufficientBalance",
                "inputs": []
            },
            {
                "type": "error",
                "name": "InvalidPermit",
                "inputs": []
            },
            {
                "type": "error",
                "name": "Permit2AllowanceIsFixedAtInfinity",
                "inputs": []
            },
            {
                "type": "error",
                "name": "PermitExpired",
                "inputs": []
            },
            {
                "type": "error",
                "name": "TotalSupplyOverflow",
                "inputs": []
            }
        ]
    },
    "Oracle": {
        "address": "0xf5059a5d33d5853360d16c683c16e67980206f36",
        "abi": [
            {
                "type": "function",
                "name": "closeBets",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "finishMatch",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "getHype",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "",
                        "type": "uint8",
                        "internalType": "enum Status"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "getMatch",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "HypeA",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "HypeB",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "goalsA",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "goalsB",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "start",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "end",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "scheduledTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Status"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "matchExists",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "matchHypes",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "HypeA",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "HypeB",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "goalsA",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "goalsB",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "start",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "end",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "scheduledTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Status"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "openToBets",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "scheduleMatch",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    },
                    {
                        "name": "scheduledTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "updateHype",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    },
                    {
                        "name": "HypeA",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "HypeB",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "updateScore",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    },
                    {
                        "name": "goalsA",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "goalsB",
                        "type": "uint8",
                        "internalType": "uint8"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "event",
                "name": "HypeUpdated",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "HypeA",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    },
                    {
                        "name": "HypeB",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "MatchClosed",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "MatchFinished",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "goalsA",
                        "type": "uint8",
                        "indexed": false,
                        "internalType": "uint8"
                    },
                    {
                        "name": "goalsB",
                        "type": "uint8",
                        "indexed": false,
                        "internalType": "uint8"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "MatchOpened",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "HypeA",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    },
                    {
                        "name": "HypeB",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "MatchScheduled",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "scheduledTime",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "ScoreUpdated",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "goalsA",
                        "type": "uint8",
                        "indexed": false,
                        "internalType": "uint8"
                    },
                    {
                        "name": "goalsB",
                        "type": "uint8",
                        "indexed": false,
                        "internalType": "uint8"
                    }
                ],
                "anonymous": false
            }
        ]
    },
    "Funify": {
        "address": "0x95401dc811bb5740090279ba06cfa8fcf6113778",
        "abi": [
            {
                "type": "constructor",
                "inputs": [
                    {
                        "name": "_token",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "_oracle",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "HOUSE_FEE",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "InsufficientPrizePool",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "InvalidBetAmount",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "InvalidHypeValues",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "InvalidMatchStatus",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "InvalidUserAddress",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "MatchAlreadyFinished",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "MatchEndedInDraw",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "MatchNotFinished",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "MatchNotFound",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "MatchNotOpen",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "NoBetOnMatch",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "NoProfitToWithdraw",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "NotOwner",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "OnlyOwner",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "OracleCallFailed",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "PrizeAlreadyClaimed",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "TokenTransferFailed",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "UserAlreadyBet",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "UserDidNotWin",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "bets",
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    },
                    {
                        "name": "",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "amount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "teamA",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "canClaimPrize",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    },
                    {
                        "name": "user",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "canClaim",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "reason",
                        "type": "string",
                        "internalType": "string"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "claimPrize",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "getCompleteMatchInfo",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "oracleHypeA",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "oracleHypeB",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "oracleGoalsA",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "oracleGoalsB",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "oracleStart",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "oracleEnd",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "oracleScheduledTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "oracleStatus",
                        "type": "uint8",
                        "internalType": "enum Status"
                    },
                    {
                        "name": "funifyPoolA",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "funifyPoolB",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "funifyHouseProfit",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "funifyHouseCut",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "getContractStats",
                "inputs": [],
                "outputs": [
                    {
                        "name": "totalMatches",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalBets",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalHouseProfit",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "tokenAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "oracleAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "contractOwner",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "getMatchData",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "HypeA",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "HypeB",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "goalsA",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "goalsB",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "start",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "end",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "scheduledTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Status"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "getMatchInfo",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "HypeA",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "HypeB",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "goalsA",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "goalsB",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "start",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "end",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "scheduledTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Status"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "getMatchStats",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "totalBetsA",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalBetsB",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalPool",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "houseCut",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "getOdds",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "oddsA",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "oddsB",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "getPrizePools",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "poolA",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "poolB",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "houseCut",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "getUserBet",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    },
                    {
                        "name": "user",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "amount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "teamA",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "houseProfit",
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "matchExists",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "oracle",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "address",
                        "internalType": "contract Oracle"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "owner",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "address",
                        "internalType": "address"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "placeBet",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    },
                    {
                        "name": "teamA",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "prizePoolA",
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "prizePoolB",
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "token",
                "inputs": [],
                "outputs": [
                    {
                        "name": "",
                        "type": "address",
                        "internalType": "contract HypeToken"
                    }
                ],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "withdrawHouseProfit",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "internalType": "bytes4"
                    }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "event",
                "name": "BetPlaced",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "user",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "teamA",
                        "type": "bool",
                        "indexed": false,
                        "internalType": "bool"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "HouseProfitWithdrawn",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "MatchInfoRequested",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "requester",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "MatchStatsCalculated",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "totalBetsA",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalBetsB",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalPool",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "PrizeClaimabilityChecked",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "user",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "canClaim",
                        "type": "bool",
                        "indexed": false,
                        "internalType": "bool"
                    },
                    {
                        "name": "reason",
                        "type": "string",
                        "indexed": false,
                        "internalType": "string"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "PrizesDistributed",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "winner",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "UserBetQueried",
                "inputs": [
                    {
                        "name": "hypeId",
                        "type": "bytes4",
                        "indexed": true,
                        "internalType": "bytes4"
                    },
                    {
                        "name": "user",
                        "type": "address",
                        "indexed": true,
                        "internalType": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "indexed": false,
                        "internalType": "uint256"
                    },
                    {
                        "name": "teamA",
                        "type": "bool",
                        "indexed": false,
                        "internalType": "bool"
                    }
                ],
                "anonymous": false
            }
        ]
    }
} as const;

export default deployedContracts;
        