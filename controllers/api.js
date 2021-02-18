const Item = require('../models/item');

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