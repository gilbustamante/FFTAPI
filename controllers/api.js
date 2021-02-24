const mongoose  = require('mongoose');
const Accessory = require('../models/accessory');
const Armor     = require('../models/armor');
const Helmet    = require('../models/helmet');
const Item      = require('../models/item');
const Weapon    = require('../models/weapon');

// All endpoint categories
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

// Accessories - All
module.exports.allAccessories = async (req, res) => {
  const accessories = await Accessory.find({});
  res.send(accessories);
}

// Accessories - Random
module.exports.randomAccessory = async (req, res) => {
  const accessoryCount = await Accessory.count();
  const randNum = Math.floor((Math.random() * accessoryCount) + 1);
  const weapon = await Accessory.findOne().skip(randNum);
  res.send(weapon)
}

// Accessories - One
module.exports.oneAccessory = async (req, res) => {
  const query = req.params.query;
  const accessory = await Accessory.findOne({ nameLower: query.toLowerCase() });
  res.send(accessory);
}

// Armor - All
module.exports.allArmor = async (req, res) => {
  const armor = await Armor.find({});
  res.send(armor);
}

// Armor - Random
module.exports.randomArmor = async (req, res) => {
  const armorCount = await Armor.count();
  const randNum = Math.floor((Math.random() * armorCount) + 1);
  const armor = await Armor.findOne().skip(randNum);
  res.send(armor)
}

// Armor - One
module.exports.oneArmor = async (req, res) => {
  const query = req.params.query;
  const armor = await Armor.findOne({ nameLower: query.toLowerCase() });
  res.send(armor)
}

// Helmets - All
module.exports.allHelmets = async (req, res) => {
  const helmets = await Helmet.find({});
  res.send(helmets);
}

// Helmets - Random
module.exports.randomHelmet = async (req, res) => {
  const helmetCount = await Helmet.count();
  const randNum = Math.floor((Math.random() * helmetCount) + 1);
  const helmet = await Helmet.findOne().skip(randNum);
  res.send(helmet)
}

// Helmets - One
module.exports.oneHelmet = async (req, res) => {
  const query = req.params.query;
  const helmet = await Helmet.findOne({ nameLower: query.toLowerCase() });
  res.send(helmet)
}

// Items - All
module.exports.allItems = async (req, res) => {
  const items = await Item.find({});
  res.send(items);
}

// Items - Random
module.exports.randomItem = async (req, res) => {
  const itemCount = await Item.count();
  const randNum = Math.floor((Math.random() * itemCount) + 1);
  const item = await Item.findOne().skip(randNum);
  res.send(item)
}

// Items - One
module.exports.oneItem = async (req, res) => {
  const query = req.params.query;
  const item = await Item.findOne({ nameLower: query.toLowerCase() });
  res.send(item);
}

// Weapons - All
module.exports.allWeapons = async (req, res) => {
  const weapons = await Weapon.find({});
  res.send(weapons);
}

// Weapons - Random
module.exports.randomWeapon = async (req, res) => {
  const weaponCount = await Weapon.count();
  const randNum = Math.floor((Math.random() * weaponCount) + 1);
  const weapon = await Weapon.findOne().skip(randNum);
  res.send(weapon)
}

// Weapons - One
module.exports.oneWeapon = async (req, res) => {
  const query = req.params.query;
  const weapon = await Weapon.findOne({ nameLower: query.toLowerCase() });
  res.send(weapon);
}