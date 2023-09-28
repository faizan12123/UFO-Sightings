const puppeteer = require('puppeteer')
const logger = require('../logs/logger')

const dataScraper = async () => {
  try{
    const browser = await puppeteer.launch({
      headless: true,
    });
    const url = 'https://nuforc.org/webreports/ndxpost.html'
    const page = await browser.newPage()
    await page.goto(url)

    const allTableData = []

     // Get all the date links
  const dateLinks = await page.$$eval('td a[href$=".html"]', links => {
    return links.map(link => {
      const dateText = link.textContent.trim();
      const dateParts = dateText.split('/');
      const month = parseInt(dateParts[0]);
      const year = parseInt(dateParts[2]);
      const currentDate = new Date();

      // Calculate the date 6 months ago
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

      // Check if the date is within the last 6 months
      if (new Date(year, month - 1) >= sixMonthsAgo) {
        return link.href;
      }
    }).filter(link => link !== undefined); // Filter out undefined values
  });


    for (const link of dateLinks) {
    // Navigate to the linked page
    await page.goto(link);

    // Extract data from the table
    const tableData = await page.$$eval('table tbody tr', rows => {
        return rows.map(row => {
        const cells = row.querySelectorAll('td');

        let images = ''
        if(cells[8].textContent == '') {
          images = 'No'
        } else {
          images = 'Yes'
        }


        return {
            dateTime: cells[0].textContent.split(' ')[0],
            city: cells[1].textContent,
            state: cells[2].textContent,
            country: cells[3].textContent,
            shape: cells[4].textContent,
            duration: cells[5].textContent,
            summary: cells[6].textContent,
            posted: cells[7].textContent,
            images: images
        };
        });
    });

    allTableData.push(...tableData)

    }
    await browser.close()
    // console.log(allTableData[0])
    return allTableData
  } catch (error) {
    logger.error(error)
  }
}
dataScraper()
module.exports = dataScraper