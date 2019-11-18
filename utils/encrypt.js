const crypto = require('crypto');

module.exports = (data, blockNumber, publicKey) => {
  const dataToEncrypt = {
    data,
    blockNumber
  };
  /**
   * TODO
   * 1) Ne valja enkripcija, nesto nije dobro s publicKey, pogledati sutra
   * 2) Napraviti ispravnu dekripciju na uređaju
   */

  const buffer = Buffer.from(JSON.stringify(dataToEncrypt));
  const encryptedData = crypto.publicEncrypt(trimedPK, buffer);
  return encryptedData.toString('base64');
}