const axios = require('axios');

const { manageDevice } = require('../../services');

module.exports = async (req, res) => {
  const devices = await manageDevice.getDevices();

  console.log("DEVICES....", devices);
}