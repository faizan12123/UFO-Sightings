const queryUFOall = require("../services/queryUFOall.js")

const getUFOall = (req, res) => {
    const UFOall = queryUFOall()
  
    // DO SOMETHING WITH THE USER LIST OR JUST RETURN IT
    return res.json(UFOall)
  };
  
module.exports = getUFOall