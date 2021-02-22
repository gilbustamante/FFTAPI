const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ArmorSchema = new Schema({
  name: String,
  nameLower: String,
  price: Number,
  location: String,
  hp: Number,
  mp: Number,
  special: String,
  description: String
});

module.exports = mongoose.model('Armor', ArmorSchema);
