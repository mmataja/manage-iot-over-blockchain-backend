const { createContract, web3 } = require('../../utils');
const db = require('../../models');

const { contractInterface, byteCode, contractABI } = createContract;

module.exports = async data => {
  const { account, signature, url, publicKey, deviceOwner, deviceName } = data;
  let contractAddress;

  const contractCreated = await db.Contracts.getByAddress(account);

  if (!contractCreated) {
    const deviceRegisterContract = await contractInterface.deploy({ data: byteCode }).send({
      from: account,
      gas: 1500000,
    });

    contractAddress = deviceRegisterContract.options.address;

    const contractData = {
      address: deviceRegisterContract.options.address,
      owner: deviceOwner,
      ownerAddress: account,
    }

    await db.Contracts.create(contractData);
  }

  contractAddress = contractAddress === undefined ? contractCreated.address : contractAddress;

  const deployedContract = await new web3.eth.Contract(contractABI, contractAddress);

  await deployedContract.methods.registerDevice(signature, url, publicKey).send({
    from: account,
    gas: 1500000,
  });

  // await deviceRegisterContract.methods.registerDevice(signature, url, publicKey).send({
  //   from: account,
  //   gas: 1500000,
  // }).on('receipt', (receipt) => {
  //   // console.log("OVO JE RAČUN", receipt);
  // });
}
