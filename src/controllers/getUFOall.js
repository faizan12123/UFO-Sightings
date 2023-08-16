const queryUFOall = require("../services/queryUFOall.js")

const getUFOall = async (req, res) => {
  try {
    const UFOall = await queryUFOall();
    return res.json(UFOall);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching UFO data" });
  }
};

module.exports = getUFOall;
