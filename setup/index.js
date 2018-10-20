const MongoClient = require('mongodb').MongoClient;

const characterSchema = require('./schemas/characterSchema.json');
const inventorySchema = require('./schemas/inventorySchema.json');

const characters = require('./data/characters.json');
const inventory = require('./data/inventory.json');

(async () => {
  try {
    const client = await MongoClient.connect(
      'mongodb://0.0.0.0:27017',
      { useNewUrlParser: true }
    );

    const db = client.db('horror');
    let charactersCollection = await db.collection('characters');
    await charactersCollection.drop();
    charactersCollection = await db.createCollection('characters', characterSchema);

    charactersCollection.createIndex({ name: -1 }, { unique: true });
    await charactersCollection.insertMany(characters);

    let inventoryCollection = await db.collection('inventory');
    await inventoryCollection.drop();
    inventoryCollection = await db.createCollection('inventory', inventorySchema);

    inventoryCollection.createIndex({ name: -1 }, { unique: true });
    await inventoryCollection.insertMany(inventory);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
