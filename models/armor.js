const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ArmorSchema = new Schema({
  name: String,
  nameLower: String,
  hp: Number,
  mp: Number,
  location: String,
  price: String,
  attribute: String,
  description: String
});

module.exports = mongoose.model('Armor', ArmorSchema);
