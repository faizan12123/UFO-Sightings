// Make express server
const express = require("express")
const app = express()
const port = process.env.PORT || 3001

const getUFOdataRoutes = require("./routes/getUFOdata.js")
app.use("/getUFOdata", getUFOdataRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})