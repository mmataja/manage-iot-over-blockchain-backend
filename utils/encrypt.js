const crypto = require('crypto');
const sshKeyToPEM = require('ssh-key-to-pem');

module.exports = (data, blockNumber, publicKey) => {
  const dataToEncrypt = {
    data,
    blockNumber
  };

  const sshPublicKey = sshKeyToPEM(publicKey);

  const buffer = Buffer.from((dataToEncrypt, 'utf-8'));
  const encryptedData = crypto.publicEncrypt(sshPublicKey, buffer);
  return encryptedData.toString('base64');
}
