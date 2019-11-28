const crypto = require('crypto');
const sshKeyToPEM = require('ssh-key-to-pem');

module.exports = (data, publicKey) => {
  const sshPublicKey = sshKeyToPEM(publicKey);

  const buffer = Buffer.from((data, 'utf-8'));
  const encryptedData = crypto.publicEncrypt(sshPublicKey, buffer);
  return encryptedData.toString('base64');
}
