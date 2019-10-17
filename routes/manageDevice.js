const { manageDevice } = require('../controllers');

module.exports = router => {
  router.post('/register', manageDevice.register);
}