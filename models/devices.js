const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const Devices = mongoose.model('Devices', new Schema({
  id: { type: Number, index: true, required: true },
  name: { type: String },
  contract: { type: ObjectId, ref: 'Contracts' },
  owner: { type: String },
  url: { type: String },
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
};

module.exports.get = (options = {}) => {
  const { page, limit } = options;

  return Devices.find().skip(parseInt(limit * (page - 1))).limit(parseInt(limit));
}

module.exports.updateById = (id, options = {}) => {
  
}