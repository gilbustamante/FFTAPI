const mongoose        = require('mongoose');
const { processFile } = require('./helpers');
const Accessory           = require('../models/accessory');

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

const populateAccessories = async () => {
  try {
    // Clear database
    await Accessory.deleteMany({});
    console.log('Cleared accessory collection')
    // Read .csv file and create array of arrays
    const objects = await processFile('accessory');
    // Iterate over the array and create objects
    for (let arr of objects) {
      const newAccessory = new Accessory({
        name: arr[0],
        nameLower: arr[0].toLowerCase(),
        effect: arr[1],
        location: arr[2],
        price: arr[3],
        attribute: arr[4],
        description: arr[5]
      });
      await newAccessory.save()
      console.log(`Created item: ${newAccessory.name}`)
    }
    console.log('Done')
  } catch (err) {
    console.log(err)
  }
}

populateAccessories().then(() => {
  db.close();
  console.log('Database disconnected');
});
