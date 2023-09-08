const puppeteer = require('puppeteer');
const dataScraper = require('../scraper/scraper.js');
const db = require('../models/db.js');
const logger = require('../logs/logger.js');

const updateDatabase = async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      headless: true,
      args: ["--disable-gpu", "--disable-dev-shm-usage", "--disable-setuid-sandbox", "--no-sandbox"],
    });

    const tableData = await dataScraper(browser);
    logger.info("Scraping completed");

    // Process the scraped data and compare with existing database records
    for (const row of tableData) {
      const existingRecord = await db('ufo').where({
        summary: row.summary,
        incident_date: row.dateTime,
      }).first();

      if (existingRecord) {
        // Compare each field individually and update if there are differences
        const updateData = {};

        if (existingRecord.city !== row.city) {
          updateData.city = row.city;
        }

        if (existingRecord.state !== row.state) {
          updateData.state = row.state;
        }

        if (existingRecord.country !== row.country) {
          updateData.country = row.country;
        }

        if (existingRecord.shape !== row.shape) {
          updateData.shape = row.shape;
        }

        if (existingRecord.reported_date !== row.posted) {
          updateData.reported_date = row.posted;
        }

        if (existingRecord.duration !== row.duration) {
          updateData.duration = row.duration;
        }

        if (existingRecord.images !== row.images) {
          updateData.images = row.images;
        }

        // Check if there are differences to update
        if (Object.keys(updateData).length > 0) {
          await db('ufo').where('id', existingRecord.id).update(updateData);
        }
      } else {
        // Insert new record if it doesn't exist
        await db('ufo').insert({
          city: row.city,
          state: row.state,
          country: row.country,
          shape: row.shape,
          reported_date: row.posted,
          incident_date: row.dateTime,
          duration: row.duration,
          summary: row.summary,
          images: row.images
        });
      }
    }

    logger.info("Update completed");
    await browser.close();
  } catch (error) {
    logger.error("Update or scrape error:", error);
  }
};

setInterval(updateDatabase, 6 * 60 * 60 * 1000); // 6 hours in milliseconds

