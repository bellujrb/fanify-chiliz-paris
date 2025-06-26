const { createPublicClient, http, createWalletClient } = require('viem');
const { privateKeyToAccount } = require('viem/accounts');
const deployedContracts = require('../lib/deployedContracts');
require('dotenv').config();

// Get Oracle contract details from deployed contracts
const ORACLE_CONTRACT = deployedContracts.Oracle;
const ORACLE_ABI = ORACLE_CONTRACT.abi;
const ORACLE_ADDRESS = ORACLE_CONTRACT.address;

// Initialize clients based on environment
const env = process.env.ENV || 'anvil';

let publicClient, walletClient;

if (env === 'anvil') {
  publicClient = createPublicClient({
    transport: http('http://localhost:9999'),
    chain: {
      id: 31337,
      name: 'anvil',
      network: 'anvil'
    }
  });
  walletClient = createWalletClient({
    transport: http('http://localhost:9999'),
    chain: {
      id: 31337,
      name: 'anvil',
      network: 'anvil'
    }
  });
} else if (env === 'apicy') {
  // TODO: Add APIcy specific configuration
  publicClient = createPublicClient({
    transport: http(process.env.RPC_URL),
    chain: {
      id: parseInt(process.env.CHAIN_ID),
      name: 'apicy',
      network: 'apicy'
    }
  });
  walletClient = createWalletClient({
    transport: http(process.env.RPC_URL),
    chain: {
      id: parseInt(process.env.CHAIN_ID),
      name: 'apicy',
      network: 'apicy'
    }
  });
} else {
  throw new Error(`Unsupported environment: ${env}`);
}

// Initialize account with private key
const account = privateKeyToAccount(process.env.PRIVATE_KEY);

const blockchainService = {
  async updateHype(hypeId, psgHype, miaHype) {
    try {
      const receipt = await walletClient.sendTransaction({
        account,
        to: process.env.CONTRACT_ADDRESS,
        data: publicClient.encodeFunctionData({
          abi: ORACLE_ABI,
          functionName: 'updateHype',
          args: [hypeId, psgHype, miaHype]
        })
      });
      return receipt;
    } catch (error) {
      console.error('Error updating hype:', error);
      throw error;
    }
  },

  async updateScore(hypeId, goalsPsg, goalsMia) {
    try {
      const receipt = await walletClient.sendTransaction({
        account,
        to: process.env.CONTRACT_ADDRESS,
        data: publicClient.encodeFunctionData({
          abi: ORACLE_ABI,
          functionName: 'updateScore',
          args: [hypeId, goalsPsg, goalsMia]
        })
      });
      return receipt;
    } catch (error) {
      console.error('Error updating score:', error);
      throw error;
    }
  },

  async getHype(hypeId) {
    try {
      const result = await publicClient.readContract({
        address: process.env.CONTRACT_ADDRESS,
        abi: ORACLE_ABI,
        functionName: 'getHype',
        args: [hypeId]
      });
      return {
        psgHype: result[0],
        miaHype: result[1],
        status: result[2]
      };
    } catch (error) {
      console.error('Error getting hype:', error);
      throw error;
    }
  }
};

module.exports = blockchainService;
