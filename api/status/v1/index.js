const router = require("express").Router()
const root = require("app-root-path")
const getMongoConnection = require(`${root}/config/mongo-connect`)

const statusChecker = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const status = await db.collection("status").insertOne({...req.body})
    res.status(200).json({ success: true, status: status})
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

router.post("/status", statusChecker)

module.exports = router
