const { manageDevice } = require('../../services');

const { createContract } = manageDevice;
const { addContract, byteCode } = createContract;

module.exports = async (req, res) => {
  const { account } = req.body;

  const deviceRegisterContract = await addContract.deploy({data: byteCode}).send({
    from: account,
    gas: 1500000,
  });

  res.status(200).send(deviceRegisterContract.options.address);
}
