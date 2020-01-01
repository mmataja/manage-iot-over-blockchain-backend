const { manageDevice } = require('../controllers');

module.exports = router => {
  router.get('/devices', manageDevice.getDevices);
}