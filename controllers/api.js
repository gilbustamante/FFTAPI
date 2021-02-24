const Accessory = require('../models/accessory');
const mongoose  = require('mongoose');
const Armor     = require('../models/armor');
const Helmet    = require('../models/helmet');
const Item      = require('../models/item');
const Weapon    = require('../models/weapon');

module.exports.allEndpoints = async (req, res) => {
  mongoose.connection.db.listCollections().toArray((err, nameObjects) => {
    if (err) {
      console.log(err);
    }
    let names = [];
    for (let name of nameObjects) {
      names.push(name.name);
    }
    res.send(names);
  })
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

module.exports.allHelmets = async (req, res) => {
  const helmets = await Helmet.find({});
  res.send(helmets);
}

module.exports.oneHelmet = async (req, res) => {
  const query = req.params.query;
  const helmet = await Helmet.findOne({ nameLower: query.toLowerCase() });
  res.send(helmet)
}

module.exports.allWeapons = async (req, res) => {
  const weapons = await Weapon.find({});
  res.send(weapons);
}

module.exports.oneWeapon = async (req, res) => {
  const query = req.params.query;
  const weapon = await Weapon.findOne({ nameLower: query.toLowerCase() });
  res.send(weapon);
}

module.exports.allAccessories = async (req, res) => {
  const accessories = await Accessory.find({});
  res.send(accessories);
}

module.exports.oneAccessory = async (req, res) => {
  const query = req.params.query;
  const accessory = await Accessory.findOne({ nameLower: query.toLowerCase() });
  res.send(accessory);
}
