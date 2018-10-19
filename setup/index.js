const MongoClient = require('mongodb').MongoClient;

const characterSchema = require('./schemas/characterSchema.json');
const inventorySchema = require('./schemas/inventorySchema.json');

const characters = require('./data/characters.json');
const inventory = require('./data/inventory.json');

MongoClient.connect(
  'mongodb://0.0.0.0:27017',
  (err, client) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const db = client.db('horror');
    // validate db
    db.createCollection('characters', characterSchema, (error, collection) => {
      if (!error) collection.insertMany(characters);
      else console.error(error);
    });
    db.createCollection('inventory', inventorySchema, (error, collection) => {
      if (!error) collection.insertMany(inventory);
      else console.error(error);
    });
    // process.exit(0);
  }
);
