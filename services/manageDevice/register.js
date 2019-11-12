const { createContract } = require('../../utils');

const { addContract, byteCode } = createContract;

module.exports = async data => {
  const { account, signature, url, publicKey } = data;

  const deviceRegisterContract = await addContract.deploy({ data: byteCode }).send({
    from: account,
    gas: 1500000,
  });

  console.log(deviceRegisterContract);
  
  await deviceRegisterContract.methods.registerDevice(signature, url, publicKey).send({
    from: account,
    gas: 1500000,
  }).on('receipt', (receipt) => {
    // console.log("OVO JE RAČUN", receipt);
  });
}
