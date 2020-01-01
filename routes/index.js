const router = require('express').Router();

const getDevices = require('./getDevices');
const registerDevice = require('./registerDevice');

module.exports = () => {
  getDevices(router);
  registerDevice(router);
  
  return router;
}
