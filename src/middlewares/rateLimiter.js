const rateLimit = require("express-rate-limit");
const logger = require("../logs/logger");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    // Log a warning message with the person's IP
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);

    // Send a response indicating rate limit exceeded
    res
      .status(429)
      .json({ error: "Rate limit exceeded. Please try again later." });
  },
});

module.exports = limiter;
