const Item  = require('../models/item');
const Armor = require('../models/armor');

module.exports.allEndpoints = async (req, res) => {
  res.send('JSON response will be here');
}

module.exports.allItems = async (req, res) => {
  const items = await Item.find({});
  res.send(items);
}

module.exports.oneItem = async (req, res) => {
  const query = req.params.query;
  const item = await Item.findOne({ nameLower: query.toLowerCase() });
  res.send(item);
}

module.exports.allArmor = async (req, res) => {
  const armor = await Armor.find({});
  res.send(armor);
}

module.exports.oneArmor = async (req, res) => {
  const query = req.params.query;
  const armor = await Armor.findOne({ nameLower: query.toLowerCase() });
  res.send(armor)
}