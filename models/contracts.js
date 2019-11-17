const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const Contracts = mongoose.model('Contracts', new Schema({
  address: { type: String, required: true, index: true },
  owner: { type: String },
  ownerAddress: { type: String },
  devices: [{ type: ObjectId, ref: 'Devices' }],
}, 
{
  timestamps: true,
}));

module.exports.create = data => {
  const contract = data;

  return Contracts(contract).save();
};

module.exports.getByAddress = address => {
  /** TODO
   * check if address is valid ethereum address
   */
  return Contracts.findOne({ ownerAddress: address }); 
}

module.exports.addDevice = (contractAddress, deviceId) => {
  return Contracts.findOneAndUpdate(
    { address: contractAddress }, 
    { $push: { devices: deviceId }},
    { new: true },
  );
}

