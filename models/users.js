const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const Users = mongoose.model('Users', new Schema({
  _id: { type: String, required: true },
  name: { type: String },
  device: { type: ObjectId, ref: 'Devices' },
},
{
  timestamps: true,
}));

module.exports.create = async data => {
  const user = data;

  return await Users(user).save();
}
