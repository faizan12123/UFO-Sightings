const createServer = require('./utils/server')
const logger = require('./logs/logger')
// Make express server


const port =3001

const app = createServer()



// Run the scrapeAndSeed script immediately
require('./utils/scrapeAndSeed.js');

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
})