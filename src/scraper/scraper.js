const puppeteer = require('puppeteer')

const url = 'https://nuforc.org/webreports/ndxpost.html'

const main = async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(url)

    // Get all the date links
    const dateLinks = await page.$$eval('td a[href$=".html"]', links => links.map(link => link.href));

    for (const link of dateLinks) {
    // Navigate to the linked page
    await page.goto(link);

    // Extract data from the table
    const tableData = await page.$$eval('table tbody tr', rows => {
        return rows.map(row => {
        // console.log("rows: " + rows)
        const cells = row.querySelectorAll('td');
        // console.log("cell: " + cells)
        return {
            dateTime: cells[0].textContent.textContent,
            city: cells[1].textContent,
            state: cells[2].textContent,
            country: cells[3].textContent,
            shape: cells[4].textContent,
            duration: cells[5].textContent,
            summary: cells[6].textContent,
            posted: cells[7].textContent,
            images: cells[8].textContent
        };
        });
    });

    // Do something with the extracted data (e.g., save it to a database or file)
    // console.log(tableData);
    return tableData
    }
    await browser.close()
}

module.exports = main