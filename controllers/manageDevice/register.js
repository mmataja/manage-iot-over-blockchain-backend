const { manageDevice } = require('../../services');

const { createContract } = manageDevice;
const { addContract, byteCode } = createContract;

module.exports = (req, res) => {
  const { account } = req.body;

  addContract.deploy({data: byteCode}).send({
    from: account,
    gas: 1500000,
  }).then(contractInstance => {
    const contractAddress = contractInstance.options.address;
    addContract.options.address = contractInstance.options.address;
    res.status(200).send(contractAddress);
    })
    .catch(error => console.log(error));
}