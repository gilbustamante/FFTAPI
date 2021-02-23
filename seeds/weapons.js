const mongoose        = require('mongoose');
const { processFile } = require('./helpers');
const Weapon          = require('../models/weapon');

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

const populateWeapons = async () => {
  try {
    // Clear database
    await Weapon.deleteMany({});
    console.log('Cleared weapon collection')
    // Read .csv file and create array of arrays
    const objects = await processFile('weapon');
    // Iterate over the array and create objects
    for (let arr of objects) {
      const newWeapon = new Weapon({
        name: arr[0],
        nameLower: arr[0].toLowerCase(),
        atk: arr[1],
        def: arr[2],
        mag: arr[3],
        location: arr[4],
        price: arr[5],
        attribute: arr[6],
        description: arr[7]
      });
      await newWeapon.save()
      console.log(`Created item: ${newWeapon.name}`)
    }
    console.log('Done')
  } catch (err) {
    console.log(err)
  }
}

populateWeapons().then(() => {
  db.close();
  console.log('Database disconnected');
});