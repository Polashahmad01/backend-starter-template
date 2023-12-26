const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config()

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@demo-cluster.xptnfy2.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`

const mongoOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}

const getMongoConnection = async () => {
  const client = new MongoClient(MONGO_URI, mongoOptions)
  await client.connect()
  const db = client.db(process.env.MONGO_DATABASE_NAME)

  return { client, db }
}

module.exports = getMongoConnection
