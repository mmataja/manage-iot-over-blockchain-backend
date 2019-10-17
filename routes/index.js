const router = require('express').Router();

const manageDevice = require('./manageDevice');

module.exports = () => {
  manageDevice(router);

  return router;
}