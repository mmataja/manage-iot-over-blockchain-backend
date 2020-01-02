const { manageDevice } = require('../../services');

module.exports = async (req, res) => {
  const { page, limit } = req.query;
  const options = { page, limit };

  const devices = await manageDevice.getDevices(options);

  return res.status(200).send(devices);
};
