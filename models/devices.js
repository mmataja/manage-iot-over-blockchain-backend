const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const Devices = mongoose.model('Devices', new Schema({
  name: { type: String },
  contract: { type: ObjectId, ref: 'Contracts' },
  owner: { type: ObjectId, ref: 'Owners' },
  data: {
    randomDataOne: { type: String },
    randomDataTwo: { type: String },
  },
},
{
  timestamps: true,
}));

module.exports.create = async data => {
  const device = data;

  return await Devices(device).save();
}