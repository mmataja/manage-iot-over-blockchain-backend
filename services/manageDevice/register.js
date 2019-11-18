const { createContract, encrypt, web3 } = require('../../utils');
const db = require('../../models');

const { contractInterface, byteCode, contractABI } = createContract;

module.exports = async data => {
  const { account, signature, url, publicKey, deviceOwner, deviceName } = data;
  
  let createdContract = await db.Contracts.getByAddress(account);

  if (!createdContract) {
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

    createdContract = await db.Contracts.create(contractData);
  }

  const deployedContract = new web3.eth.Contract(contractABI, createdContract.address);

  await deployedContract.methods.registerDevice(signature, publicKey).send({
    from: account,
    gas: 1500000,
  }).on('receipt', async (receipt) => {
    const { blockNumber } = receipt;
    const deviceEthereumId = receipt.events.DeviceRegister.returnValues.deviceCount;
    const deviceData = {
      id: deviceEthereumId,
      name: deviceName,
      contract: createdContract._id,
      owner: deviceOwner,
      url,
    }

    const encrypted = encrypt(deviceData, blockNumber, publicKey);

    console.log("ENCRYPTED DATA....", encrypted);

    const device = await db.Devices.create(deviceData)
    if(!device) "Something is wrong with saving device to DB.";

    await db.Contracts.addDevice(createdContract.address, device._id);


  });
}
