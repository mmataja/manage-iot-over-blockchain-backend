const db = require('../../models');

module.exports = async (options) => {
  const devices = db.Devices.get(options);

  return devices;
}