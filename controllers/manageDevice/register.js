const axios = require('axios');

const { manageDevice } = require('../../services');

module.exports = async (req, res) => {
  const data = req.body;

  const encryptData = await manageDevice.register(data);

  try {
    const response = await axios.post(data.url, {
      encryptData,
    });

    res.status(200).send(response.data);
  } catch (error) {
    if (error.response.status === 422) {
      return res.status(422).send("Data does not match.");
    }
    
    console.log(error);
  }
}
