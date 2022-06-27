const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };


const companies = require("./data/companies.json");
const items = require("./data/items.json");



const batchImport = async (req, res) => {

const client = new MongoClient(MONGO_URI, options);
await client.connect();
const db = client.db('store');

//companies
 await db.collection("companies").insertMany(companies);

//items
 await db.collection("items").insertMany(items);

client.close();

}

batchImport()