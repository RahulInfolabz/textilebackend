const MongoClient = require("mongodb").MongoClient;

async function connectDb() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    console.log("Database Connected");
    return client.db();
  } catch (error) {
    console.log("Connection Faild");
  }
}

module.exports = connectDb;
