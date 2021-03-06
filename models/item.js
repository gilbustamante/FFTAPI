const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  nameLower: String,
  location: String,
  price: Number,
  effect: String,
  description: String
});

module.exports = mongoose.model('Item', ItemSchema);