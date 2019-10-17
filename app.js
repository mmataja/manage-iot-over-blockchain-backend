const fs = require('fs');
const Web3 = require('web3');
const solc = require('solc');
const express = require('express')
const bodyParser = require('body-parser');

const routes = require('./routes');

// const web3 = new Web3("http://127.0.0.1:7545");
// const sourceCode = fs.readFileSync('./contracts/ManageDevice.sol', 'UTF-8');

// const input = {
//   language: 'Solidity',
//   sources: {
//     'manageDevice.sol': {
//       content: sourceCode
//     }
//   },
//   settings: {
//     outputSelection: {
//       '*': {
//         '*': ['*']
//       }
//     }
//   }
// };

// const output = JSON.parse(solc.compile(JSON.stringify(input)));
// const contractABI = output.contracts['manageDevice.sol'].ManageDevice.abi;
// const byteCode = output.contracts['manageDevice.sol'].ManageDevice.evm.bytecode.object;
// const contractAddress = "0x0E35aFeE8bf0ebC3f2F6b99A0cCb623e68A33EAc";
// const addContract = new web3.eth.Contract(contractABI);

// const accounts = web3.eth.getAccounts().then( accounts => {
//   return accounts;
// });

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.get('/', (req, res) => {
//   accounts.then(account => {
//     addContract.deploy({data: byteCode}).send({
//       from: account[3],
//       gas: 1500000,
//     }).then(contractInstance => {
//       addContract.options.address = contractInstance.options.address;
//       });

//     res.send('Transaction completed!');
//   }).catch(error => console.log(error));
// });

// app.get('/test', (req, res) => {
//   accounts.then(account => {
//     const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
//     contractInstance.methods.Sum(3, 2).send({
//     from: account[2],
//     });
//   });
//   res.send("ovo je zlato");
// });

// app.get('/call', async (req, res) => {
//   const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
//   const sum = await contractInstance.methods.getSum().call();
//   console.log("ovo je suma....", sum);
// })

// app.post('/register', (req, res) => {
//   const { account } = req.body;

//   addContract.deploy({data: byteCode}).send({
//     from: account,
//     gas: 1500000,
//   }).then(contractInstance => {
//     const contractAddress = contractInstance.options.address;
//     addContract.options.address = contractInstance.options.address;
    
//     res.status(200).send(contractAddress);
//     })
//     .catch(error => console.log(error));
// });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes());

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});