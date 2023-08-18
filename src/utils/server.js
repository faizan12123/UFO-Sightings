const limiter = require('../middlewares/rateLimiter.js');
const express = require("express")
const getUFOdataRoutes = require("../routes/getUFOdata.js")

const server = () => {
    const app = express()
    // Apply rate limiter middleware to application
    app.use(limiter)
    
    // API route for getting UFO data
    app.use("/getUFOdata", getUFOdataRoutes)

    return app
}
module.exports = server

