const queryUFOlocation = require("../services/queryUFOlocation.js")

const getUFOlocation = (req, res) => {
    const UFOlocation = queryUFOlocation()
  
    // DO SOMETHING WITH THE USER LIST OR JUST RETURN IT
    return res.json(UFOlocation)
  };
  
module.exports = getUFOlocation