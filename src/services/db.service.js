require("dotenv").config()
const { MongoClient } = require("mongodb");

const MONGODB_URL = process.env.MONGODB_URL || "";
const MONGODB_NAME = process.env.MONGODB_NAME || "";
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION || "";

async function collection() {
    const client = new MongoClient(MONGODB_URL);
    await client.connect();
    const db = client.db(MONGODB_NAME);
    return db.collection(MONGODB_COLLECTION);
}

module.exports = {
    collection,
}
