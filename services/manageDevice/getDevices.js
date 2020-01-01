const db = require('../../models');

module.exports = async () => {
  const devices = db.Devices.get();

  return devices;
}