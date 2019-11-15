const fs = require('fs');
const solc = require('solc');

const web3 = require('./web3');

const sourceCode = fs.readFileSync('/home/mateo/diplomskiProjekt/manage-iot-using-blockchain/backend/contracts/ManageDevice.sol', 'UTF-8');

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
const contractInterface = new web3.eth.Contract(contractABI);

module.exports = { 
  byteCode, 
  contractInterface,
  contractABI
}
