const { manageDevice } = require('../../services');

module.exports = async (req, res) => {
  const data = req.body;

  await manageDevice.register(data);

  res.status(200).send("Device successfully registered.");
}
