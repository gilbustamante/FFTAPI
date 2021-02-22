const mongoose        = require('mongoose');
const { processFile } = require('./helpers');
const Helmet          = require('../models/helmet');

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

const populateHelmets = async () => {
  try {
    // Clear database
    await Helmet.deleteMany({});
    console.log('Cleared helmet collection')
    // Read .csv file and create array of arrays
    const objects = await processFile('helmet');
    // Iterate over the array and create objects
    for (let arr of objects) {
      const newHelmet = new Helmet({
        name: arr[0],
        nameLower: arr[0].toLowerCase(),
        hp: arr[1],
        mp: arr[2],
        location: arr[3],
        price: arr[4],
        attribute: arr[5],
        description: arr[6]
      });
      await newHelmet.save()
      console.log(`Created item: ${newHelmet.name}`)
    }
    console.log('Done')
  } catch (err) {
    console.log(err)
  }
}

populateHelmets().then(() => {
  db.close();
  console.log('Database disconnected');
});

