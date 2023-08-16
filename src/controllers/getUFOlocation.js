const queryUFOlocation = require("../services/queryUFOlocation.js")

const getUFOlocation = async (req, res) => {
  const { state, city, country } = req.query;

  // Create an object to store only the existing parameters
  const location = {};

  try {
    if (state) {
      location.state = decodeURIComponent(state).split(',');
    }
    if (city) {
      location.city = decodeURIComponent(city).split(',');
    }
    if (country) {
      location.country = decodeURIComponent(country).split(',');
    }

    const UFOlocation = await queryUFOlocation(location);
    
    //if there is no results from the query, respond with a message to the user
    if(UFOlocation.length > 0) {
      return res.json(UFOlocation);
    } else{
      return res.send("No results matching this search")
    }
    
  } catch (error) {
    console.error("Error decoding URI:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getUFOlocation;