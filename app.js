const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const cors = require("cors")

const statusRoutes = require("./api/status")

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",")

app.use(cors({
  origin: function (origin, callback) {
    console.log("origin", origin);
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      const msg = `The CORS policy for ${origin} does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}))


app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to Backend Starter Template"})
})

app.use("/api", statusRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})
