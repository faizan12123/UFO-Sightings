const queryUFO = require("../services/queryUFO.js");
const logger = require("../logs/logger.js");

const getUFO = async (req, res) => {
  let { state, city, country, dateOfOccurrence } = req.query;

  // Create an object to store only the existing parameters
  const location = {};
  logger.info(
    "API Query Received: " +
      "state: " +
      state +
      " city: " +
      city +
      " country: " +
      country +
      " dateOfOccurrence: " +
      dateOfOccurrence,
  );

  try {
    if (dateOfOccurrence) {
      dateOfOccurrence = decodeURIComponent(dateOfOccurrence);
      dateOfOccurrence = dateOfOccurrence.split(",");

      for (let date of dateOfOccurrence) {
        if (date && !date.match(/^\d{1,2}\/\d{1,2}\/\d{2}$/)) {
          return res.status(400).json({ error: "Invalid date format." });
        }
      }
    }
    if (state) {
      location.state = decodeURIComponent(state)
        .split(",")
        .map((item) => item.toLowerCase());
    }
    if (city) {
      location.city = decodeURIComponent(city)
        .split(",")
        .map((item) => item.toLowerCase());
    }
    if (country) {
      location.country = decodeURIComponent(country)
        .split(",")
        .map((item) => item.toLowerCase());
    }

    const UFO = await queryUFO(location, dateOfOccurrence);

    //if there is no results from the query, respond with a message to the user
    if (UFO.length > 0) {
      return res.json(UFO);
    } else {
      return res.status(400).json({ error: "No results matching this search" });
    }
  } catch (error) {
    logger.error("Error decoding URI:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getUFO;
