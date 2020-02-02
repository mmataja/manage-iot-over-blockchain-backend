const { manageDevice } = require('../controllers');

module.exports = router => {
  router.post('/update/:id', manageDevice.update);
}
