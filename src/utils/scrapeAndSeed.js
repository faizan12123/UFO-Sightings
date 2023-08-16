require('dotenv').config();
const puppeteer = require('puppeteer');
const dataScraper= require('../scraper/scraper.js');
const db = require('../models/db.js');


const runScrapingAndSeeding = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const tableData = await dataScraper(browser);
    console.log("Scraping completed");
    
    // Truncate the table to delete all previous data
    await db('ufo').truncate();
    // Use the db instance to seed the database
    const formattedData = tableData.map(row => ({
      city: row.city,
          state: row.state,
          country: row.country,
          shape: row.shape,
          reported_date: row.posted,
          incident_date: row.dateTime,
          duration: row.duration,
          summary: row.summary,
          images: row.images
  }));
  
  await db('ufo').insert(formattedData);
    
    console.log("Seed completed");
  } catch (error) {
    console.error("Seed or scrape error:", error);
  }
};
runScrapingAndSeeding()
setInterval(runScrapingAndSeeding, 1 * 60 * 1000); // 2 minutes in milliseconds