// Reads from .csv file and returns an array of each line
const parse    = require('csv-parse');
const fs       = require('fs');
const path     = require('path');

module.exports.processFile = async (filename) => {
  let records = []
  const parser = fs
    .createReadStream(path.join(__dirname, '..', 'data', `${filename}.csv`))
    .pipe(parse({
      delimiter: ',',
      from_line: 2
    }));
  for await (const record of parser) {
    records.push(record)
  }
  return records
}