const mongoose = require('mongoose');
const Item     = require('../models/item');

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/fft';
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const populateItems = async () => {
  // Clear item database first
  await Item.deleteMany({});
  console.log('Cleared items collection');
  // Create document for each item
  for (let item of allItems) {
    const newItem = new Item({
      name: item.name,
      location: item.location,
      price: item.price,
      type: item.type,
      effect: item.effect,
      description: item.description
    });
    await newItem.save();
    console.log(`Created item: ${newItem.name}`)
  }
  console.log('Done');
}

const allItems = [
  {
    "name": "Potion",
    "location": "Shop",
    "price": 50,
    "type": "Curative",
    "effect": "Restores 30 HP",
    "description": "Medicine that restores HP. Deals damage when used against the undead."
  },
  {
    "name": "Hi-Potion",
    "location": "Shop",
    "price": 200,
    "type": "Curative",
    "effect": "Restores 70 HP",
    "description": "Medicine that restores HP. More effective than a standard Potion."
  },
  {
    "name": "X-Potion",
    "location": "Shop",
    "price": 700,
    "type": "Curative",
    "effect": "Restores 150 HP",
    "description": "Medicine that restores HP. More effective than a Hi-Potion."
  },
  {
    "name": "Ether",
    "location": "Shop",
    "price": 200,
    "type": "Curative",
    "effect": "Restores 20 MP",
    "description": "Medicine that restores MP."
  },
  {
    "name": "Hi-Ether",
    "location": "Shop",
    "price": 600,
    "type": "Curative",
    "effect": "Restores 20 MP",
    "description": "Medicine that restores MP. More effective than a standard Ether."
  },
  {
    "name": "Elixir",
    "location": "Poach: Greater Malboro",
    "price": 0,
    "type": "Curative",
    "effect": "Fully restores HP and MP",
    "description": "Valuable medicine that fully restores both HP and MP."
  },
  {
    "name": "Antidote",
    "location": "Shop",
    "price": 50,
    "type": "Curative",
    "effect": "Cures Poison",
    "description": "Medicine that neutralizes poison from enemy attacks."
  },
  {
    "name": "Eye Drops",
    "location": "Shop",
    "price": 50,
    "type": "Curative",
    "effect": "Cures Blind",
    "description": "Medicine that restores sight to those blinded by magick or other causes."
  },
  {
    "name": "Echo Herbs",
    "location": "Shop",
    "price": 50,
    "type": "Curative",
    "effect": "Cures Mute",
    "description": "Medicine that restores the power of speech to silenced units, allowing them to cast spells."
  },
  {
    "name": "Maiden's Kiss",
    "location": "Shop",
    "price": 50,
    "type": "Curative",
    "effect": "Cures Toad",
    "description": "Medicine that restores a unit who has been transformed into a toad."
  },
  {
    "name": "Gold Needle",
    "location": "Shop",
    "price": 100,
    "type": "Curative",
    "effect": "Cures Stone",
    "description": "A tool that restores a unit who has been turned to stone. It breaks after one use."
  },
  {
    "name": "Holy Water",
    "location": "Shop",
    "price": 2000,
    "type": "Curative",
    "effect": "Cures Undead and Vampire",
    "description": "Holy water that restores life to a unit who has been touched by the curse of undeath."
  },
  {
    "name": "Remedy",
    "location": "Shop",
    "price": 350,
    "type": "Curative",
    "effect": "Cures Stone, Blind, Confuse, Mute, Oil, Toad, Poison, Sleep",
    "description": "A nostrum that cures all manner of status effects."
  },
  {
    "name": "Phoenix Down",
    "location": "Shop",
    "price": 300,
    "type": "Curative",
    "effect": "Cures KO",
    "description": "Down feathers with the power to restore a unit who has fallen in battle. Consumed after one use."
  },
  {
    "name": "Shuriken",
    "location": "Shop",
    "price": 50,
    "type": "Thrown Weapon",
    "effect": "Attack Power: 4",
    "description": "A throwing weapon for ninjas. It spins in the air before hitting its target."
  },
  {
    "name": "Fuma Shuriken",
    "location": "Shop",
    "price": 300,
    "type": "Thrown Weapon",
    "effect": "Attack Power: 7",
    "description": "A pinwheel-shaped throwing star that flies at very high speeds."
  },
  {
    "name": "Yagyu Darkrood",
    "location": "Shop",
    "price": 1000,
    "type": "Thrown Weapon",
    "effect": "Attack Power: 10",
    "description": "A cross-shaped throwing star used by a famous ninja school. Its blades are serrated for maximum damage."
  },
  {
    "name": "Flameburst Bomb",
    "location": "Shop",
    "price": 250,
    "type": "Thrown Weapon",
    "effect": "Attack Power: 8, Element: Fire",
    "description": "An explosive sphere that deals fire damage when thrown."
  },
  {
    "name": "Spark Bomb",
    "location": "Shop",
    "price": 250,
    "type": "Thrown Weapon",
    "effect": "Attack Power: 8, Element: Lightning",
    "description": "An explosive sphere that deals lightning damage when thrown."
  },
  {
    "name": "Snowmelt Bomb",
    "location": "Shop",
    "price": 250,
    "type": "Thrown Weapon",
    "effect": "Attack Power: 8, Element: Water",
    "description": "An explosive sphere that deals water damage when thrown."
  },
]

populateItems().then(() => {
  db.close();
  console.log('Database disconnected');
});