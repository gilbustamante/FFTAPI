const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const WeaponSchema = new Schema({
  name: String,
  nameLower: String,
  atk: Number,
  def: Number,
  mag: Number,
  location: String,
  price: String,
  attribute: String,
  description: String
});

module.exports = mongoose.model('Weapon', WeaponSchema);