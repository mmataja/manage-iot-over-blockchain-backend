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
const contractAddress = "0x0E35aFeE8bf0ebC3f2F6b99A0cCb623e68A33EAc";
const addContract = new web3.eth.Contract(contractABI);

module.exports = (req, res) => {
  const { account } = req.body;

  addContract.deploy({data: byteCode}).send({
    from: account,
    gas: 1500000,
  }).then(contractInstance => {
    const contractAddress = contractInstance.options.address;
    addContract.options.address = contractInstance.options.address;
    console.log("da li ovo radi...");
    res.status(200).send(contractAddress);
    })
    .catch(error => console.log(error));
}