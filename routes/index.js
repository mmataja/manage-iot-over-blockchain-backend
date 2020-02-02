const router = require('express').Router();

const getDevices = require('./getDevices');
const registerDevice = require('./registerDevice');
const updateDevice = require('./updateDevice');

module.exports = () => {
  getDevices(router);
  registerDevice(router);
  updateDevice(router);
  
  return router;
}
