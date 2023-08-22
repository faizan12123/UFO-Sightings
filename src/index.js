const createServer = require('./utils/server')
const logger = require('./logs/logger')
require('dotenv').config({path: '../.env'});
// Make express server


const port = process.env.NODE_ENV === 'production' ? 80 : 3001;

const app = createServer()



// Run the scrapeAndSeed script immediately
require('./utils/scrapeAndSeed.js');

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
})