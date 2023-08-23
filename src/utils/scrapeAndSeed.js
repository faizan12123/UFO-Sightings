const puppeteer = require('puppeteer');
const dataScraper= require('../scraper/scraper.js');
const db = require('../models/db.js');
const logger = require('../logs/logger.js')


const runScrapingAndSeeding = async () => {
  try {
    const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome',headless: true,args: ["--disable-gpu","--disable-dev-shm-usage","--disable-setuid-sandbox","--no-sandbox",]});
    const tableData = await dataScraper(browser);
    logger.info("Scraping completed");
    
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
    
    logger.info("Seed completed");
  } catch (error) {
    logger.error("Seed or scrape error:", error);
  }
};
runScrapingAndSeeding()
setInterval(runScrapingAndSeeding, 60 * 60 * 1000); // 6 hours in milliseconds

