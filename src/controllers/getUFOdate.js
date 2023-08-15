const queryUFOdate = require("../services/queryUFOdate.js")

const getUFOdate = (req, res) => {
    const UFOdate = queryUFOdate()
  
    // DO SOMETHING WITH THE USER LIST OR JUST RETURN IT
    return res.json(UFOdate)
  };
  
module.exports = getUFOdate