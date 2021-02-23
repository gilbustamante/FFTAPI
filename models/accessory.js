const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const AccessorySchema = new Schema({
  name: String,
  nameLower: String,
  effect: String,
  location: String,
  price: String,
  attribute: String,
  description: String
});

module.exports = mongoose.model('Accessory', AccessorySchema);
