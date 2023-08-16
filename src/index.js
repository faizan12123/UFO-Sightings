require('dotenv').config()
// const { dataScraper } = require('./scraper/scraper.js')

// Make express server
const express = require("express")
const app = express()
const port = process.env.PORT || 3001

const getUFOdataRoutes = require("./routes/getUFOdata.js")
app.use("/getUFOdata", getUFOdataRoutes)

// Run the scrapeAndSeed script immediately
// Run the scrapeAndSeed script immediately
require('./utils/scrapeAndSeed.js');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})