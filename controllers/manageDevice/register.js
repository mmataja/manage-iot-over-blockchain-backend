const { manageDevice } = require('../../services');

module.exports = async (req, res) => {
  const data = req.body;

  await manageDevice.register(data);
  // deviceRegisterContract.events.allEvents({}, (error, event) => console.log(event)).on('data', event => {
  //   console.log("je ima tu nesto", event)
  // });

  res.status(200).send("Device successfully registered.");
}
