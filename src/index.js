require('dotenv').config()
const createServer = require('./utils/server')
// Make express server


const port = process.env.PORT || 3001

const app = createServer()



// Run the scrapeAndSeed script immediately
require('./utils/scrapeAndSeed.js');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})