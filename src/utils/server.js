const limiter = require('../middlewares/rateLimiter.js');
const express = require("express")
const getUFOdataRoutes = require("../routes/getUFOdata.js")
const cors = require('cors');

const server = () => {
    const app = express()

    const allowedOrigins = ['http://127.0.0.1:5500/']; // Replace with your domain
    const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    }
    };

    // Apply rate limiter middleware to application
    app.use(limiter)

    // Apply CORS middleware using corsOptions
    app.use(cors());
    
    // API route for getting UFO data
    app.use("/getUFOdata", getUFOdataRoutes)

    return app
}
module.exports = server

