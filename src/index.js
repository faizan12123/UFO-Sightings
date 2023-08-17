require('dotenv').config()

// Make express server
const express = require("express")
const app = express()
const port = process.env.PORT || 3001

const getUFOdataRoutes = require("./routes/getUFOdata.js")

const limiter = require('./middlewares/rateLimiter.js');

// Apply rate limiter middleware to application
app.use(limiter)

// API route for getting UFO data
app.use("/getUFOdata", getUFOdataRoutes)

// Run the scrapeAndSeed script immediately
require('./utils/scrapeAndSeed.js');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})