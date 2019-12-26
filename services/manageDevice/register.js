const { createContract, encrypt, web3 } = require('../../utils');
const db = require('../../models');

const { contractInterface, byteCode, contractABI } = createContract;

module.exports = async data => {
  const { account, signature, publicKey, deviceOwner, deviceName, url } = data;
  
  let createdContract = await db.Contracts.getByAddress(account);

  if (!createdContract) {
    const deviceRegisterContract = await contractInterface.deploy({ data: byteCode }).send({
      from: account,
      gas: 1500000,
    });

    contractAddress = deviceRegisterContract.options.address;

    const query = {
      address: contractAddress,
      owner: deviceOwner,
      ownerAddress: account,
    }

    createdContract = await db.Contracts.create(query);
  }

  const deployedContract = new web3.eth.Contract(contractABI, createdContract.address);
  
  const encryptData = await deployedContract.methods.registerDevice(signature.signature, publicKey).send({
    from: account,
    gas: 1500000,
  }).then( async (receipt) => {
    const { blockNumber } = receipt;
    const deviceEthereumId = receipt.events.DeviceRegister.returnValues.deviceCount;

    const deviceData = {
      id: deviceEthereumId,
      contract: createdContract._id,
      blockNumber,
      signature: signature.signature,
      account,
    }

    const query = {
      id: deviceEthereumId,
      name: deviceName,
      contract: createdContract._id,
      owner: deviceOwner,
      url,
    }

    const device = await db.Devices.create(query)
    
    if(!device) {
      "Something is wrong with saving device to DB.";
    }
    
    await db.Contracts.addDevice(createdContract.address, device._id);
    
    return encrypt(deviceData, publicKey);
  });

  return encryptData;
}
