const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const web3 = new Web3("http://127.0.0.1:7545");

const sourceCode = fs.readFileSync('/home/mateo/diplomskiProjekt/manage-iot-using-blockchain/manage-iot-over-blockchain-backend/contracts/ManageDevice.sol', 'UTF-8');

const input = {
  language: 'Solidity',
  sources: {
    'manageDevice.sol': {
      content: sourceCode
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contractABI = output.contracts['manageDevice.sol'].ManageDevice.abi;
const byteCode = output.contracts['manageDevice.sol'].ManageDevice.evm.bytecode.object;
const addContract = new web3.eth.Contract(contractABI);

module.exports = { 
  byteCode, 
  addContract 
}
