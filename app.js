const fs = require('fs');
const Web3 = require('web3');
const solc = require('solc');
const express = require('express')
const bodyParser = require('body-parser');

const web3 = new Web3("http://127.0.0.1:7545");
const sourceCode = fs.readFileSync('./contracts/Add.sol', 'UTF-8');

const input = {
  language: 'Solidity',
  sources: {
    'test.sol': {
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
const contractABI = output.contracts['test.sol'].Add.abi;
const byteCode = output.contracts['test.sol'].Add.evm.bytecode.object;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  web3.eth.getAccounts().then(async accounts => {
    const addContract = new web3.eth.Contract(contractABI);
    addContract.deploy({data: byteCode}).send({
      from: accounts[3],
      gas: 1500000,
      gasPrice: web3.utils.toWei('0.00003', 'ether')
    }).then(contractInstance => {
      addContract.options.address = contractInstance.options.address
      });

    res.send('Transaction completed!');
  }).catch(error => console.log(error));
});

app.post('/register', (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});