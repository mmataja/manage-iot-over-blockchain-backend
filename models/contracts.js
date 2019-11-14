const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const Contracts = mongoose.model('Contracts', new Schema({
  _id: { type: String, required: true, index: true },
  owner: { type: String },
  ownerAddress: { type: String },
  devices: [{ type: ObjectId, ref: 'Devices' }],
}, 
{
  timestamps: true,
}));

module.exports.create = async (data) => {
  const contract = data;

  return await Contracts(contract).save();
};

