const axios = require('axios');

module.exports = async (req, res) => {
  const { id } = req.params;

  console.log("ID", id);

  res.status(200).send(id);
}