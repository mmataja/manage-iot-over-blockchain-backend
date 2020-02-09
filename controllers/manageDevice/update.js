const axios = require('axios');

const { manageDevice } = require('../../services'); 

module.exports = async (req, res) => {
  const { id, account } = req.params;

  if (!id || !account) {
    res.status(400).json({ message: 'Invalid Id provided.' }).end();
  }

  const isContractOwner = await manageDevice.update(id, account);

  if (!isContractOwner) {
    res.status(400).json({ message: 'You are not owner of this device.' }).end();
  }

  console.log("ID", id);

  res.status(200).send(id);
}