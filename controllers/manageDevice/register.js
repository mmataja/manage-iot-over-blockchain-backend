const axios = require('axios');

const { manageDevice } = require('../../services');

module.exports = async (req, res) => {
  const data = req.body;

  const encryptData = await manageDevice.register(data);

  try {
    const response = await axios.post(data.url, {
      encryptData,
    });

    console.log("RESPONSE....", response)
    
  } catch (error) {
    console.log(error);
  }

  res.status(200).send("Device successfully registered.");
}
