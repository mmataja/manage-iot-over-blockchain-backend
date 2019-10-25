const { manageDevice } = require('../../services');

const { createContract } = manageDevice;
const { addContract, byteCode } = createContract;

module.exports = async (req, res) => {
  const { account, signature } = req.body;

  console.log("REQUEST", req.body);

  const deviceRegisterContract = await addContract.deploy({ data: byteCode }).send({
    from: account,
    gas: 1500000,
  });

  await deviceRegisterContract.methods.registerDevice(signature).send({
    from: account,
    gas: 1500000,
  }).on('receipt', (receipt) => {
    console.log("OVO JE RAČUN", receipt);
  });

  // deviceRegisterContract.events.allEvents({}, (error, event) => console.log(event)).on('data', event => {
  //   console.log("je ima tu nesto", event)
  // });

  res.status(200).send(deviceRegisterContract._address);
}
