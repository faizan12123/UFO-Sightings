require('dotenv').config()
const { dataScraper } = require('./scraper/scraper.js')

// Make express server
const express = require("express")
const app = express()
const port = process.env.PORT || 3001

const getUFOdataRoutes = require("./routes/getUFOdata.js")
app.use("/getUFOdata", getUFOdataRoutes)

// Scrape and Seed database
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const tableData = await dataScraper(browser);
    console.log("Scraping completed")
    await knex.seed.run({ specific: './models/seeds/01_ufo.js', param1: 'someValue' });
    console.log("Seed completed");
  } catch (error) {
    console.error("Seed or scrape error:", error);
  }
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})