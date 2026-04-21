// -------------------------------
// Install dependencies before running:
//   npm init -y
//   npm install mongodb dotenv
// Run the file with:
//   node db_using_mongoose_version-7.cjs
// -------------------------------

// Load environment variables from a .env file if present
// (never hardcode your MongoDB URI in code!)
const env = process.env.NODE_ENV || "development"
const credentials = require('./.credentials.development.json')
const { MongoClient, ObjectId } = require("mongodb")
const mongoose = require('mongoose');
const fs = require("fs");

// Step 1: Read MongoDB URI from environment variables or fallback to config file
// let uri = process.env.MONGODB_URI;
console.log(env)
const uri =  credentials.mongo.development.connectionString 
console.log(uri)
if (!uri) {
  try {
    // Fallback: read from a local config file (config.json)
    const config = JSON.parse(fs.readFileSync("./.credentials.development.json", "utf8"));
    uri = config.mongo.development.connectionString;
  } catch (err) {
    console.error("❌ No MONGODB_URI found in environment or credentials file");
    process.exit(1);
  }
}

// Step 2: Define database and collection names appropriate for a Notifications app
const dbName = "test";
const collectionName = "vacations";

// Step 3: Create a MongoClient instance
const client = new MongoClient(uri);

console.log("🔌 Connecting to MongoDB Atlas...");
client.connect();
console.log("✅ Connected successfully!");

const db = client.db(dbName);
const collection = db.collection('vacations');

// seed vacation data (if necessary)
const Vacation = require('./models/vacation.js')

const recentVacations = collection.find({})

if (recentVacations.length) {
  new Vacation({
      name: 'Hood River Day Trip',
      slug: 'hood-river-day-trip',
      category: 'Day Trip',
      sku: 'HR199',
      description: 'Spend a day sailing on the Columbia and ' + 
        'enjoying craft beers in Hood River!',
      price: 99.95,
      tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
      inSeason: true,
      maximumGuests: 16,
      available: true,
      packagesSold: 0,
    }).save()

    new Vacation({
      name: 'Oregon Coast Getaway',
      slug: 'oregon-coast-getaway',
      category: 'Weekend Getaway',
      sku: 'OC39',
      description: 'Enjoy the ocean air and quaint coastal towns!',
      price: 269.95,
      tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
      inSeason: false,
      maximumGuests: 8,
      available: true,
      packagesSold: 0,
    }).save()

    new Vacation({
      name: 'Rock Climbing in Bend',
      slug: 'rock-climbing-in-bend',
      category: 'Adventure',
      sku: 'B99',
      description: 'Experience the thrill of climbing in the high desert.',
      price: 289.95,
      tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing'],
      inSeason: true,
      requiresWaiver: true,
      maximumGuests: 4,
      available: false,
      packagesSold: 0,
      notes: 'The tour guide is currently recovering from a skiing accident.',
    }).save()
}

return

const VacationInSeasonListener = require('./models/vacationInSeasonListener.js')

module.exports = {
  getClient: client,
  getVacations: async (options = {}) => Vacation.find(options),
  addVacationInSeasonListener: async (email, sku) => {
    await VacationInSeasonListener.updateOne(
      { email },
      { $push: { skus: sku } },
      { upsert: true }
    )
  },
}