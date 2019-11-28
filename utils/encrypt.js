const NodeRSA = require('node-rsa');

module.exports = (data, publicKey) => {
  const key = new NodeRSA(publicKey);

  const encryptedData = key.encrypt(data, 'base64');
  return encryptedData;
}
