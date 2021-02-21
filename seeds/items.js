const mongoose = require('mongoose');
const parse    = require('csv-parse');
const fs       = require('fs');
const path     = require('path');
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
  let itemList = [];
  try {
    // Clear database
    await Item.deleteMany({});
    console.log('Cleared items collection')
    // Read .csv file and create array of arrays
    const objects = await processFile('items');
    // Iterate over the array and create objects
    for (let arr of objects) {
      const newItem = new Item({
        name: arr[0],
        nameLower: arr[0].toLowerCase(),
        effect: arr[1],
        location: arr[2],
        price: arr[3],
        description: arr[4]
      });
      await newItem.save()
      console.log(`Created item: ${newItem.name}`)
    }
    console.log('Done')
  } catch (err) {
    console.log(err)
  }
}

const processFile = async (filename) => {
  let records = []
  const parser = fs
    .createReadStream(path.join(__dirname, '..', 'scraper', `${filename}.csv`))
    .pipe(parse({
      delimiter: ',',
      from_line: 2
    }));
  for await (const record of parser) {
    records.push(record)
  }
  return records
}

populateItems().then(() => {
  db.close();
  console.log('Database disconnected');
});